import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Stethoscope } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        {/* Brand */}
        <Link className="flex items-center space-x-2" href="/">
          {/* Medical Icon */}
          <span className="inline-flex items-center justify-center rounded-full bg-blue-100 p-2 mr-2">
            <Stethoscope className="h-6 w-6 text-blue-600" />
          </span>
          <span className="font-extrabold text-xl text-blue-800 tracking-tight">MediBot</span>
        </Link>
        {/* Navigation (none for now) */}
    
      </div>
    </header>
  );
};

export default Header;
