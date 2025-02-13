import React from "react";

import Assets from "./components/Assets/Assets";
import MarketOverview from "./components/MarketOverview/MarketOverview";

const MarketsPage = () => {
  return (
    <div className="space-y-6 md:space-y-8">
      <MarketOverview />
      <Assets />
    </div>
  );
};

export default MarketsPage;
