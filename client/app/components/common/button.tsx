import type { ReactNode } from "react";

interface ButtonProps {
  path: string;
  children: ReactNode;
}

export default function CustomButton({ path, children }: ButtonProps) {
  return (
    <a
      href={path}
      className="inline-block mt-6 px-6 py-3 bg-blue hover:bg-[#1f82bd] text-white font-medium text-sm md:text-base rounded-lg transition-all duration-200 shadow-md"
    >
      {children}
    </a>
  );
}