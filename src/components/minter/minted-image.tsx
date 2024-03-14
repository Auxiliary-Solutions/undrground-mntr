import { cn } from "@/lib/utils";
import Image from "next/image";

const MintedImage = ({
  image,
  className,
}: {
  image?: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "aspect-square rounded-lg relative bg-muted overflow-hidden",
        className
      )}
    >
      <Image
        src={image ? image : "/placeholder.png"}
        alt=""
        width={500}
        height={500}
        className="absolute object-cover inset-0 w-full h-full"
      />
    </div>
  );
};

export { MintedImage };
