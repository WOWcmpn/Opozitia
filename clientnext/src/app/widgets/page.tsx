"use client";

import Image from "next/image";
import React, { useRef } from "react";
import Sun from "@/img/icons/sun.svg";
import ChampionshipImg from "@/img/icons/championship.png";
import Team from "@/img/icons/team.png";
import ArrowL from "@/img/icons/arrow-left-calendar.svg";
import ArrowR from "@/img/icons/arrow-right-calendar.svg";
import Location from "@/img/icons/location.svg";
import Wind from "@/img/icons/wind.svg";
import Humidity1 from "@/img/icons/humidity.svg";
import Humidity2 from "@/img/icons/humidity2.svg";
import { Header } from "@/components/Header/Header";
import { Swiper as SwiperType } from "swiper";
import { Championship } from "@/components/Championship/Championship";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

export default function Widgets() {
  const swiperRef = useRef<SwiperType>();

  const champs1 = [
    {
      num: 1,
      img: Team,
      name: "Байер",
      games: 38,
      scores: 115,
    },
    {
      num: 2,
      img: Team,
      name: "Байер",
      games: 38,
      scores: 115,
    },
    {
      num: 3,
      img: Team,
      name: "Байер",
      games: 38,
      scores: 115,
    },
    {
      num: 4,
      img: Team,
      name: "Байер",
      games: 38,
      scores: 115,
    },
    {
      num: 5,
      img: Team,
      name: "Байер",
      games: 38,
      scores: 115,
    },
    {
      num: 6,
      img: Team,
      name: "Байер",
      games: 38,
      scores: 115,
    },
    {
      num: 7,
      img: Team,
      name: "Байер",
      games: 38,
      scores: 115,
    },
  ];
  const champs2 = [
    {
      num: 1,
      img: Team,
      name: "Барселона",
      games: 38,
      scores: 115,
    },
    {
      num: 2,
      img: Team,
      name: "Барселона",
      games: 38,
      scores: 115,
    },
    {
      num: 3,
      img: Team,
      name: "Барселона",
      games: 38,
      scores: 115,
    },
    {
      num: 4,
      img: Team,
      name: "Барселона",
      games: 38,
      scores: 115,
    },
    {
      num: 5,
      img: Team,
      name: "Барселона",
      games: 38,
      scores: 115,
    },
    {
      num: 6,
      img: Team,
      name: "Барселона",
      games: 38,
      scores: 115,
    },
    {
      num: 7,
      img: Team,
      name: "Барселона",
      games: 38,
      scores: 115,
    },
  ];

  return (
    <div className="wrapper">
      <Header className={"header menu-visual"} />
      <main className="page">
        <section className="page__vidgets vidgets">
          <div className="vidgets__container">
            <div className="vidgets__body">
              <div className="vidgets__left left-vidgets">
                <div className="left-vidgets__events events-left-vidgets">
                  <h3 className="events-left-vidgets__title">События дня</h3>
                  <ul className="events-left-vidgets__list">
                    <li className="events-left-vidgets__item events-left-vidgets__item_1">
                      День конституции Молдовы
                    </li>
                    <li className="events-left-vidgets__item events-left-vidgets__item_2">
                      Новый год по лунному календарю
                    </li>
                    <li className="events-left-vidgets__item events-left-vidgets__item_3">
                      Европейский день безопасного Интернета
                    </li>
                    <li className="events-left-vidgets__item events-left-vidgets__item_4">
                      Всемирный день зернобобовых
                    </li>
                    <li className="events-left-vidgets__item events-left-vidgets__item_1">
                      День конституции Молдовы
                    </li>
                    <li className="events-left-vidgets__item events-left-vidgets__item_2">
                      Новый год по лунному календарю
                    </li>
                    <li className="events-left-vidgets__item events-left-vidgets__item_3">
                      Европейский день безопасного Интернета
                    </li>
                    <li className="events-left-vidgets__item events-left-vidgets__item_4">
                      Всемирный день зернобобовых
                    </li>
                    <li className="events-left-vidgets__item events-left-vidgets__item_1">
                      День конституции Молдовы
                    </li>
                    <li className="events-left-vidgets__item events-left-vidgets__item_2">
                      Новый год по лунному календарю
                    </li>
                    <li className="events-left-vidgets__item events-left-vidgets__item_3">
                      Европейский день безопасного Интернета
                    </li>
                    <li className="events-left-vidgets__item events-left-vidgets__item_4">
                      Всемирный день зернобобовых
                    </li>
                  </ul>
                </div>
                <div className="left-vidgets__wheather wheather-left-vidgets">
                  <div className="wheather-left-vidgets__top-location">
                    Москва <Image src={Location} alt="Иконка" />
                  </div>
                  <div className="wheather-left-vidgets__top">
                    <div className="wheather-left-vidgets__image">
                      <Image src={Sun} alt="Иконка" />
                    </div>
                    <div className="wheather-left-vidgets__temp-block">
                      <span className="wheather-left-vidgets__temp-today">
                        11°
                      </span>
                      <p className="wheather-left-vidgets__temp-allday">
                        16° / 6°
                      </p>
                    </div>
                    <ul className="wheather-left-vidgets__temp-more-list">
                      <li className="wheather-left-vidgets__temp-more-item">
                        <Image src={Wind} alt="Иконка" />
                        <span>35 м/с</span>
                      </li>
                      <li className="wheather-left-vidgets__temp-more-item">
                        <Image src={Humidity1} alt="Иконка" />
                        <span>44%</span>
                      </li>
                      <li className="wheather-left-vidgets__temp-more-item">
                        <Image src={Humidity2} alt="Иконка" />
                        <span>31%</span>
                      </li>
                    </ul>
                  </div>
                  <div className="wheather-left-vidgets__body">
                    <h3 className="wheather-left-vidgets__title">
                      Погода на неделю:
                    </h3>
                    <ul className="wheather-left-vidgets__list-week-temp">
                      <li className="wheather-left-vidgets__item-week-temp">
                        <span className="wheather-left-vidgets__date">
                          01.02.2024
                        </span>
                        <span className="wheather-left-vidgets__temp-week-day">
                          16° <Image src={Sun} alt="Иконка" />
                        </span>
                        <span className="wheather-left-vidgets__temp-week-day">
                          6° <Image src={Sun} alt="Иконка" />
                        </span>
                      </li>
                      <li className="wheather-left-vidgets__item-week-temp">
                        <span className="wheather-left-vidgets__date">
                          01.02.2024
                        </span>
                        <span className="wheather-left-vidgets__temp-week-day">
                          16° <Image src={Sun} alt="Иконка" />
                        </span>
                        <span className="wheather-left-vidgets__temp-week-day">
                          6° <Image src={Sun} alt="Иконка" />
                        </span>
                      </li>
                      <li className="wheather-left-vidgets__item-week-temp">
                        <span className="wheather-left-vidgets__date">
                          01.02.2024
                        </span>
                        <span className="wheather-left-vidgets__temp-week-day">
                          16° <Image src={Sun} alt="Иконка" />
                        </span>
                        <span className="wheather-left-vidgets__temp-week-day">
                          6° <Image src={Sun} alt="Иконка" />
                        </span>
                      </li>
                      <li className="wheather-left-vidgets__item-week-temp">
                        <span className="wheather-left-vidgets__date">
                          01.02.2024
                        </span>
                        <span className="wheather-left-vidgets__temp-week-day">
                          16° <Image src={Sun} alt="Иконка" />
                        </span>
                        <span className="wheather-left-vidgets__temp-week-day">
                          6° <Image src={Sun} alt="Иконка" />
                        </span>
                      </li>
                      <li className="wheather-left-vidgets__item-week-temp">
                        <span className="wheather-left-vidgets__date">
                          01.02.2024
                        </span>
                        <span className="wheather-left-vidgets__temp-week-day">
                          16° <Image src={Sun} alt="Иконка" />
                        </span>
                        <span className="wheather-left-vidgets__temp-week-day">
                          6° <Image src={Sun} alt="Иконка" />
                        </span>
                      </li>
                      <li className="wheather-left-vidgets__item-week-temp">
                        <span className="wheather-left-vidgets__date">
                          01.02.2024
                        </span>
                        <span className="wheather-left-vidgets__temp-week-day">
                          16° <Image src={Sun} alt="Иконка" />
                        </span>
                        <span className="wheather-left-vidgets__temp-week-day">
                          6° <Image src={Sun} alt="Иконка" />
                        </span>
                      </li>
                      <li className="wheather-left-vidgets__item-week-temp">
                        <span className="wheather-left-vidgets__date">
                          01.02.2024
                        </span>
                        <span className="wheather-left-vidgets__temp-week-day">
                          16° <Image src={Sun} alt="Иконка" />
                        </span>
                        <span className="wheather-left-vidgets__temp-week-day">
                          6° <Image src={Sun} alt="Иконка" />
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="left-vidgets__championship championship">
                  <div className="championship__slider swiper">
                    <div className="championship__wrap-btns">
                      <button
                        type="button"
                        className="championship__swiper-button-prev championship-btn championship-btn_left"
                        onClick={() => swiperRef.current?.slidePrev()}
                      ></button>
                      <button
                        type="button"
                        className="championship__swiper-button-next championship-btn"
                        onClick={() => swiperRef.current?.slideNext()}
                      ></button>
                    </div>
                    <div className="championship__wrapper swiper-wrapper">
                      <Swiper
                        modules={[Navigation]}
                        slidesPerView={1}
                        loop={false}
                        simulateTouch={false}
                        speed={200}
                        onBeforeInit={(swiper) => {
                          swiperRef.current = swiper;
                        }}
                      >
                        <SwiperSlide>
                          <Championship
                            title="Чемпионат Германии"
                            img={ChampionshipImg}
                            champs={champs1}
                          />
                        </SwiperSlide>
                        <SwiperSlide>
                          <Championship
                            title="Чемпионат Испании"
                            img={ChampionshipImg}
                            champs={champs1}
                          />
                        </SwiperSlide>
                      </Swiper>
                    </div>
                  </div>
                </div>
              </div>
              <div
                data-da=".vidgets__left,660"
                className="vidgets__calendar calendar-vidgets"
              >
                <header className="calendar-vidgets__header">
                  <p className="calendar-vidgets__current-date"></p>
                  <div className="calendar-vidgets__icons">
                    <span id="prev" className="calendar-vidgets__arrow">
                      <Image src={ArrowL} alt="Иконка" />
                    </span>
                    <span id="next" className="calendar-vidgets__arrow">
                      <Image src={ArrowR} alt="Иконка" />
                    </span>
                  </div>
                </header>
                <div className="calendar-vidgets__calendar">
                  <ul className="calendar-vidgets__weeks">
                    <li>ПН</li>
                    <li>ВТ</li>
                    <li>СР</li>
                    <li>ЧТ</li>
                    <li>ПТ</li>
                    <li>СБ</li>
                    <li>ВС</li>
                  </ul>
                  <ul className="calendar-vidgets__days">
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                    <li>6</li>
                    <li>7</li>
                    <li>8</li>
                    <li>9</li>
                    <li>10</li>
                    <li>11</li>
                    <li>12</li>
                    <li>13</li>
                    <li>14</li>
                    <li>15</li>
                    <li>16</li>
                    <li>17</li>
                    <li>18</li>
                    <li>19</li>
                    <li>20</li>
                    <li>21</li>
                    <li>22</li>
                    <li>23</li>
                    <li>24</li>
                    <li>25</li>
                    <li>26</li>
                    <li>27</li>
                    <li className="active">28</li>
                    <li>29</li>
                    <li>30</li>
                    <li className="inactive">1</li>
                    <li className="inactive">2</li>
                    <li className="inactive">3</li>
                    <li className="inactive">4</li>
                    <li className="inactive">5</li>
                  </ul>
                </div>
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
  );
}
