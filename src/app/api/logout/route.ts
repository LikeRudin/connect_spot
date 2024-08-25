export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import getSession from "@/lib/session";

export const POST = async () => {
  const session = await getSession();

  session.destroy();
  console.log("로그아웃");

  return NextResponse.json({ message: "로그아웃 되었습니다." });
};
