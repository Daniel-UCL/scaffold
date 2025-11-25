// src/lib/getServerAuthSession.ts
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export function getServerAuthSession() {
  return getServerSession(authOptions);
}
