import Image from "next/image";
import React, { useRef } from 'react';
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
  const root = useRef()

  React.useEffect(() => {
    //@ts-ignore
    const onClick = e => root.current.contains(e.target) || onOption();
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [onOption]);

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
      {/*@ts-ignore*/}
      <div className="popup__wrapper" ref={root}>
        <div className="popup_show  content-popup popup__login">
          <div className="popup__top">
            <Link href={'/'} className="popup__logo">
              <Image height={60} width={120} src={'/img/logo.webp'} alt={'logo'} />
            </Link>
            <button
              data-close={true}
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
              data-dev={true}
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
                data-required={true}
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
              Забыли пароль? <Link href="#">Нажмите сюда для восстановления</Link>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
