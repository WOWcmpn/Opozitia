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
            {champs.map((el) => (
              <tr key={el.num}>
                <td>{el.num}</td>
                <td className="championship__table-team">
                  <picture>
                    <source srcSet="img/icons/team.webp" type="image/webp" />
                    <Image src={el.img} alt="Иконка" />
                  </picture>
                  <span>{el.name}</span>
                </td>
                <td>{el.games}</td>
                <td>{el.scores}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
