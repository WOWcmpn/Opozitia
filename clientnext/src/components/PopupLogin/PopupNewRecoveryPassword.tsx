import Image from "next/image";
import React, { useRef } from 'react';
import { motion } from "framer-motion";
import { NewRecoveryPassPopupProps } from '@/types/types';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";

export const PopupNewRecoveryPassword = ({
  onClick: onOption,
  recoveryPass,
  setRecoveryPass,
  confirmRecoveryPass,
  setConfirmRecoveryPass,
  newRecoveryPassword
}: NewRecoveryPassPopupProps) => {
  const root = useRef()

  React.useEffect(() => {
    //@ts-ignore
    const onClick = e => root.current.contains(e.target) || onOption();
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [onOption]);

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
      {/*@ts-ignore*/}
      <div className="popup__wrapper" ref={root}>
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
          <div className="popup__body body-popup">
            <div className="body-popup__top body-popup__top_password">
              <h3 className="body-popup__title">Придумайте пароль</h3>
              <p className="body-popup__text">
                Пароль должен содержать хотя бы 5 символов
              </p>
            </div>
            <form
              id="form-pass"
              action="#"
              data-dev={true}
              data-popup-message="#popup-registration-recovery"
              className="body-popup__form body-popup__form_code"
              onSubmit={(e: any) => {
                e.preventDefault();
                if(recoveryPass === confirmRecoveryPass) {
                  newRecoveryPassword()
                } else {
                  toast.error('Введенные вами пароли не совпадают')
                  return
                }
              }}
            >
              <input
                type="password"
                id="pass"
                name="form[]"
                minLength={5}
                data-required={true}
                placeholder="Введите ваш пароль"
                className="body-popup__input-password input"
                required
                value={recoveryPass}
                onChange={(e) => setRecoveryPass(e.target.value)}
              />
              <input
                type="password"
                id="pass2"
                name="form[]"
                minLength={5}
                data-required={true}
                placeholder="Повторите введенный пароль"
                className="body-popup__input-password input"
                required
                value={confirmRecoveryPass}
                onChange={(e) => setConfirmRecoveryPass(e.target.value)}
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
