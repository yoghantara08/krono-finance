import React from "react";

import Image from "next/image";

import { MailIcon, NewspaperIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="flex w-full justify-center px-4">
      <div className="flex w-full max-w-[1200px] flex-col items-center gap-4 py-4 md:mb-4 md:flex-row md:items-center md:justify-between md:border-t">
        <span className="order-2 text-sm md:order-1">
          © 2025 Krono Finance. All rights reserved.
        </span>

        <h2 className="hidden md:absolute md:left-1/2 md:block md:-translate-x-1/2">
          Krono Finance
        </h2>

        <div className="order-1 flex items-center gap-6 md:order-3">
          <Image
            src={"/images/x.svg"}
            width={24}
            height={24}
            alt="X"
            className="fill-white"
          />
          <MailIcon className="size-5 md:size-6" />
          <NewspaperIcon className="size-5 md:size-6" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
