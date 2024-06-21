import { RecoveryPopupProps } from "@/types/types";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export const PopupRecovery = ({
  onClick: onOption,
  setOption,
  setPassRecovery
}: RecoveryPopupProps) => {
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
            <Link href={'/'} className="popup__logo">
              <Image height={60} width={120} src={'/img/logo.webp'} alt={'logo'} />
            </Link>
            <button
              data-close={true}
              type="button"
              className="popup__close"
              onClick={() => {
                onOption(0);
                setPassRecovery(0)
              }}
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
              data-dev={true}
              data-popup-message="#popup-registration-send"
              className="body-popup__form"
              onSubmit={(e: any) => {
                e.preventDefault();
                setOption(0);
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
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
