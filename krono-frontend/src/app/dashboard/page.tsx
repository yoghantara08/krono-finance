import React from "react";

import Button from "@/components/Button/Button";

const page = () => {
  return (
    <div className="flex gap-4">
      <div className="grid w-fit gap-4">
        <Button variant="primary">Connect Wallet</Button>
        <Button variant="secondary">Connect Wallet</Button>
      </div>
      <div className="grid w-fit gap-4">
        <Button variant="primary" disabled>
          Connect Wallet
        </Button>
        <Button variant="secondary" disabled>
          Connect Wallet
        </Button>
      </div>
    </div>
  );
};

export default page;
