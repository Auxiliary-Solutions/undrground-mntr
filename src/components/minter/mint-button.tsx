"use client";

import { useTransition } from "react";
import { LoaderButton } from "../ui/loader-button";
import { mint } from "@/lib/mint";
import { useSearchParams } from "next/navigation";

const MintButton = () => {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();

  const handleClick = () => {
    startTransition(async () => {
      const count = parseInt(searchParams.get("count") ?? "0");
      if (count === 0) return;
      const req = await mint(count);
      console.log(req);
    });
  };

  return (
    <LoaderButton isLoading={isPending} onClick={handleClick}>
      Mint
    </LoaderButton>
  );
};

export { MintButton };
