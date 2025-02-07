"use client";

import { use } from "react";
import { LegoSet as LegoSetType } from "@/lib/types";
import LegoSet from "@/components/lego-set";

export default function LegoSetsList({ legoSetsPromise }: { legoSetsPromise: Promise<LegoSetType[]> }) {
  const items = use(legoSetsPromise);
  return (
    <div className="grid grid-cols-1 gap-6">
      {items?.map((legoSet) => (
        <LegoSet key={legoSet.product_id} legoSet={legoSet} />
      ))}
    </div>
  );
}
