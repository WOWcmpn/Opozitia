"use client";
import Graphics1 from "@/img/graphics/01.svg";
import { useEffect, useRef, useState } from "react";
import { Autoplay, Navigation, EffectFade } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { LatestNews } from "@/components/LatestNews/LatestNews";
import { MainBlockSlide } from "@/components/MainBlockSlide/MainBlockSlide";
import { GraphicsBlock } from "@/components/GraphicsBlock/GraphicsBlock";

import "swiper/css";
import "swiper/css/effect-fade";
import { BlockContent } from "@/components/BlockContent/BlockContent";
import { Header } from "@/components/Header/Header";
import { PopupPolls } from "@/components/PopupPolls/PopupPolls";
import { AnimatePresence } from "framer-motion";
import { PopupAccount } from "@/components/PopupLogin/PopupAccount";
import { NextUIProvider } from "@nextui-org/react";
import { Search } from "@/components/Search/Search";
import { IHomeNews } from "@/types/types";
import { NewsService } from "@/service/news.service";
import { AuthService } from "@/service/auth.service";
import Link from 'next/link';

export default function Home() {
  const swiperRef = useRef<SwiperType>();
  const [option, setOption] = useState(0);
  const [login, setLogin] = useState(0);
  const [search, setSearch] = useState(0);
  const [data, setData] = useState<IHomeNews | null>(null);

  useEffect(() => {
    async function getData() {
      const data = await NewsService.getNewsHome();
      setData(data);
    }

    getData();
  }, []);

  //const link1 = data?.bottomNewsOne.map((n) => n.title);

  return (
    <NextUIProvider>
      <div
        className={`home ${
          option == 1 || login == 1 || search == 1 ? "overflow" : ""
        } w-[100vw]`}
      >
        <div
          className={`wrapper ${
            option == 1 || login == 1 || search == 1
              ? " wrapper__popup blur"
              : ""
          }`}
        >
          <div className="help">
            <div className="help__wrap">
              <p className="help__text">Work with us and help Moldova </p>
              <button className="help__btn">x</button>
            </div>
          </div>
          <Header onClick={setOption} onLogin={setLogin} onSearch={setSearch} />
          <main className="page">
            <section className="page__main-block main-block">
              <div className="main-block__container">
                <div className="main-block__wrap-slider">
                  <div className="main-block__wrap-btns">
                    <button
                      type="button"
                      data-da=".main-block__wrap-slider,1266,1"
                      className="main-block__swiper-button-prev btn-slider"
                      onClick={() => swiperRef.current?.slidePrev()}
                    ></button>
                    <button
                      type="button"
                      data-da=".main-block__wrap-slider,1266,1"
                      className="main-block__swiper-button-next btn-slider btn-slider_right"
                      onClick={() => swiperRef.current?.slideNext()}
                    ></button>
                  </div>
                  <div className="main-block__slider ">
                    <div className="main-block__wrapper ">
                      <Swiper
                        modules={[Autoplay, Navigation]}
                        slidesPerView={3}
                        loop={true}
                        simulateTouch={false}
                        autoplay={{
                          delay: 2000,
                          disableOnInteraction: false,
                        }}
                        speed={1000}
                        onBeforeInit={(swiper) => {
                          swiperRef.current = swiper;
                        }}
                      >
                        {data?.swipeNews.map((n) => (
                          <SwiperSlide key={n.id}>
                            <MainBlockSlide
                              img={n.imgUrl}
                              title={n.title}
                              category={n.category.toLowerCase()}
                              id={n.id}
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="page__block block">
              <div className="block__container">
                <div className="block__graphics graphics-left-block ">
                  <div className="graphics-left-block__item ">
                    <div className="graphics-left-block__slider">
                      <div className="graphics-left-block__wrapper swiper-wrapper ">
                        <Swiper
                          effect="fade"
                          modules={[Autoplay, EffectFade]}
                          slidesPerView={1}
                          fadeEffect={{ crossFade: true }}
                          loop={true}
                          simulateTouch={false}
                          autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                          }}
                          speed={1000}
                        >
                          <SwiperSlide>
                            <GraphicsBlock
                              name="SNPIND"
                              title="DOW JONES"
                              tradeInfo="$15400.55"
                              changeMinus="1.99%"
                              img={Graphics1}
                            />
                          </SwiperSlide>
                          <SwiperSlide>
                            <GraphicsBlock
                              name="SNPIND"
                              title="EUR/USD"
                              tradeInfo="$15400.55"
                              changeMinus="1.99%"
                              img={Graphics1}
                            />
                          </SwiperSlide>
                        </Swiper>
                      </div>
                    </div>
                  </div>

                  <div className="graphics-left-block__item ">
                    <div className="graphics-left-block__slider">
                      <div className="graphics-left-block__wrapper swiper-wrapper">
                        <Swiper
                          effect="fade"
                          preventClicks={false}
                          preventClicksPropagation={false}
                          touchStartPreventDefault={false}
                          loop={true}
                          modules={[Autoplay, EffectFade]}
                          slidesPerView={1}
                          fadeEffect={{ crossFade: false }}
                          autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                          }}
                          speed={1000}
                        >
                          <SwiperSlide>
                            <GraphicsBlock
                              name="SNPIND"
                              title="DOW JONES"
                              tradeInfo="$15400.55"
                              changeMinus="1.99%"
                              img={Graphics1}
                            />
                          </SwiperSlide>
                          <SwiperSlide>
                            <GraphicsBlock
                              name="SNPIND"
                              title="EUR/USD"
                              tradeInfo="$15400.55"
                              changeMinus="1.99%"
                              img={Graphics1}
                            />
                          </SwiperSlide>
                        </Swiper>
                      </div>
                    </div>

                    {/* <a
                    href="exchange.html#tab-0-1"
                    className="graphics-left-block__image"
                  >
                    <Image fill src="/img/graphics/01.svg" alt="image" />
                  </a> */}
                  </div>
                </div>

                <div
                  data-da=".main-block__container,600"
                  className="block__bottom bottom-left-block"
                >
                  <div className="blockslide-wrapper">
                    <Swiper
                      effect="fade"
                      modules={[Autoplay, EffectFade]}
                      slidesPerView={1}
                      fadeEffect={{ crossFade: true }}
                      preventClicks={true}
                      preventClicksPropagation={false}
                      touchStartPreventDefault={false}
                      touchStartForcePreventDefault={true}
                      loop={true}
                      allowTouchMove={false}
                      simulateTouch={false}
                      touchMoveStopPropagation={true}
                      autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                      }}
                      speed={1000}
                    >
                      {data?.mainNews.map((n) => (
                        <SwiperSlide key={n.id}>
                          <BlockContent
                            title={n.title}
                            firstLink={n.id}
                            firstCategory={n.category.toLowerCase()}
                            img={n.fullImgUrl}
                            link1="Чего ожидать Молдове в ближайшие несколько недель?"
                            link2="Чего ожидать Молдове в ближайшие несколько недель?"
                            link3="Чего ожидать Молдове в ближайшие несколько недель?"
                          />
                        </SwiperSlide>
                      ))}
                      {/*<SwiperSlide>*/}
                      {/*  <BlockContent*/}
                      {/*    title="В Японии госпитализировали 26 человек после приема*/}
                      {/*    БАДов"*/}
                      {/*    img={ActualNews1}*/}
                      {/*    link1="Чего ожидать Молдове в ближайшие несколько недель?"*/}
                      {/*    link2="Чего ожидать Молдове в ближайшие несколько недель?"*/}
                      {/*    link3="Чего ожидать Молдове в ближайшие несколько недель?"*/}
                      {/*  />*/}
                      {/*</SwiperSlide>*/}
                      {/*<SwiperSlide>*/}
                      {/*  <BlockContent*/}
                      {/*    title="В Японии госпитализировали 36 человек после приема*/}
                      {/*    БАДов"*/}
                      {/*    img={ActualNews2}*/}
                      {/*    link1="Чего ожидать Молдове в ближайшие несколько недель?"*/}
                      {/*    link2="Чего ожидать Молдове в ближайшие несколько недель?"*/}
                      {/*    link3="Чего ожидать Молдове в ближайшие несколько недель?"*/}
                      {/*  />*/}
                      {/*</SwiperSlide>*/}
                    </Swiper>
                  </div>
                  {/* </div> */}
                </div>
                <aside className="block__latest-news latest-news">
                  <Link href={'lastnews'} className="latest-news__main-title-link">
                    <h3 className="latest-news__title latest-news__title_posts">
                      Последние новости
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
            </section>
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
        <AnimatePresence>
          {login == 1 && <PopupAccount onClick={setLogin} />}
        </AnimatePresence>
        <AnimatePresence>
          {search == 1 && <Search onSearch={setSearch} />}
        </AnimatePresence>
      </div>
    </NextUIProvider>
  );
}
