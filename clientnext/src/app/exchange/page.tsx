"use client";

import Image from "next/image";
import React, { useState } from "react";
import USA from "@/img/icons/usa.png";
import DXY from "@/img/icons/dxy.png";
import { Header } from "@/components/Header/Header";
import { Select as SelectMenu, SelectItem } from "@nextui-org/react";

export default function Exchange() {
  const [option, setOption] = useState<string>("1");

  function handleOption(e: React.ChangeEvent<HTMLSelectElement>) {
    setOption(e.target.value);
  }

  return (
    <div className="wrapper">
      <Header className={"header menu-visual"} />
      <main className="page">
        <section className="page__exchange exchange">
          <div className="exchange__container content-news">
            <header className="content-news__header content-news__header_exchange">
              <div className="w-[1180px] bg-white !border-[1px] !border-black border-solid rounded-[12px] text-black mt-[50px] ">
                <SelectMenu
                  className="text-black text-[25px] max-h-xs"
                  size="lg"
                  variant="bordered"
                  defaultSelectedKeys={[1]}
                  selectedKeys={[option]}
                  onChange={handleOption}
                >
                  <SelectItem
                    key={1}
                    value="1"
                    className="text-black text-[25px]"
                  >
                    Валюты
                  </SelectItem>
                  <SelectItem key={2} value="2">
                    Индексы
                  </SelectItem>
                </SelectMenu>
              </div>
              {/* <select
                name="form[]"
                className="content-news__form"
                onChange={handleOption}
                value={option}
              >
                <option value="1" selected>
                  Валюты
                </option>
                <option value="2" data-href="indexes.html">
                  Индексы
                </option>
              </select> */}
            </header>
            {option == "1" ? (
              <div className="tabs-oprosi__body">
                <table className="tabs-oprosi__table table-exchange">
                  <thead>
                    <tr>
                      <th>Валюта</th>
                      <th>Курс</th>
                      <th>Изменение, %</th>
                      <th>Изменение</th>
                      <th>Тех. рейтинг</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr data-href="#">
                      <td className="table-exchange__item">
                        <picture>
                          <source
                            srcSet="img/icons/usa.webp"
                            type="image/webp"
                          />
                          <Image
                            src={USA}
                            className="table-exchange__icon"
                            alt="Иконка"
                          />
                        </picture>
                        USD
                      </td>
                      <td>1.002</td>
                      <td className="table-exchange__change table-exchange__change_negative">
                        0.16%
                      </td>
                      <td>0.17</td>
                      <td className="table-exchange__action">
                        <a
                          href="#"
                          className="table-exchange__link table-exchange__link_buy"
                        >
                          Покупать
                        </a>
                      </td>
                    </tr>
                    <tr data-href="#">
                      <td className="table-exchange__item">
                        <picture>
                          <source
                            srcSet="img/icons/usa.webp"
                            type="image/webp"
                          />
                          <Image
                            src={USA}
                            className="table-exchange__icon"
                            alt="Иконка"
                          />
                        </picture>
                        USD
                      </td>
                      <td>1.002</td>
                      <td className="table-exchange__change table-exchange__change_plus">
                        0.16%
                      </td>
                      <td>0.17</td>
                      <td className="table-exchange__action">
                        <a
                          href="#"
                          className="table-exchange__link table-exchange__link_sell"
                        >
                          Продавать
                        </a>
                      </td>
                    </tr>
                    <tr data-href="#">
                      <td className="table-exchange__item">
                        <picture>
                          <source
                            srcSet="img/icons/usa.webp"
                            type="image/webp"
                          />
                          <Image
                            src={USA}
                            className="table-exchange__icon"
                            alt="Иконка"
                          />
                        </picture>
                        USD
                      </td>
                      <td>1.002</td>
                      <td className="table-exchange__change table-exchange__change_plus">
                        0.16%
                      </td>
                      <td>0.17</td>
                      <td className="table-exchange__action">
                        <a
                          href="#"
                          className="table-exchange__link table-exchange__link_sell"
                        >
                          Продавать
                        </a>
                      </td>
                    </tr>
                    <tr data-href="#">
                      <td className="table-exchange__item">
                        <picture>
                          <source
                            srcSet="img/icons/usa.webp"
                            type="image/webp"
                          />
                          <Image
                            src={USA}
                            className="table-exchange__icon"
                            alt="Иконка"
                          />
                        </picture>
                        USD
                      </td>
                      <td>1.002</td>
                      <td className="table-exchange__change table-exchange__change_plus">
                        0.16%
                      </td>
                      <td>0.17</td>
                      <td className="table-exchange__action">
                        <a
                          href="#"
                          className="table-exchange__link table-exchange__link_sell"
                        >
                          Продавать
                        </a>
                      </td>
                    </tr>
                    <tr data-href="#">
                      <td className="table-exchange__item">
                        <picture>
                          <source
                            srcSet="img/icons/usa.webp"
                            type="image/webp"
                          />
                          <Image
                            src={USA}
                            className="table-exchange__icon"
                            alt="Иконка"
                          />
                        </picture>
                        USD
                      </td>
                      <td>1.002</td>
                      <td className="table-exchange__change table-exchange__change_plus">
                        0.16%
                      </td>
                      <td>0.17</td>
                      <td className="table-exchange__action">
                        <a
                          href="#"
                          className="table-exchange__link table-exchange__link_sell"
                        >
                          Продавать
                        </a>
                      </td>
                    </tr>
                    <tr data-href="#">
                      <td className="table-exchange__item">
                        <picture>
                          <source
                            srcSet="img/icons/usa.webp"
                            type="image/webp"
                          />
                          <Image
                            src={USA}
                            className="table-exchange__icon"
                            alt="Иконка"
                          />
                        </picture>
                        USD
                      </td>
                      <td>1.002</td>
                      <td className="table-exchange__change table-exchange__change_plus">
                        0.16%
                      </td>
                      <td>0.17</td>
                      <td className="table-exchange__action">
                        <a
                          href="#"
                          className="table-exchange__link table-exchange__link_sell"
                        >
                          Продавать
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="tabs-oprosi__body">
                <table className="tabs-oprosi__table table-exchange">
                  <thead>
                    <tr>
                      <th>Инструмент</th>
                      <th>Цена</th>
                      <th>Изменение, %</th>
                      <th>Изменение</th>
                      <th>Тех. рейтинг</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr data-href="#">
                      <td className="table-exchange__item">
                        <picture>
                          <source
                            srcSet="img/icons/dxy.webp"
                            type="image/webp"
                          />
                          <Image
                            src={DXY}
                            className="table-exchange__index-icon"
                            alt="Иконка"
                          />
                        </picture>
                        DXY
                      </td>
                      <td>1.002</td>
                      <td className="table-exchange__change table-exchange__change_negative">
                        0.16%
                      </td>
                      <td>0.17</td>
                      <td className="table-exchange__action">
                        <a
                          href="#"
                          className="table-exchange__link table-exchange__link_buy"
                        >
                          Покупать
                        </a>
                      </td>
                    </tr>
                    <tr data-href="#">
                      <td className="table-exchange__item">
                        <picture>
                          <source
                            srcSet="img/icons/dxy.webp"
                            type="image/webp"
                          />
                          <Image
                            src={DXY}
                            className="table-exchange__index-icon"
                            alt="Иконка"
                          />
                        </picture>
                        DXY
                      </td>
                      <td>1.002</td>
                      <td className="table-exchange__change table-exchange__change_plus">
                        0.16%
                      </td>
                      <td>0.17</td>
                      <td className="table-exchange__action">
                        <a
                          href="#"
                          className="table-exchange__link table-exchange__link_sell"
                        >
                          Продавать
                        </a>
                      </td>
                    </tr>
                    <tr data-href="#">
                      <td className="table-exchange__item">
                        <picture>
                          <source
                            srcSet="img/icons/dxy.webp"
                            type="image/webp"
                          />
                          <Image
                            src={DXY}
                            className="table-exchange__index-icon"
                            alt="Иконка"
                          />
                        </picture>
                        DXY
                      </td>
                      <td>1.002</td>
                      <td className="table-exchange__change table-exchange__change_plus">
                        0.16%
                      </td>
                      <td>0.17</td>
                      <td className="table-exchange__action">
                        <a
                          href="#"
                          className="table-exchange__link table-exchange__link_sell"
                        >
                          Продавать
                        </a>
                      </td>
                    </tr>
                    <tr data-href="#">
                      <td className="table-exchange__item">
                        <picture>
                          <source
                            srcSet="img/icons/dxy.webp"
                            type="image/webp"
                          />
                          <Image
                            src={DXY}
                            className="table-exchange__index-icon"
                            alt="Иконка"
                          />
                        </picture>
                        DXY
                      </td>
                      <td>1.002</td>
                      <td className="table-exchange__change table-exchange__change_plus">
                        0.16%
                      </td>
                      <td>0.17</td>
                      <td className="table-exchange__action">
                        <a
                          href="#"
                          className="table-exchange__link table-exchange__link_sell"
                        >
                          Продавать
                        </a>
                      </td>
                    </tr>
                    <tr data-href="#">
                      <td className="table-exchange__item">
                        <picture>
                          <source
                            srcSet="img/icons/dxy.webp"
                            type="image/webp"
                          />
                          <Image
                            src={DXY}
                            className="table-exchange__index-icon"
                            alt="Иконка"
                          />
                        </picture>
                        DXY
                      </td>
                      <td>1.002</td>
                      <td className="table-exchange__change table-exchange__change_plus">
                        0.16%
                      </td>
                      <td>0.17</td>
                      <td className="table-exchange__action">
                        <a
                          href="#"
                          className="table-exchange__link table-exchange__link_sell"
                        >
                          Продавать
                        </a>
                      </td>
                    </tr>
                    <tr data-href="#">
                      <td className="table-exchange__item">
                        <picture>
                          <source
                            srcSet="img/icons/dxy.webp"
                            type="image/webp"
                          />
                          <Image
                            src={DXY}
                            className="table-exchange__index-icon"
                            alt="Иконка"
                          />
                        </picture>
                        DXY
                      </td>
                      <td>1.002</td>
                      <td className="table-exchange__change table-exchange__change_plus">
                        0.16%
                      </td>
                      <td>0.17</td>
                      <td className="table-exchange__action">
                        <a
                          href="#"
                          className="table-exchange__link table-exchange__link_sell"
                        >
                          Продавать
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="footer__container">
          <p className="footer__text">©2024 Opozitia</p>
        </div>
      </footer>
    </div>
  );
}
