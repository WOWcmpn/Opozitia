import React from "react";
import Image from "next/image";
import { LatestNewsProps } from "@/types/types";

export const LatestNews = ({ id, img, time, title, text }: LatestNewsProps) => {
  return (
    <div className="latest-news__item">
      <a href={id} className="latest-news__image">
        <picture>
          <source srcSet="img/latest-news/02.webp" type="image-webp" />
          <Image src={img} alt="image" />
        </picture>
      </a>
      <div className="latest-news__right">
        <span className="latest-news__time">{time}</span>
        <a href={id} className="latest-news__title-link">
          <h4 className="latest-news__link-title">{title}</h4>
        </a>
        <p className="latest-news__text">{text}</p>
      </div>
    </div>
  );
};
