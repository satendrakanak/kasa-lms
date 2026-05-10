"use client";

import { navbarItems } from "@/data/menu";
import NavbarItem from "@/components/header/navbar-item";

export const Navbar = () => {
  return (
    <nav className="relative flex items-center">
      <div className="flex flex-nowrap items-center justify-center gap-1.5 whitespace-nowrap xl:gap-2">
        {navbarItems.map((item) => (
          <NavbarItem key={item.label} item={item} />
        ))}
      </div>
    </nav>
  );
};
