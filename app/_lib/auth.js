import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const normalizedNextAuthUrl =
  process.env.NEXTAUTH_URL?.replace(/\/$/, "") || "http://localhost:3000";

const googleProvider =
  process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET
    ? Google({
        clientId: process.env.AUTH_GOOGLE_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET,
      })
    : null;

const authConfig = {
  trustHost: true,
  secret: process.env.NEXTAUTH_SECRET,
  providers: googleProvider ? [googleProvider] : [],
  callbacks: {
    authorized({ auth }) {
      return true;
    },
    async signIn({ user }) {
      try {
        if (!user?.email) return true;

        const existingGuest = await getGuest(user.email);

        if (!existingGuest) {
          await createGuest({ email: user.email, fullName: user.name });
        }

        return true;
      } catch {
        return true;
      }
    },
    async session({ session }) {
      try {
        if (!session?.user?.email) return session;

        const guest = await getGuest(session.user.email);
        if (guest) {
          session.user.guestId = guest.id;
        }
      } catch {
        session.user.guestId = null;
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  basePath: "/api/auth",
  baseURL: normalizedNextAuthUrl,
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
