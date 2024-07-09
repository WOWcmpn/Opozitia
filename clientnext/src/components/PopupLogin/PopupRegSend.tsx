import Image from "next/image";
import React from "react";
import { LoginPopupProps } from "@/types/types";
import { motion } from "framer-motion";
import Link from "next/link";

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
            <Link href={'/'} className="popup__logo">
              <Image height={60} width={120} src={'/img/logo.png'} alt={'logo'} />
            </Link>
            <button
              data-close={true}
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
                <Link className="bottom-popup__link-ok" href="#">
                  Нажмите сюда, чтобы прислать заново
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
