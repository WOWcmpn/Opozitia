"use client"
import React, { useEffect, useState } from "react";
import { Header } from "@/components/Header/Header";
import { PageNews } from "@/components/PageNews/PageNews";
import { LatestNews } from "@/components/LatestNews/LatestNews";
import { NewsService } from '@/service/news.service';
import Link from 'next/link';
import { IMainNews, INews } from "@/types/types";
import { AnimatePresence } from "framer-motion";
import { Search } from "@/components/Search/Search";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PopupAccount } from "@/components/PopupLogin/PopupAccount";
import { PopupNews } from '@/components/PopupNews/PopupNews';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function GlobalNews() {
  const ItemPerPage = 10
  const [data, setData] = useState<IMainNews[]>([])
  const [amount, setAmount] = useState<number>(0);
  const [sidebar, setSidebar] = useState<INews[]>([]);
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [search, setSearch] = useState<number>(0);
  const [login, setLogin] = useState<number>(0);
  const [createNews, setCreateNews] = useState<number>(0);
  const [option, setOption] = useState<string>('new');
  const [prevOption, setPrevOption] = useState<string>('');

  useEffect(() => {
    const loadData = async () => {
      if(page > 1) {
        if(option === prevOption) {
          setLoading(true)
          try{
            const newData = await NewsService.getWorldNews(page, ItemPerPage, option)
            setData(prevData => [...prevData, ...newData])
            setLoading(false)
            setHasMore(newData.length === ItemPerPage)
          } catch (error) {
            console.log('Error loading data:', error);
          } finally {
            setLoading(false)
          }
        } else {
          setData([])
          setLoading(true)
          try{
            const newData = await NewsService.getWorldNews(page, ItemPerPage, option)
            setData(newData)
            setPage(1)
            setLoading(false)
            setHasMore(newData.length === ItemPerPage)
          } catch (error) {
            console.log('Error loading data:', error);
          } finally {
            setLoading(false)
          }
        }
      } else {
        try{
          const newData = await NewsService.getWorldNews(page, ItemPerPage, option)
          setData(newData)
          const amount = await NewsService.getAmountOfCategory('World')
          setAmount(amount)
          setLoading(false)
          setHasMore(newData.length === ItemPerPage)
        } catch (error) {
          console.log('Error loading data:', error);
        }
      }
    }
    loadData()
  }, [page, option, prevOption])

  useEffect(() => {
    async function getSidebar() {
      const news = await NewsService.getSidebarNews('World')
      setSidebar(news)
    }

    getSidebar()
  }, []);

  const handleLoadMore = () => {
    setPrevOption(option)
    setPage(prevPage => prevPage + 1)
  }

  return (
    <>
      <ToastContainer position={'top-center'} autoClose={2500} />
      <div
        className={`home ${
          search === 1 || login === 1 || createNews === 1
            ? "overflow" : ""
        } w-[100vw]`}
      >
        <div
          className={`wrapper ${
            search === 1 || login === 1 || createNews === 1
              ? "wrapper__popup blur"
              : ""
          }`}
        >
      <Header onSearch={setSearch} onLogin={setLogin} onNews={setCreateNews} className={"header menu-visual"} />
      <br />
      <br />
      <main className="page page-news">
        <section className="page__news news">
          <div className="news__container">
            <h1 className="news__title">Мировые новости</h1>
            <div id="main-content" className="news__body body-sidebar">
              <div className="news__content content-news">
                <div className="content-news__header content-news__header_small-select">
                  <span className="content-news__number-news">
                    {amount} статей
                  </span>
                  <div className="w-[200px] bg-white !border-[1px] !border-black border-solid rounded-[12px] text-black">
                    <Select defaultValue={'new'} onValueChange={(option) => setOption(option)}>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Сортировать" />
                      </SelectTrigger>
                      <SelectContent className="bg-white rounded">
                        <SelectGroup>
                          <SelectItem className="cursor-pointer" key={"new"} value="new">Новые</SelectItem>
                          <SelectItem className="cursor-pointer" key={"popular"} value="popular">Популярные</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="content-news__body">
                  {data?.map(n => (
                    <PageNews key={n.id}
                              id = {n.id}
                              title= {n.title}
                              img={n.fullImgUrl}
                              createdAtTime={n.createdAtTime}
                              category='world'
                    />
                  ))}
                </div>
                <br />
                {loading && <p>Загрузка...</p>}
                {hasMore && !loading &&
                  <button onClick={handleLoadMore} className="content-news__btn-more btn-more">
                    Ещё 10 статей
                  </button>}
              </div>
              <div className="news__wrap-right sidebar">
                <aside className="news__latest-news latest-news latest-news_big">
                  <Link href={'/lastnews'} className="latest-news__main-title-link">
                    <h3 className="latest-news__title latest-news__title_posts">
                      Статьи по теме
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
                </aside>
              </div>
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
        <AnimatePresence>
          {login == 1 && <PopupAccount onPopupAccount={setLogin} />}
        </AnimatePresence>
        <AnimatePresence>
          {search == 1 && <Search onSearch={setSearch} />}
        </AnimatePresence>
        <AnimatePresence>
          {createNews == 1 && <PopupNews onPopupNews={setCreateNews} />}
        </AnimatePresence>
      </div>
    </>
  );
}
