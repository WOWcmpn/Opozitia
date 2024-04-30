import Image from "next/image";
import React from "react";
import Logo from "@/img/logo.png";
import { LoginPopupProps } from "@/types/types";
import { motion } from "framer-motion";

export const PopupRegSend = ({ onClick: onOption }: LoginPopupProps) => {
  return (
    <motion.div
      id="popup-registration-send"
      aria-hidden="true"
      className="popup popup__active"
      initial={{ scale: 0.4 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.6 }}
      transition={{ ease: "all", duration: 0 }}
    >
      <div className="popup__wrapper">
        <div className="popup_show content-popup popup__login">
          <div className="popup__top">
            <a href="#" className="popup__logo">
              <picture>
                <source srcSet="img/logo.webp" type="image/webp" />
                <Image src={Logo} alt="Logo" height={38} />
              </picture>
            </a>
            <button
              data-close
              type="button"
              className="popup__close"
              onClick={() => onOption(0)}
            ></button>
          </div>
          <div className="popup__body body-popup body-popup_ok ">
            <div className="body-popup__wrap-top popup__center">
              <div className="body-popup__top">
                <h3 className="body-popup__title">Инструкция отправлена!</h3>
                <p className="body-popup__text">
                  На вашу почту отправлена инструкция по восстановлению пароля
                </p>
              </div>
            </div>
            <div className="popup__bottom bottom-popup">
              <p className="bottom-popup__text bottom-popup__text_ok">
                Ничего не пришло?{" "}
                <a className="bottom-popup__link-ok" href="#">
                  Нажмите сюда, чтобы прислать заново
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
