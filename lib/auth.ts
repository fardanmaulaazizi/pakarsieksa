"use server";

import { redirect } from "next/dist/server/api-utils";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function LogIn() {
  const cookieStore = await cookies();
  cookieStore.set("session", "true");
  return {
    redirect: {
      destination: "/",
    },
  };
}

export async function LogOut() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  return {
    redirect: {
      destination: "/",
    },
  };
}
