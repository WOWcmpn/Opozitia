"use client"
import React, { useEffect, useState } from "react";
import { Header } from "@/components/Header/Header";
import { PageNews } from "@/components/PageNews/PageNews";
import { LatestNews } from "@/components/LatestNews/LatestNews";
import { NewsService } from "@/service/news.service";
import Link from 'next/link';
import { IMainNews, INews } from "@/types/types";
import { AnimatePresence } from "framer-motion";
import { Search } from "@/components/Search/Search";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Economy() {
  const ItemPerPage = 10
  const [data, setData] = useState<IMainNews[]>([])
  const [sidebar, setSidebar] = useState<INews[]>([]);
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState(0);
  const [option, setOption] = useState('');

  useEffect(() => {
    const loadData = async () => {
      if(page > 1) {
        if(option) {
          setLoading(true)
          try{
            const newData = await NewsService.getEconomyNews(page, ItemPerPage, option)
            setData(prevData => [...prevData, ...newData])
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
            const newData = await NewsService.getEconomyNews(page, ItemPerPage)
            setData(prevData => [...prevData, ...newData])
            setLoading(false)
            setHasMore(newData.length === ItemPerPage)
          } catch (error) {
            console.log('Error loading data:', error);
          } finally {
            setLoading(false)
          }
        }
      } else {
        if(option) {
          try{
            const newData = await NewsService.getEconomyNews(page, ItemPerPage, option)
            setData(newData)
            setLoading(false)
            setHasMore(newData.length === ItemPerPage)
          } catch (error) {
            console.log('Error loading data:', error);
          }
        } else {
          try{
            const newData = await NewsService.getEconomyNews(page, ItemPerPage)
            setData(newData)
            setLoading(false)
            setHasMore(newData.length === ItemPerPage)
          } catch (error) {
            console.log('Error loading data:', error);
          }
        }
      }
    }
    loadData()
  }, [page, option])

  useEffect(() => {
    async function getSidebar() {
      const news = await NewsService.getSidebarNews('Economy')
      setSidebar(news)
    }

    getSidebar()
  }, []);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1)
  }

  return (
    <>
      <div
        className={`home ${
          search == 1 ? "overflow" : ""
        } w-[100vw]`}
      >
        <div
          className={`wrapper ${
            search == 1
              ? "wrapper__popup blur"
              : ""
          }`}
        >
      <Header onSearch={setSearch} className={"header menu-visual"} />
      <br />
      <br />
      <main className="page">
        <section className="page__news news">
          <div className="news__container">
            <h1 className="news__title">Экономика</h1>
            <div id="main-content" className="news__body body-sidebar">
              <div className="news__content content-news">
                <header className="content-news__header content-news__header_small-select">
                  <span className="content-news__number-news">
                    {data?.length} статей
                  </span>
                  <div className="w-[280px] bg-white !border-[1px] !border-black border-solid rounded-[12px] text-black">
                    <Select onValueChange={(option) => setOption(option)}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="За период" />
                      </SelectTrigger>
                      <SelectContent className="bg-white rounded">
                        <SelectGroup>
                          {/*<SelectLabel>Fruits</SelectLabel>*/}
                          <SelectItem className="cursor-pointer" key={"week"} value="week">За неделю</SelectItem>
                          <SelectItem className="cursor-pointer hover:bg-[#ededed]" key={"month"} value="month">За месяц</SelectItem>
                          <SelectItem className="cursor-pointer hover:bg-[#ededed]" key={"year"} value="year">За год</SelectItem>
                          <SelectItem className="cursor-pointer hover:bg-[#ededed]" key={"all"} value="all">За всё время</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </header>
                <div className="content-news__body">
                  {data?.map((n) => (
                    <PageNews
                      key={n.id}
                      id={n.id}
                      title={n.title}
                      link1="Экономика"
                      link2="СНГ"
                      link3="ЕС"
                      img={n.fullImgUrl}
                      createdAtTime={n.createdAtTime}
                      category="economy"
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
        </div>
        <AnimatePresence>
          {search == 1 && <Search onSearch={setSearch} />}
        </AnimatePresence>
      </div>
    </>
  );
}
