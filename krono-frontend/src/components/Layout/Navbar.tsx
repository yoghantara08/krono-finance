import React from "react";

import Link from "next/link";

import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-20 flex h-20 w-full items-center justify-between bg-white px-5 text-black shadow-sm">
      <h1>Krono Finance</h1>
      <div>
        <Link href="/dashboard" className="p-4">
          Dashboard
        </Link>
        <Link href="/markets" className="p-4">
          Markets
        </Link>
      </div>
      <ConnectButton
        showBalance={false}
        accountStatus={"address"}
        chainStatus={"icon"}
      />
    </nav>
  );
};

export default Navbar;
