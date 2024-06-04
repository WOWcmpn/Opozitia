import { SearchResultProps } from "@/types/types";
import Image from "next/image";
import React from "react";
import Link from "next/link";

export const SearchResult = ({
  title,
  text,
  time,
  id,
  img,
  category,
}: SearchResultProps) => {
  let isUrl = false;
  if (img?.substring(0, 4) == "http") isUrl = true;

  let viewCategory = ''
  if(category === 'policy') viewCategory = 'ПОЛИТИКА'
  if(category === 'world') viewCategory = 'МИР'
  if(category === 'economy') viewCategory = 'ЭКОНОМИКА'
  if(category === 'business') viewCategory = 'БИЗНЕС'

  return (
    <div className="results-search-block__item item-search-results item-block">
      <div className="item-search-results__content">
        <Link href={`/${category}`} className="item-search-results__top-link">
          <h4 className="item-search-results__top-title">{viewCategory}</h4>
        </Link>
        <Link href={`${category}/${id}`} className="item-search-results__link">
          <h3 className="item-search-results__title-link">{title}</h3>
        </Link>
        <p className="item-search-results__text">{text}</p>
        <span className="item-search-results__time time">{time}</span>
        <ul className="item-search-results__list-bottom list-bottom-search">
          <li className="list-bottom-search__item-bottom">
            <Link href={`/${category}`} className="list-bottom-search__link-bottom ">
              {viewCategory}
            </Link>
          </li>
        </ul>
      </div>
      <div className="item-search-results__image-ibg">
        <picture>
          {isUrl ? (
            <Image fill={true} src={img} alt="Image" />
          ) : (
            <Image
              fill={true}
              src={`/img/fullImage-news/${img}`}
              alt="Image"
            />
          )}
        </picture>
      </div>
    </div>
  );
};
