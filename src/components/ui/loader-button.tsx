import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "./button";
import { Loader2 } from "lucide-react";
import { type ReactNode } from "react";

const LoaderButton = ({
  isLoading,
  children,
  ...props
}: ButtonProps & {
  isLoading: boolean;
  children: ReactNode;
}) => {
  return (
    <Button
      className={cn("flex gap-2 grow items-center", props.className)}
      disabled={isLoading}
      {...props}
    >
      <>
        {isLoading && <Loader2 className="size-5 animate-spin" />}
        {children}
      </>
    </Button>
  );
};

export { LoaderButton };
