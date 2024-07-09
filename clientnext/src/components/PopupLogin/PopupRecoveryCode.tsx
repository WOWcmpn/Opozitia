import React, { useRef, useState } from 'react';
import Image from "next/image";
import { motion } from "framer-motion";
import { ConfirmRecoveryCodeProps } from '@/types/types';
import Link from "next/link";

export const PopupRecoveryCode = ({
  onClick: onOption,
  setInputConfirmCode,
  email,
  confirmCode
}: ConfirmRecoveryCodeProps) => {
  const [first, setFirst] = useState<string>('');
  const [second, setSecond] = useState<string>('');
  const [third, setThird] = useState<string>('');
  const [fourth, setFourth] = useState<string>('');
  const [fifth, setFifth] = useState<string>('');
  const [sixth, setSixth] = useState<string>('');
  const root = useRef()

  React.useEffect(() => {
    //@ts-ignore
    const onClick = e => root.current.contains(e.target) || onOption();
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [onOption]);

  return (
    <motion.div
      id="popup-registration-code"
      aria-hidden="true"
      className="popup popup__active"
      initial={{ scale: 0.4 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.6 }}
      transition={{ ease: "all", duration: 0 }}
    >
      {/*@ts-ignore*/}
      <div className="popup__wrapper" ref={root}>
        <div className="popup_show  content-popup">
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
            <div className="body-popup__top">
              <h3 className="body-popup__title">Введите код</h3>
              <p className="body-popup__text">
                На {email} отправлен одноразовый код для восстановления пароля
              </p>
            </div>
            <form
              action="#"
              data-dev={true}
              data-popup-message="#popup-registration-password"
              className="body-popup__form body-popup__form_code"
              onSubmit={(e: any) => {
                e.preventDefault();
                confirmCode()
              }}
            >
              <div className="body-popup__wrap-input">
                <input
                  type="text"
                  maxLength={1}
                  className="body-popup__block "
                  name="digit1"
                  onChange={(e) => setFirst(e.target.value)}
                  required
                />
                <input
                  type="text"
                  maxLength={1}
                  className="body-popup__block "
                  name="digit2"
                  onChange={(e) => setSecond(e.target.value)}
                  required
                />
                <input
                  type="text"
                  maxLength={1}
                  className="body-popup__block "
                  name="digit3"
                  onChange={(e) => setThird(e.target.value)}
                  required
                />
                <input
                  type="text"
                  maxLength={1}
                  className="body-popup__block "
                  name="digit4"
                  onChange={(e) => setFourth(e.target.value)}
                  required
                />
                <input
                  type="text"
                  maxLength={1}
                  className="body-popup__block "
                  name="digit5"
                  onChange={(e) => setFifth(e.target.value)}
                  required
                />
                <input
                  type="text"
                  maxLength={1}
                  className="body-popup__block "
                  name="digit6"
                  onChange={(e) =>  setSixth(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="body-popup__button"
                onClick={() => setInputConfirmCode(first + second + third + fourth + fifth + sixth)}
              >
                Продолжить
              </button>
            </form>
          </div>
          <div className="popup__bottom bottom-popup mt-6">
            <p className="bottom-popup__text">
              Код не пришел?{" "}
              <Link data-popup="#popup-login" href="#">
                Нажмите сюда, чтобы прислать заново
              </Link>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
