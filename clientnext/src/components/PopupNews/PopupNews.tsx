import Image from "next/image";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Logo from "@/img/logo.png";
import UploadFile from "@/img/icons/uploadfile.svg";
import ImageFile from "@/img/icons/imagefile.png";
import { AccountPopupProps } from "@/types/types";
import { Select as SelectMenu, SelectItem } from "@nextui-org/react";
import Link from "next/link";

export const PopupNews = ({ onClick }: AccountPopupProps) => {
  const [option, setOption] = useState(0);
  const file = useRef<HTMLInputElement>(null);
  const popup = () => {
    onClick(0);
  };
  console.log(file.current);
  return (
    <motion.div
      id="popup-vote"
      className="popup popup__active"
      initial={{ scale: 0.4 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.6 }}
      transition={{ ease: "all", duration: 0 }}
    >
      <div className="popup__wrapper">
        <div className=" popup_show popup__content_vote content-popup !px-[80px] !pt-[30px] !pb-[5px]">
          <div className="popup__top  !w-[100%]">
            <Link href="#" className="popup__logo">
              <picture>
                <source srcSet="img/logo.webp" type="image/webp" />
                <Image src={Logo} alt="Logo" height={38} />
              </picture>
            </Link>
            <button
              data-close
              type="button"
              className="popup__close"
              onClick={popup}
            ></button>
          </div>
          <div className="popup__body body-popup body-popup_vote !w-[100%]">
            <div className="body-popup__top">
              <h3 className="body-popup__title">Сообщить новость</h3>
              <p className="body-popup__text body-popup__text_vote">
                Для сообщения новости, заполните пожалуйста поля ниже
              </p>
            </div>
            <div className="body-popup__content">
              <form
                id="form-pass"
                action="#"
                data-dev
                data-popup-message="#popup-registration-recovery"
                className="body-popup__form body-popup__form_code !gap-[25px]"
              >
                <input
                  type="text"
                  name="form[]"
                  placeholder="Заголовок"
                  className="body-popup__input-name input !p-[20px]"
                  required
                />
                <label
                  htmlFor="file"
                  className={`input flex items-center justify-between !px-[20px] !py-[15px] cursor-pointer !text-inheri ${
                    option == 1 ? "bg-[#EAE8E8]" : ""
                  }`}
                >
                  <span className="cursor-pointer text-inherit">
                    {file.current?.files && option == 1
                      ? file.current.files[0].name
                      : "Загрузить файл изображения"}
                  </span>

                  <input
                    type="file"
                    id="fileupload"
                    name="form[]"
                    ref={file}
                    data-required
                    onChange={() => setOption(1)}
                    placeholder="Загрузить файл изображения"
                    accept="image/*"
                    className="absolute opacity-0 cursor-pointer"
                  />
                  <Image
                    src={option == 0 ? UploadFile : ImageFile}
                    alt="upload"
                    width={40}
                    height={40}
                    className="cursor-pointer"
                  />
                </label>

                <div className=" bg-white !border-[1px] !border-black border-solid rounded-[12px] text-black  py-[10px] pl-[15px] !text-[35px]">
                  <SelectMenu
                    placeholder="Категория новости"
                    className="text-black !text-[35px] max-h-xs"
                    size="lg"
                    variant="bordered"
                  >
                    <SelectItem key={1} value="1">
                      Экономика
                    </SelectItem>
                    <SelectItem key={2} value="2">
                      Политика
                    </SelectItem>
                    <SelectItem key={3} value="3">
                      Мировые новости
                    </SelectItem>
                    <SelectItem key={4} value="4">
                      Бизнес
                    </SelectItem>
                  </SelectMenu>
                </div>

                <input
                  type="text"
                  name="form[]"
                  data-required
                  placeholder="Описание новости"
                  className="body-popup__input-password input !pb-[100px] !p-[20px]"
                />
                <button
                  type="submit"
                  className="body-popup__button body-popup__button_code"
                >
                  Предложить
                </button>
                <br />
              </form>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
