import ERC725 from "@erc725/erc725.js";
import { type ClassValue, clsx } from "clsx";
import { JsonRpcProvider, formatEther } from "ethers";
import { twMerge } from "tailwind-merge";
import lsp3 from "@erc725/erc725.js/schemas/LSP3ProfileMetadata.json";

export const mainnetRPC = "https://rpc.lukso.gateway.fm";
export const testnetRPC = "https://rpc.testnet.lukso.network";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getRpc = (chainId: number) => {
  return chainId === 42 ? mainnetRPC : testnetRPC;
};

export const isLSP3Profile = (
  value: any
): value is { LSP3Profile: Record<string, any> } => {
  return typeof value === "object" && "LSP3Profile" in value;
};

export const getLSP3Profile = async (address: string, chainId: number) => {
  const chainRPC = getRpc(chainId);
  const provider = new JsonRpcProvider(chainRPC);
  const balance = parseFloat(formatEther(await provider.getBalance(address)));

  const erc725js = new ERC725(lsp3, address, chainRPC, {
    ipfsGateway: "https://api.universalprofile.cloud/ipfs",
  });

  const { value } = await erc725js.fetchData("LSP3Profile");

  if (!value || !isLSP3Profile(value)) {
    return undefined;
  }

  const formattedData = {
    name: value.LSP3Profile.name as string,
    image:
      (value.LSP3Profile.profileImage[0]?.url.replace(
        "ipfs://",
        "https://api.universalprofile.cloud/ipfs/"
      ) as string) || undefined,
    bg_image:
      (value.LSP3Profile.backgroundImage[0]?.url.replace(
        "ipfs://",
        "https://api.universalprofile.cloud/ipfs/"
      ) as string) || undefined,
    address: address,
    balance: {
      amount: balance,
      currency: chainRPC === mainnetRPC ? "LYX" : "LYXt",
    },
    chainId,
    profile: "UP",
  };
  return formattedData;
};

export const getEOAProfile = async (address: string, chainId: number) => {
  const chainRPC = getRpc(chainId);
  const provider = new JsonRpcProvider(chainRPC);
  const balance = parseFloat(formatEther(await provider.getBalance(address)));

  return {
    name: "Anonymous",
    image: undefined,
    bg_image: undefined,
    address: address,
    balance: {
      amount: balance,
      currency: chainRPC === mainnetRPC ? "LYX" : "LYXt",
    },
    chainId,
    profile: "EOA",
  };
};
