"use client";

import React from "react";
import { Select as SelectMenu, SelectItem } from "@nextui-org/react";

export const Select = () => {
  return (
    <div className="w-[280px] bg-white !border-[1px] !border-black border-solid rounded-[12px] text-black">
      <SelectMenu
        placeholder="За период"
        className="text-black "
        size="lg"
        variant="bordered"
      >
        <SelectItem key={1} value="1">
          За неделю
        </SelectItem>
        <SelectItem key={2} value="2">
          За месяц
        </SelectItem>
        <SelectItem key={3} value="3">
          За год
        </SelectItem>
        <SelectItem key={4} value="4">
          За все время
        </SelectItem>
      </SelectMenu>
    </div>
  );
};
