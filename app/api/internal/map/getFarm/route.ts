import { API_URL } from "@/configs/appRoute";
import { NextResponse } from "next/server";
import { fetchServer } from "@/lib/fetchServer";

export const GET = async () => {
  const res = await fetchServer(API_URL.getFarm, {
    method: "GET",
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  return NextResponse.json(data);
};
