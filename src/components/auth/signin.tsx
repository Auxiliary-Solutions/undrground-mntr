"use client";

import { useEffect, useState, useTransition } from "react";

import { BrowserProvider, getAddress } from "ethers";
import { SiweMessage } from "siwe";

import { setNonce, setSession } from "@/app/server/session";
import { LoaderButton } from "@/components/ui/loader-button";
import { siweMessageText } from "@/config/site";

export default function SignIn() {
  const [nonce, setNonceState] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const fetchNonce = async () => {
    try {
      const { nonce: nonceReq } = await setNonce();
      setNonceState(nonceReq);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNonce();
  }, []);

  const signIn = async () => {
    try {
      const providerObject = window.lukso || window.ethereum;
      const provider = new BrowserProvider(providerObject);
      const accounts = await provider
        .send("eth_requestAccounts", [])
        .catch(() => {
          return;
        });

      if (!provider || !accounts || !accounts[0]) return;

      const address = getAddress(accounts[0]);
      const chain = await provider.getNetwork();
      const chainId = Number(chain.chainId);

      if (!address || !chain || !provider) return;

      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: siweMessageText,
        uri: window.location.origin,
        version: "1",
        chainId,
        nonce,
        requestId: window.lukso ? "lukso" : "metamask",
      }).prepareMessage();

      const signer = await provider.getSigner();
      const signature = await signer.signMessage(message);
      const verify = await setSession(message, signature);
      if (!verify.status) {
        throw new Error("Verification failed");
      }
    } catch (error) {
      setNonceState(undefined);
      fetchNonce();
    }
  };

  const handleSignin = () => {
    startTransition(async () => {
      await signIn();
    });
  };

  return (
    <LoaderButton onClick={handleSignin} isLoading={isPending}>
      Sign In
    </LoaderButton>
  );
}
