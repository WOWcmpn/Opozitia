"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Message from "@/img/icons/message.svg";
import Logo from "@/img/logo.png";
import Link from "next/link";
import { HeaderProps, IWeather } from "@/types/types";
import { NewsService } from "@/service/news.service";
import { useSession } from "next-auth/react";

export const Header = ({
  className,
  onClick,
  onLogin,
  onSearch,
  onNews,
}: HeaderProps) => {
  const [burger, setBurger] = useState(false);
  const [weather, setWeather] = useState<IWeather>();
  const [weatherIcon, setWeatherIcon] = useState<string>("/img/icons/weather/unknown.webp");
  const session = useSession()

  useEffect(() => {
    async function loadUtils() {
      if(!weather?.conditionIcon) setWeatherIcon("/img/icons/weather/unknown.webp")
      if(weather?.conditionIcon) setWeatherIcon(`https:${weather?.conditionIcon}`)
    }
    loadUtils()
  }, [weather?.conditionIcon]);

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

  // const popup = () => {
  //   if (onClick !== undefined) {
  //     onClick(1);
  //   }
  // };

  const loginPopup = () => {
    if (onLogin !== undefined) {
      onLogin(1);
    }
  };

  const searchPopup = () => {
    if (onSearch !== undefined) {
      onSearch(1);
    }
  };

  const newsPopup = () => {
    if (onNews !== undefined) {
      onNews(1);
    }
  };

  return (
    <header className={className ? className : "header menu-visual-hidden-box"}>
      <div className="header__container">
        <div className="header__top top-header">
          <Link href="/" className="top-header__logo">
            <picture>
              <source srcSet="img/logo.webp" type="image-webp" />
              <Image src={Logo} alt="Logo" />
            </picture>
          </Link>
          <div className="top-header__right">
            <div className="top-header__actions">
              <Link href={"/polls"} className="top-header__link link-top-header link-top-header-offer-news">
                <Image src={Message} alt="Icon" />
              </Link>
              <Link
                data-popup="#search"
                href="#"
                className="top-header__link-search link-top-header"
                onClick={searchPopup}
              >
                <Image
                  width={20}
                  height={20}
                  src="/img/icons/search.svg"
                  alt="Icon"
                />
              </Link>
              {session?.data ? (
                  <Link
                    href={'/account'}
                    className="top-header__link-login link-top-header"
                  >
                    <Image
                      width={55}
                      height={50}
                      src="/img/icons/login.png"
                      alt="Icon"
                    />
                  </Link>
              ) : (
                <Link
                  data-popup="#popup-login"
                  href=""
                  className="top-header__link-login link-top-header"
                  onClick={loginPopup}
                >
                    <Image
                      width={55}
                      height={50}
                      src="/img/icons/login.png"
                      alt="Icon"
                    />
                </Link>
              )}
            </div>
            <div className="top-header__weather weather-header">
              <Link href={'/widgets'} className="weather-header__info">
                <span id="temperature" className="weather-header__temperature">
                  {weather?.currentTemperature}°
                </span>
                <Image
                  width={60}
                  height={60}
                  src={weatherIcon}
                  className="weather-header__icon"
                  alt="icon"
                />
              </Link>
              <div className="weather-header__location">
                <span id="location" className="weather-header__city">
                  {weather?.location}
                </span>
                <Image
                  width={15}
                  height={15}
                  src="/img/icons/location.svg"
                  alt="icon"
                />
              </div>
            </div>

            {typeof window !== 'undefined' && window.screen.width < 650 && (
              <div className={`burger-menu`}>
                <div
                  className={`menu-btn ${burger ? "active-burger" : ""}`}
                  onClick={() => setBurger(!burger)}
                >
                  <span></span>
                </div>
                <ul className={`menubox ${burger ? "active-burger" : ""}`}>
                  <li>
                    <Link href={"home"} className="top-header__logo">
                      <picture>
                        <source srcSet="img/logo.webp" type="image/webp" />
                        <Image src={Logo} alt="Logo" />
                      </picture>
                    </Link>
                  </li>
                  <li>
                    <Link className="menu-item menu__link" href={'/economy'}>
                      ЭКОНОМИКА
                    </Link>
                  </li>
                  <li>
                    <Link className="menu-item menu__link" href={'/policy'}>
                      ПОЛИТИКА
                    </Link>
                  </li>
                  <li>
                    <Link className="menu-item menu__link" href={'/business'}>
                      БИЗНЕС
                    </Link>
                  </li>
                  <li>
                    <Link className="menu-item menu__link" href={'/world'}>
                      МИРОВЫЕ НОВОСТИ
                    </Link>
                  </li>
                  <li className="menu-item-widgets-wrapper menu-item-widgets-news mt-[50px] ml-[22px]">
                      {session.data ? (
                        <Link
                          href="#"
                          data-popup="#popup-vote"
                          className="menu-item menu-item-widgets bottom-header__link menubox-offer-news !py-[16px] !px-[65px] "
                          onClick={newsPopup}
                        >
                          <span className="bottom-header__link-news">Сообщить новость</span>
                        </Link>
                      ) : (
                        <div></div>
                      )}
                  </li>
                  <li className="menu-item-widgets-wrapper mt-[30px] ml-[22px]">
                    <Link href={'/oprosi'} className="menu-item-widgets-oprosi ">
                      <p>Выскажи свое мнение!</p>
                      <div className="menu-item-widgets-oprosi__img">
                        <Image src={Message} alt="Icon" />
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div
          className={` ${
            typeof window !== 'undefined' && window.screen.width < 650
              ? "hidden"
              : "header__bottom bottom-header"
          }`}
        >
          <div className="bottom-header__menu menu">
            <nav className="menu__body">
              <ul className="menu__list">
                <li className="menu__item">
                  <Link href={"/economy"} className="menu__link">
                    ЭКОНОМИКА
                  </Link>
                </li>
                <li className="menu__item">
                  <Link href={"/policy"} className="menu__link">
                    ПОЛИТИКА
                  </Link>
                </li>
                <li className="menu__item">
                  <Link href={"/business"} className="menu__link">
                    БИЗНЕС
                  </Link>
                </li>
                <li className="menu__item">
                  <Link href={"/world"} className="menu__link">
                    МИРОВЫЕ НОВОСТИ
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          {session.data ? (
            <Link
              href="#"
              data-popup="#popup-vote"
              className="bottom-header__link"
              onClick={newsPopup}
            >
              <span className="bottom-header__link-news">Сообщить новость</span>
            </Link>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </header>
  );
};
