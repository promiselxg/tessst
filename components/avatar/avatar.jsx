import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const UserAvatar = ({ username, url }) => {
  return (
    <Avatar>
      <AvatarImage src={url ?? "https://github.com/shadcn.png"} />
      <AvatarFallback>{username?.slice(0, 2)}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
