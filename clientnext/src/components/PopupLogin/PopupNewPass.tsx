import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { NewPassPopupProps } from '@/types/types';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";

export const PopupNewPass = ({ onClick: onOption,
                               pass,
                               setPass,
                               confirmPass,
                               setConfirmPass,
                               newPassword
                             }: NewPassPopupProps) => {
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
                if(pass === confirmPass) {
                  newPassword()
                } else {
                  toast.error('Введенные вами пароли не совпадают')
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
                value={pass}
                onChange={(e) => setPass(e.target.value)}
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