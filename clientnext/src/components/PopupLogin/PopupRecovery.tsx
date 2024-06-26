import { RecoveryPopupProps } from "@/types/types";
import Image from "next/image";
import React, { useRef } from 'react';
import { motion } from "framer-motion";
import Link from "next/link";

export const PopupRecovery = ({
  onClick: onOption,
  setEmail,
  sendRecoveryCode
}: RecoveryPopupProps) => {
  const root = useRef()

  React.useEffect(() => {
    //@ts-ignore
    const onClick = e => root.current.contains(e.target) || onOption(0);
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [onOption]);

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
      {/*@ts-ignore*/}
      <div className="popup__wrapper" ref={root}>
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
                sendRecoveryCode()
              }}
            >
              <input
                type="email"
                name="form[]"
                data-error="Введен не верный E-mail"
                data-required="email"
                placeholder="E-mail@mail.ru"
                className="body-popup__input input"
                onChange={(e) => setEmail(e.target.value)}
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
