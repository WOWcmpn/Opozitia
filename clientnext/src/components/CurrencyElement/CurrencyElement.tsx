import { ICurrencyElement } from "@/types/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export const CurrencyElement = ({
  img,
  name,
  rate,
  percentage,
  difference,
  url
}: ICurrencyElement) => {
  const [isNegative, setIsNegative] = useState(false);
  useEffect(() => {
    async function loadUtils() {
      setIsNegative(percentage?.charAt(0) !== '-')
    }
    loadUtils()
  }, [percentage]);

  return (
    <tr data-href="#">
      <td className="table-exchange__item">
        <picture>
          <Link href={`/currency/${url}`} >
          <Image
            width={50}
            height={25}
            src={`/img/icons/currency/${img}`}
            className="table-exchange__icon"
            alt="Иконка"
          />
          </Link>
        </picture>
        <div>
          <Link href={`/currency/${url}`} >
          {name}
          </Link>
        </div>
      </td>
      <td>
        <Link href={`/currency/${url}`} >
          {rate}
        </Link>
      </td>
      {isNegative ?
        <td className="table-exchange__change table-exchange__change_plus">
          <Link href={`/currency/${url}`} >
          {percentage}%
          </Link>
        </td> :
        <td className="table-exchange__change table-exchange__change_negative-currency">
          <Link href={`/currency/${url}`} >
          {percentage?.slice(1)}%
          </Link>
        </td>}
      <td><Link href={`/currency/${url}`} >{Math.abs(+difference)}</Link></td>
    </tr>
  )
}