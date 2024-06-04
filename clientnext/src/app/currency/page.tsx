"use client";
import { LatestNews } from "@/components/LatestNews/LatestNews";
import { CurrencyValue } from "@/components/СurrencyValue/CurrencyValue";
import Graph1 from "@/img/graphics/03.svg";
import Graph2 from "@/img/graphics/01.svg";
import Gold from "@/img/latest-news/gold.png";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CurrencyBody } from "@/components/CurrencyBody/CurrencyBody";
import { Header } from "@/components/Header/Header";
import Link from "next/link";
import { ICurrency, IMainNews, INews } from "@/types/types";
import { NewsService } from "@/service/news.service";
import { CurrencyElement } from "@/components/CurrencyElement/CurrencyElement";
import { PageNews } from "@/components/PageNews/PageNews";

export default function Currency() {
  const [option, setOption] = useState(0);
  const [graph, setGraph] = useState(0);
  const [currency, setCurrency] = useState<ICurrency>();
  const [bottomNews, setBottomNews] = useState<IMainNews[]>([]);
  const [sidebar, setSidebar] = useState<INews[]>([]);
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

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

  useEffect(() => {
    async function loadData() {
      if(page > 1) {
          setLoading(true)
          try{
            const newData = await NewsService.getEconomyNews(page, 10)
            setBottomNews(prevData => [...prevData, ...newData])
            setLoading(false)
            setHasMore(newData.length === 10)
          } catch (error) {
            console.log('Error loading data:', error);
          } finally {
            setLoading(false)
          }
      } else {
          try{
            const newData = await NewsService.getEconomyNews(page, 10)
            setBottomNews(newData)
            setLoading(false)
            setHasMore(newData.length === 10)
          } catch (error) {
            console.log('Error loading data:', error);
          }
        }
    }
    loadData()
  }, [page, option]);

  useEffect(() => {
    async function getSidebar() {
      const news = await NewsService.getSidebarNews('Policy')
      setSidebar(news)
    }

    getSidebar()
  }, []);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1)
  }

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
                      <Image width={50} height={25} src={"/img/icons/currency/usa.webp"} alt="Иконка" />
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
                  Актуальные новости
                </h2>
                <div className="actual-news__body">
                  {bottomNews?.map(n => (
                    <PageNews key={n.id}
                              id = {n.id}
                              title= {n.title}
                              img={n.fullImgUrl}
                              createdAtTime={n.createdAtTime}
                              category='economy'
                    />
                  ))}
                </div>
                <br />
                {loading && <p>Загрузка...</p>}
                {hasMore && !loading &&
                  <button onClick={handleLoadMore} className="actual-news__btn-more btn-more">
                    Ещё 10 статей
                  </button>}
              </div>
            </div>
            <div className="currency__right sidebar">
              <aside className="currency__latest-news">
                <div className="latest-news latest-news_big">
                  <Link
                    href={'/lastnews'}
                    className="latest-news__main-title-link"
                  >
                    <h3 className="latest-news__title latest-news__title_posts">
                      Также читают
                    </h3>
                  </Link>
                  {sidebar?.map(n => (
                    <LatestNews key={n.id}
                                id={n.id}
                                title={n.title}
                                text={n.description}
                                img={n.imgUrl}
                                time={n.createdAtTime}
                                category={n.category.toLowerCase()}
                    />
                  ))}
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
                    <CurrencyElement percentage={currency?.percentageEURToUSD!} difference={currency?.differenceEURToUSD!}
                              name={'USD'}
                              rate={Number(currency?.EURToUSD!).toFixed(4)!} img={'usa.webp'} />
                    <CurrencyElement percentage={currency?.percentageUSDToJPY!} difference={currency?.differenceUSDToJPY!}
                              name={'JPY'}
                              rate={Number(currency?.USDToJPY!).toFixed(4)!} img={'china.webp'} />
                    <CurrencyElement percentage={currency?.percentageGBPToUSD!} difference={currency?.differenceGBPToUSD!}
                              name={'USD'}
                              rate={Number(currency?.GBPToUSD!).toFixed(4)!} img={'usa.webp'} />
                    <CurrencyElement percentage={currency?.percentageUSDToRUB!} difference={currency?.differenceUSDToRUB!}
                              name={'RUB'}
                              rate={Number(currency?.USDToRUB!).toFixed(4)!} img={'rub.svg'} />
                    <CurrencyElement percentage={currency?.percentageEURToRUB!} difference={currency?.differenceEURToRUB!}
                              name={'RUB'}
                              rate={Number(currency?.EURToRUB!).toFixed(4)!} img={'rub.svg'} />
                    <CurrencyElement percentage={currency?.percentageUSDToRON!} difference={currency?.differenceUSDToRON!}
                              name={'RON'}
                              rate={Number(currency?.USDToRON!).toFixed(4)!} img={'roman.svg'} />
                    <CurrencyElement percentage={currency?.percentageEURToRON!} difference={currency?.differenceEURToRON!}
                              name={'RON'}
                              rate={Number(currency?.EURToRON!).toFixed(4)!} img={'roman.svg'} />
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