import React from "react";

import classNames from "classnames";

export const ASSET_COLUMNS = {
  ASSET: { width: "20%", title: "Asset" },
  TOTAL_SUPPLIED: { width: "15%", title: "Total Supplied" },
  SUPPLY_APY: { width: "15%", title: "Supply APY" },
  TOTAL_BORROWED: { width: "15%", title: "Total Borrowed" },
  BORROW_APY: { width: "15%", title: "Borrow APY" },
  ACTIONS: { width: "20%", title: "" },
} as const;

const AssetHeader = () => {
  return (
    <div className="flex rounded-lg border bg-surface px-5 py-3">
      {Object.values(ASSET_COLUMNS).map(({ title, width }) => (
        <p
          key={title}
          className={classNames(
            "text-center text-sm text-secondary first:text-start",
          )}
          style={{ width }}
        >
          {title}
        </p>
      ))}
    </div>
  );
};

export default AssetHeader;
