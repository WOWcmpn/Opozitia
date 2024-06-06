import { MainBlockSlideProps } from "@/types/types";
import Image from "next/image";
import Link from 'next/link';
import React, { useEffect, useState } from "react";

export const MainBlockSlide = ({ img, title, category, id }: MainBlockSlideProps) => {
  const [viewCategory, setViewCategory] = useState<string>('');
  const [isUrl, setIsUrl] = useState<boolean>(false);

  useEffect(() => {
    async function loadData() {
      try {
        if(img.startsWith('http')) setIsUrl(true)
        if(category === 'policy') setViewCategory('Политика')
        if(category === 'world') setViewCategory('Мир')
        if(category === 'economy') setViewCategory('Экономика')
        if(category === 'business') setViewCategory('Бизнес')
      } catch (err) {
        console.warn(err);
      }
    }
    loadData()
  }, [category, img]);

  return (
    <div className="main-block__slide slide-main-block swiper-slide">
      <Link
        href={`${category}/${id}`}
        className="slide-main-block__right-link"
      >
        <div className='swiper-images'>
          {isUrl ? (
            <Image width={130} height={90} src={img} alt="Image" />
          ) : (
            <Image
              width={130} height={90}
              src={`/img/preview-images/${img}`}
              alt="Image"
            />
          )}
        </div>
      </Link>
      <div className="slide-main-block__right">
        <h5 className="slide-main-block__sub-title">{viewCategory}</h5>
        <Link href={`${category}/${id}`} className="slide-main-block__right-link">
          <h3 className="slide-main-block__title">{title}</h3>
        </Link>
      </div>
    </div>
  );
};
