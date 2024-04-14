import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  //@ts-ignore
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  callbacks: {
    session({ session, user }) {
      //@ts-ignore

      session.user.id = user.id;
      //@ts-ignore

      session.user.apiKey = user.apiKey;
      return session;
    },
  },
});
