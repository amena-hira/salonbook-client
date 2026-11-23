import { NextResponse } from "next/server";
import { auth } from "./lib/auth";

// This function can be marked `async` if using `await` inside
export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });
  const user = session?.user;

  if (!user) {
    const loginUrl = new URL("/sign-in", request.url);
    loginUrl.searchParams.set(
      "redirectTo",
      `${request.nextUrl.pathname}${request.nextUrl.search}`,
    );
    return NextResponse.redirect(loginUrl);
  }

  if (user.isBlocked === true || user.isBlocked === "true") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/dashboard/admin") && user.role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname.startsWith("/dashboard/customer") && user.role !== "customer") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/services/:id",
    "/checkout",
    "/dashboard/:path*",
  ],
};
