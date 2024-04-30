"use client";

import Image from "next/image";
import React, { useState } from "react";
import Polls1 from "@/img/oprosi/01.png";
import { LatestNews } from "@/components/LatestNews/LatestNews";
import LatestNews02 from "@/img/latest-news/02.png";
import Arrow from "@/img/icons/arrow-select.svg";
import { Header } from "@/components/Header/Header";
import { PollsItem } from "@/components/PollsItem/PollsItem";
import { AnimatePresence } from "framer-motion";
import { PopupPolls } from "@/components/PopupPolls/PopupPolls";
import { Select as SelectMenu, SelectItem } from "@nextui-org/react";

export default function Polls() {
  const [option, setOption] = useState(0);
  return (
    <div className={`wrapper ${option == 1 ? "overflow" : ""} `}>
      <div className={` ${option == 1 ? "wrapper__popup blur" : ""}`}>
        <Header className={"header menu-visual"} />
        <main className={`page ${option == 1 ? "wrapper__popup blur" : ""}`}>
          <section className="page__oprosi oprosi">
            <div className="oprosi__container content-news">
              <div className="content-news__wrap-header">
                <header className="content-news__header content-news__header_oprosi">
                  <div className="w-[780px] bg-white !border-[1px] !border-black border-solid rounded-[12px] text-black mt-[50px] ">
                    <SelectMenu
                      className="text-black text-[25px] max-h-xs"
                      size="lg"
                      variant="bordered"
                      defaultSelectedKeys={[1]}
                    >
                      <SelectItem
                        key={1}
                        value="1"
                        className="text-black text-[25px] hidden"
                      >
                        Экономика
                      </SelectItem>
                      <SelectItem key={2} value="2">
                        Политика
                      </SelectItem>
                      <SelectItem key={3} value="3">
                        Мировые новости
                      </SelectItem>
                      <SelectItem key={4} value="4">
                        Бизнес
                      </SelectItem>
                    </SelectMenu>
                  </div>
                </header>
              </div>
              <div
                id="main-content"
                className="news__body  news__body_oprosi body-sidebar"
              >
                <div className="news__content content-news content-news_oprosi">
                  <span className="content-news__number-news content-news__number-news_oprosi">
                    24534 опроса
                  </span>
                  <div className="content-news__body tabs-oprosi tabs-oprosi_oprosi">
                    <PollsItem
                      title="Премьер-министр Молдовы одобрил вступление в ЕС"
                      img={Polls1}
                      agree="56%"
                      disagree="38%"
                      neutral="6%"
                      onClick={setOption}
                    />
                    <PollsItem
                      title="Премьер-министр Молдовы одобрил вступление в ЕС"
                      img={Polls1}
                      agree="56%"
                      disagree="38%"
                      neutral="6%"
                      onClick={setOption}
                    />
                    <PollsItem
                      title="Премьер-министр Молдовы одобрил вступление в ЕС"
                      img={Polls1}
                      agree="56%"
                      disagree="38%"
                      neutral="6%"
                      onClick={setOption}
                    />
                    <PollsItem
                      title="Премьер-министр Молдовы одобрил вступление в ЕС"
                      img={Polls1}
                      agree="56%"
                      disagree="38%"
                      neutral="6%"
                      onClick={setOption}
                    />
                    <PollsItem
                      title="Премьер-министр Молдовы одобрил вступление в ЕС"
                      img={Polls1}
                      agree="56%"
                      disagree="38%"
                      neutral="6%"
                      onClick={setOption}
                    />
                    <PollsItem
                      title="Премьер-министр Молдовы одобрил вступление в ЕС"
                      img={Polls1}
                      agree="56%"
                      disagree="38%"
                      neutral="6%"
                      onClick={setOption}
                    />
                    <PollsItem
                      title="Премьер-министр Молдовы одобрил вступление в ЕС"
                      img={Polls1}
                      agree="56%"
                      disagree="38%"
                      neutral="6%"
                      onClick={setOption}
                    />
                  </div>
                  <button
                    className="content-news__btn-more btn-more"
                    type="button"
                  >
                    Еще 5 опросов
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
        {option == 1 && (
          <PopupPolls onClick={setOption} classes="popup popup__active" />
        )}
      </AnimatePresence>
    </div>
  );
}
