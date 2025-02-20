import React from "react";

import Image from "next/image";
import Link from "next/link";

import { MoveRightIcon } from "lucide-react";

import Button from "@/components/Button/Button";
import useWindowSize from "@/hooks/useWindowSize";

const LandingNavbar = () => {
  const { isMobile } = useWindowSize();

  return (
    <nav className="sticky top-0 z-20 flex h-[70px] w-full items-center justify-between border-b bg-background px-5 shadow-sm">
      <Link href={"/"}>
        <Image
          src={
            isMobile
              ? "/logo/krono-finance.svg"
              : "/logo/krono-finance-full.svg"
          }
          alt="Krono Finance"
          width={isMobile ? 110 : 200}
          height={isMobile ? 40 : 50}
          className="mr-4"
        />
      </Link>

      <Link href={"/markets"}>
        <Button className="h-11" variant="secondary">
          <div className="flex items-center gap-1">
            <span>Launch App</span>
            <MoveRightIcon className="mt-0.5 size-4 md:size-4" />
          </div>
        </Button>
      </Link>
    </nav>
  );
};

export default LandingNavbar;
