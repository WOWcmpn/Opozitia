import { PageNewsProps } from "@/types/types";
import Image from "next/image";
import React from "react";

export const PageNews = ({
  title,
  link1,
  link2,
  link3,
  img,
}: PageNewsProps) => {
  return (
    <div className="content-news__item item-content-news item-block">
      <div className="item-content-news__left">
        <div className="item-content-news__wrap-link">
          <a href="#" className="item-content-news__link">
            <h3 className="item-content-news__title">{title}</h3>
          </a>
        </div>
        <div className="item-content-news__bottom">
          <span className="item-content-news__time time">20:19</span>
          <ul className="item-content-news__list-bottom list-bottom-search">
            <li className="list-bottom-search__item-bottom">
              <a href="#" className="list-bottom-search__link-bottom ">
                {link1}
              </a>
            </li>
            <li className="list-bottom-search__item-bottom">
              <a href="#" className="list-bottom-search__link-bottom">
                {link2}
              </a>
            </li>
            <li className="list-bottom-search__item-bottom">
              <a href="#" className="list-bottom-search__link-bottom">
                {link3}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="item-content-news__image">
        <picture>
          <source srcSet="img/main-block/02.webp" type="image/webp" />
          <Image src={img} alt="Картинка" />
        </picture>
      </div>
    </div>
  );
};
