import React from "react";
import Image from "next/image";
import { LatestNewsProps } from "@/types/types";

export const LatestNews = ({
  id,
  img,
  time,
  title,
  text,
  category,
}: LatestNewsProps) => {
  let isUrl = false;

  if (img.substring(0, 4) == "http") isUrl = true;

  return (
    <div className="latest-news__item">
      <a href={`${category}/${id}`} className="latest-news__image">
        <picture>
          {/* <source srcSet="img/latest-news/02.webp" type="image-webp" />
          <img src={img} alt="image" /> */}
          {isUrl ? (
            <Image width={120} height={100} src={img} alt="Image" />
          ) : (
            <Image
              width={120}
              height={100}
              src={`/img/preview-images/${img}`}
              alt="Image"
            />
          )}
        </picture>
      </a>
      <div className="latest-news__right">
        <span className="latest-news__time">{time}</span>
        <a href={`${category}/${id}`} className="latest-news__title-link">
          <h4 className="latest-news__link-title">{title}</h4>
        </a>
        <p className="latest-news__text">{text}</p>
      </div>
    </div>
  );
};
