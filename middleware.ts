import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  // const {pathname} = req.nextUrl
  // if (pathname.startsWith('/dashboard')) {
  //   if (!isLogged || user.role !== 'admin') {
  //     const url = new URL("/", req.url)
  //     return NextResponse.redirect(url)
  //   }
  // }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
