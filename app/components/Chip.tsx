import React from "react";
import avatar from "../assets/1.jpg";
import Image, { StaticImageData } from "next/image";
import { UserObject } from "../page";
import { CrossIcon, X } from "lucide-react";

interface ChipProps {
  selectedUser: UserObject;
  deleteChip: (val: UserObject) => void;
}

const Chip = ({ selectedUser, deleteChip }: ChipProps) => {
  return (
    <div className="flex items-center bg-gray-400 m-4 rounded-2xl h-7 max-w-64 p-1">
      <Image
        src={
          typeof selectedUser.avatar === "string"
            ? selectedUser.avatar
            : (selectedUser.avatar as StaticImageData)?.src
        }
        alt="avatar"
        className="rounded-full"
        height={20}
        width={20}
      />
      <h1 className="ml-2 text-sm">{selectedUser.name}</h1>
      <X
        className="ml-auto"
        onClick={() => deleteChip(selectedUser)}
        size={20}
      />
    </div>
  );
};

export default Chip;
