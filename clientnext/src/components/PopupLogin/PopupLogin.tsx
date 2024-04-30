import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Logo from "@/img/logo.png";
import Soc1 from "@/img/social/01.svg";
import Soc2 from "@/img/social/02.svg";
import Soc3 from "@/img/social/03.svg";
import Soc4 from "@/img/social/04.svg";
import { LoginPopupProps } from "@/types/types";

export const PopupLogin = ({
  onClick: onOption,
  setOption,
}: LoginPopupProps) => {
  const popup = () => {
    onOption(0);
  };
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
        <div className="popup_show  content-popup popup__content_first popup__login">
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
              onClick={popup}
            ></button>
          </div>
          <div className="popup__body body-popup">
            <div className="body-popup__top">
              <h3 className="body-popup__title">Войти</h3>
              <p className="body-popup__text">
                Введите ваш e-mail, чтобы войти
              </p>
            </div>
            <form
              action="#"
              data-dev
              data-popup-message="#popup-login-password"
              className="body-popup__form"
              onSubmit={(e: any) => {
                e.preventDefault();
                setOption(2);
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
              <div className="body-popup__checkbox checkbox">
                <input
                  id="c_1"
                  className="checkbox__input"
                  data-required
                  type="checkbox"
                  value="1"
                  name="form[]"
                />
                <label htmlFor="c_1" className="checkbox__label">
                  <span className="checkbox__text">
                    Отправляя свои данные, я принимаю политику <br />
                    конфиденциальности
                  </span>
                </label>
              </div>
              <button type="submit" className="body-popup__button">
                Продолжить
              </button>
            </form>
            <ul className="body-popup__list-social">
              <li className="body-popup__item-social">
                <a href="#" className="body-popup__link-social link-social">
                  <Image src={Soc1} alt="icon" />
                </a>
              </li>
              <li className="body-popup__item-social">
                <a
                  href="#"
                  className="body-popup__link-social link-social link-social_facebook"
                >
                  <Image src={Soc2} alt="icon" />
                </a>
              </li>
              <li className="body-popup__item-social">
                <a href="#" className="body-popup__link-social link-social">
                  <Image src={Soc3} alt="icon" />
                </a>
              </li>
              <li className="body-popup__item-social">
                <a href="#" className="body-popup__link-social link-social">
                  <Image src={Soc4} alt="icon" />
                </a>
              </li>
            </ul>
          </div>
          <div className="popup__bottom bottom-popup">
            <p className="bottom-popup__text">
              Ещё нет аккаунта?{" "}
              <a
                data-popup="#popup-registration"
                href="#"
                onClick={() => setOption(7)}
              >
                Зарегистрируйтесь!
              </a>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
