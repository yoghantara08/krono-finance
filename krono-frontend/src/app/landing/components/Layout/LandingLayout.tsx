"use client";
import React, { ReactNode } from "react";

import classNames from "classnames";

import Footer from "@/components/Layout/Footer";

import LandingNavbar from "./LandingNavbar";

interface LayoutWrapperProps {
  children: ReactNode;
  className?: string;
}

const LandingLayout = ({ children, className }: LayoutWrapperProps) => {
  return (
    <div className="h-full w-full">
      <div
        className={classNames(
          "relative mx-auto grid min-h-screen w-full",
          // "auto" is for the main tag
          // add "max-content" to the "grid-rows" class below for each div if want to add more "static" elements
          "grid-rows-[max-content_auto_max-content]",
        )}
      >
        <LandingNavbar />
        <div className="flex w-full justify-center">
          <main className={classNames("w-full", className)}>{children}</main>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default LandingLayout;
