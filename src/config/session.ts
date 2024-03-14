"server only";
// This file should only imported accessed on server

import type { SessionOptions } from "iron-session";
import type { SiweMessage } from "siwe";
import { env } from "@/env";

// Dont need to edit
export interface SessionData {
  nonce?: string;
  siwe?: SiweMessage;
}

// Dont need to edit
export const defaultSession: SessionData = {
  nonce: undefined,
  siwe: undefined,
};

// Only edit this if you want to change the session options
export const sessionOptions: SessionOptions = {
  password: env.SESSION_PASS,
  cookieName: "session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    // 12 hours in seconds
    tss: 12 * 60 * 60,
    maxAge: 12 * 60 * 60 === 0 ? 2147483647 : 12 * 60 * 60,
  },
};
