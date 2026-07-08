"use server";

import { auth, signIn, signOut } from "./auth";
import { getBookings, getGuest } from "./data-service";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateGuest(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const nationalID = String(formData.get("nationalID") || "").trim();
  const nationality = String(formData.get("nationality") || "").trim();

  if (!nationalID) {
    throw new Error("Please provide your national ID");
  }

  if (!/^[a-zA-Z0-9]{6,24}$/.test(nationalID)) {
    throw new Error("Please provide a valid national ID");
  }

  if (!nationality) {
    throw new Error("Please select your country");
  }

  let guestId = session.user?.guestId;

  if (!guestId && session.user?.email) {
    const guest = await getGuest(session.user.email);
    guestId = guest?.id;
  }

  if (!guestId) throw new Error("You must be logged in");

  const updateData = { nationality, countryFlag: "", nationalID };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", guestId)
    .select()
    .single();

  if (error) {
    console.error("updateGuest error", error);
    throw new Error(error.message || "Guest could not be updated");
  }

  if (!data) {
    console.error("updateGuest returned no data", { guestId, updateData });
    throw new Error("Guest could not be updated");
  }

  revalidatePath("/account/profile");
  redirect("/account/profile?updated=1");
}

export async function createBooking(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) throw new Error("Booking could not be created");

  revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect("/cabins/thankyou");
}

export async function deleteBooking(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservations");
}

export async function updateBooking(formData) {
  const bookingId = Number(formData.get("bookingId"));

  // 1) Authentication
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // 2) Authorization
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to update this booking");

  // 3) Building update data
  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };

  // 4) Mutation
  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  // 5) Error handling
  if (error) throw new Error("Booking could not be updated");

  // 6) Revalidation
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");

  // 7) Redirecting
  redirect("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
