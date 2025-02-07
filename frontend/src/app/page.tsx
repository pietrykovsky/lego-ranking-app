import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { getLegoSets } from "@/lib/actions";
import LegoSetsList from "@/components/lego-sets-list";

export default function LegoRanking() {
  const legoSetsPromise = getLegoSets();

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">LEGO Set Ranking</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-3">
            {/* LEGO Sets */}
            <ErrorBoundary fallback={<div>Wystąpił błąd podczas ładowania zestawów LEGO</div>}>
              <Suspense
                fallback={
                  <div className="w-10 h-10 border-4 border-t-red-700 border-gray-300 rounded-full animate-spin" />
                }
              >
                <LegoSetsList legoSetsPromise={legoSetsPromise} />
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </div>
  );
}
