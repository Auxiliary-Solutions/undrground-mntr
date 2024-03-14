"use server";

import { getEOAProfile, getLSP3Profile, getRpc } from "@/lib/utils";
import { Contract } from "ethers";
import { JsonRpcProvider, hashMessage } from "ethers";
import { SiweMessage, generateNonce } from "siwe";
import universalprofile from "@/contracts/abis/universalprofile.json";
import { cookies } from "next/headers";
import { sessionOptions, type SessionData } from "@/config/session";
import { getIronSession } from "iron-session";
import { revalidatePath } from "next/cache";

const verifySiwe = async (
  message: string,
  signature: string,
  nonce: string
): Promise<{
  status: boolean;
  error?: any;
  siwe?: SiweMessage;
}> => {
  // convert back to SiweMessage
  const siwe = new SiweMessage(message);
  const chainRPC = getRpc(siwe.chainId);
  const provider = new JsonRpcProvider(chainRPC);
  const wallet = siwe.requestId;
  // error if nonce is invalid
  if (siwe.nonce !== nonce) {
    return { status: false, error: "Not Authorized" };
  }

  if (wallet === "lukso") {
    try {
      // verify universal profile signature
      const hashedMessage = hashMessage(siwe.prepareMessage());
      const universalProfile = new Contract(
        siwe.address,
        universalprofile,
        provider
      );

      const isValidSignature = universalProfile.getFunction("isValidSignature");
      const callFunction = await isValidSignature(hashedMessage, signature);

      if (callFunction !== "0x1626ba7e") {
        return { status: false, error: "Not Authorized" };
      }

      return { status: true, siwe };
    } catch (error) {
      return { status: false, error };
    }
  }

  // verify ethers signature
  else {
    try {
      await siwe.verify({
        signature,
        nonce,
      });

      return { status: true, siwe };
    } catch (error) {
      return { status: false, error };
    }
  }
};

export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  if (!session.siwe) {
    return undefined;
  }

  let profile;
  if (session.siwe.requestId === "lukso") {
    profile = await getLSP3Profile(session.siwe.address, session.siwe.chainId);
  } else {
    profile = await getEOAProfile(session.siwe.address, session.siwe.chainId);
  }

  return profile;
};

export const setSession = async (siwe: string, signature: string) => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  const verify = await verifySiwe(siwe, signature, session.nonce as string);

  if (!verify.status) {
    return { status: false, error: verify.error };
  }

  session.siwe = verify.siwe;
  await session.save();
  return { status: true };
};

export const destroySession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  session.destroy();
};

export const setNonce = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  session.nonce = generateNonce();
  await session.save();
  return { nonce: session.nonce };
};
