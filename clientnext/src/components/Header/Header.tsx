"use client";
import Image from "next/image";
import React, { useState } from "react";
import Message from "@/img/icons/message.svg";
import Logo from "@/img/logo.png";
import Plus from "@/img/icons/plus.svg";
import Link from "next/link";
import { HeaderProps } from "@/types/types";
import { PopupPolls } from "../PopupPolls/PopupPolls";
import { PopupNews } from "@/components/PopupNews/PopupNews";

export const Header = ({
  className,
  onClick,
  onLogin,
  onSearch,
  onNews,
}: HeaderProps) => {
  const [burger, setBurger] = useState(false);

  const popup = () => {
    if (onClick !== undefined) {
      onClick(1);
    }
  };

  const loginpopup = () => {
    if (onLogin !== undefined) {
      onLogin(1);
    }
  };

  const searchpopup = () => {
    if (onSearch !== undefined) {
      onSearch(1);
    }
  };

  const newspopup = () => {
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
              <Link href="/polls" className="top-header__link link-top-header">
                <Image src={Message} alt="Icon" />
              </Link>
              <Link
                data-popup="#search"
                href="#"
                className="top-header__link-search link-top-header"
                onClick={searchpopup}
              >
                <Image
                  width={20}
                  height={20}
                  src="/img/icons/search.svg"
                  alt="Icon"
                />
              </Link>
              <Link
                data-popup="#popup-login"
                href=""
                className="top-header__link-login link-top-header"
                onClick={loginpopup}
              >
                <picture>
                  <source srcSet="img/icons/login.webp" type="image-webp" />
                  <Image
                    width={55}
                    height={50}
                    src="/img/icons/login.png"
                    alt="Icon"
                  />
                </picture>
              </Link>
              <Link href='/admin'>
                Админка
              </Link>
            </div>
            <div className="top-header__weather weather-header">
              <Link href="#" className="weather-header__info">
                <span id="temperature" className="weather-header__temperature">
                  11°
                </span>
                <Image
                  width={30}
                  height={30}
                  src="/img/icons/sun.svg"
                  className="weather-header__icon"
                  alt="icon"
                />
              </Link>
              <div className="weather-header__location">
                <span id="location" className="weather-header__city">
                  Москва
                </span>
                <Image
                  width={15}
                  height={15}
                  src="/img/icons/location.svg"
                  alt="icon"
                />
              </div>
            </div>

            {window.screen.width < 650 && (
              <div className={`burger-menu`}>
                <div
                  className={`menu-btn ${burger ? "active-burger" : ""}`}
                  onClick={() => setBurger(!burger)}
                >
                  <span></span>
                </div>
                <ul className={`menubox ${burger ? "active-burger" : ""}`}>
                  <li>
                    <Link href="home" className="top-header__logo">
                      <picture>
                        <source srcSet="img/logo.webp" type="image/webp" />
                        <Image src={Logo} alt="Logo" />
                      </picture>
                    </Link>
                  </li>
                  <li className="menu__item">
                    <Link href="/economy" className="menu__link">
                      ЭКОНОМИКА
                    </Link>
                  </li>
                  <li className="menu__item">
                    <Link href="/policy" className="menu__link">
                      ПОЛИТИКА
                    </Link>
                  </li>
                  <li className="menu__item">
                    <Link href="/business" className="menu__link">
                      БИЗНЕС
                    </Link>
                  </li>
                  <li className="menu__item">
                    <Link href="/world" className="menu__link">
                      МИРОВЫЕ НОВОСТИ
                    </Link>
                  </li>
                  {/*<li>*/}
                  {/*  <Link className="menu-item menu__link" href="#">*/}
                  {/*    ЭКОНОМИКА*/}
                  {/*  </Link>*/}
                  {/*</li>*/}
                  {/*<li>*/}
                  {/*  <Link className="menu-item menu__link" href="#">*/}
                  {/*    ПОЛИТИКА*/}
                  {/*  </Link>*/}
                  {/*</li>*/}
                  {/*<li>*/}
                  {/*  <Link className="menu-item menu__link" href="#">*/}
                  {/*    БИЗНЕС*/}
                  {/*  </Link>*/}
                  {/*</li>*/}
                  {/*<li>*/}
                  {/*  <Link className="menu-item menu__link" href="#">*/}
                  {/*    МИРОВЫЕ НОВОСТИ*/}
                  {/*  </Link>*/}
                  {/*</li>*/}
                  <li className="menu-item-widgets-wrapper menu-item-widgets-news mt-[50px] ml-[22px]">
                    {/* <a className="menu-item menu-item-widgets" href="#"></a> */}
                    <Link
                      href="#"
                      data-popup="#popup-vote"
                      className="menu-item menu-item-widgets bottom-header__link !py-[16px] !px-[65px] "
                    >
                      <span className="text-[10px] !whitespace-nowrap">
                        Сообщить новость
                      </span>
                    </Link>
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
            window.screen.width < 650
              ? "hidden"
              : "header__bottom bottom-header"
          }`}
        >
          <div className="bottom-header__menu menu">
            <nav className="menu__body">
              <ul className="menu__list">
                <li className="menu__item">
                  <Link href="/economy" className="menu__link">
                    ЭКОНОМИКА
                  </Link>
                </li>
                <li className="menu__item">
                  <Link href="/policy" className="menu__link">
                    ПОЛИТИКА
                  </Link>
                </li>
                <li className="menu__item">
                  <Link href="/business" className="menu__link">
                    БИЗНЕС
                  </Link>
                </li>
                <li className="menu__item">
                  <Link href="/world" className="menu__link">
                    МИРОВЫЕ НОВОСТИ
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <Link
            href="#"
            data-popup="#popup-vote"
            className="bottom-header__link"
          >
            <span className="bottom-header__link-news">Сообщить новость</span>
            {}
            {/*<PopupNews onClick={popup} />*/}
            {/*<span className="bottom-header__link-news-icon">*/}
            {/*  <Image src={Plus} alt="Иконка" />*/}
            {/*</span>*/}
          </Link>
        </div>
      </div>
    </header>
  );
};
