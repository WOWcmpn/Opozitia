import Image from "next/image";
import React, { useState } from "react";
import SearchIMG from "@/img/icons/search-black.svg";
import { SearchProps } from "@/types/types";
import { redirect } from "next/navigation";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export const Search = ({ onSearch }: SearchProps) => {
  const {replace} = useRouter();
  const [search, setSearch] = useState<string>();

  const toSearch = (e: any) => {
    e.preventDefault();
    if(!search) {
      replace(`/search?query=`)
    } else {
      replace(`/search?query=${search}`)
    }
  };
  return (
    <motion.div
      id="search"
      aria-hidden="true"
      className="popup popup__active popup__search"
      initial={{ scale: 0.4 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.6 }}
      transition={{ ease: "all", duration: 0 }}
    >
      <div className="popup__wrapper popup__wrapper_search">
        <div className="popup_show popup__content_search w-[800px] mt-[100px]">
          <form
            action="#"
            className="popup__search search-popup"
            onSubmit={toSearch}
          >
            <input
              autoComplete="off"
              type="text"
              name="form[]"
              placeholder=""
              className="search-popup__input"
              onChange={e => setSearch(e.target.value)}
            />
            <button
              type="submit"
              className="search-popup__button flex justify-center items-center"
            >
              <Image src={SearchIMG} alt="Icon" />
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};
