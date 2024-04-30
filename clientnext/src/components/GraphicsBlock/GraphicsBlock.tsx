import { GraphicsBlockProps } from "@/types/types";
import Image from "next/image";
import React from "react";

export const GraphicsBlock = ({
  name,
  title,
  tradeInfo,
  changeMinus,
  img,
}: GraphicsBlockProps) => {
  return (
    <div className="graphics-left-block__item">
      <div className="graphics-left-block__slider ">
        <div className="graphics-left-block__wrapper ">
          <div className="graphics-left-block__slide ">
            <div className="graphics-left-block__top ml-[10px]">
              <a href="exchange.html" className="graphics-left-block__info">
                <span className="graphics-left-block__name">{name}</span>
                <h4 className="graphics-left-block__title">{title}</h4>
              </a>
              <a href="exchange.html" className="graphics-left-block__trade">
                <span className="graphics-left-block__trade-info">
                  {tradeInfo}
                </span>
                <span className="graphics-left-block__change graphics-left-block__change_minus">
                  {changeMinus}
                </span>
              </a>
            </div>
          </div>
          {/* <div className="graphics-left-block__slide swiper-slide">
            <div className="graphics-left-block__top">
              <a href="exchange.html" className="graphics-left-block__info">
                <span className="graphics-left-block__name">FOREX</span>
                <h4 className="graphics-left-block__title">USD/EUR</h4>
              </a>
              <a href="exchange.html" className="graphics-left-block__trade">
                <span className="graphics-left-block__trade-info">1.18</span>
                <span className="graphics-left-block__change graphics-left-block__change_plus">
                  1.69%
                </span>
              </a>
            </div>
          </div> */}
        </div>
      </div>
      <a href="exchange.html" className="graphics-left-block__image">
        <Image src={img} alt="image" />
      </a>
    </div>
  );
};
