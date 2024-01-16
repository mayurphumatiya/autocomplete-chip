"use client";

import { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import avatar1 from "./assets/1.jpg";
import avatar2 from "./assets/2.jpg";
import avatar3 from "./assets/3.jpg";
import avatar4 from "./assets/4.jpg";
import avatar5 from "./assets/5.jpg";
import Chip from "./components/Chip";

export interface UserObject {
  id?: string;
  name?: string;
  avatar?: string | StaticImageData;
}

const users = [
  { id: "a1", name: "Mayur", avatar: avatar1 },
  { id: "a2", name: "Surya", avatar: avatar2 },
  { id: "a3", name: "Sakshi", avatar: avatar3 },
  { id: "a4", name: "Pooja", avatar: avatar4 },
  { id: "a5", name: "Kabir", avatar: avatar5 },
];

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [focusInput, setFocusInput] = useState(false);
  const [showSelectedChip, setShowSelectedChip] = useState<UserObject[]>([]);
  const [listChip, setListChip] = useState<UserObject[]>(users);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    const filterList = listChip.filter((user: UserObject) =>
      user.name?.toLowerCase().startsWith(e.target.value.toLowerCase())
    );

    setListChip(filterList);
  };

  const deleteChip = (selectedChip: UserObject) => {
    setShowSelectedChip(
      showSelectedChip.filter((x) => selectedChip.id !== x.id)
    );
    setListChip([...listChip, selectedChip]);
  };

  const handleListClick = (userObj: UserObject) => {
    setShowSelectedChip((prevObj) => [...prevObj, userObj]);
    const filtered = listChip.filter((x) => x.id !== userObj.id);
    setInputValue("");
    setListChip(filtered);
  };

  return (
    <div className="text-4xl text-center pt-4 w-screen h-screen">
      <h1 className="pb-6">PICK USERS</h1>
      <div className="flex flex-col items-center m-auto w-3/4 h-3/4 border  bg-red-400 relative">
        <div>
          <div className="flex w-80 flex-wrap">
            {showSelectedChip.map((chip) => (
              <Chip key={chip.id} selectedUser={chip} deleteChip={deleteChip} />
            ))}
          </div>
          <input
            className="w-80 border-b-2 h-10 border-black bg-red-400 placeholder:text-gray-700  font-sans text-lg"
            onFocus={() => setFocusInput(true)}
            onChange={handleChange}
            value={inputValue}
            placeholder="Search Users..."
          />
        </div>
        <ul className="top-20 left-0 w-80 bg-white mt-1 text-2xl">
          {focusInput &&
            listChip.map((elem) => (
              <li
                key={elem.id}
                onClick={() => handleListClick(elem)}
                className="flex items-center h-10 p-2 hover:bg-slate-300"
              >
                <Image
                  src={
                    typeof elem.avatar === "string"
                      ? elem.avatar
                      : (elem.avatar as StaticImageData)?.src
                  }
                  alt="avatar"
                  className="rounded-full"
                  height={30}
                  width={30}
                />
                <p className="ml-4">{elem.name}</p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
