"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import DXY from "@/img/icons/dxy.png";
import { Header } from "@/components/Header/Header";
import { CurrencyValue } from "@/components/СurrencyValue/CurrencyValue";
import { ICurrency } from "@/types/types";
import { NewsService } from "@/service/news.service";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Exchange() {
  const [option, setOption] = useState<string>("currency");
  const [currency, setCurrency] = useState<ICurrency>();

  useEffect(() => {
    async function loadData() {
      try {
        const data = await NewsService.getCurrency()
        setCurrency(data)
      } catch (err) {
        console.warn('Currency error: ', err);
      }
    }
    loadData()
  }, []);

  function handleOption(e: string) {
    setOption(e);
  }

  return (
    <div className="wrapper">
      <Header className={"header menu-visual"} />
      <main className="page">
        <section className="page__exchange exchange">
          <div className="exchange__container content-news">
            <header className="content-news__header content-news__header_exchange">
              <div className="w-[1180px] bg-white !border-[1px] !border-black border-solid rounded-[12px] text-black mt-[50px] select_currency">
                <Select onValueChange={(option) => handleOption(option)}>
                  <SelectTrigger className="select_currency-trigger">
                    <SelectValue placeholder="Валюты" defaultValue={'currency'} />
                  </SelectTrigger>
                  <SelectContent className="bg-white rounded text-black text-[25px]">
                    <SelectGroup className="text-black text-[25px]">
                      <SelectItem className="cursor-pointer text-black text-[25px] max-h-xs" key={"currency"} value="currency">Валюты</SelectItem>
                      <SelectItem className="cursor-pointer text-black text-[25px] max-h-xs" key={"indexes"} value="indexes">Индексы</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </header>
            {option == "currency" ? (
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
                  <CurrencyValue percentage={currency?.percentageEURToUSD!} difference={currency?.differenceEURToUSD!}
                                 name1={'EUR'} name2={'USD'}
                                 rate={Number(currency?.EURToUSD!).toFixed(4)!} img1={'euro.png'} img2={'usa.webp'} />
                  <CurrencyValue percentage={currency?.percentageUSDToJPY!} difference={currency?.differenceUSDToJPY!}
                                 name1={'USD'} name2={'JPY'}
                                 rate={Number(currency?.USDToJPY!).toFixed(4)!} img1={'usa.webp'} img2={'china.webp'} />
                  <CurrencyValue percentage={currency?.percentageGBPToUSD!} difference={currency?.differenceGBPToUSD!}
                                 name1={'GBP'} name2={'USD'}
                                 rate={Number(currency?.GBPToUSD!).toFixed(4)!} img1={'UK.svg'} img2={'usa.webp'} />
                  <CurrencyValue percentage={currency?.percentageUSDToRUB!} difference={currency?.differenceUSDToRUB!}
                                 name1={'USD'} name2={'RUB'}
                                 rate={Number(currency?.USDToRUB!).toFixed(4)!} img1={'usa.webp'} img2={'rub.svg'} />
                  <CurrencyValue percentage={currency?.percentageEURToRUB!} difference={currency?.differenceEURToRUB!}
                                 name1={'EUR'} name2={'RUB'}
                                 rate={Number(currency?.EURToRUB!).toFixed(4)!} img1={'euro.png'} img2={'rub.svg'} />
                  <CurrencyValue percentage={currency?.percentageUSDToRON!} difference={currency?.differenceUSDToRON!}
                                 name1={'USD'} name2={'RON'}
                                 rate={Number(currency?.USDToRON!).toFixed(4)!} img1={'usa.webp'} img2={'roman.svg'} />
                  <CurrencyValue percentage={currency?.percentageEURToRON!} difference={currency?.differenceEURToRON!}
                                 name1={'EUR'} name2={'RON'}
                                 rate={Number(currency?.EURToRON!).toFixed(4)!} img1={'euro.png'} img2={'roman.svg'} />
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
