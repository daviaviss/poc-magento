"use client";
import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import useDevice from "@/hooks/useDevice";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";

interface IHeader {
  logo: {
    src: any;
    alt: string;
    width: number | `${number}`;
    height: number | `${number}`;
  };
  links?: {
    url: string;
    label: string;
    type?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  }[];
}

export function Header({ logo, links }: IHeader) {
  const { isMobile } = useDevice();

  return (
    <header className="header max-h-28 h-full py-6">
      <div className="header-container container flex items-center justify-between">
        <div className="flex items-center">
          <Image {...logo} priority className="header-logo" />
          <div className="flex items-center ml-6 gap-6">
            {links?.map((link) => {
              const { url, label, type } = link;
              return (
                <Button key={url} variant={type} asChild>
                  <Link href={url}>{label}</Link>
                </Button>
              );
            })}
          </div>
        </div>

        {!isMobile && (
          <div className="flex items-center space-x-6">
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="search" placeholder="Encontre um produto" />
              <Button type="submit">Buscar</Button>
            </div>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        )}

        {isMobile && (
          <div className="header-links header-links__mobile">
            <DropdownMenu>
              <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
              <DropdownMenuContent>
                {links?.map((link) => {
                  const { url, label } = link;
                  return (
                    <DropdownMenuItem key={url}>
                      <Button variant="ghost" asChild>
                        <Link href={url}>{label}</Link>
                      </Button>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </header>
  );
}
