import Link from "next/link";
import Image from "next/image";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import DeleteReservation from "./DeleteReservation";

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

function ReservationCard({ booking, onDelete }) {
  const {
    id,
    guestId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    status,
    created_at,
    cabins: { name, image },
  } = booking;

  return (
    <div className="flex flex-col border border-primary-800 sm:flex-row">
      <div className="relative h-40 shrink-0 sm:h-auto sm:w-36 lg:w-44">
        <Image
          src={image}
          alt={`Cabin ${name}`}
          fill
          className="object-cover border-b border-primary-800 sm:border-b-0 sm:border-r"
        />
      </div>

      <div className="flex flex-1 flex-col px-4 py-3 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-semibold sm:text-xl">
            {numNights} nights in Cabin {name}
          </h3>
          {isPast(new Date(startDate)) ? (
            <span className="flex h-7 w-fit items-center rounded-sm bg-yellow-800 px-3 text-xs font-bold uppercase text-yellow-200">
              past
            </span>
          ) : (
            <span className="flex h-7 w-fit items-center rounded-sm bg-green-800 px-3 text-xs font-bold uppercase text-green-200">
              upcoming
            </span>
          )}
        </div>

        <p className="text-sm text-primary-300 sm:text-base lg:text-lg">
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>

        <div className="mt-auto flex flex-col gap-2 pt-4 sm:flex-row sm:items-baseline sm:gap-5">
          <p className="text-lg font-semibold text-accent-400 sm:text-xl">
            ${totalPrice}
          </p>
          <p className="hidden text-primary-300 sm:block">&bull;</p>
          <p className="text-sm text-primary-300 sm:text-base lg:text-lg">
            {numGuests} guest{numGuests > 1 && "s"}
          </p>
          <p className="text-sm text-primary-400 sm:ml-auto">
            Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
          </p>
        </div>
      </div>

      <div className="flex flex-col border-t border-primary-800 sm:w-[100px] sm:border-l sm:border-t-0">
        {!isPast(startDate) ? (
          <>
            <Link
              href={`/account/reservations/edit/${id}`}
              className="group flex flex-grow items-center gap-2 border-b border-primary-800 px-3 py-3 text-xs font-bold uppercase text-primary-300 transition-colors hover:bg-accent-600 hover:text-primary-900"
            >
              <PencilSquareIcon className="h-5 w-5 text-primary-600 transition-colors group-hover:text-primary-800" />
              <span className="mt-1">Edit</span>
            </Link>
            <DeleteReservation bookingId={id} onDelete={onDelete} />
          </>
        ) : null}
      </div>
    </div>
  );
}

export default ReservationCard;
