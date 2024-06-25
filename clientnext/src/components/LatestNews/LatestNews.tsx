import React from "react";
import Image from "next/image";
import { LatestNewsProps } from "@/types/types";
import Link from 'next/link';

export const LatestNews = ({
  id,
  img,
  time,
  title,
  text,
  category,
}: LatestNewsProps) => {

  return (
    <div className="latest-news__item">
      <Link href={`/${category}/${id}`} className="latest-news__image">
        <picture>
          <Image width={180} height={160} src={img} alt={img} />
        </picture>
      </Link>
      <div className="latest-news__right">
        <span className="latest-news__time">{time}</span>
        <Link href={`/${category}/${id}`} className="latest-news__title-link">
          <h4 className="latest-news__link-title">{title}</h4>
        </Link>
        <p className="latest-news__text">{text}</p>
      </div>
    </div>
  );
};
