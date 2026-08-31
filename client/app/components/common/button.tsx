import type { ReactNode } from "react";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { Link } from "react-router";

interface ButtonProps {
  path: string;
  name: string;
  showicon: boolean;
}

export default function CustomButton({ path, name, showicon }: ButtonProps) {
  return (
    <Link to={path} className="flex items-center justify-between gap-2 px-10 py-3 bg-p rounded-md border border-p text-white text-sm lg:text-base font-medium tracking-wider transition hover:bg-white hover:text-p ">
      {name}

      {showicon && (
        <HiOutlineArrowUpRight className="w-4 h-4 transition-transform  group-hover:rotate-45" strokeWidth={2} />
      )}

    </Link>

  );
}