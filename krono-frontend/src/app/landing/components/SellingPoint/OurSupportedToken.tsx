import React from "react";

import Image from "next/image";
import Link from "next/link";

import { MoveRightIcon } from "lucide-react";

import Button from "@/components/Button/Button";
import { ASSET_LIST } from "@/constant";

const OurSupportedToken = () => {
  return (
    <section className="flex w-full justify-center">
      <div className="mx-3 flex w-full max-w-[1200px] flex-col items-center space-y-6 pb-10">
        <h1 className="text-center text-4xl font-semibold">
          Our <span className="text-primary-hover">Supported</span> Tokens
        </h1>
        <div className="w-full max-w-[800px] rounded-xl border bg-surface p-6">
          <div className="flex w-full items-center gap-3 text-lg font-medium">
            <span className="w-[33%] text-lg md:text-xl">Token</span>
            <span className="w-[30%] text-center text-lg">APY</span>
            <span className="w-[36%]"></span>
          </div>
          {Object.values(ASSET_LIST).map((asset) => (
            <div
              key={asset.symbol}
              className="mt-5 flex items-center gap-3 border-b pb-4 text-lg text-secondary last:border-b-0 last:pb-0 md:mt-7"
            >
              <div className="flex w-[33%] items-center gap-2 md:gap-4">
                <Image
                  src={asset.image}
                  alt={asset.name}
                  width={54}
                  height={54}
                  className="size-[36px] rounded-full md:size-[54px]"
                />
                <p className="text-base md:text-lg">{asset.symbol}</p>
              </div>
              <div className="w-[30%] text-center text-sm sm:text-base md:text-lg">
                6%
              </div>
              <Link
                href={"/markets"}
                className="flex w-[36%] cursor-pointer items-center justify-end gap-2 text-end text-xs hover:text-white md:text-sm lg:text-lg"
              >
                Start Earning{" "}
                <MoveRightIcon className="mt-0.5 size-4 md:size-5" />
              </Link>
            </div>
          ))}
        </div>

        <Link href={"/markets"}>
          <Button className="md:w-[300px]">
            <div className="flex items-center gap-1">
              <span>Start Earning with Krono</span>
              <MoveRightIcon size={20} className="mt-0.5" />
            </div>
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default OurSupportedToken;
