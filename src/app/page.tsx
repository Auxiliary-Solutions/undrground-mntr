import { MinterOne } from "@/components/minter/minter-one";
import { MinterTwo } from "@/components/minter/minter-two";
import { getSession } from "@/app/server/session";
import Link from "next/link";

export default async function Home() {
  const profile = await getSession();
  
  return (
    <section className="container mx-auto flex flex-col">
      <h1 className="font-bold text-3xl">This is MNTR</h1>
      <p className="font-mono text-muted-foreground">
        <span>Your minting boilerplate for the</span>
        <Link
          href="https://docs.lukso.tech/"
          className="hover:opacity-80 transition-opacity px-2 font-bold bg-gradient-to-r from-pink-400 to-pink-600 text-transparent bg-clip-text"
        >
          LUKSO
        </Link>
        <span>
          ecosystem. This boilerplate comes with session based authentication,
          easy to theme and customize ui components using
        </span>
        <Link
          href="https://docs.lukso.tech/"
          className="hover:opacity-80 transition-opacity px-2 font-bold bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text"
        >
          Shadcn UI
        </Link>
        <span>and uses the full power of the</span>
        <Link
          href="https://docs.lukso.tech/"
          className="hover:opacity-80 transition-opacity px-2 font-bold bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text"
        >
          Next.js App Router.
        </Link>
        <span>
          Your auth session is encrypted and stored in the browsers cookies and
          uses a unique nonce for each login to prevent replay attacks and can
          only be verified and retrieved safely on the server.
        </span>
      </p>
      <div className="h-4" />
      <p className="font-mono text-muted-foreground">
        The minting functionality built into this boilerplate works with
        standard LSP8 tokens but requires you to implement your specific
        contracts minting needs. The boilerplate comes with a pre-configured
        LSP8 contract and a minting function that you can use as a starting
        point.
      </p>
      <div className="h-4" />
      <div className="flex flex-col lg:flex-row gap-4 w-full">
        <MinterOne />
        <MinterTwo
          balance={`${profile?.balance.amount.toFixed(2)} ${
            profile?.balance.currency
          }`}
        />
      </div>
    </section>
  );
}
