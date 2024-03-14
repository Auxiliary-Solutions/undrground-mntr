"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "../ui/input";
import { useState } from "react";

const MinterInput = ({ className }: { className?: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [value, setValue] = useState(searchParams.get("count") || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchParams = new URLSearchParams(searchParams);
    setValue(e.target.value);
    if (e.target.value) {
      newSearchParams.set("count", e.target.value);
    } else {
      newSearchParams.delete("count");
    }
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  return (
    <Input
      type="number"
      value={value}
      onChange={handleChange}
      placeholder="Number of items..."
      className={className}
    />
  );
};

export { MinterInput };
