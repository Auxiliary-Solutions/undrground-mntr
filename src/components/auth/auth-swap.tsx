import { getSession } from "@/app/server/session";
import SignIn from "./signin";
import { Suspense } from "react";
import LogoutButton from "./logout";
import { LoaderButton } from "../ui/loader-button";

export default async function AuthSwap() {
  const profile = await getSession();

  return (
    <Suspense fallback={<LoaderButton isLoading>Loading...</LoaderButton>}>
      {profile ? <LogoutButton /> : <SignIn />}
    </Suspense>
  );
}
