"use client";

import { PollsItemProps } from "@/types/types";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";
import { PopupPolls } from "../PopupPolls/PopupPolls";

export const PollsItem = ({
  title,
  agree,
  neutral,
  disagree,
  img,
  onClick,
}: PollsItemProps) => {
  const [select, setSelect] = useState(0);

  return (
    <div className="tabs-oprosi__item item-tabs-oprosi item-block">
      <div className="item-tabs-oprosi__top">
        <h4 className="item-tabs-oprosi__top-title">
          Как вы относитесь к этому?
        </h4>
      </div>
      <div className="item-tabs-oprosi__content">
        <form
          action="#"
          className="item-tabs-oprosi__form item-tabs-oprosi__form_main-vote"
        >
          <h4 className="item-tabs-oprosi__title">{title}</h4>
          <div className="options">
            <div className={`options__item ${select == 1 ? "selected" : ""}`}>
              <input
                hidden
                id="o_1"
                className="options__input"
                type="checkbox"
                value="supportno"
                name="opros1"
              />
              <label
                htmlFor="o_1"
                className="options__label options__label_1"
                onClick={() => {
                  setSelect(1);

                  onClick(1);
                }}
              >
                <span className="options__text">Не поддерживаю</span>{" "}
                <span className="percent percent_nosupport">{disagree}</span>
                <div className="options__row row">
                  <div
                    className="options__progress progress  progress_nosupport"
                    style={{}}
                  ></div>
                </div>
              </label>
              <input
                hidden
                id="o_2"
                className="options__input"
                type="checkbox"
                value="support"
                name="opros1"
              />
              <label
                htmlFor="o_2"
                className="options__label options__label_2"
                onClick={() => {
                  setSelect(1);

                  onClick(1);
                }}
              >
                <span className="options__text">Поддерживаю</span>
                <span className="percent percent_support">{agree}</span>
                <div className="options__row row">
                  <div className="options__progress progress  progress_support"></div>
                </div>
              </label>
              <input
                hidden
                id="o_3"
                className="options__input"
                type="checkbox"
                value="neutral"
                name="opros1"
              />
              <label
                htmlFor="o_3"
                className="options__label options__label_3"
                onClick={() => {
                  setSelect(1);

                  onClick(1);
                }}
              >
                <span className="options__text">Нейтрально</span>
                <span className="percent percent_neutral">{neutral}</span>
                <div className="options__row row">
                  <div className="options__progress progress  progress_neutral"></div>
                </div>
              </label>
            </div>
          </div>
          <div className="item-tabs-oprosi__image-ibg">
            <picture>
              <source srcSet="img/oprosi/01.webp" type="image/webp" />
              <Image src={img} alt="Картинка" />
            </picture>
          </div>
        </form>
      </div>
    </div>
  );
};
