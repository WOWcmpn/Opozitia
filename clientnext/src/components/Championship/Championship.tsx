import { ChampionshipProps } from "@/types/types";
import Image from "next/image";
import React from "react";

export const Championship = ({ img, title, champs }: ChampionshipProps) => {
  return (
    <div className="championship__slide swiper-slide">
      <div className="championship__top">
        <h3 className="championship__title">{title}</h3>
        <div className="championship__image">
          <picture>
            <source srcSet="img/icons/championship.webp" type="image/webp" />
            <Image src={img} alt="Иконка" />
          </picture>
        </div>
      </div>
      <div className="championship__wrap-table">
        <table className="championship__table">
          <thead>
            <tr>
              <th>#</th>
              <th>Команда</th>
              <th>Игры</th>
              <th>Очки</th>
            </tr>
          </thead>
          <tbody>
            {champs.map((c) => (
              <tr key={c.id}>
                <td>{c.place}</td>
                <td className="championship__table-team">
                  <picture>
                    <Image src={c.img} width={30} height={30} alt="Иконка" />
                  </picture>
                  <span>{c.team}</span>
                </td>
                <td>{c.games}</td>
                <td>{c.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
