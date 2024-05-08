import Image from "next/image";
import React, { useState } from "react";
import MainBlock2 from "@/img/main-block/02.png";
import LatestNews02 from "@/img/latest-news/02.png";
import { Header } from "@/components/Header/Header";
import { PageNews } from "@/components/PageNews/PageNews";
import { LatestNews } from "@/components/LatestNews/LatestNews";
import { Select } from "@/components/Select/Select";
import { NewsService } from '@/service/news.service';

export default async function LastNews() {
  const data = await NewsService.getLastNews()

  return (
    <div className="wrapper">
      <Header className={"header menu-visual"} />
      <main className="page">
        <section className="page__news news">
          <div className="news__container">
            <h1 className="news__title">Последние новости</h1>
            <div id="main-content" className="news__body body-sidebar">
              <div className="news__content content-news">
                <header className="content-news__header content-news__header_small-select">
                  <span className="content-news__number-news">
                    24534 статьи
                  </span>
                  <Select />
                </header>
                <div className="content-news__body">
                  {data?.news!.map(n => (
                    <PageNews key={n.id}
                              id = {n.id}
                              title= {n.title}
                              link1= 'Бизнес'
                              link2='СНГ'
                              link3="ЕС"
                              img={MainBlock2}
                              createdAtTime={n.createdAtTime}
                              category='business'
                    />
                  ))}
                </div>
                <br />
                <button
                  className="content-news__btn-more btn-more"
                  type="button"
                >
                  Еще 20 статей
                </button>
              </div>
              <div className="news__wrap-right sidebar">
                <aside className="news__latest-news latest-news latest-news_big">
                  <a
                    href="last-news.html"
                    className="latest-news__main-title-link"
                  >
                    <h3 className="latest-news__title latest-news__title_posts">
                      Статьи по теме
                    </h3>
                  </a>

                  <LatestNews
                    title="Молдова высылает сотрудника российского посольства"
                    text="Один из сотрудников посольства России в Кишиневе объявлен персоной нон
								грата в знак протеста против открытия в Приднестровье избирательных участков по выборам президента
								РФ, сообщила пресс-служба МИД Молдавии."
                    img={LatestNews02}
                    time="11:00"
                  />
                  <LatestNews
                    title="Молдова высылает сотрудника российского посольства"
                    text="Один из сотрудников посольства России в Кишиневе объявлен персоной нон
								грата в знак протеста против открытия в Приднестровье избирательных участков по выборам президента
								РФ, сообщила пресс-служба МИД Молдавии."
                    img={LatestNews02}
                    time="11:00"
                  />
                  <LatestNews
                    title="Молдова высылает сотрудника российского посольства"
                    text="Один из сотрудников посольства России в Кишиневе объявлен персоной нон
								грата в знак протеста против открытия в Приднестровье избирательных участков по выборам президента
								РФ, сообщила пресс-служба МИД Молдавии."
                    img={LatestNews02}
                    time="11:00"
                  />
                  <LatestNews
                    title="Молдова высылает сотрудника российского посольства"
                    text="Один из сотрудников посольства России в Кишиневе объявлен персоной нон
								грата в знак протеста против открытия в Приднестровье избирательных участков по выборам президента
								РФ, сообщила пресс-служба МИД Молдавии."
                    img={LatestNews02}
                    time="11:00"
                  />
                  <LatestNews
                    title="Молдова высылает сотрудника российского посольства"
                    text="Один из сотрудников посольства России в Кишиневе объявлен персоной нон
								грата в знак протеста против открытия в Приднестровье избирательных участков по выборам президента
								РФ, сообщила пресс-служба МИД Молдавии."
                    img={LatestNews02}
                    time="11:00"
                  />
                  <LatestNews
                    title="Молдова высылает сотрудника российского посольства"
                    text="Один из сотрудников посольства России в Кишиневе объявлен персоной нон
								грата в знак протеста против открытия в Приднестровье избирательных участков по выборам президента
								РФ, сообщила пресс-служба МИД Молдавии."
                    img={LatestNews02}
                    time="11:00"
                  />
                  <LatestNews
                    title="Молдова высылает сотрудника российского посольства"
                    text="Один из сотрудников посольства России в Кишиневе объявлен персоной нон
								грата в знак протеста против открытия в Приднестровье избирательных участков по выборам президента
								РФ, сообщила пресс-служба МИД Молдавии."
                    img={LatestNews02}
                    time="11:00"
                  />
                  <LatestNews
                    title="Молдова высылает сотрудника российского посольства"
                    text="Один из сотрудников посольства России в Кишиневе объявлен персоной нон
								грата в знак протеста против открытия в Приднестровье избирательных участков по выборам президента
								РФ, сообщила пресс-служба МИД Молдавии."
                    img={LatestNews02}
                    time="11:00"
                  />
                  <LatestNews
                    title="Молдова высылает сотрудника российского посольства"
                    text="Один из сотрудников посольства России в Кишиневе объявлен персоной нон
								грата в знак протеста против открытия в Приднестровье избирательных участков по выборам президента
								РФ, сообщила пресс-служба МИД Молдавии."
                    img={LatestNews02}
                    time="11:00"
                  />
                  <LatestNews
                    title="Молдова высылает сотрудника российского посольства"
                    text="Один из сотрудников посольства России в Кишиневе объявлен персоной нон
								грата в знак протеста против открытия в Приднестровье избирательных участков по выборам президента
								РФ, сообщила пресс-служба МИД Молдавии."
                    img={LatestNews02}
                    time="11:00"
                  />
                  <LatestNews
                    title="Молдова высылает сотрудника российского посольства"
                    text="Один из сотрудников посольства России в Кишиневе объявлен персоной нон
								грата в знак протеста против открытия в Приднестровье избирательных участков по выборам президента
								РФ, сообщила пресс-служба МИД Молдавии."
                    img={LatestNews02}
                    time="11:00"
                  />
                  <LatestNews
                    title="Молдова высылает сотрудника российского посольства"
                    text="Один из сотрудников посольства России в Кишиневе объявлен персоной нон
								грата в знак протеста против открытия в Приднестровье избирательных участков по выборам президента
								РФ, сообщила пресс-служба МИД Молдавии."
                    img={LatestNews02}
                    time="11:00"
                  />
                  <LatestNews
                    title="Молдова высылает сотрудника российского посольства"
                    text="Один из сотрудников посольства России в Кишиневе объявлен персоной нон
								грата в знак протеста против открытия в Приднестровье избирательных участков по выборам президента
								РФ, сообщила пресс-служба МИД Молдавии."
                    img={LatestNews02}
                    time="11:00"
                  />
                </aside>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
