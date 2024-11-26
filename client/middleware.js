import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    const adminPaths = ['/admin-dashboard']
    if (adminPaths.includes(req.nextUrl.pathname) && !req.nextauth.token.role === "admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.nextUrl));
    }
  },
  {
    callbacks: {
      authorized({ token }) {
        if (token) return true;
      },
    },
  }
);

