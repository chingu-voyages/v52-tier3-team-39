import GoogleProviders from "next-auth/providers/google";
import { serverUrl } from "./constants";
import NextAuth from "next-auth";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProviders({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return { id: profile.sub, email: profile.email };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user && account) {
        const response = await fetch(serverUrl + "user", {
          headers: {
            Authorization: `Bearer ${account.access_token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const { role, token: jwt } = await response.json();
        token.role = role;
        token.jwt = jwt;
        token.accessToken = account.access_token;
      }
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role;
      session.jwt = token.jwt;
      session.accessToken = token.accessToken;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl + "/login-redirect";
    },
  },
  pages: {
    signIn: "/signIn",
  },
};

export default NextAuth(authOptions);
