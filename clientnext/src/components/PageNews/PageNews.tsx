import { PageNewsProps } from "@/types/types";
import Image from "next/image";
import React from "react";
import Link from "next/link";

export const PageNews = ({
  id,
  title,
  img,
  createdAtTime,
  category,
}: PageNewsProps) => {
  let viewCategory = ''
  if(category === 'policy') viewCategory = 'Политика'
  if(category === 'world') viewCategory = 'Мир'
  if(category === 'economy') viewCategory = 'Экономика'
  if(category === 'business') viewCategory = 'Бизнес'

  let isUrl = false;
  if (img.substring(0, 4) == "http") isUrl = true;

  return (
    <div className="content-news__item item-content-news item-block">
      <div className="item-content-news__left">
        <div className="item-content-news__wrap-link">
          <Link href={`/${category}/${id}`} className="item-content-news__link">
            <h3 className="item-content-news__title">{title}</h3>
          </Link>
        </div>
        <div className="item-content-news__bottom">
          <span className="item-content-news__time time">{createdAtTime}</span>
          <ul className="item-content-news__list-bottom list-bottom-search">
            <li className="list-bottom-search__item-bottom">
              <Link href={`/${category}`} className="list-bottom-search__link-bottom ">
                {viewCategory}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="item-content-news__image">
        <picture>
          {isUrl ? (
            <Image width={290} height={100} src={img} alt="Image" />
          ) : (
            <Image
              width={290} height={100}
              src={`/img/fullImage-news/${img}`}
              alt="Image"
            />
          )}
          {/*{isUrl ? (*/}
          {/*  <Image width={290} height={100} src={img} alt="Image" />*/}
          {/*) : (*/}
          {/*  <Image*/}
          {/*    width={290}*/}
          {/*    height={100}*/}
          {/*    src={`/img/preview-images/${img}`}*/}
          {/*    alt="Image"*/}
          {/*  />*/}
          {/*)}*/}
        </picture>
      </div>
    </div>
  );
};
