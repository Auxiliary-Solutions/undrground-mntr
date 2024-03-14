"use client";

import { MintButtonPopup } from "./mint-button-popup";

const MinterTwo = ({ balance }: { balance: string }) => {
  return (
    <div className="min-w-[200px] grow flex flex-col bg-muted/40 backdrop-blur border p-4 rounded-lg">
      <h2 className="font-bold text-3xl">Or Go Minimal</h2>
      <div className="h-full min-h-10" />
      <MintButtonPopup balance={balance} />
    </div>
  );
};

export { MinterTwo };
