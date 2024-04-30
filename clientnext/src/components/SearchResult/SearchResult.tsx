import { SearchResultProps } from "@/types/types";
import Image from "next/image";
import React from "react";

export const SearchResult = ({
  title,
  text,
  time,
  link1,
  link2,
  link3,
  img,
  topTitle,
}: SearchResultProps) => {
  return (
    <div className="results-search-block__item item-search-results item-block">
      <div className="item-search-results__content">
        <a href="#" className="item-search-results__top-link">
          <h4 className="item-search-results__top-title">{topTitle}</h4>
        </a>
        <a href="#" className="item-search-results__link">
          <h3 className="item-search-results__title-link">{title}</h3>
        </a>
        <p className="item-search-results__text">{text}</p>
        <span className="item-search-results__time time">{time}</span>
        <ul className="item-search-results__list-bottom list-bottom-search">
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
      <div className="item-search-results__image-ibg">
        <picture>
          <source srcSet="img/main-block/02.webp" type="image/webp" />
          <Image src={img} alt="Картинка" />
        </picture>
      </div>
    </div>
  );
};
