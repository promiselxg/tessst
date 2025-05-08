"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/authProvider";
import { IdCard, LogOut, Settings } from "lucide-react";
import React from "react";
import { FiHome } from "react-icons/fi";

const CourseHeaderUserAvatar = () => {
  const { user, logoutUser } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer border-none outline-none ">
        <div className="w-full border-[3px] border-[green] h-full flex items-center justify-center rounded-full p-[2px]">
          <Avatar className="cursor-pointer border-none outline-none ">
            <AvatarImage
              src={user?.avatar || "https://github.com/shadcn.png"}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        <DropdownMenuLabel>
          <div className="w-full">
            <h1 className="text-sm capitalize">{user?.username}</h1>
            <p className="text-sm font-[400] text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <div className="w-full flex items-center gap-2 text-sm cursor-pointer">
            <FiHome className="w-4 h-4" />
            Home
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="w-full flex items-center gap-2 text-sm cursor-pointer">
            <Settings className="w-4 h-4" />
            Setting
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="w-full flex items-center gap-2 text-sm cursor-pointer">
            <IdCard className="w-4 h-4" />
            Billing &amp; subscription
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <div
            className="w-full flex items-center gap-2 text-sm cursor-pointer"
            onClick={() => logoutUser()}
          >
            <LogOut className="w-4 h-4" />
            Log out
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CourseHeaderUserAvatar;
