import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    if (req.nextauth.token.role === "admin"){
      return NextResponse.redirect(new URL("/admin-dashboard", req.nextUrl));
    }
    else {
      return NextResponse.redirect(new URL("/form", req.nextUrl));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => token.id !== null,
    },
  }
);

export const config = { matcher: ["/landingPage"] };
