"use client";

import { mintCost } from "@/config/site";
import { Button } from "../ui/button";
import { MintedImage } from "./minted-image";
import { MinterInput } from "./minter-input";
import { MintButton } from "./mint-button";

const MinterOne = () => {
  return (
    <div className="w-full lg:w-2/3 flex flex-col sm:flex-row gap-4 bg-muted/40 backdrop-blur border p-4 rounded-lg">
      <div className="flex-col w-2/3">
        <h2 className="font-bold text-3xl">Maybe Theres Alot</h2>
        <p className="font-mono text-muted-foreground">
          To say and need room for a really captivating description with alot of
          text you&apos;d like to share about your project and what this project
          will mean for the holders and share about your vision and big ideas
          for the project. Then also make sure to let the buyer know that this
          is not to be considered financial advice and that they should do their
          own research and due diligence before purchasing.
        </p>
      </div>
      <div className="flex flex-col grow gap-4">
        <MintedImage className="shrink-0" />
        <div className="flex flex-row gap-4 justify-center">
          <div className="shrink-0 border rounded-lg px-4 grid place-content-center bg-background">
            <span>{`${mintCost} Per`}</span>
          </div>
          <MinterInput />
        </div>
        <MintButton />
      </div>
    </div>
  );
};

export { MinterOne };
