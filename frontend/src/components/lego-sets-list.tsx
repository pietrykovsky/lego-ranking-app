"use client";

import { LegoSet as LegoSetType } from "@/lib/types";
import LegoSet from "@/components/lego-set";
import Loading from "./loading";

function Items({ items }: { items: LegoSetType[] }) {
  if (items.length === 0) {
    return null;
  }
  return items.map((item) => <LegoSet key={item.product_id} legoSet={item} />);
}

export default function LegoSetsList({ legoSets, isLoading }: { legoSets: LegoSetType[]; isLoading: boolean }) {
  return (
    <div className="grid grid-cols-1 gap-6 justify-center">{isLoading ? <Loading /> : <Items items={legoSets} />}</div>
  );
}
