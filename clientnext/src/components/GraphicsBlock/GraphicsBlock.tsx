import { GraphicsBlockProps } from "@/types/types";
import React from "react";
import Link from "next/link";
import Schedule from "@/components/Schedule/Schedule";
import Image from "next/image";

export const GraphicsBlock = ({
  name,
  title,
  tradeInfo,
  changeMinus,
  labels,
  data,
  img
}: GraphicsBlockProps) => {
  let isNegative
  isNegative = changeMinus?.charAt(0) === '-'

  return (
    <div className="graphics-left-block__item">
      <div className="graphics-left-block__slider ">
        <div className="graphics-left-block__wrapper ">
          <div className="graphics-left-block__slide ">
            <div className="graphics-left-block__top ml-[10px]">
              <Link href={'/exchange'} className="graphics-left-block__info">
                <span className="graphics-left-block__name">{name}</span>
                <h4 className="graphics-left-block__title">{title}</h4>
              </Link>
              <Link href={'/exchange'} className="graphics-left-block__trade">
                <Image
                  width={50}
                  height={25}
                  src={`/img/icons/currency/${img}`}
                  className="table-exchange__icon"
                  alt="Иконка"
                />
                <span className="graphics-left-block__trade-info">
                  {Number(tradeInfo).toFixed(4)}
                </span>
                {isNegative ?
                  <span className="graphics-left-block__change graphics-left-block__change_minus">
                  {changeMinus}%
                </span> :
                  <span className="graphics-left-block__change graphics-left-block__change_plus">
                  {changeMinus}%
                </span>
                }

              </Link>
            </div>
          </div>
        </div>
      </div>
      <Schedule labels={labels}
        data={data}/>
    </div>
  );
};
