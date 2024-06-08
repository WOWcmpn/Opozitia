"use client";
import { LatestNews } from "@/components/LatestNews/LatestNews";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Header } from "@/components/Header/Header";
import Link from "next/link";
import { ICrypto, IFullCrypto, IMainCrypto, IMainNews, INews } from "@/types/types";
import { NewsService } from "@/service/news.service";
import { PageNews } from "@/components/PageNews/PageNews";
import { CryptoElement } from "@/components/CryptoElement/CryptoElement";
import { CryptoBody } from "@/components/CryptoBody/CryptoBody";

export default function Crypto({params} : {params: { id: string }}) {
  const [option, setOption] = useState<number>(0);
  const [graph, setGraph] = useState<number>(0);
  const [weekCrypto, setWeekCrypto] = useState<IFullCrypto[]>([]);
  const [monthCrypto, setMonthCrypto] = useState<IFullCrypto[]>([]);
  const [sixMonthCrypto, setSixMonthCrypto] = useState<IFullCrypto[]>([]);
  const [yearCrypto, setYearCrypto] = useState<IFullCrypto[]>([]);
  const [crypto, setCrypto] = useState<ICrypto>();
  const [mainCrypto, setMainCrypto] = useState<IMainCrypto>();
  const [bottomNews, setBottomNews] = useState<IMainNews[]>([]);
  const [sidebar, setSidebar] = useState<INews[]>([]);
  const [page, setPage] = useState<number>(1)
  const [cryptoPage, setCryptoPage] = useState<number>(2);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [img, setImg] = useState<string>('question.svg');

  useEffect(() => {
    async function loadUtils() {
      try {
        if(params.id === 'Bitcoin') setImg('btc.svg')
        if(params.id === 'Ethereum') setImg('eth.svg')
        if(params.id === 'BNB') setImg('bnb.svg')
        if(params.id === 'Notcoin') setImg('not.png')
        if(params.id === 'Solana') setImg('sol.svg')
        if(params.id === 'Litecoin') setImg('ltc.svg')
        if(params.id === 'Bitcoin%20Cash') setImg('bch.svg')
      } catch (err) {
        console.warn('Utils error', err);
      }
    }
    loadUtils()
  }, [params.id]);

  useEffect(() => {
    async function loadData() {
      try {
        const mainData = await NewsService.getCryptoById(params.id)
        setMainCrypto(mainData)
        const data = await NewsService.getLastCrypto()
        setCrypto(data)
        const weekData = await NewsService.getCryptoFull(params.id, 7)
        setWeekCrypto(weekData)
        const monthData = await NewsService.getCryptoFull(params.id, 30)
        setMonthCrypto(monthData)
        const sixMonthData = await NewsService.getCryptoFull(params.id, 182)
        setSixMonthCrypto(sixMonthData)
        const yearData = await NewsService.getCryptoFull(params.id, 365)
        setYearCrypto(yearData)
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
      const news = await NewsService.getSidebarNews('Policy')
      setSidebar(news)
    }

    getSidebar()
  }, []);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1)
  }

  const handleGraphic = (pageSize: number, graph: number) => {
    setCryptoPage(pageSize)
    setGraph(graph)
  }

  const avgWeek = ((weekCrypto.reduce((c, acc) => c + +acc.rate, 0)) / 7).toFixed(4)
  const minWeek = Math.min.apply(null, weekCrypto.map(c => +c.rate)).toFixed(4)
  const maxWeek = Math.max.apply(null, weekCrypto.map(c => +c.rate)).toFixed(4)
  const minMonth = Math.min.apply(null, monthCrypto.map(c => +c.rate)).toFixed(4)
  const maxMonth = Math.max.apply(null, monthCrypto.map(c => +c.rate)).toFixed(4)

  const avgWeekPercentage = ((weekCrypto.reduce((c, acc) => c + +acc.percentage, 0)) / 7).toFixed(2)
  const avgMonthPercentage = ((monthCrypto.reduce((c, acc) => c + +acc.percentage, 0)) / 30).toFixed(2)
  const avgSixMonthPercentage = ((sixMonthCrypto.reduce((c, acc) => c + +acc.percentage, 0)) / 182).toFixed(2)
  const avgYearPercentage = ((yearCrypto.reduce((c, acc) => c + +acc.percentage, 0)) / 365).toFixed(2)

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
                      <Image width={50} height={25} src={`/img/icons/currency/${img}`} alt="Иконка" />
                    </picture>
                    {params.id === 'Bitcoin%20Cash' ? (
                      'Bitcoin Cash'
                    ) : (
                      <div>
                        {params.id}
                      </div>
                    )}
                  </h1>
                  <div className="top-block-currency__change">
                      {mainCrypto ? (
                        <p className="top-block-currency__now">
                          {Number(mainCrypto?.rate).toFixed(4)}$
                        </p>
                      ) : (
                        <p className="top-block-currency__now">
                          Загрузка
                        </p>
                      )}
                    <span className="top-block-currency__change-info">
                      {mainCrypto ? (
                        <div>
                          {mainCrypto.difference}$
                        </div>
                        ) : (
                          ''
                      )}
                    </span>
                    <span className="top-block-currency__change-info">
                      {mainCrypto ? (
                        <div>
                          ({mainCrypto?.percentage}%)
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
                                {Number(weekCrypto[1]?.rate).toFixed(4)}
                              </span>
                            </div>
                            <div className="body-main-currency__item">
                              <span className="body-main-currency__name">
                                Настоящее значение
                              </span>
                              <span className="body-main-currency__info">
                                {Number(mainCrypto?.rate).toFixed(4)}
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
                                {Number(mainCrypto?.rate).toFixed(4)}
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
                                  {mainCrypto?.percentage}%
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
                                <CryptoBody
                                  name={params.id}
                                  page={cryptoPage}
                                />
                              )}

                              {graph == 1 && (
                                <CryptoBody
                                  name={params.id}
                                  page={cryptoPage}
                                />
                              )}

                              {graph == 2 && (
                                <CryptoBody
                                  name={params.id}
                                  page={cryptoPage}
                                />
                              )}

                              {graph == 3 && (
                                <CryptoBody
                                  name={params.id}
                                  page={cryptoPage}
                                />
                              )}

                              {graph == 4 && (
                                <CryptoBody
                                  name={params.id}
                                  page={cryptoPage}
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
                    <CryptoElement name={'Bitcoin'} img={'btc.svg'} rate={Number(crypto?.rateBTC!).toFixed(4)}
                                 percentage={crypto?.percentageBTC!} difference={crypto?.differenceBTC!} url={'Bitcoin'} />
                    <CryptoElement name={'Ethereum'} img={'eth.svg'} rate={Number(crypto?.rateETH!).toFixed(4)}
                                 percentage={crypto?.percentageETH!} difference={crypto?.differenceETH!} url={'Ethereum'} />
                    <CryptoElement name={'BNB'} img={'bnb.svg'} rate={Number(crypto?.rateBNB!).toFixed(4)}
                                 percentage={crypto?.percentageBNB!} difference={crypto?.differenceBNB!} url={'BNB'} />
                    <CryptoElement name={'Notcoin'} img={'not.png'} rate={Number(crypto?.rateNOT!).toFixed(4)}
                                 percentage={crypto?.percentageNOT!} difference={crypto?.differenceNOT!} url={'Notcoin'} />
                    <CryptoElement name={'Solana'} img={'sol.svg'} rate={Number(crypto?.rateSOL!).toFixed(4)}
                                 percentage={crypto?.percentageSOL!} difference={crypto?.differenceSOL!} url={'Solana'} />
                    <CryptoElement name={'Litecoin'} img={'ltc.svg'} rate={Number(crypto?.rateLTC!).toFixed(4)}
                                 percentage={crypto?.percentageLTC!} difference={crypto?.differenceLTC!} url={'Litecoin'} />
                    <CryptoElement name={'Bitcoin Cash'} img={'bch.svg'} rate={Number(crypto?.rateBCH!).toFixed(4)}
                                 percentage={crypto?.percentageBCH!} difference={crypto?.differenceBCH!} url={'Bitcoin Cash'} />
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
