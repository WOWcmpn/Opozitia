"use client"
import { ToastContainer } from 'react-toastify';
import { Header } from '@/components/Header/Header';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Championship } from '@/components/Championship/Championship';
import { AnimatePresence } from 'framer-motion';
import { PopupAccount } from '@/components/PopupLogin/PopupAccount';
import { Search } from '@/components/Search/Search';
import { PopupNews } from '@/components/PopupNews/PopupNews';
import React, { useEffect, useRef, useState } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { Championships, IChampionship } from '@/types/types';
import { FootballService } from '@/service/football.service';

export default function Sport() {
  const swiperRef = useRef<SwiperType>();
  const [search, setSearch] = useState<number>(0);
  const [login, setLogin] = useState<number>(0);
  const [createNews, setCreateNews] = useState<number>(0);
  const [championshipSpain, setChampionshipSpain] = useState<IChampionship[]>([]);
  const [championshipGermany, setChampionshipGermany] = useState<IChampionship[]>([]);
  const [championshipItaly, setChampionshipItaly] = useState<IChampionship[]>([]);
  const [championshipFrance, setChampionshipFrance] = useState<IChampionship[]>([]);
  const [championshipEngland, setChampionshipEngland] = useState<IChampionship[]>([]);

  useEffect(() => {
    async function loadChampionships() {
      try {
        const spainData = await FootballService.getFootballByChampionship(Championships.Spain)
        setChampionshipSpain(spainData)
        const germanyData = await FootballService.getFootballByChampionship(Championships.Germany)
        setChampionshipGermany(germanyData)
        const italyData = await FootballService.getFootballByChampionship(Championships.Italy)
        setChampionshipItaly(italyData)
        const franceData = await FootballService.getFootballByChampionship(Championships.France)
        setChampionshipFrance(franceData)
        const englandData = await FootballService.getFootballByChampionship(Championships.England)
        setChampionshipEngland(englandData)
      } catch (err) {
        console.error('loadChampionships error ', err);
      }
    }
    loadChampionships()
  }, []);

  return (
    <>
      <ToastContainer position={'top-center'} autoClose={2500} />
      <div
        className={`wrapper ${
          search === 1 || login === 1 || createNews === 1 ? "overflow" : ""
        } w-[100vw]`}
      >
        <div className={`${
          search === 1 || login === 1 || createNews === 1
            ? "wrapper__popup blur"
            : ""
        }`}>
          <Header onSearch={setSearch} onLogin={setLogin} onNews={setCreateNews} className={"header menu-visual"} />
          <main className="page page-vidgets">
            <section className="page__vidgets vidgets">
              <div className="vidgets__container">
                <div className="vidgets__body">
                  <div className="vidgets__left left-vidgets">
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
                            speed={0}
                            allowTouchMove={false}

                            touchMoveStopPropagation={true}
                            onBeforeInit={(swiper) => {
                              swiperRef.current = swiper;
                            }}
                          >
                            <SwiperSlide>
                              <Championship
                                title="Чемпионат Испании"
                                img={'/img/icons/football/SpainChampionship.png'}
                                champs={championshipSpain}
                              />
                            </SwiperSlide>
                            <SwiperSlide>
                              <Championship
                                title="Чемпионат Германии"
                                img={'/img/icons/football/GermanyChampionship.png'}
                                champs={championshipGermany}
                              />
                            </SwiperSlide>
                            <SwiperSlide>
                              <Championship
                                title="Чемпионат Италии"
                                img={'/img/icons/football/ItalyChampionship.png'}
                                champs={championshipItaly}
                              />
                            </SwiperSlide>
                            <SwiperSlide>
                              <Championship
                                title="Чемпионат Франции"
                                img={'/img/icons/football/FranceChampionship.png'}
                                champs={championshipFrance}
                              />
                            </SwiperSlide>
                            <SwiperSlide>
                              <Championship
                                title="Чемпионат Англии"
                                img={'/img/icons/football/EnglandChampionship.png'}
                                champs={championshipEngland}
                              />
                            </SwiperSlide>
                          </Swiper>
                        </div>
                      </div>
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
        <AnimatePresence>
          {login === 1 && <PopupAccount onPopupAccount={setLogin} />}
        </AnimatePresence>
        <AnimatePresence>
          {search === 1 && <Search onSearch={setSearch} />}
        </AnimatePresence>
        <AnimatePresence>
          {createNews === 1 && <PopupNews onPopupNews={setCreateNews} />}
        </AnimatePresence>
      </div>
    </>
  )
}