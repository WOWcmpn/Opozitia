import { GraphicsBlockProps } from "@/types/types";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Schedule from "@/components/Schedule/Schedule";
import Image from "next/image";

export const GraphicsBlock = ({
  name,
  title,
  tradeInfo,
  percentage,
  labels,
  data,
  img,
  link
}: GraphicsBlockProps) => {
  const [isNegative, setIsNegative] = useState<boolean>();
  useEffect(() => {
    async function loadUtils() {
      setIsNegative(percentage?.charAt(0) === '-')
    }
    loadUtils()
  }, [percentage]);

  return (
    <div className="graphics-left-block__item">
      <div className="graphics-left-block__slider ">
        <div className="graphics-left-block__wrapper ">
          <div className="graphics-left-block__slide ">
            <div className="graphics-left-block__top ml-[10px]">
              <Link href={link} className="graphics-left-block__info">
                <span className="graphics-left-block__name">{name}</span>
                <h4 className="graphics-left-block__title">{title}</h4>
              </Link>
              <Link href={link} className="graphics-left-block__trade">
                <Image
                  width={50}
                  height={25}
                  src={`/img/icons/currency/${img}`}
                  className="table-exchange__icon"
                  alt="Иконка"
                />
                <span className="graphics-left-block__trade-info">
                  {tradeInfo ? (
                    <div>
                      {Number(tradeInfo).toFixed(2)}
                    </div>
                  ) : (
                    'загрузка...'
                  )}
                </span>
                {isNegative ?
                  <span className="graphics-left-block__change graphics-left-block__change_minus">
                  {percentage}%
                </span> :
                  <span className="graphics-left-block__change graphics-left-block__change_plus">
                  {percentage}%
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
