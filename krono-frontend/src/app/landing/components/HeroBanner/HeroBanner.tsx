import React from "react";

import Link from "next/link";

import { MoveRightIcon } from "lucide-react";

import Button from "@/components/Button/Button";

const HeroBanner = () => {
  return (
    <section className="flex flex-col items-center justify-center px-3 py-7 text-center md:px-4 md:py-9 lg:py-24">
      <div className="text-2xl font-bold sm:space-y-1 sm:text-4xl md:space-y-2 lg:text-6xl">
        <h1 className="text-[#f1f1f1]">The Future of Finance</h1>
        <h1 className="text-primary-hover">Lend & Borrow with Krono</h1>
      </div>
      <div className="mt-2 max-w-[400px] text-xs text-secondary sm:max-w-[500px] sm:text-sm md:mt-5 md:max-w-[700px] md:text-base">
        <p>
          Krono Finance is a Lending Borrow Protocol built on the Manta Network,
          offering a secure, efficient, and user-friendly decentralized finance
          solution.
        </p>
      </div>
      <Link href={"/markets"}>
        <Button className="mt-6 font-semibold md:mt-8 md:w-[200px] md:!text-lg">
          <div className="flex items-center gap-1">
            <span>Launch App</span>
            <MoveRightIcon size={20} className="mt-0.5" />
          </div>
        </Button>
      </Link>
    </section>
  );
};

export default HeroBanner;
