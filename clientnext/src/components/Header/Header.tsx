import Image from 'next/image'
import React from 'react'
import Message from "@/img/icons/message.svg";
import Logo from "@/img/logo.png";
import Link from 'next/link';
import { HeaderProps } from '@/types/types';

export const Header = ({className}: HeaderProps) => {
  return (
    <header className={className ? className : "header menu-visual-hidden-box"}>
          <div className="header__container">
            <div className="header__top top-header">
              <a href="home.html" className="top-header__logo">
                <picture>
                  <source srcSet="img/logo.webp" type="image-webp" />
                  <Image src={Logo} alt="Logo" />
                </picture>
              </a>
              <div className="top-header__right">
                <div className="top-header__actions">
                  <a
                    href="oprosi.html"
                    className="top-header__link link-top-header"
                  >
                    <Image src={Message} alt="Icon" />
                  </a>
                  <a
                    data-popup="#search"
                    href="#"
                    className="top-header__link-search link-top-header"
                  >
                    <Image
                      width={20}
                      height={20}
                      src="/img/icons/search.svg"
                      alt="Icon"
                    />
                  </a>
                  <a
                    data-popup="#popup-login"
                    href="#"
                    className="top-header__link-login link-top-header"
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
                  </a>
                </div>
                <div className="top-header__weather weather-header">
                  <a href="#" className="weather-header__info">
                    <span
                      id="temperature"
                      className="weather-header__temperature"
                    >
                      11°
                    </span>
                    <Image
                      width={30}
                      height={30}
                      src="/img/icons/sun.svg"
                      className="weather-header__icon"
                      alt="icon"
                    />
                  </a>
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
                <button
                  type="button"
                  className="top-header__icon-menu icon-menu"
                >
                  <span></span>
                  <span></span>
                </button>
              </div>
            </div>
            <div className="header__bottom bottom-header">
              <div className="bottom-header__menu menu">
                <nav className="menu__body">
                  <ul className="menu__list">
                    <li className="menu__item">
                      <Link href="/economy" className="menu__link">
                        ЭКОНОМИКА
                      </Link>
                    </li>
                    <li className="menu__item">
                      <Link href="/politics" className="menu__link">
                        ПОЛИТИКА
                      </Link>
                    </li>
                    <li className="menu__item">
                      <Link href="/business" className="menu__link">
                        БИЗНЕС
                      </Link>
                    </li>
                    <li className="menu__item">
                      <Link href="/globalnews" className="menu__link">
                        МИРОВЫЕ НОВОСТИ
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <a
                href="#"
                data-popup="#popup-vote"
                className="bottom-header__link"
              >
                <span className="bottom-header__link-news">
                  Сообщить новость
                </span>
                <span className="bottom-header__link-news-icon">
                  <Image fill src="/img/icons/plus.svg" alt="Иконка" />
                </span>
              </a>
            </div>
          </div>
        </header>
  )
}
