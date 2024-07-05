import { NextResponse } from "next/server";

const privatePaths = ["/profile", "/cart"];
const authPaths = ["/login", "/register"];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("sessionToken");

  if (privatePaths.includes(pathname) && !sessionToken) {
    // Nếu người dùng truy cập vào trang private mà chưa đăng nhập, chuyển hướng đến trang login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (authPaths.includes(pathname) && sessionToken) {
    // Nếu người dùng đã đăng nhập nhưng cố gắng truy cập lại trang login hoặc register, chuyển hướng đến trang profile
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/profile",
    "/home",
    "/about",
    "/cart",
    // Thêm các đường dẫn khác tùy vào nhu cầu của ứng dụng
  ],
};
