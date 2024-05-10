import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Logo from "@/img/logo.png";
import { LoginPopupProps, RegisterPassPopupProps } from "@/types/types";

export const PopupRegPass = ({
  onClick: onOption,
  setOption,
  login,
  setLogin,
  pass,
  setPass,
  confirmPass,
  setConfirmPass,
  register,
}: RegisterPassPopupProps) => {
  return (
    <motion.div
      id="popup-registration-password"
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
            <div className="body-popup__top body-popup__top_password">
              <h3 className="body-popup__title">Придумайте имя и пароль</h3>
              <p className="body-popup__text">
                Пароль должен содержать хотя бы 10 символов
              </p>
            </div>
            <form
              id="form-pass"
              action="#"
              data-dev
              data-popup-message="#popup-registration-recovery"
              className="body-popup__form body-popup__form_code"
              onSubmit={(e: any) => {
                e.preventDefault();
                register();
                setOption(5);
              }}
            >
              <input
                type="text"
                name="form[]"
                placeholder="Введите ваше имя"
                className="body-popup__input-name input"
                required
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
              <input
                type="password"
                id="pass"
                name="form[]"
                minLength={10}
                data-required
                placeholder="Введите ваш пароль"
                className="body-popup__input-password input"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
              <input
                type="password"
                id="pass2"
                name="form[]"
                minLength={10}
                data-required
                placeholder="Повторите введенный пароль"
                className="body-popup__input-password input"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
              />
              <button
                type="submit"
                className="body-popup__button body-popup__button_code"
              >
                Подтвердить
              </button>
              <br />
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
