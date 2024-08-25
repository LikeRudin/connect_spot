import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import getSession from "@/lib/session";

export async function middleware(request: NextRequest) {
  const session = await getSession();

  if (!session.id) {
    if (
      request.nextUrl.pathname === "/home" ||
      request.nextUrl.pathname === "/"
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}
