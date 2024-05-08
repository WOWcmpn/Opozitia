import { PageNewsProps } from "@/types/types";
import Image from "next/image";
import React from "react";
import Link from "next/link";

export const PageNews = ({
  id,
  title,
  link1,
  link2,
  link3,
  img,
  createdAtTime,
  category,
}: PageNewsProps) => {
  return (
    <div className="content-news__item item-content-news item-block">
      <div className="item-content-news__left">
        <div className="item-content-news__wrap-link">
          <Link href={`${category}/${id}`} className="item-content-news__link">
            <h3 className="item-content-news__title">{title}</h3>
          </Link>
        </div>
        <div className="item-content-news__bottom">
          <span className="item-content-news__time time">{createdAtTime}</span>
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
          <img src={img} alt="Картинка" />
        </picture>
      </div>
    </div>
  );
};
