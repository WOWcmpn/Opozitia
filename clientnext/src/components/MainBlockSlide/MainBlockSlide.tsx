import { MainBlockSlideProps } from "@/types/types";
import Image from "next/image";
import Link from 'next/link';
import React from 'react';

export const MainBlockSlide = ({ img, title, category, id }: MainBlockSlideProps) => {
  let viewCategory = ''
  if(category === 'policy') viewCategory = 'Политика'
  if(category === 'world') viewCategory = 'Мир'
  if(category === 'economy') viewCategory = 'Экономика'
  if(category === 'business') viewCategory = 'Бизнес'

  let isUrl = false;
  if (img.substring(0, 4) == "http") isUrl = true;

  return (
    <div className="main-block__slide slide-main-block swiper-slide">
      <Link
        href={`${category}/${id}`}
        className="slide-main-block__right-link"
      >
        <picture>
          {isUrl ? (
            <Image width={130} height={90} src={img} alt="Image" />
          ) : (
            <Image
              width={130} height={90}
              src={`/img/preview-images/${img}`}
              alt="Image"
            />
          )}
        </picture>
      </Link>
      <div className="slide-main-block__right">
        <h5 className="slide-main-block__sub-title">{viewCategory}</h5>
        <a href={`${category}/${id}`} className="slide-main-block__right-link">
          <h3 className="slide-main-block__title">{title}</h3>
        </a>
      </div>
    </div>
  );
};
