import React from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import classNames from "classnames";

const Navbar = () => {
  const pathname = usePathname();

  const menus = [
    {
      name: "Dashboard",
      link: "/dashboard",
    },
    {
      name: "Markets",
      link: "/markets",
    },
  ];

  return (
    <nav className="sticky top-0 z-20 flex h-[70px] w-full items-center justify-between border-b bg-background px-5 shadow-sm">
      <div className="flex items-center gap-2 font-medium">
        <Link href={"/"}>
          <Image
            src={"/logo/krono-finance-full.svg"}
            alt="Krono Finance"
            width={200}
            height={50}
            className="mr-4"
          />
        </Link>
        {menus.map((menu) => (
          <Link
            key={menu.name}
            href={menu.link}
            className={classNames(
              "mt-[5px] rounded-md px-3 py-1.5 hover:bg-primary-active hover:text-white",
              pathname === menu.link
                ? "bg-primary-active text-white"
                : "bg-transparent text-secondary",
            )}
          >
            {menu.name}
          </Link>
        ))}
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
