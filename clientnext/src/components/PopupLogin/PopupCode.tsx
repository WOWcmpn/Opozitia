import React, { useRef, useState } from 'react';
import Image from "next/image";
import { motion } from "framer-motion";
import { ConfirmCodeProps } from "@/types/types";
import Link from "next/link";
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS } from 'input-otp';

export const PopupCode = ({
  onClick: onOption,
  setInputConfirmCode,
  email,
  confirm
}: ConfirmCodeProps) => {
  const [code, setCode] = useState<string>('');
  const root = useRef()

  console.log(code);
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
                На {email} отправлен одноразовый код
              </p>
            </div>
            <form
              action="#"
              data-dev={true}
              data-popup-message="#popup-registration-password"
              className="body-popup__form body-popup__form_code"
              onSubmit={(e: any) => {
                e.preventDefault();
                confirm()
              }}
            >
              <div>
                <InputOTP
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS}
                  value={code}
                  onChange={(value) => setCode(value)}
                >
                  <InputOTPGroup className="body-popup__wrap-input ">
                    <InputOTPSlot className="body-popup__block " index={0} />
                    <InputOTPSlot className="body-popup__block " index={1} />
                    <InputOTPSlot className="body-popup__block " index={2} />
                    <InputOTPSlot className="body-popup__block " index={3} />
                    <InputOTPSlot className="body-popup__block " index={4} />
                    <InputOTPSlot className="body-popup__block " index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <button
                type="submit"
                className="body-popup__button"
                onClick={() => setInputConfirmCode(code)}
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
