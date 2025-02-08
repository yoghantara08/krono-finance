"use client";
import React, { useState } from "react";

import Link from "next/link";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { MenuIcon, X } from "lucide-react";

import Drawer from "../Drawer/Drawer";

const MobileNavbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-20 flex h-16 w-full items-center justify-between bg-white px-3 text-black shadow-sm">
      <h1>Krono Finance</h1>
      <div className="flex items-center gap-2">
        <ConnectButton
          showBalance={false}
          accountStatus={"address"}
          chainStatus={"icon"}
        />
        <MenuIcon onClick={() => setOpen(true)} />
      </div>

      <Drawer
        isOpen={open}
        onClose={() => setOpen(false)}
        position="right"
        size="full"
        className="text-black"
      >
        <h1>Krono Finance</h1>
        <div>
          <Link href="/earn">Earn</Link>
          <Link href="/farming">Farming</Link>
        </div>
        <X className="absolute right-4 top-5" onClick={() => setOpen(false)} />
      </Drawer>
    </nav>
  );
};

export default MobileNavbar;
