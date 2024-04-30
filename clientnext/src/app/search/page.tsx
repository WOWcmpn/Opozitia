"use client";

import { SearchResult } from "@/components/SearchResult/SearchResult";
import Image from "next/image";
import React, { useState } from "react";
import MainBlock2 from "@/img/main-block/02.png";
import { Header } from "@/components/Header/Header";

export default function Search() {
  const [isExist, setIsExist] = useState(true);

  return (
    <div className="wrapper">
      <Header className={"header menu-visual"} />
      <main className="page">
        {isExist ? (
          <section className="page__search-block search-block">
            <div className="search-block__container">
              <form action="#" className="search-block__form">
                <div className="search-block__input-wrap">
                  <input
                    autoComplete="off"
                    type="text"
                    name="form[]"
                    placeholder="Поиск..."
                    className="search-block__input"
                  />
                  <button
                    type="button"
                    className="search-block__cancel-btn"
                  ></button>
                </div>
                <button
                  type="submit"
                  className="search-block__btn"
                  onClick={() => setIsExist(false)}
                >
                  Поиск
                </button>
              </form>
              <div className="search-block__results results-search-block">
                <header className="results-search-block__header">
                  <p className="results-search-block__top-text">Показано </p>
                  <p className="results-search-block__wrap-results">
                    <span className="results-search-block__results-numbers">
                      1-10
                    </span>{" "}
                    из{" "}
                    <span className="results-search-block__results-total">
                      123
                    </span>
                  </p>
                </header>
                <div className="results-search-block__body">
                  <SearchResult
                    topTitle="ПОЛИТИКА"
                    title="Премьер-министр Молдовы одобрил вступление в ЕС"
                    text="Nunc velit lacus, dictum non tristique non, semper in massa. Aliquam sodales imperdiet dui et
                            maximus.Maecenas porta sodales arcu, et lacinia
                            urna bibendum sit amet. Donec non vestibulum odio, eget"
                    time="20:19"
                    link1="Экономика"
                    link2="Молдова"
                    link3="ЕС"
                    img={MainBlock2}
                  />

                  <SearchResult
                    topTitle="ПОЛИТИКА"
                    title="Премьер-министр Молдовы одобрил вступление в ЕС"
                    text="Nunc velit lacus, dictum non tristique non, semper in massa. Aliquam sodales imperdiet dui et
                            maximus.Maecenas porta sodales arcu, et lacinia
                            urna bibendum sit amet. Donec non vestibulum odio, eget"
                    time="20:19"
                    link1="Экономика"
                    link2="Молдова"
                    link3="ЕС"
                    img={MainBlock2}
                  />

                  <SearchResult
                    topTitle="ПОЛИТИКА"
                    title="Премьер-министр Молдовы одобрил вступление в ЕС"
                    text="Nunc velit lacus, dictum non tristique non, semper in massa. Aliquam sodales imperdiet dui et
                            maximus.Maecenas porta sodales arcu, et lacinia
                            urna bibendum sit amet. Donec non vestibulum odio, eget"
                    time="20:19"
                    link1="Экономика"
                    link2="Молдова"
                    link3="ЕС"
                    img={MainBlock2}
                  />

                  <SearchResult
                    topTitle="ПОЛИТИКА"
                    title="Премьер-министр Молдовы одобрил вступление в ЕС"
                    text="Nunc velit lacus, dictum non tristique non, semper in massa. Aliquam sodales imperdiet dui et
                            maximus.Maecenas porta sodales arcu, et lacinia
                            urna bibendum sit amet. Donec non vestibulum odio, eget"
                    time="20:19"
                    link1="Экономика"
                    link2="Молдова"
                    link3="ЕС"
                    img={MainBlock2}
                  />

                  <SearchResult
                    topTitle="ПОЛИТИКА"
                    title="Премьер-министр Молдовы одобрил вступление в ЕС"
                    text="Nunc velit lacus, dictum non tristique non, semper in massa. Aliquam sodales imperdiet dui et
                            maximus.Maecenas porta sodales arcu, et lacinia
                            urna bibendum sit amet. Donec non vestibulum odio, eget"
                    time="20:19"
                    link1="Экономика"
                    link2="Молдова"
                    link3="ЕС"
                    img={MainBlock2}
                  />
                </div>
                <br />
                <button
                  className="results-search-block__btn-more btn-more"
                  type="button"
                >
                  Еще 20 статей
                </button>
              </div>
            </div>
          </section>
        ) : (
          <section className="page__search-block search-block">
            <div className="search-block__container">
              <form
                action="#"
                className="search-block__form search-block__form_noresults"
              >
                <div className="search-block__input-wrap">
                  <input
                    autoComplete="off"
                    type="text"
                    name="form[]"
                    placeholder="Поиск..."
                    className="search-block__input"
                  />
                  <button
                    type="button"
                    className="search-block__cancel-btn"
                  ></button>
                </div>
                <button
                  type="submit"
                  className="search-block__btn"
                  onClick={() => setIsExist(true)}
                >
                  Поиск
                </button>
              </form>
              <p className="search-block__text-search">
                <span className="bold">Возможно вы имели в виду:</span>{" "}
                <a href="#">Политика</a>
              </p>
              <div className="search-block__results results-search-block">
                <p className="results-search-block__nothing-found">
                  Ничего не найдено :(
                </p>
              </div>
            </div>
          </section>
        )}
      </main>
      <footer className="footer">
        <div className="footer__container">
          <p className="footer__text">©2024 Opozitia</p>
        </div>
      </footer>
    </div>
  );
}
