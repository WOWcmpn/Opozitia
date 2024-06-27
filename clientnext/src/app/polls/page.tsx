"use client";
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import { LatestNews } from "@/components/LatestNews/LatestNews";
import Arrow from "@/img/icons/arrow-select.svg";
import { Header } from "@/components/Header/Header";
import { PollsItem } from "@/components/PollsItem/PollsItem";
import { AnimatePresence } from "framer-motion";
import { PopupPolls } from "@/components/PopupPolls/PopupPolls";
import { IHomeNews, IPollsNews } from "@/types/types";
import { NewsService } from '@/service/news.service';
import Link from 'next/link';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PopupAccount } from "@/components/PopupLogin/PopupAccount";
import { Search } from "@/components/Search/Search";
import { ToastContainer } from "react-toastify";
import { PopupNews } from '@/components/PopupNews/PopupNews';

export default function Polls() {
  const ItemPerPage = 10
  const [option, setOption] = useState<number>(0);
  const [login, setLogin] = useState<number>(0);
  const [search, setSearch] = useState<number>(0);
  const [createNews, setCreateNews] = useState<number>(0);
  const [mainNews, setMainNews] = useState<IPollsNews[]>([]);
  const [data, setData] = useState<IHomeNews | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [negative, setNegative] = useState<number>(0);
  const [positive, setPositive] = useState<number>(0);
  const [neutral, setNeutral] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    const loadData = async () => {
      if(page > 1) {
        if(category) {
          if(category !== mainNews[0].category) {
            setLoading(true)
            setPage(1)
            try{
              const newData = await NewsService.getNewsByCategory(page, ItemPerPage, category)
              setMainNews(newData)
              setLoading(false)
              setHasMore(newData.length === ItemPerPage)
            } catch (error) {
              console.log('Error loading data:', error);
            } finally {
              setLoading(false)
            }
          } else {
            setLoading(true)
            try{
              const newData = await NewsService.getNewsByCategory(page, ItemPerPage, category)
              setMainNews(prevData => [...prevData, ...newData])
              setLoading(false)
              setHasMore(newData.length === ItemPerPage)
            } catch (error) {
              console.log('Error loading data:', error);
            } finally {
              setLoading(false)
            }
          }
        } else {
          setLoading(true)
          try{
            const newData = await NewsService.getNewsByCategory(page, ItemPerPage)
            setMainNews(prevData => [...prevData, ...newData])
            setLoading(false)
            setHasMore(newData.length === ItemPerPage)
          } catch (error) {
            console.log('Error loading data:', error);
          } finally {
            setLoading(false)
          }
        }
      } else {
        if(category) {
          try{
            const newData = await NewsService.getNewsByCategory(page, ItemPerPage, category)
            setMainNews(newData)
            const dataAmount = await NewsService.getAmountOfCategory(category)
            setAmount(dataAmount)
            setLoading(false)
            setHasMore(newData.length === ItemPerPage)
          } catch (error) {
            console.log('Error loading data:', error);
          }
        } else {
          try{
            const newData = await NewsService.getNewsByCategory(page, ItemPerPage)
            setMainNews(newData)
            const dataAmount = await NewsService.getAmountOfCategory('Economy')
            setAmount(dataAmount)
            setLoading(false)
            setHasMore(newData.length === ItemPerPage)
          } catch (error) {
            console.log('Error loading data:', error);
          }
        }
      }
    }
    loadData()
  }, [page, category])

  useEffect(() => {
    async function getData() {
      const data = await NewsService.getNewsHome() ;
      setData(data);
    }
    getData();
  }, []);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1)
  }

  return (
    <>
      <ToastContainer position={'top-center'} autoClose={3000} />
    <div className={`wrapper ${option === 1 || login === 1 || search === 1 || createNews === 1 ? "overflow" : ""} `}>
      <div className={` ${option === 1 || login === 1 || search === 1 || createNews === 1 ? "wrapper__popup blur" : ""}`}>
        <Header onSearch={setSearch} onLogin={setLogin} onNews={setCreateNews} className={"header menu-visual"} />
        <main className={`page ${option == 1 ? "wrapper__popup blur" : ""}`}>
          <section className="page__oprosi oprosi">
            <div className="oprosi__container content-news">
              <div className="content-news__wrap-header">
                <header className="content-news__header content-news__header_oprosi">
                  <div className="w-[780px] bg-white !border-[1px] !border-black border-solid rounded-[12px] text-black mt-[50px] ">
                    <Select onValueChange={(category) => setCategory(category)}>
                      <SelectTrigger className="text-black text-[25px] max-h-xs">
                        <SelectValue placeholder="Экономика" />
                      </SelectTrigger>
                      <SelectContent className="bg-white rounded text-black">
                        <SelectGroup>
                          <SelectItem className="cursor-pointer" key={"Policy"} value="Policy">Политика</SelectItem>
                          <SelectItem className="cursor-pointer hover:bg-[#ededed]" key={"Economy"} value="Economy">Экономика</SelectItem>
                          <SelectItem className="cursor-pointer hover:bg-[#ededed]" key={"Business"} value="Business">Бизнес</SelectItem>
                          <SelectItem className="cursor-pointer hover:bg-[#ededed]" key={"World"} value="World">Мировые новости</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </header>
              </div>
              <div
                id="main-content"
                className="news__body  news__body_oprosi body-sidebar"
              >
                <div className="news__content content-news content-news_oprosi">
                  <span className="content-news__number-news content-news__number-news_oprosi">
                    {amount === 0 ? (
                        <div>
                          загрузка
                        </div>
                    ) : (
                      <div>{amount} опросов</div>
                    )}
                  </span>
                  <div className="content-news__body tabs-oprosi tabs-oprosi_oprosi">
                    {mainNews?.map(n => (
                      <PollsItem key={n.id}
                        id={n.id}
                        title={n.title}
                        img={n.fullImgUrl}
                        agree={+n.votePositive}
                        disagree={+n.voteNegative}
                        neutral={+n.voteNeutral}
                        onClick={setOption}
                        onPositiveVote={setPositive}
                        onNegativeVote={setNegative}
                        onNeutralVote={setNeutral}
                        onTitle={setTitle}
                      />
                    ))}
                  </div>
                  {loading && <p>Загрузка...</p>}
                  {hasMore && !loading &&
                    <button onClick={handleLoadMore} className="content-news__btn-more btn-more">
                      Ещё 10 статей
                    </button>}
                </div>
                <div className="news__wrap-right sidebar">
                  <aside className="news__latest-news latest-news latest-news_big">
                    <Link
                      href={"lastnews"}
                      className="latest-news__main-title-link"
                    >
                      <h3 className="latest-news__title latest-news__title_posts">
                        Статьи по теме
                      </h3>
                    </Link>
                    {data?.news!.map((n) => (
                      <LatestNews
                        key={n.id}
                        id={n.id}
                        title={n.title}
                        text={n.description}
                        img={n.imgUrl}
                        time={n.createdAtTime}
                        category={n.category.toLowerCase()}
                      />
                    ))}
                  </aside>
                </div>
              </div>
            </div>
          </section>
          <button
            type="button"
            data-goto-speed="500"
            data-goto=".wrapper"
            className="page__icon-top icon-top"
          >
            <Image src={Arrow} alt="Иконка" />
            <span className="icon-top__rings"></span>
            <span className="icon-top__rings"></span>
          </button>
        </main>
        <footer className="footer">
          <div className="footer__container">
            <p className="footer__text">©2024 Opozitia</p>
          </div>
        </footer>
      </div>
      <AnimatePresence>
        {login === 1 && <PopupAccount onPopupAccount={setLogin} />}
      </AnimatePresence>
      <AnimatePresence>
        {option === 1 && (
          <PopupPolls onClick={setOption} classes="popup popup__active" positive={positive}
                      negative={negative} neutral={neutral} title={title} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {search === 1 && <Search onSearch={setSearch} />}
      </AnimatePresence>
      <AnimatePresence>
        {createNews === 1 && <PopupNews onPopupNews={setCreateNews} />}
      </AnimatePresence>
    </div>
    </>
  );
}
