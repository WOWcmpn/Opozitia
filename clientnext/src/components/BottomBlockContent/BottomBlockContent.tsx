import Link from 'next/link';
import React from 'react';
import { BottomBlockContentProps } from '@/types/types';

export const BottomBlockContent = ({
                                     link1,
                                     link2,
                                     link3,
                                   }: BottomBlockContentProps) => {

  return (
    <div className="bottom-left-block__body">
      <div className="bottom-left-block__item">
        <div className="bottom-left-block__slider slider-bottom-left-block ">
          <div className="bottom-left-block__wrapper ">
            <div className="bottom-left-block__slide ">
              <Link href={`${link1.category}/${link1.id}`} className="bottom-left-block__link">
                {link1.title}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-left-block__item">
        <div className="bottom-left-block__slider2 slider-bottom-left-block ">
          <div className="bottom-left-block__wrapper ">
            <div className="bottom-left-block__slide ">
              <Link href={`${link2.category}/${link2.id}`} className="bottom-left-block__link">
                {link2.title}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-left-block__item">
        <div className="bottom-left-block__slider3 slider-bottom-left-block">
          <div className="bottom-left-block__wrapper ">
            <div className="bottom-left-block__slide ">
              <Link href={`${link3.category}/${link3.id}`} className="bottom-left-block__link">
                {link3.title}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}