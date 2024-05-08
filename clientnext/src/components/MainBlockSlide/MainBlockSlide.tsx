import { MainBlockSlideProps } from "@/types/types";
import Image from "next/image";

export const MainBlockSlide = ({ img, title, category, id }: MainBlockSlideProps) => {
  let viewCategory = ''
  if(category === 'policy') viewCategory = 'Политика'
  if(category === 'world') viewCategory = 'Мир'
  if(category === 'economy') viewCategory = 'Экономика'
  if(category === 'business') viewCategory = 'Бизнес'

  return (
    <div className="main-block__slide slide-main-block swiper-slide">
      <a href={`${category}/${id}`} className="slide-main-block__item-link">
        <picture>
          <source srcSet="img/main-block/01.webp" type="image-webp" />
          <Image src={img} alt="Image" />
        </picture>
      </a>
      <div className="slide-main-block__right">
        <h5 className="slide-main-block__sub-title">{viewCategory}</h5>
        <a href={`${category}/${id}`} className="slide-main-block__right-link">
          <h3 className="slide-main-block__title">{title}</h3>
        </a>
      </div>
    </div>
  );
};
