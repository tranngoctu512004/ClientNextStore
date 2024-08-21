import { NextResponse } from "next/server";

const privatePaths = ["/profile", "/cart"];
const authPaths = ["/login", "/register"];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("sessionToken");

  if (privatePaths.includes(pathname) && !sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (authPaths.includes(pathname) && sessionToken) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/profile", "/home", "/about", "/cart"],
};
