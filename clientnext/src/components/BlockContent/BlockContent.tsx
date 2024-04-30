import { BlockContentProps } from "@/types/types";
import Image from "next/image";
import React from "react";

export const BlockContent = ({
  title,
  img,
  link1,
  link2,
  link3,
}: BlockContentProps) => {
  return (
    <div className="block-main_wrapper ">
      <div className="bottom-left-block__thumbs thumbs-images">
        <div className="thumbs-images__wrapper ">
          <div className="thumbs-images__slide ">
            <a href="#" className="thumbs-images__image-ibg">
              <picture>
                <source srcSet="img/actual-news/01.webp" type="image-webp" />
                <Image src={img} alt="Картинка" className="!h-[280px] " />
              </picture>
            </a>
          </div>
        </div>
      </div>
      <div className="bottom-left-block__content">
        <div className="bottom-left-block__slider-main slider-bottom-left-block ">
          <div className="bottom-left-block__wrapper">
            <div className="bottom-left-block__slide">
              <a href="#" className="bottom-left-block__news-link">
                <h4 className="bottom-left-block__title">{title}</h4>
              </a>
            </div>
          </div>
        </div>
        <div className="bottom-left-block__body">
          <div className="bottom-left-block__item">
            <div className="bottom-left-block__slider slider-bottom-left-block ">
              <div className="bottom-left-block__wrapper ">
                <div className="bottom-left-block__slide ">
                  <a href="#" className="bottom-left-block__link">
                    {link1}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="bottom-left-block__item">
            <div className="bottom-left-block__slider2 slider-bottom-left-block ">
              <div className="bottom-left-block__wrapper ">
                <div className="bottom-left-block__slide ">
                  <a href="#" className="bottom-left-block__link">
                    {link2}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="bottom-left-block__item">
            <div className="bottom-left-block__slider3 slider-bottom-left-block">
              <div className="bottom-left-block__wrapper ">
                <div className="bottom-left-block__slide ">
                  <a href="#" className="bottom-left-block__link">
                    {link3}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
