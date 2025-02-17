"use client";

export default function TopSection() {
  return (
    <header className="relative w-full overflow-hidden">
      <div className="absolute inset-0 w-full h-full top-section" />

      <div className="relative max-w-6xl mx-auto px-8 py-16">
        <div className="max-w-2xl">
          <h1 className="text-7xl uppercase font-bold text-white mb-6">Lego Ranking</h1>
          <p className="text-2xl uppercase font-bold text-amber-200">
            Sprawdź zestawy LEGO, które są najbardziej opłacalne według ceny za klocek.
          </p>
        </div>
      </div>

      <svg
        preserveAspectRatio="none"
        viewBox="0 0 1200 120"
        xmlns="http://www.w3.org/2000/svg"
        className="fill-amber-200 w-full h-[25px] rotate-180"
      >
        <path d="M321.39 56.44c58-10.79 114.16-30.13 172-41.86 82.39-16.72 168.19-17.73 250.45-.39C823.78 31 906.67 72 985.66 92.83c70.05 18.48 146.53 26.09 214.34 3V0H0v27.35a600.21 600.21 0 00321.39 29.09z" />
      </svg>
    </header>
  );
}
