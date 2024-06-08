import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CryptoValueProps } from "@/types/types";
import Link from "next/link";

export const CryptoValue = ({ name, img, rate, percentage, difference
}: CryptoValueProps) => {
  const [isNegative, setIsNegative] = useState<boolean>(false);

  useEffect(() => {
    async function loadUtils() {
      setIsNegative(percentage?.charAt(0) !== '-')
    }
    loadUtils()
  }, [percentage]);

  return (
    <tr data-href="#">
      <td className="table-exchange__item">
        <Link href={`/crypto/${name}`} >
          <Image
            width={50}
            height={25}
            src={`/img/icons/currency/${img}`}
            className="table-exchange__icon"
            alt="Иконка"
          />
        </Link>
        - {' '}
        <Link href={`/crypto/${name}`} >
          {name}
        </Link>
      </td>
      <td>
        <Link href={`/crypto/${name}`} >
          {rate} $
        </Link>
      </td>
      {!isNegative ?
        <td className="table-exchange__change table-exchange__change_negative">
          <Link href={`/crypto/${name}`} >
            {percentage?.slice(1)}%
          </Link>
        </td> :
        <td className="table-exchange__change table-exchange__change_plus">
          <Link href={`/crypto/${name}`} >
            {percentage}%
          </Link>
        </td>
      }
      <td><Link href={`/crypto/${name}`} >{Math.abs(+difference)}</Link></td>
      <td className="table-exchange__action">
        {!isNegative ?
          <Link
            href={`/crypto/${name}`}
            className="table-exchange__link table-exchange__link_buy"
          >
            Покупать
          </Link> :
          <Link
            href={`/crypto/${name}`}
            className="table-exchange__link table-exchange__link_sell"
          >
            Продавать
          </Link>
        }
      </td>
    </tr>
  )
}