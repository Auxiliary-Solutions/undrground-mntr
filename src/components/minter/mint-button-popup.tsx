"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { MintedImage } from "./minted-image";
import { MinterInput } from "./minter-input";
import { useSearchParams } from "next/navigation";
import { mintCost } from "@/config/site";
import { MintButton } from "./mint-button";

const MintButtonPopup = ({ balance }: { balance: string }) => {
  const searchParams = useSearchParams();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Mint</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[350px]">
        <div className="flex flex-col gap-4">
          <p className="font-mono text-muted-foreground">
            And just have a nice popup
          </p>
          <MintedImage />
          <div className="border-y py-2 flex flex-col gap-2">
            <div className="flex flex-row justify-between gap-4 items-center">
              <span className="text-sm shrink-0 text-muted-foreground">
                {`${mintCost} Per`}
              </span>
              <MinterInput />
            </div>
            <div className="flex flex-row justify-between gap-4 items-center">
              <span className="text-sm shrink-0 text-muted-foreground">
                Total
              </span>
              <span className="shrink-0">
                {parseInt(searchParams.get("count") ?? "0") * mintCost}
              </span>
            </div>
            <div className="flex flex-row justify-between gap-4 items-center">
              <span className="text-sm shrink-0 text-muted-foreground">
                Balance
              </span>
              <span className="shrink-0">{balance}</span>
            </div>
          </div>
          <MintButton />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { MintButtonPopup };
