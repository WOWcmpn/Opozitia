"use client";

import { LatestNews } from "@/components/LatestNews/LatestNews";

import LatestNews02 from "@/img/latest-news/02.png";
import Graph1 from "@/img/graphics/03.svg";
import Graph2 from "@/img/graphics/01.svg";
import Gold from "@/img/latest-news/gold.png";
import USA from "@/img/icons/usa.png";
import Image from "next/image";
import React, { useState } from "react";
import { CurrencyBody } from "@/components/CurrencyBody/CurrencyBody";
import { Header } from "@/components/Header/Header";

export default function Currency() {
  const [option, setOption] = useState(0);
  const [graph, setGraph] = useState(0);

  const price = [
    "1.089",
    "1.079",
    "1.069",
    "1.059",
    "1.049",
    "1.039",
    "1.029",
    "1.019",
  ];
  const time = [
    "20:00",
    "19:00",
    "18:00",
    "17:00",
    "16:00",
    "15:00",
    "14:00",
    "13:00",
  ];
  return (
    <div className="wrapper">
      <Header className={"header menu-visual"} />
      <main className="page">
        <section className="page__currency currency">
          <div className="currency__container">
            <div className="currency__left">
              <div className="currency__main-block main-block-currency">
                <div className="main-block-currency__top top-block-currency">
                  <h1 className="top-block-currency__title">
                    <picture>
                      <source srcSet="img/icons/usa.webp" type="image/webp" />
                      <Image src={USA} alt="Иконка" />
                    </picture>
                    USD
                  </h1>
                  <div className="top-block-currency__change">
                    <p className="top-block-currency__now">1.0886</p>
                    <span className="top-block-currency__change-info">
                      +0.0029
                    </span>
                    <span className="top-block-currency__change-info">
                      (+0.02920%)
                    </span>
                  </div>
                  <span className="top-block-currency__time">
                    As of 02:18PM GMT.
                  </span>
                </div>
                <div data-tabs className="main-block-currency__tabs">
                  <nav
                    data-tabs-titles
                    className="main-block-currency__navigation navigation-tabs"
                  >
                    <button
                      type="button"
                      className={`main-block-currency__title title-tabs ${
                        option == 0 ? "_tab-active" : ""
                      } `}
                      onClick={() => setOption(0)}
                    >
                      График
                    </button>
                    <button
                      type="button"
                      className={`main-block-currency__title title-tabs ${
                        option == 1 ? "_tab-active" : ""
                      } `}
                      onClick={() => setOption(1)}
                    >
                      Параметры
                    </button>
                  </nav>
                  <div data-tabs-body className="main-block-currency__content">
                    {option == 1 ? (
                      <div className="main-block-currency__body body-main-currency">
                        <div className="body-main-currency__wrap-columns">
                          <div className="body-main-currency__column">
                            <div className="body-main-currency__item">
                              <span className="body-main-currency__name">
                                Previous Close
                              </span>
                              <span className="body-main-currency__info">
                                1.0902
                              </span>
                            </div>
                            <div className="body-main-currency__item">
                              <span className="body-main-currency__name">
                                Open
                              </span>
                              <span className="body-main-currency__info">
                                1.0902
                              </span>
                            </div>
                            <div className="body-main-currency__item">
                              <span className="body-main-currency__name">
                                Bid
                              </span>
                              <span className="body-main-currency__info">
                                1.0902
                              </span>
                            </div>
                          </div>
                          <div className="body-main-currency__column">
                            <div className="body-main-currency__item">
                              <span className="body-main-currency__name">
                                Day’s range
                              </span>
                              <span className="body-main-currency__info">
                                1.0891 - 1.0910
                              </span>
                            </div>
                            <div className="body-main-currency__item">
                              <span className="body-main-currency__name">
                                52 week range
                              </span>
                              <span className="body-main-currency__info">
                                1.0450 - 1.1276
                              </span>
                            </div>
                            <div className="body-main-currency__item">
                              <span className="body-main-currency__name">
                                Ask
                              </span>
                              <span className="body-main-currency__info">
                                1.0902
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="main-block-currency__body body-main-currency">
                        <div data-tabs className="body-main-currency">
                          <div className="body-main-currency__wrap-currency">
                            <nav
                              data-tabs-titles
                              className="body-main-currency__navigation"
                            >
                              <button
                                type="button"
                                className={`body-main-currency__title ${
                                  graph == 0 ? "_tab-active" : ""
                                } `}
                                onClick={() => setGraph(0)}
                              >
                                <span className="body-main-currency__title-info">
                                  Сегодня
                                </span>{" "}
                                <br />
                                <span className="body-main-currency__number">
                                  0.43%
                                </span>{" "}
                              </button>
                              <button
                                type="button"
                                className={`body-main-currency__title ${
                                  graph == 1 ? "_tab-active" : ""
                                } `}
                                onClick={() => setGraph(1)}
                              >
                                <span className="body-main-currency__title-info">
                                  1 неделя
                                </span>{" "}
                                <br />
                                <span className="body-main-currency__number">
                                  1.95%
                                </span>{" "}
                              </button>
                              <button
                                type="button"
                                className={`body-main-currency__title ${
                                  graph == 2 ? "_tab-active" : ""
                                } `}
                                onClick={() => setGraph(2)}
                              >
                                <span className="body-main-currency__title-info">
                                  1 месяц
                                </span>{" "}
                                <br />
                                <span className="body-main-currency__number">
                                  4.95%
                                </span>
                              </button>
                              <button
                                type="button"
                                className={`body-main-currency__title ${
                                  graph == 3 ? "_tab-active" : ""
                                } `}
                                onClick={() => setGraph(3)}
                              >
                                <span className="body-main-currency__title-info">
                                  6 месяцев
                                </span>{" "}
                                <br />
                                <span className="body-main-currency__number">
                                  12.85%
                                </span>
                              </button>
                              <button
                                type="button"
                                className={`body-main-currency__title ${
                                  graph == 4 ? "_tab-active" : ""
                                } `}
                                onClick={() => setGraph(4)}
                              >
                                <span className="body-main-currency__title-info">
                                  1 год
                                </span>{" "}
                                <br />
                                <span className="body-main-currency__number">
                                  14.6%
                                </span>
                              </button>
                              <button
                                type="button"
                                className={`body-main-currency__title ${
                                  graph == 5 ? "_tab-active" : ""
                                } `}
                                onClick={() => setGraph(5)}
                              >
                                <span className="body-main-currency__title-info">
                                  5 лет
                                </span>{" "}
                                <br />
                                <span className="body-main-currency__number">
                                  54.21%
                                </span>
                              </button>
                            </nav>
                            <div
                              data-tabs-body
                              className="body-main-currency__content"
                            >
                              {graph == 0 && (
                                <CurrencyBody
                                  colr={price}
                                  colb={time}
                                  graph1={Graph1}
                                  graph2={Graph2}
                                />
                              )}

                              {graph == 1 && (
                                <CurrencyBody
                                  colr={price}
                                  colb={time}
                                  graph1={Graph1}
                                  graph2={Graph2}
                                />
                              )}

                              {graph == 2 && (
                                <CurrencyBody
                                  colr={price}
                                  colb={time}
                                  graph1={Graph2}
                                  graph2={Graph1}
                                />
                              )}

                              {graph == 3 && (
                                <CurrencyBody
                                  colr={price}
                                  colb={time}
                                  graph1={Graph1}
                                  graph2={Graph2}
                                />
                              )}

                              {graph == 4 && (
                                <CurrencyBody
                                  colr={price}
                                  colb={time}
                                  graph1={Graph2}
                                  graph2={Graph1}
                                />
                              )}

                              {graph == 5 && (
                                <CurrencyBody
                                  colr={price}
                                  colb={time}
                                  graph1={Graph2}
                                  graph2={Graph1}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="currency__actual-news actual-news">
                <h2 className="actual-news__title">
                  Актуальные новости по теме
                </h2>
                <div className="actual-news__body">
                  <div className="item-content-news item-content-news_actual">
                    <div className="item-content-news__left">
                      <div className="item-content-news__wrap-link">
                        <a href="#" className="item-content-news__link">
                          <h3 className="item-content-news__title">
                            Gold Up And Dollar Down As The Fed Stays Firm
                          </h3>
                        </a>
                      </div>
                      <div className="item-content-news__bottom">
                        <span className="item-content-news__time time">
                          14 часов назад
                        </span>
                        <ul className="item-content-news__list-bottom list-bottom-search">
                          <li className="list-bottom-search__item-bottom">
                            <a
                              href="#"
                              className="list-bottom-search__link-bottom "
                            >
                              USD
                            </a>
                          </li>
                          <li className="list-bottom-search__item-bottom">
                            <a
                              href="#"
                              className="list-bottom-search__link-bottom"
                            >
                              Молдова
                            </a>
                          </li>
                          <li className="list-bottom-search__item-bottom">
                            <a
                              href="#"
                              className="list-bottom-search__link-bottom"
                            >
                              Золото
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="item-content-news__image">
                      <picture>
                        <source
                          srcSet="img/latest-news/gold.webp"
                          type="image/webp"
                        />
                        <Image src={Gold} alt="Картинка" />
                      </picture>
                    </div>
                  </div>
                  <div className="item-content-news item-content-news_actual item-block">
                    <div className="item-content-news__left">
                      <div className="item-content-news__wrap-link">
                        <a href="#" className="item-content-news__link">
                          <h3 className="item-content-news__title">
                            Gold Up And Dollar Down As The Fed Stays Firm
                          </h3>
                        </a>
                      </div>
                      <div className="item-content-news__bottom">
                        <span className="item-content-news__time time">
                          14 часов назад
                        </span>
                        <ul className="item-content-news__list-bottom list-bottom-search">
                          <li className="list-bottom-search__item-bottom">
                            <a
                              href="#"
                              className="list-bottom-search__link-bottom "
                            >
                              USD
                            </a>
                          </li>
                          <li className="list-bottom-search__item-bottom">
                            <a
                              href="#"
                              className="list-bottom-search__link-bottom"
                            >
                              Молдова
                            </a>
                          </li>
                          <li className="list-bottom-search__item-bottom">
                            <a
                              href="#"
                              className="list-bottom-search__link-bottom"
                            >
                              Золото
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="item-content-news__image">
                      <picture>
                        <source
                          srcSet="img/latest-news/gold.webp"
                          type="image/webp"
                        />
                        <Image src={Gold} alt="Картинка" />
                      </picture>
                    </div>
                  </div>
                  <div className="item-content-news item-content-news_actual item-block">
                    <div className="item-content-news__left">
                      <div className="item-content-news__wrap-link">
                        <a href="#" className="item-content-news__link">
                          <h3 className="item-content-news__title">
                            Gold Up And Dollar Down As The Fed Stays Firm
                          </h3>
                        </a>
                      </div>
                      <div className="item-content-news__bottom">
                        <span className="item-content-news__time time">
                          14 часов назад
                        </span>
                        <ul className="item-content-news__list-bottom list-bottom-search">
                          <li className="list-bottom-search__item-bottom">
                            <a
                              href="#"
                              className="list-bottom-search__link-bottom "
                            >
                              USD
                            </a>
                          </li>
                          <li className="list-bottom-search__item-bottom">
                            <a
                              href="#"
                              className="list-bottom-search__link-bottom"
                            >
                              Молдова
                            </a>
                          </li>
                          <li className="list-bottom-search__item-bottom">
                            <a
                              href="#"
                              className="list-bottom-search__link-bottom"
                            >
                              Золото
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="item-content-news__image">
                      <picture>
                        <source
                          srcSet="img/latest-news/gold.webp"
                          type="image/webp"
                        />
                        <Image src={Gold} alt="Картинка" />
                      </picture>
                    </div>
                  </div>
                  <div className="item-content-news item-content-news_actual item-block hidden">
                    <div className="item-content-news__left">
                      <div className="item-content-news__wrap-link">
                        <a href="#" className="item-content-news__link">
                          <h3 className="item-content-news__title">
                            Gold Up And Dollar Down As The Fed Stays Firm
                          </h3>
                        </a>
                      </div>
                      <div className="item-content-news__bottom">
                        <span className="item-content-news__time time">
                          14 часов назад
                        </span>
                        <ul className="item-content-news__list-bottom list-bottom-search">
                          <li className="list-bottom-search__item-bottom">
                            <a
                              href="#"
                              className="list-bottom-search__link-bottom "
                            >
                              USD
                            </a>
                          </li>
                          <li className="list-bottom-search__item-bottom">
                            <a
                              href="#"
                              className="list-bottom-search__link-bottom"
                            >
                              Молдова
                            </a>
                          </li>
                          <li className="list-bottom-search__item-bottom">
                            <a
                              href="#"
                              className="list-bottom-search__link-bottom"
                            >
                              Золото
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="item-content-news__image">
                      <picture>
                        <source
                          srcSet="img/latest-news/gold.webp"
                          type="image/webp"
                        />
                        <Image src={Gold} alt="Картинка" />
                      </picture>
                    </div>
                  </div>
                  <div className="item-content-news item-content-news_actual item-block hidden">
                    <div className="item-content-news__left">
                      <div className="item-content-news__wrap-link">
                        <a href="#" className="item-content-news__link">
                          <h3 className="item-content-news__title">
                            Gold Up And Dollar Down As The Fed Stays Firm
                          </h3>
                        </a>
                      </div>
                      <div className="item-content-news__bottom">
                        <span className="item-content-news__time time">
                          14 часов назад
                        </span>
                        <ul className="item-content-news__list-bottom list-bottom-search">
                          <li className="list-bottom-search__item-bottom">
                            <a
                              href="#"
                              className="list-bottom-search__link-bottom "
                            >
                              USD
                            </a>
                          </li>
                          <li className="list-bottom-search__item-bottom">
                            <a
                              href="#"
                              className="list-bottom-search__link-bottom"
                            >
                              Молдова
                            </a>
                          </li>
                          <li className="list-bottom-search__item-bottom">
                            <a
                              href="#"
                              className="list-bottom-search__link-bottom"
                            >
                              Золото
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="item-content-news__image">
                      <picture>
                        <source
                          srcSet="img/latest-news/gold.webp"
                          type="image/webp"
                        />
                        <Image src={Gold} alt="Картинка" />
                      </picture>
                    </div>
                  </div>
                  <div className="item-content-news item-content-news_actual item-block hidden">
                    <div className="item-content-news__left">
                      <div className="item-content-news__wrap-link">
                        <a href="#" className="item-content-news__link">
                          <h3 className="item-content-news__title">
                            Gold Up And Dollar Down As The Fed Stays Firm
                          </h3>
                        </a>
                      </div>
                      <div className="item-content-news__bottom">
                        <span className="item-content-news__time time">
                          14 часов назад
                        </span>
                        <ul className="item-content-news__list-bottom list-bottom-search">
                          <li className="list-bottom-search__item-bottom">
                            <a
                              href="#"
                              className="list-bottom-search__link-bottom "
                            >
                              USD
                            </a>
                          </li>
                          <li className="list-bottom-search__item-bottom">
                            <a
                              href="#"
                              className="list-bottom-search__link-bottom"
                            >
                              Молдова
                            </a>
                          </li>
                          <li className="list-bottom-search__item-bottom">
                            <a
                              href="#"
                              className="list-bottom-search__link-bottom"
                            >
                              Золото
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="item-content-news__image">
                      <picture>
                        <source
                          srcSet="img/latest-news/gold.webp"
                          type="image/webp"
                        />
                        <Image src={Gold} alt="Картинка" />
                      </picture>
                    </div>
                  </div>
                </div>
                <button
                  className="actual-news__btn-more btn-more"
                  type="button"
                >
                  Еще 20 статей
                </button>
              </div>
            </div>
            <div className="currency__right sidebar">
              <aside className="currency__latest-news">
                <div className="latest-news latest-news_big">
                  <a
                    href="last-news.html"
                    className="latest-news__main-title-link"
                  >
                    <h3 className="latest-news__title latest-news__title_posts">
                      Статьи по данной тематике
                    </h3>
                  </a>
                  <LatestNews
                    id={"1"}
                    title="Молдова высылает сотрудника российского посольства"
                    text="Один из сотрудников посольства России в Кишиневе объявлен персоной нон
                  грата в знак протеста против открытия в Приднестровье избирательных участков по выборам президента
                  РФ, сообщила пресс-служба МИД Молдавии."
                    img={'https://finance.rambler.ru/business/52762596-fas-obratila-vnimanie-na-tseny-na-toplivo-v-dalnevostochnyh-regionah/'}
                    time="11:00"
                    category='economy'
                  />
                </div>
                <div className="latest-news__wrap">
                  <h3 className="latest-news__title latest-news__title_posts latest-news__title_posts2">
                    Также смотрят
                  </h3>
                  <table className="tabs-oprosi__table table-exchange table-exchange_currency">
                    <thead>
                      <tr>
                        <th>Инструмент</th>
                        <th>Курс</th>
                        <th>Изменение, %</th>
                        <th>Изменение</th>
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
                        <td className="table-exchange__change table-exchange__change_negative-currency">
                          0.016%
                        </td>
                        <td>0.017</td>
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
                        <td className="table-exchange__change table-exchange__change_negative-currency">
                          0.016%
                        </td>
                        <td>0.017</td>
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
                        <td className="table-exchange__change table-exchange__change_negative-currency">
                          0.016%
                        </td>
                        <td>0.017</td>
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
                        <td className="table-exchange__change table-exchange__change_negative-currency">
                          0.016%
                        </td>
                        <td>0.017</td>
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
                        <td className="table-exchange__change table-exchange__change_negative-currency">
                          0.016%
                        </td>
                        <td>0.017</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </aside>
            </div>
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
