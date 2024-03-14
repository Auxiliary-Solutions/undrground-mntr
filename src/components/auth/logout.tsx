"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { destroySession } from "@/app/server/session";

export default function LogoutButton(props: ButtonProps) {
  const handleLogout = async () => {
    await destroySession();
  };
  return (
    <Button onClick={handleLogout} {...props}>
      Logout
    </Button>
  );
}
