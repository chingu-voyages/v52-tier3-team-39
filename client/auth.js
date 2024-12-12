import GoogleProviders from "next-auth/providers/google";
import { serverUrl } from "./constants";
import NextAuth from "next-auth";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProviders({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      async profile(profile) {
        // action to server
        const res = await fetch(serverUrl + "user", {
          headers: {
            "x-user-email": profile.email,
          },
        });
        const role = await res.json();
        return {
          id: profile.sub,
          email: profile.email,
          role,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl + '/login-redirect'
    }
  },
  pages: {
    signIn: "/signIn",
    },
};

export default NextAuth(authOptions);
