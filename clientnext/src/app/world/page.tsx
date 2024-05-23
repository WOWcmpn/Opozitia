"use client"
import React, { useEffect, useState } from "react";
import { Header } from "@/components/Header/Header";
import { PageNews } from "@/components/PageNews/PageNews";
import { LatestNews } from "@/components/LatestNews/LatestNews";
import { Select } from "@/components/Select/Select";
import { NewsService } from '@/service/news.service';
import Link from 'next/link';
import { INews } from "@/types/types";

export default function GlobalNews() {
  const ItemPerPage = 10
  const [data, setData] = useState<INews[]>([])
  const [sidebar, setSidebar] = useState<INews[]>([]);
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try{
        const newData = await NewsService.getWorldNews(page, ItemPerPage)
        setData(prevData => [...prevData, ...newData])
        setLoading(false)
        setHasMore(newData.length === ItemPerPage)
      } catch (error) {
        console.log('Error loading data:', error);
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [page])

  useEffect(() => {
    async function getSidebar() {
      const news = await NewsService.getSidebarNews('World')
      setSidebar(news)
    }

    getSidebar()
  }, []);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1)
  }

  return (
    <>
      <Header className={"header menu-visual"} />
      <br />
      <br />
      <main className="page">
        <section className="page__news news">
          <div className="news__container">
            <h1 className="news__title">Мировые новости</h1>
            <div id="main-content" className="news__body body-sidebar">
              <div className="news__content content-news">
                <header className="content-news__header content-news__header_small-select">
                  <span className="content-news__number-news">
                    {data?.length} статей
                  </span>
                  <Select />
                </header>
                <div className="content-news__body">
                  {data?.map(n => (
                    <PageNews key={n.id}
                              id = {n.id}
                              title= {n.title}
                              link1= 'Мир'
                              link2='СНГ'
                              link3="ЕС"
                              img={n.imgUrl}
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
    </>
  );
}
