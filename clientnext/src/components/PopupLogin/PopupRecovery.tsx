import { LoginPopupProps } from "@/types/types";
import Image from "next/image";
import React from "react";
import Logo from "@/img/logo.png";
import { motion } from "framer-motion";

export const PopupRecovery = ({
  onClick: onOption,
  setOption,
}: LoginPopupProps) => {
  return (
    <motion.div
      id="popup-registration-recovery"
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
          <div className="popup__body body-popup">
            <div className="body-popup__top">
              <h3 className="body-popup__title">Восстановление пароля</h3>
              <p className="body-popup__text">
                Введите e-mail, который использовали для регистрации
              </p>
            </div>
            <form
              action="#"
              data-dev
              data-popup-message="#popup-registration-send"
              className="body-popup__form"
              onSubmit={(e: any) => {
                e.preventDefault();
                setOption(6);
              }}
            >
              <input
                type="email"
                name="form[]"
                data-error="Введен не верный E-mail"
                data-required="email"
                placeholder="E-mail@mail.ru"
                className="body-popup__input input"
              />
              <button type="submit" className="body-popup__button">
                Продолжить
              </button>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};