import { ICurrencyElement } from "@/types/types";
import Image from "next/image";
import React from "react";

export const CurrencyElement = ({
  img,
  name,
  rate,
  percentage,
  difference
}: ICurrencyElement) => {
  let isNegative
  isNegative = percentage?.charAt(0) !== '-';

  return (
    <tr data-href="#">
      <td className="table-exchange__item">
        <picture>
          <Image
            width={50}
            height={25}
            src={`/img/icons/currency/${img}`}
            className="table-exchange__icon"
            alt="Иконка"
          />
        </picture>
        {name}
      </td>
      <td>{rate}</td>
      {isNegative ?
        <td className="table-exchange__change table-exchange__change_plus">
          {percentage}%
        </td> :
        <td className="table-exchange__change table-exchange__change_negative-currency">
          {percentage?.slice(1)}%
        </td>}
      <td>{Math.abs(+difference)}</td>
    </tr>
  )
}