"use client";
import { LatestNews } from "@/components/LatestNews/LatestNews";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CurrencyBody } from "@/components/CurrencyBody/CurrencyBody";
import { Header } from "@/components/Header/Header";
import Link from "next/link";
import { ICurrency, IFullCurrency, IMainCurrency, IMainNews, INews } from "@/types/types";
import { NewsService } from "@/service/news.service";
import { CurrencyElement } from "@/components/CurrencyElement/CurrencyElement";
import { PageNews } from "@/components/PageNews/PageNews";

export default function Currency({params} : {params: { id: string }}) {
  const [option, setOption] = useState(0);
  const [graph, setGraph] = useState(0);
  const [weekCurrency, setWeekCurrency] = useState<IFullCurrency[]>([]);
  const [monthCurrency, setMonthCurrency] = useState<IFullCurrency[]>([]);
  const [sixMonthCurrency, setSixMonthCurrency] = useState<IFullCurrency[]>([]);
  const [yearCurrency, setYearCurrency] = useState<IFullCurrency[]>([]);
  const [currency, setCurrency] = useState<ICurrency>();
  const [mainCurrency, setMainCurrency] = useState<IMainCurrency>();
  const [bottomNews, setBottomNews] = useState<IMainNews[]>([]);
  const [sidebar, setSidebar] = useState<INews[]>([]);
  const [page, setPage] = useState<number>(1)
  const [currencyPage, setCurrencyPage] = useState<number>(2);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [img, setImg] = useState<string>('question.svg');

  const name1 = params.id.slice(0, 3)
  const name2 = params.id.slice(5, 8)

  useEffect(() => {
    async function loadData() {
      try {
        const mainData = await NewsService.getCurrencyById(params.id)
        setMainCurrency(mainData)
        const data = await NewsService.getCurrency()
        setCurrency(data)
        const weekData = await NewsService.getCurrencyParams(params.id, 7)
        setWeekCurrency(weekData)
        const monthData = await NewsService.getCurrencyParams(params.id, 30)
        setMonthCurrency(monthData)
        const sixMonthData = await NewsService.getCurrencyParams(params.id, 182)
        setSixMonthCurrency(sixMonthData)
        const yearData = await NewsService.getCurrencyParams(params.id, 365)
        setYearCurrency(yearData)
      } catch (err) {
        console.warn('Currency error: ', err);
      }
    }
    loadData()
  }, [params.id]);

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
      if(name2 === 'USD') setImg('usa.webp')
      if(name2 === 'JPY') setImg('china.webp')
      if(name2 === 'RUB') setImg('rub.svg')
      if(name2 === 'RON') setImg('roman.svg')
      const news = await NewsService.getSidebarNews('Policy')
      setSidebar(news)
    }

    getSidebar()
  }, [name2]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1)
  }

  const handleGraphic = (pageSize: number, graph: number) => {
    setCurrencyPage(pageSize)
    setGraph(graph)
  }

  const avgWeek = ((weekCurrency.reduce((c, acc) => c + +acc.rate, 0)) / 7).toFixed(4)
  const minWeek = Math.min.apply(null, weekCurrency.map(c => +c.rate)).toFixed(4)
  const maxWeek = Math.max.apply(null, weekCurrency.map(c => +c.rate)).toFixed(4)
  const minMonth = Math.min.apply(null, monthCurrency.map(c => +c.rate)).toFixed(4)
  const maxMonth = Math.max.apply(null, monthCurrency.map(c => +c.rate)).toFixed(4)

  const avgWeekPercentage = ((weekCurrency.reduce((c, acc) => c + +acc.percentage, 0)) / 7).toFixed(2)
  const avgMonthPercentage = ((monthCurrency.reduce((c, acc) => c + +acc.percentage, 0)) / 30).toFixed(2)
  const avgSixMonthPercentage = ((sixMonthCurrency.reduce((c, acc) => c + +acc.percentage, 0)) / 182).toFixed(2)
  const avgYearPercentage = ((yearCurrency.reduce((c, acc) => c + +acc.percentage, 0)) / 365).toFixed(2)

  return (
    <div className="wrapper">
      <Header className={"header menu-visual"} />
      <main className="page page-currency">
        <section className="page__currency currency">
          <div className="currency__container">
            <div className="currency__left">
              <div className="currency__main-block main-block-currency">
                <div className="main-block-currency__top top-block-currency">
                  <h1 className="top-block-currency__title">
                    <picture>
                      <Image width={50} height={25} src={`/img/icons/currency/${img}`} alt="Иконка" />
                    </picture>
                    {name1} / {name2}
                  </h1>
                  <div className="top-block-currency__change">
                    <p className="top-block-currency__now">
                      {mainCurrency ? (
                        <div>
                          {Number(mainCurrency?.rate).toFixed(4)}
                        </div>
                      ) : (
                        'Загрузка'
                      )}
                    </p>
                    <span className="top-block-currency__change-info">
                      {mainCurrency ? (
                        <div>
                          {mainCurrency?.difference}
                        </div>
                      ) : (
                        ''
                      )}
                    </span>
                    <span className="top-block-currency__change-info">
                      {mainCurrency ? (
                        <div>
                          ({mainCurrency?.percentage}%)
                        </div>
                      ) : (
                        ''
                      )}
                    </span>
                  </div>
                  <span className="top-block-currency__time">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
                <div data-tabs={''} className="main-block-currency__tabs">
                  <nav
                    data-tabs-titles={''}
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
                  <div data-tabs-body={''} className="main-block-currency__content">
                    {option == 1 ? (
                      <div className="main-block-currency__body body-main-currency">
                        <div className="body-main-currency__wrap-columns">
                          <div className="body-main-currency__column">
                            <div className="body-main-currency__item">
                              <span className="body-main-currency__name">
                                Прошлое значение
                              </span>
                              <span className="body-main-currency__info">
                                {Number(weekCurrency[1]?.rate).toFixed(4)}
                              </span>
                            </div>
                            <div className="body-main-currency__item">
                              <span className="body-main-currency__name">
                                Настоящее значение
                              </span>
                              <span className="body-main-currency__info">
                                {Number(mainCurrency?.rate).toFixed(4)}
                              </span>
                            </div>
                            <div className="body-main-currency__item">
                              <span className="body-main-currency__name">
                                Среднее значение
                              </span>
                              <span className="body-main-currency__info">
                                {avgWeek}
                              </span>
                            </div>
                          </div>
                          <div className="body-main-currency__column">
                            <div className="body-main-currency__item">
                              <span className="body-main-currency__name">
                                Недельный диапазон
                              </span>
                              <span className="body-main-currency__info">
                                {minWeek} - {maxWeek}
                              </span>
                            </div>
                            <div className="body-main-currency__item">
                              <span className="body-main-currency__name">
                                Месячный диапазон
                              </span>
                              <span className="body-main-currency__info">
                                {minMonth} - {maxMonth}
                              </span>
                            </div>
                            <div className="body-main-currency__item">
                              <span className="body-main-currency__name">
                                Прямо сейчас
                              </span>
                              <span className="body-main-currency__info">
                                {Number(mainCurrency?.rate).toFixed(4)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="main-block-currency__body body-main-currency">
                        <div data-tabs={''} className="body-main-currency">
                          <div className="body-main-currency__wrap-currency">
                            <nav
                              data-tabs-titles={''}
                              className="body-main-currency__navigation"
                            >
                              <button
                                type="button"
                                className={`body-main-currency__title ${
                                  graph == 0 ? "_tab-active" : ""
                                } `}
                                onClick={() => handleGraphic(2, 0)}
                              >
                                <span className="body-main-currency__title-info">
                                  Сегодня
                                </span>{" "}
                                <br />
                                <span className="body-main-currency__number">
                                  {mainCurrency?.percentage}%
                                </span>{" "}
                              </button>
                              <button
                                type="button"
                                className={`body-main-currency__title ${
                                  graph == 1 ? "_tab-active" : ""
                                } `}
                                onClick={() => handleGraphic(7, 1)}
                              >
                                <span className="body-main-currency__title-info">
                                  1 неделя
                                </span>{" "}
                                <br />
                                <span className="body-main-currency__number">
                                  {avgWeekPercentage}%
                                </span>{" "}
                              </button>
                              <button
                                type="button"
                                className={`body-main-currency__title ${
                                  graph == 2 ? "_tab-active" : ""
                                } `}
                                onClick={() => handleGraphic(30, 2)}
                              >
                                <span className="body-main-currency__title-info">
                                  1 месяц
                                </span>{" "}
                                <br />
                                <span className="body-main-currency__number">
                                  {avgMonthPercentage}%
                                </span>
                              </button>
                              <button
                                type="button"
                                className={`body-main-currency__title ${
                                  graph == 3 ? "_tab-active" : ""
                                } `}
                                onClick={() => handleGraphic(182, 3)}
                              >
                                <span className="body-main-currency__title-info">
                                  6 месяцев
                                </span>{" "}
                                <br />
                                <span className="body-main-currency__number">
                                  {avgSixMonthPercentage}%
                                </span>
                              </button>
                              <button
                                type="button"
                                className={`body-main-currency__title ${
                                  graph == 4 ? "_tab-active" : ""
                                } `}
                                onClick={() => handleGraphic(365, 4)}
                              >
                                <span className="body-main-currency__title-info">
                                  1 год
                                </span>{" "}
                                <br />
                                <span className="body-main-currency__number">
                                  {avgYearPercentage}%
                                </span>
                              </button>
                              {/*<button*/}
                              {/*  type="button"*/}
                              {/*  className={`body-main-currency__title ${*/}
                              {/*    graph == 5 ? "_tab-active" : ""*/}
                              {/*  } `}*/}
                              {/*  onClick={() => setGraph(5)}*/}
                              {/*>*/}
                              {/*  <span className="body-main-currency__title-info">*/}
                              {/*    5 лет*/}
                              {/*  </span>{" "}*/}
                              {/*  <br />*/}
                              {/*  <span className="body-main-currency__number">*/}
                              {/*    54.21%*/}
                              {/*  </span>*/}
                              {/*</button>*/}
                            </nav>
                            <div
                              data-tabs-body={''}
                              className="body-main-currency__content"
                            >
                              {graph == 0 && (
                                <CurrencyBody
                                  name={params.id}
                                  page={currencyPage}
                                />
                              )}

                              {graph == 1 && (
                                <CurrencyBody
                                  name={params.id}
                                  page={currencyPage}
                                />
                              )}

                              {graph == 2 && (
                                <CurrencyBody
                                  name={params.id}
                                  page={currencyPage}
                                />
                              )}

                              {graph == 3 && (
                                <CurrencyBody
                                  name={params.id}
                                  page={currencyPage}
                                />
                              )}

                              {graph == 4 && (
                                <CurrencyBody
                                  name={params.id}
                                  page={currencyPage}
                                />
                              )}

                              {/*{graph == 5 && (*/}
                              {/*  <CurrencyBody*/}
                              {/*    colr={price}*/}
                              {/*    colb={time}*/}
                              {/*    graph1={Graph2}*/}
                              {/*    graph2={Graph1}*/}
                              {/*  />*/}
                              {/*)}*/}
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
                              name={'USD'} url={'EURToUSD'}
                              rate={Number(currency?.EURToUSD!).toFixed(4)!} img={'usa.webp'} />
                    <CurrencyElement percentage={currency?.percentageUSDToJPY!} difference={currency?.differenceUSDToJPY!}
                              name={'JPY'} url={'USDToJPY'}
                              rate={Number(currency?.USDToJPY!).toFixed(4)!} img={'china.webp'} />
                    <CurrencyElement percentage={currency?.percentageGBPToUSD!} difference={currency?.differenceGBPToUSD!}
                              name={'USD'} url={'GBPToUSD'}
                              rate={Number(currency?.GBPToUSD!).toFixed(4)!} img={'usa.webp'} />
                    <CurrencyElement percentage={currency?.percentageUSDToRUB!} difference={currency?.differenceUSDToRUB!}
                              name={'RUB'} url={'USDToRUB'}
                              rate={Number(currency?.USDToRUB!).toFixed(4)!} img={'rub.svg'} />
                    <CurrencyElement percentage={currency?.percentageEURToRUB!} difference={currency?.differenceEURToRUB!}
                              name={'RUB'} url={'EURToRUB'}
                              rate={Number(currency?.EURToRUB!).toFixed(4)!} img={'rub.svg'} />
                    <CurrencyElement percentage={currency?.percentageUSDToRON!} difference={currency?.differenceUSDToRON!}
                              name={'RON'} url={'USDToRON'}
                              rate={Number(currency?.USDToRON!).toFixed(4)!} img={'roman.svg'} />
                    <CurrencyElement percentage={currency?.percentageEURToRON!} difference={currency?.differenceEURToRON!}
                              name={'RON'} url={'EURToRON'}
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
