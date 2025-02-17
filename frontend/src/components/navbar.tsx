"use client";

import { Fira_Code } from "next/font/google";
import Link from "next/link";

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export default function NavBar() {
  return (
    <nav className="w-full bg-[#c70000] z-10 shadow-md sticky top-0">
      <div className="flex justify-between lg:justify-around items-center px p-4 text-center">
        <h1 className={`${firaCode.className} font-semibold text-xl text-white`}>
          <Link href="https://pietrykovsky.com">pietrykovsky</Link>
        </h1>
        <button className="text-white font-bold lg:invisible">menu placeholder</button>
      </div>
    </nav>
  );
}
