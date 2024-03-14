import { getSession } from "@/app/server/session";
import { contractAddress, mintCost } from "@/config/site";
import { BrowserProvider, parseEther, toBigInt } from "ethers";
import { Contract } from "ethers";
import abi from "@/contracts/abis/myfaketoken.json";

export const mint = async (count: number) => {
  // implement minting
  try {
    // something like this
    const profile = await getSession();
    const browserProvider = window.lukso ?? window.ethereum;

    if (!profile || !browserProvider) {
      throw new Error("No profile found");
    }

    const mintTotal = (mintCost * count).toFixed(1);
    const formattedMintTotal = parseEther(`${mintTotal}`);
    const provider = new BrowserProvider(browserProvider);
    const signer = await provider.getSigner();
    const contract = new Contract(contractAddress, abi, signer);

    const tx = await contract.mint(toBigInt(count), {
      value: formattedMintTotal,
    });

    await tx.wait();

    const tokens = await contract.tokenIdsOf(profile.address);
    const newestToken = tokens[tokens.length - 1];

    return { status: true, tokenId: newestToken };
  } catch (error) {
    return { status: false, error: error };
  }
};
