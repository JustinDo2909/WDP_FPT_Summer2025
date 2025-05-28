"use client";

import Link from "next/link";
import { map } from "lodash";
import { ShoppingBag, User } from "lucide-react";
import React from "react";

interface Header {
  title: string;
  href: string;
}

interface HeaderMenuProps {
  headers: Header[];
}

const HeaderMenu = ({ headers }: HeaderMenuProps) => {
  return (
    <div className="self-stretch px-12 bg-white border-b shadow-md inline-flex justify-between items-center">
      <Link
        href="/"
        className="w-64 inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden"
      >
        LOGO!
      </Link>
      <div className="py-2.5 flex justify-start items-center gap-3">
        {map(headers, (header: Header, index: number) => (
          <div key={index} className="flex items-center">
            <Link
              href={header.href}
              className="px-7 py-2 relative flex justify-center items-center gap-2.5 overflow-hidden rounded-sm
               after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 
               after:h-[2px] after:w-0 after:bg-[#ffc6c6] after:transition-all after:duration-300    
               hover:after:w-full"
            >
              {header.title}
            </Link>
            {index < headers.length - 1 && (
              <div className="w-px h-6 bg-gray-300 mx-3" />
            )}
          </div>
        ))}

        <button className="p-2.5 bg-zinc-800 rounded-[50px] flex justify-center items-center gap-2.5 overflow-hidden">
          <span className="justify-start text-white text-sm font-bold font-['Inter']">
            AI Chatbot
          </span>
        </button>
      </div>

      <div className="flex justify-start items-center gap-7 overflow-hidden">
        <Link
          href="/cart"
          className="flex p-2 justify-center items-center gap-2.5 overflow-hidden rounded-full
        hover:bg-[#ffc6c6] transition-all hover:cursor-pointer"
        >
          <ShoppingBag size={20} />
        </Link>
        <div className="devider w-px h-6 bg-gray-300" />
        <Link
          href="/login"
          className="flex justify-center items-center gap-2.5 overflow-hidden hover:cursor-pointer"
        >
          <span className="px-2 py-1.5 rounded-[10px] flex justify-center items-center gap-2.5 overflow-hidden">
            <User size={20} />
          </span>
          <div className="justify-start text-black text-sm font-normal font-['Inter']">
            Sign in
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HeaderMenu;
