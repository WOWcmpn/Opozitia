import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";
import { PopupProps } from "@/types/types";
import Link from "next/link";
import DelayWrapper from '@/components/DelayWrapper/DelayWrapper';

export const PopupPolls = ({ onClick, classes, onPolls, positive, negative, neutral, title }: PopupProps) => {
  const popup = () => {
    onClick(0);
    if (onPolls !== undefined) onPolls(0);
  };

  return (
    <motion.div
      id="popup-vote"
      className={classes}
      initial={{ scale: 0.4 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.6 }}
      transition={{ ease: "all", duration: 0 }}
    >
      <div className="popup__wrapper">
        <div className=" popup_show popup__content_vote content-popup">
          <div className="popup__top popup__top_vote">
            <Link href={'/'} className="popup__logo">
              <picture>
                <Image src={'/img/logo.webp'} width={110} alt="Logo" height={38} />
              </picture>
            </Link>
            <button
              data-close={true}
              type="button"
              className="popup__close"
              onClick={popup}
            ></button>
          </div>
          <div className="popup__body body-popup body-popup_vote">
            <div className="body-popup__top">
              <h3 className="body-popup__title">Спасибо за ваше мнение!</h3>
              <p className="body-popup__text body-popup__text_vote">
                После окончания голосования, на вашу почту будут присланы
                результаты
              </p>
            </div>
            <div className="body-popup__content">
              <div className="item-tabs-oprosi item-tabs-oprosi_vote">
                <div className="item-tabs-oprosi__top item-tabs-oprosi__top_vote">
                  <h4 className="item-tabs-oprosi__top-title item-tabs-oprosi__top-title_vote">
                    {title}
                  </h4>
                </div>
                <form action="#" className="item-tabs-oprosi__form">
                  <fieldset>
                    <div className="options options_vote">
                      <DelayWrapper>
                        <div className="options__item selected">
                        <input
                          hidden
                          id="o_41"
                          className="options__input"
                          checked
                          type="checkbox"
                          value="supportno"
                          name="opros1"
                        />
                        <label
                          htmlFor="o_41"
                          className="options__label options__label_1"
                        >
                          <span className="options__text">Не поддерживаю</span>{" "}
                          <span className="percent percent_nosupport">{negative || 0}%</span>
                          <div className="options__row row">
                            <div className="options__progress progress  progress_nosupport"></div>
                          </div>
                        </label>
                        <input
                          hidden
                          id="o_51"
                          className="options__input"
                          type="checkbox"
                          value="support"
                          name="opros1"
                        />
                        <label
                          htmlFor="o_51"
                          className="options__label options__label_2"
                        >
                          <span className="options__text">Поддерживаю</span>
                          <span className="percent percent_support">{positive || 0}%</span>
                          <div className="options__row row">
                            <div className="options__progress progress  progress_support"></div>
                          </div>
                        </label>
                        <input
                          hidden
                          id="o_61"
                          className="options__input"
                          type="checkbox"
                          value="neutral"
                          name="opros1"
                        />
                        <label
                          htmlFor="o_61"
                          className="options__label options__label_3"
                        >
                          <span className="options__text">Нейтрально</span>
                          <span className="percent percent_neutral">{neutral || 0}%</span>
                          <div className="options__row row">
                            <div className="options__progress progress  progress_neutral"></div>
                          </div>
                        </label>
                      </div>
                      </DelayWrapper>
                    </div>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
          <div className="popup__bottom bottom-popup">
            <p className="bottom-popup__text bottom-popup__text_ok">
              <span className="bottom-popup__text-vote">
                Не приходят результаты?
              </span>{" "}
              <Link className="bottom-popup__link-ok" href="#">
                Нажмите сюда, чтобы обратититься в поддержку
              </Link>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
