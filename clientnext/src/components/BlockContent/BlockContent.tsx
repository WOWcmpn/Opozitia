import { BlockContentProps } from "@/types/types";
import Image from "next/image";
import React, { useState } from "react";
import Link from 'next/link';

export const BlockContent = ({
  title,
  firstLink,
  firstCategory,
  img,
  link1,
  link2,
  link3,
}: BlockContentProps) => {
  const [isUrl, setIsUrl] = useState<boolean>(false);

  if (img.startsWith('http')) setIsUrl(true);

  return (
    <div className="block-main_wrapper ">
      <div className="bottom-left-block__thumbs thumbs-images">
        <div className="thumbs-images__wrapper ">
          <div className="thumbs-images__slide ">
            <Link href="#" className="thumbs-images__image-ibg">
              <picture>
                {isUrl ? (
                  <Image fill={true} src={img} alt="Image" className="!h-[280px] " />
                ) : (
                  <Image
                    fill={true}
                    src={`/img/fullImage-news/${img}`}
                    alt="Image"
                    className="!h-[280px] "
                  />
                )}
              </picture>
            </Link>
          </div>
        </div>
      </div>
      <div className="bottom-left-block__content">
        <div className="bottom-left-block__slider-main slider-bottom-left-block ">
          <div className="bottom-left-block__wrapper">
            <div className="bottom-left-block__slide">
              <Link href={`${firstCategory}/${firstLink}`} className="bottom-left-block__news-link">
                <h4 className="bottom-left-block__title">{title}</h4>
              </Link>
            </div>
          </div>
        </div>
        <div className="bottom-left-block__body">
          <div className="bottom-left-block__item">
            <div className="bottom-left-block__slider slider-bottom-left-block ">
              <div className="bottom-left-block__wrapper ">
                <div className="bottom-left-block__slide ">
                  <Link href="#" className="bottom-left-block__link">
                    {link1}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="bottom-left-block__item">
            <div className="bottom-left-block__slider2 slider-bottom-left-block ">
              <div className="bottom-left-block__wrapper ">
                <div className="bottom-left-block__slide ">
                  <Link href="#" className="bottom-left-block__link">
                    {link2}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="bottom-left-block__item">
            <div className="bottom-left-block__slider3 slider-bottom-left-block">
              <div className="bottom-left-block__wrapper ">
                <div className="bottom-left-block__slide ">
                  <Link href="#" className="bottom-left-block__link">
                    {link3}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
