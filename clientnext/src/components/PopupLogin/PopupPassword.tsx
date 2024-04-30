import Image from "next/image";
import React from "react";
import Logo from "@/img/logo.png";
import { LoginPopupProps } from "@/types/types";
import { motion } from "framer-motion";

export const PopupPassword = ({
  onClick: onOption,
  setOption,
}: LoginPopupProps) => {
  return (
    <motion.div
      id="popup-login"
      aria-hidden="true"
      className="popup popup__active"
      initial={{ scale: 0.4 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.6 }}
      transition={{ ease: "all", duration: 0 }}
    >
      <div className="popup__wrapper">
        <div className="popup_show  content-popup popup__login">
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
            <div className="body-popup__top body-popup__top_single">
              <h3 className="body-popup__title">Введите пароль</h3>
            </div>
            <form
              action="#"
              data-dev
              data-popup-message="#popup-registration-code"
              className="body-popup__form"
              onSubmit={(e: any) => {
                e.preventDefault();
                setOption(3);
              }}
            >
              <input
                type="password"
                name="form[]"
                minLength={10}
                data-required
                placeholder="Введите ваш пароль"
                className="body-popup__input input"
              />
              <button type="submit" className="body-popup__button">
                Подтвердить
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
          <div className="popup__bottom bottom-popup">
            <p className="bottom-popup__text">
              Забыли пароль? <a href="#">Нажмите сюда для восстановления</a>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};