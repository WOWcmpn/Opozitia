"use client";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Night from "@/img/icons/weather/01n.png"
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
import {
  calendar,
  getDate,
  getMonth,
  getStringMonth,
  getYear,
} from "@/utils/calendar";
import { IWeather } from "@/types/types";
import { NewsService } from "@/service/news.service";

export default function Widgets() {
  const swiperRef = useRef<SwiperType>();
  const [currentMonth, setCurrentMonth] = useState<number>(
    getMonth(new Date())
  );
  const [currentYear, setCurrentYear] = useState<number>(getYear(new Date()));
  const [date, setDate] = useState<string>(
    `${getStringMonth(currentMonth).month} ${getDate(
      new Date()
    )}, ${currentYear}`
  );
  const [calendarData, setCalendarData] = useState(calendar(new Date(date)));
  //let calendarData = calendar(new Date(date));
  const [weather, setWeather] = useState<IWeather>();

  const refreshCalendar = useCallback(() => {
    setDate(
      `${getStringMonth(currentMonth).month} ${getDate(
        new Date()
      )}, ${currentYear}`
    );
    setCalendarData(calendar(new Date(date)));
  }, [currentMonth, currentYear, date]);

  let weatherIcon
  let weatherDayIconOne
  let weatherDayIconTwo
  // let weatherNightIconOne
  // let weatherNightIconTwo
  if(!weather?.conditionIcon) {
    weatherIcon = "/img/icons/weather/unknown.webp"
  } else {
    weatherIcon = `https:${weather?.conditionIcon}`
  }
  if(!weather?.dayConditionIconOne) {
    weatherDayIconOne = "/img/icons/weather/unknown.webp"
  } else {
    weatherDayIconOne = `https:${weather?.dayConditionIconOne}`
  }
  if(!weather?.dayConditionIconTwo) {
    weatherDayIconTwo = "/img/icons/weather/unknown.webp"
  } else {
    weatherDayIconTwo = `https:${weather?.dayConditionIconTwo}`
  }
  // if(!weather?.nightConditionIconOne) {
  //   weatherNightIconOne = "/img/icons/weather/unknown.webp"
  // } else {
  //   weatherNightIconOne = `https:${weather?.nightConditionIconOne}`
  // }
  // if(!weather?.nightConditionIconTwo) {
  //   weatherNightIconTwo = "/img/icons/weather/unknown.webp"
  // } else {
  //   weatherNightIconTwo = `https:${weather?.nightConditionIconTwo}`
  // }
  useEffect(() => {
    async function loadWeather() {
      try {
        const weather = await NewsService.getWeather()
        setWeather(weather)
      } catch (err) {
        console.warn('weather gone wrong: ', err);
      }
    }
    loadWeather()
  }, []);

  const changeMonth = (choice: boolean) => {
    let temp;
    if (choice) {
      if (currentMonth == 11) {
        setCurrentMonth(0);
        temp = currentYear + 1;
        setCurrentYear(temp);
      } else {
        temp = currentMonth + 1;
        setCurrentMonth(temp);
      }
    } else {
      if (currentMonth == 0) {
        setCurrentMonth(11);
        temp = currentYear - 1;
        setCurrentYear(temp);
      } else {
        temp = currentMonth - 1;
        setCurrentMonth(temp);
      }
    }
    refreshCalendar();
  };

  useEffect(() => {
    refreshCalendar();
  }, [refreshCalendar]);

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

  console.log(calendarData);

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
                    {weather?.location} <Image src={Location} alt="Иконка" />
                  </div>
                  <div className="wheather-left-vidgets__top">
                    <div className="wheather-left-vidgets__image">
                      <Image width={125} height={125} src={weatherIcon} alt="Иконка" />
                    </div>
                    <div className="wheather-left-vidgets__temp-block">
                      <span className="wheather-left-vidgets__temp-today">
                        {weather?.currentTemperature}°
                      </span>
                      <p className="wheather-left-vidgets__temp-allday">
                        {weather?.dayTemperature}° / {weather?.nightTemperature}°
                      </p>
                    </div>
                    <ul className="wheather-left-vidgets__temp-more-list">
                      <li className="wheather-left-vidgets__temp-more-item">
                        <Image src={Wind} alt="Иконка" />
                        <span>{weather?.windMPH} м/с</span>
                      </li>
                      <li className="wheather-left-vidgets__temp-more-item">
                        <Image src={Humidity1} alt="Иконка" />
                        <span>{weather?.humidity}%</span>
                      </li>
                      <li className="wheather-left-vidgets__temp-more-item">
                        <Image src={Humidity2} alt="Иконка" />
                        <span>{weather?.chanceOfRain}%</span>
                      </li>
                    </ul>
                  </div>
                  <div className="wheather-left-vidgets__body">
                    <h3 className="wheather-left-vidgets__title">
                      Погода на следующие два дня:
                    </h3>
                    <ul className="wheather-left-vidgets__list-week-temp">
                      <li className="wheather-left-vidgets__item-week-temp">
                        <span className="wheather-left-vidgets__date">
                          {weather?.dateOne}
                        </span>
                        <span className="wheather-left-vidgets__temp-week-day">
                          {weather?.dayTemperatureOne}° <Image width={50} height={50} src={weatherDayIconOne} alt="Иконка" />
                        </span>
                        <span className="wheather-left-vidgets__temp-week-day">
                          {weather?.nightTemperatureOne}° <Image src={Night} alt="Иконка" />
                        </span>
                      </li>
                      <li className="wheather-left-vidgets__item-week-temp">
                        <span className="wheather-left-vidgets__date">
                          {weather?.dateTwo}
                        </span>
                        <span className="wheather-left-vidgets__temp-week-day">
                          {weather?.dayTemperatureTwo}° <Image width={50} height={50} src={weatherDayIconTwo} alt="Иконка" />
                        </span>
                        <span className="wheather-left-vidgets__temp-week-day">
                          {weather?.nightTemperatureTwo}° <Image src={Night} alt="Иконка" />
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
                  <p className="calendar-vidgets__current-date">{`${
                    getStringMonth(currentMonth).monthRu
                  } ${currentYear}`}</p>
                  <div className="calendar-vidgets__icons">
                    <span
                      id="prev"
                      className="calendar-vidgets__arrow"
                      onClick={() => changeMonth(false)}
                    >
                      <Image src={ArrowL} alt="Иконка" />
                    </span>
                    <span
                      id="next"
                      className="calendar-vidgets__arrow"
                      onClick={() => changeMonth(true)}
                    >
                      <Image src={ArrowR} alt="Иконка" />
                    </span>
                  </div>
                </header>
                <div className="calendar-vidgets__calendar">
                  <ul className="calendar-vidgets__weeks">
                    <li>ВС</li>
                    <li>ПН</li>
                    <li>ВТ</li>
                    <li>СР</li>
                    <li>ЧТ</li>
                    <li>ПТ</li>
                    <li>СБ</li>
                  </ul>
                  <ul className="calendar-vidgets__days">
                    {calendarData.map((el) => (
                      <li className={el.classname} key={el.id}>
                        {el.day}
                      </li>
                    ))}
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
