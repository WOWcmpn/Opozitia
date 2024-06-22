import Image from "next/image";
import React from "react";
import { RegisterEmailPopupProps } from "@/types/types";
import { motion } from "framer-motion";
import Link from "next/link";

export const PopupRegistration = ({
  onClick: onOption,
  setOption,
  email,
  setEmail,
}: RegisterEmailPopupProps) => {
  return (
    <motion.div
      id="popup-registration"
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
            <div className="body-popup__top">
              <h3 className="body-popup__title">Регистрация</h3>
              <p className="body-popup__text body-popup__text_register">
                Для регистрации введите e-mail
              </p>
            </div>
            <form
              action="#"
              data-dev
              data-popup-message="#popup-login-password"
              className="body-popup__form"
              onSubmit={(e: any) => {
                e.preventDefault();
                setOption(4);
              }}
            >
              <input
                type="email"
                name="form[]"
                data-error="Введен не верный E-mail"
                data-required="email"
                placeholder="E-mail@mail.ru"
                className="body-popup__input input"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="body-popup__checkbox checkbox">
                <input
                  id="c_3"
                  className="checkbox__input"
                  data-required
                  type="checkbox"
                  value="1"
                  name="form[]"
                  required
                />
                <label htmlFor="c_3" className="checkbox__label">
                  <span className="checkbox__text">
                    Отправляя свои данные, я принимаю политику
                    конфиденциальности
                  </span>
                </label>
              </div>
              <button type="submit" className="body-popup__button">
                Продолжить
              </button>
            </form>
            {/*<ul className="body-popup__list-social">*/}
            {/*  <li className="body-popup__item-social">*/}
            {/*    <a href="#" className="body-popup__link-social link-social">*/}
            {/*      <Image src={Soc1} alt="icon" />*/}
            {/*    </a>*/}
            {/*  </li>*/}
            {/*  <li className="body-popup__item-social">*/}
            {/*    <a*/}
            {/*      href="#"*/}
            {/*      className="body-popup__link-social link-social link-social_facebook"*/}
            {/*    >*/}
            {/*      <Image src={Soc2} alt="icon" />*/}
            {/*    </a>*/}
            {/*  </li>*/}
            {/*  <li className="body-popup__item-social">*/}
            {/*    <a href="#" className="body-popup__link-social link-social">*/}
            {/*      <Image src={Soc3} alt="icon" />*/}
            {/*    </a>*/}
            {/*  </li>*/}
            {/*  <li className="body-popup__item-social">*/}
            {/*    <a href="#" className="body-popup__link-social link-social">*/}
            {/*      <Image src={Soc4} alt="icon" />*/}
            {/*    </a>*/}
            {/*  </li>*/}
            {/*</ul>*/}
          </div>
          <div className="popup__bottom bottom-popup mt-6">
            <p className="bottom-popup__text">
              Уже есть аккаунт?{" "}
              <a
                data-popup="#popup-login"
                href="#"
                onClick={() => setOption(1)}
              >
                Войдите!
              </a>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
