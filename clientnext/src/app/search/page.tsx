"use client";
import { SearchResult } from "@/components/SearchResult/SearchResult";
import React, { useEffect, useState } from "react";
import { Header } from "@/components/Header/Header";
import { NewsService } from "@/service/news.service";
import { ISearchNews } from "@/types/types";
import Link from "next/link";

export default function Search({searchParams}: {
  searchParams?: {
    query?: string
  }
}) {
  let searchNameTerm
  if(!searchParams) {
    searchNameTerm = ''
  } else {
    searchNameTerm = searchParams.query
  }
  const [isExist, setIsExist] = useState(true);
  const [news, setNews] = useState<ISearchNews[]>([]);
  const [amount, setAmount] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState(searchNameTerm);

  if(!searchTerm) {
    setSearchTerm(' ')
    }
  useEffect(() => {
    async function loadData() {
      try {
        const newData = await NewsService.getSearchNews(searchTerm)
        const newAmount = await NewsService.getCountSearch(searchTerm)
        setAmount(newAmount)
        setNews(newData)
        if(newData.length > 0) {
          setIsExist(true)
        } else {
          setIsExist(false)
        }
      } catch (err) {
        console.warn(err);
      }
    }
    loadData()
  }, [searchTerm]);

  return (
    <div className="wrapper">
      <Header className={"header menu-visual"} />
      <main className="page">
        {isExist ? (
          <section className="page__search-block search-block">
            <div className="search-block__container">
              <form className="search-block__form">
                <div className="search-block__input-wrap">
                  <input
                    autoComplete="off"
                    type="text"
                    name="form[]"
                    placeholder="Поиск..."
                    className="search-block__input"
                    defaultValue={`${searchTerm}`}
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="search-block__cancel-btn"
                    onClick={() => setSearchTerm(' ')}
                  ></button>
                </div>
                {/*<button*/}
                {/*  type="submit"*/}
                {/*  className="search-block__btn"*/}
                {/*  //onClick={() => setIsExist(false)}*/}
                {/*>*/}
                {/*  Поиск*/}
                {/*</button>*/}
              </form>
              <div className="search-block__results results-search-block">
                <header className="results-search-block__header">
                  <p className="results-search-block__top-text">Показано </p>
                  <p className="results-search-block__wrap-results">
                    <span className="results-search-block__results-numbers">
                      {news?.length}
                    </span>{" "}
                    из{" "}
                    <span className="results-search-block__results-total">
                      {amount}
                    </span>
                  </p>
                </header>
                <div className="results-search-block__body">
                  {news?.map(n => (
                    <SearchResult key={n.id}
                      category={n.category.toLowerCase()}
                      title={n.title}
                      text={n.description.substring(0, 300).padEnd(303, '...')}
                      time={n.createdAtTime}
                      id={n.id}
                      img={n.fullImgUrl}
                    />
                  ))}

                </div>
                <br />
                {/*{loading && <p>Загрузка...</p>}*/}
                {/*{hasMore && !loading &&*/}
                {/*  <button onClick={handleLoadMore} className="results-search-block__btn-more btn-more">*/}
                {/*    Ещё 10 статей*/}
                {/*  </button>}*/}
                {/*<button*/}
                {/*  className="results-search-block__btn-more btn-more"*/}
                {/*  type="button"*/}
                {/*>*/}
                {/*  Еще 20 статей*/}
                {/*</button>*/}
              </div>
            </div>
          </section>
        ) : (
          <section className="page__search-block search-block">
            <div className="search-block__container">
              <form
                className="search-block__form search-block__form_noresults"
              >
                <div className="search-block__input-wrap">
                  <input
                    autoComplete="off"
                    type="text"
                    name="form[]"
                    placeholder="Поиск..."
                    className="search-block__input"
                    defaultValue={`${searchTerm}`}
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                  <button
                    type="button"
                    className="search-block__cancel-btn"
                    onClick={() => setSearchTerm(' ')}
                  ></button>
                </div>
                {/*<button*/}
                {/*  type="submit"*/}
                {/*  className="search-block__btn"*/}
                {/*  // onClick={() => setIsExist(true)}*/}
                {/*>*/}
                {/*  Поиск*/}
                {/*</button>*/}
              </form>
              <p className="search-block__text-search">
                <span className="bold">Возможно вы имели в виду:</span>{" "}
                <Link href={'/policy'}>Политика</Link>
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
