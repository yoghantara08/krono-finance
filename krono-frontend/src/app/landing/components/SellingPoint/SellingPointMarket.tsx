import React from "react";

import Image from "next/image";

import Button from "@/components/Button/Button";

const SellingPointMarket = () => {
  return (
    <section className="my-16 mb-12 flex w-full justify-center md:mb-20">
      <div className="mx-3 flex w-full max-w-[1000px] flex-col items-center justify-center gap-16 md:flex-row">
        <div className="-mt-10 flex flex-col gap-6 text-secondary">
          <div className="text-center text-3xl font-medium md:text-start md:text-4xl lg:text-5xl">
            <h3>Choose the side</h3>
            <h3>
              that <span className="text-white">suits your</span>
            </h3>
          </div>
          <div className="w-[310px] space-y-2 rounded-lg border bg-surface px-4 py-3 font-light">
            <p>
              Deposit your crypto into our lending platform and watch it grow
              with competitive interest rates.
            </p>
            <Button className="h-8 w-full text-white md:w-[120px]">Lend</Button>
          </div>
          <div className="w-[310px] space-y-2 rounded-lg border bg-surface px-4 py-3 font-light">
            <p>
              Unlock liquidity without selling your crypto by using it as
              collateral to maximize your profit.
            </p>
            <Button className="h-8 w-full text-white md:w-[120px]">
              Borrow
            </Button>
          </div>
        </div>
        <div>
          <Image
            src={"/illustration.png"}
            height={600}
            width={440}
            alt="illust"
          />
        </div>
      </div>
    </section>
  );
};

export default SellingPointMarket;
