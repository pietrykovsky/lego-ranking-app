import { LegoSet as LegoSetType } from "@/lib/types";

export default function LegoSet({ legoSet }: { legoSet: LegoSetType }) {
  return (
    <div className="w-full overflow-hidden rounded-xl bg-white shadow-md hover:shadow-lg transition-all">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div>
          <img className="w-full" src={legoSet.img ?? ""} alt={legoSet.title} />
        </div>
        <div className="p-4">
          <div className="flex gap-2 flex-wrap">
            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
              {legoSet.theme.name}
            </span>
            <span className="text-sm font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
              {legoSet.age.name}
            </span>
            <span
              className={`text-sm font-medium px-2 py-0.5 rounded-full ${
                legoSet.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
            >
              {legoSet.available ? "Dostępny" : "Wyprzedany"}
            </span>
          </div>

          <a
            href={legoSet.link}
            className="mt-2 block text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
          >
            {legoSet.title}
          </a>

          <div className="mt-4 grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
            <div className="flex items-center text-gray-700">
              <span className="font-medium">{legoSet.price} zł</span>
            </div>
            <div className="flex items-center text-gray-700">
              <span>{legoSet.elements} elementów</span>
            </div>
            <div className="flex items-center text-gray-700">
              <span>{legoSet.price_per_element} zł/klocek</span>
            </div>
            <div className="flex items-center text-gray-700">
              <span>{legoSet.minifigures ?? 0} minifigurek</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
