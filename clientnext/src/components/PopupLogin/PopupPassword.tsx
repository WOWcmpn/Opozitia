import Image from "next/image";
import React from "react";
import { PassPopupProps } from "@/types/types";
import { motion } from "framer-motion";
import Link from "next/link";

export const PopupPassword = ({
  onClick: onOption,
  setOption,
  pass,
  setPass,
  login,
}: PassPopupProps) => {
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
            <Link href={'/'} className="popup__logo">
              <Image height={60} width={120} src={'/img/logo.webp'} alt={'logo'} />
            </Link>
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
                login();
                setOption(3);
                onOption(0);
              }}
            >
              <input
                type="password"
                name="form[]"
                minLength={5}
                data-required
                placeholder="Введите ваш пароль"
                className="body-popup__input input"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
              <button type="submit" className="body-popup__button">
                Подтвердить
              </button>
            </form>
          </div>
          <div className="popup__bottom bottom-popup mt-20">
            <p className="bottom-popup__text">
              Забыли пароль? <a href="#">Нажмите сюда для восстановления</a>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
