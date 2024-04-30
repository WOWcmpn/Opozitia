import React from "react";
import Logo from "@/img/logo.png";
import Image from "next/image";
import { motion } from "framer-motion";
import { LoginPopupProps } from "@/types/types";

function testJump(x: any) {
  var ml = ~~x.getAttribute("maxlength");
  if (ml && x.value.length >= ml) {
    do {
      x = x.nextSibling;
    } while (x && !/text/.test(x.type));
    if (x && /text/.test(x.type)) {
      x.focus();
    }
  }
}

export const PopupCode = ({
  onClick: onOption,
  setOption,
}: LoginPopupProps) => {
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
      <div className="popup__wrapper">
        <div className="popup_show  content-popup">
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
            <div className="body-popup__top">
              <h3 className="body-popup__title">Введите код</h3>
              <p className="body-popup__text">
                На E-mail@mail.ru отправлен одноразовый код
              </p>
            </div>
            <form
              action="#"
              data-dev
              data-popup-message="#popup-registration-password"
              className="body-popup__form body-popup__form_code"
              onSubmit={(e: any) => {
                e.preventDefault();
                setOption(4);
              }}
            >
              <div className="body-popup__wrap-input">
                <input
                  type="text"
                  maxLength={1}
                  className="body-popup__block "
                  name="digit1"
                  onInput={(e) => testJump(e.target)}
                  required
                />
                <input
                  type="text"
                  maxLength={1}
                  className="body-popup__block "
                  name="digit2"
                  onInput={(e) => testJump(e.target)}
                  required
                />
                <input
                  type="text"
                  maxLength={1}
                  className="body-popup__block "
                  name="digit3"
                  onInput={(e) => testJump(e.target)}
                  required
                />
                <input
                  type="text"
                  maxLength={1}
                  className="body-popup__block "
                  name="digit4"
                  onInput={(e) => testJump(e.target)}
                  required
                />
                <input
                  type="text"
                  maxLength={1}
                  className="body-popup__block "
                  name="digit5"
                  onInput={(e) => testJump(e.target)}
                  required
                />
                <input
                  type="text"
                  maxLength={1}
                  className="body-popup__block "
                  name="digit6"
                  required
                />
              </div>
              <button type="submit" className="body-popup__button">
                Продолжить
              </button>
            </form>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <div className="popup__bottom bottom-popup">
            <p className="bottom-popup__text">
              Код не пришел?{" "}
              <a data-popup="#popup-login" href="#">
                Нажмите сюда, чтобы прислать заново
              </a>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
