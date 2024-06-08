import Image from "next/image";
import React, { useEffect, useState } from "react";
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
        <Link href={`/currency/${name1}To${name2}`} >
        <Image
          width={50}
          height={25}
          src={`/img/icons/currency/${img1}`}
          className="table-exchange__icon"
          alt="Иконка"
        />
        </Link>
        /
        <Link href={`/currency/${name1}To${name2}`} >
        <Image
          width={50}
          height={25}
          src={`/img/icons/currency/${img2}`}
          className="table-exchange__icon"
          alt="Иконка"
        />
        </Link>
        - {' '}
        <Link href={`/currency/${name1}To${name2}`} >
          {name1} / {name2}
        </Link>
      </td>
      <td>
        <Link href={`/currency/${name1}To${name2}`} >
          {rate}
        </Link>
      </td>
      {!isNegative ?
        <td className="table-exchange__change table-exchange__change_negative">
          <Link href={`/currency/${name1}To${name2}`} >
            {percentage?.slice(1)}%
          </Link>
        </td> :
        <td className="table-exchange__change table-exchange__change_plus">
          <Link href={`/currency/${name1}To${name2}`} >
          {percentage}%
          </Link>
        </td>
      }
      <td><Link href={`/currency/${name1}To${name2}`} >{Math.abs(+difference)}</Link></td>
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