import Image from "next/image";
import React from "react";
import { CurrencyValueProps } from "@/types/types";
import Link from "next/link";

export const CurrencyValue = ({
  name1,
  name2,
  img1,
  img2,
  rate,
  percentage,
  difference
}: CurrencyValueProps) => {
  let isNegative
  isNegative = percentage?.charAt(0) !== '-';

  return (
    <tr data-href="#">
      <td className="table-exchange__item">
        <Image
          width={50}
          height={25}
          src={`/img/icons/currency/${img1}`}
          className="table-exchange__icon"
          alt="Иконка"
        />
        /
        <Image
          width={50}
          height={25}
          src={`/img/icons/currency/${img2}`}
          className="table-exchange__icon"
          alt="Иконка"
        />
        - {' '}
        {name1} / {name2}
      </td>
      <td>{rate}</td>
      {!isNegative ?
        <td className="table-exchange__change table-exchange__change_negative">
          {percentage.slice(1)}%
        </td> :
        <td className="table-exchange__change table-exchange__change_plus">
          {percentage}%
        </td>
      }

      <td>{Math.abs(+difference)}</td>
      <td className="table-exchange__action">
        {!isNegative ?
          <Link
            href={`/currency/${name1}To${name2}`}
            className="table-exchange__link table-exchange__link_buy"
          >
            Покупать
          </Link> :
          <Link
            href={`/currency/${name1}To${name2}`}
            className="table-exchange__link table-exchange__link_sell"
          >
            Продавать
          </Link>
        }
      </td>
    </tr>
  )
}