"use client";

import { useEffect, useState } from "react";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { BrowserProvider } from "ethers";

import { destroySession, getSession } from "@/app/server/session";
import { AlertCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const NetworkLock = ({
  mainnet = false,
  testnet = false,
}: {
  mainnet?: boolean;
  testnet?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [check, setCheck] = useState("extension");
  const descriptions = {
    sessionMatchWalletError:
      "Your extension is not connected to the same network as your session, please logout and back in with your new wallet or change your extension back to this account. And refresh.",
    mainnetExtenstionError:
      "This application is only available on mainnet, please change to mainnet in your extension and refresh.",
    testnetExtenstionError:
      "This application is only available on testnet, please change to testnet in your extension and refresh.",
    mainnetSessionError:
      "This application is only available on mainnet, you are currently logged into a testnet account, please log into a mainnet account and refresh.",
    testnetSessionError:
      "This application is only available on testnet, you are currently logged into a mainnet account, please log into a testnet account and refresh.",
  };

  useEffect(() => {
    const check = async () => {
      const profile = await getSession();
      const provider = new BrowserProvider(window.lukso);
      const network = await provider.getNetwork();
      const chainId = Number(network.chainId);

      if (provider) {
        if (mainnet && chainId !== 42) {
          setCheck("extension");
          setOpen(true);
        }

        if (testnet && chainId !== 4201) {
          setCheck("extension");
          setOpen(true);
        }
      }

      if (profile) {
        if (mainnet && profile.chainId !== 42) {
          setCheck("session");
          setOpen(true);
        }
        if (testnet && profile.chainId !== 4201) {
          setCheck("session");
          setOpen(true);
        }
      }

      if (provider && profile) {
        if (profile.chainId !== chainId) {
          setCheck("mismatch");
          setOpen(true);
        }
      }
    };

    check();
  }, [mainnet, testnet]);

  const handleLogout = async () => {
    setOpen(false);
    await destroySession();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(prev) => {
        setOpen(!prev);
      }}
    >
      <DialogContent className="overflow-x-hidden p-0">
        <div className="relative flex h-64 flex-col">
          <div className="z-10 flex h-full flex-col items-start p-6">
            <div className="flex flex-row items-center gap-2 ">
              <AlertCircleIcon className="h-6 w-6 stroke-[3px] " />
              <h1 className="text-2xl font-semibold">
                You have a network mismatch
              </h1>
            </div>
            <p className="font-mono text-muted-foreground">
              {mainnet && check === "extension"
                ? descriptions.mainnetExtenstionError
                : testnet && check === "extension"
                ? descriptions.testnetExtenstionError
                : mainnet && check === "session"
                ? descriptions.mainnetSessionError
                : testnet && check === "session"
                ? descriptions.testnetSessionError
                : check === "mismatch"
                ? descriptions.sessionMatchWalletError
                : "Please refresh the page."}
            </p>
            <div className="h-full" />
            {check === "session" ||
              (check === "mismatch" && (
                <Button
                  onClick={handleLogout}
                  className="shrink-0"
                  variant="default"
                >
                  Logout
                </Button>
              ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { NetworkLock };
