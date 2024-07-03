import { NextResponse } from "next/server";
// const privatePaths = ["/profile", "/"];
const authPaths = ["/login", "/register"];
// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("sessionToken");
  // console.log(pathname)
  //check private Path
  // if (privatePaths.some((path) => pathname.startsWith(path) && !sessionToken)) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }
  if (authPaths.some((path) => pathname.startsWith(path) && sessionToken)) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/register/", "/profile", "/home", "/about"],
};
