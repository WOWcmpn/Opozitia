"use client"
import { Header } from "@/components/Header/Header";
import React, { useEffect, useState } from "react";
import Image from 'next/image';
import CommentsImage from '@/img/icons/comments.svg';
import CopyImage from '@/img/icons/copy.svg';
import CopyLinkImage from '@/img/icons/copy-link.svg';
import fb from '@/img/icons/fb.svg';
import twitter from '@/img/icons/twitter.svg';
import ShareGrey from '@/img/icons/share-gray.svg';
import SortIcon from '@/img/icons/sort.svg';
import { LatestNews } from '@/components/LatestNews/LatestNews';
import { NewsService } from '@/service/news.service';
import Link from 'next/link';
import { IComments, INews, ISingleNews } from "@/types/types";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Comments } from "@/components/Comment/Comments";
import { AnimatePresence } from "framer-motion";
import { Search } from "@/components/Search/Search";

export default function NewsId({params} : {params: {id: string}}) {
  const [news, setNews] = useState<ISingleNews>();
  const [comments, setComments] = useState<IComments[]>([]);
  const [sidebar, setSidebar] = useState<INews[]>([]);
  const [comment, setComment] = useState<string>();
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState(0);

  const handleSubmit = async(e: any) => {
    try {
      e.preventDefault()
      await NewsService.createComment(params.id, comment!)
      setComment('')
      toast.success('Комментарий был успешно создан')
      window.location.reload()
    } catch (e: any) {
      console.warn(e);
      toast.error('Комментарий должен содержать больше четырёх символов')
    }
  }

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      try{
        const newComments = await NewsService.getComments(params.id, page)
        setComments(prevData => [...prevData, ...newComments])
        setLoading(false)
        setHasMore(newComments.length === 5)
      } catch (error) {
        console.log('Error loading data:', error);
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [page, params.id])

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1)
  }

  useEffect(() => {
    async function loadNews() {
      const newData = await NewsService.getNewsById(params.id)
      const news = await NewsService.getSidebarNews('Business')
      setSidebar(news)
      setNews(newData)
    }
    loadNews()
  }, [params.id]);

  let isUrl = false;
  if (news?.fullImgUrl.substring(0, 4) == "http") isUrl = true;

  const paragraphs = news?.description.split('.').filter(paragraph => paragraph.trim() !== '');

  return (
    <div className="wrapper">
      <div
        className={`home ${
          search == 1 ? "overflow" : ""
        } w-[100vw]`}
      >
        <div
          className={`wrapper ${
            search == 1
              ? "wrapper__popup blur"
              : ""
          }`}
        >
      <Header onSearch={setSearch} className={"header menu-visual"} />
      <ToastContainer position={'top-center'} autoClose={2500} />
      <main className="page">
        <section className="page__news-single news-single">
          <div className="news-single__container">
            <div className="news-single__body body-sidebar">
              <div className="news-single__left">
                <div className="news-single__main-block main-block-news">
                  <div className="main-block-news__top">
                    <div className="main-block-news__text-block">
                      <h2 className="main-block-news__category-title dot">
                        Бизнес
                      </h2>
                      <h1 className="main-block-news__title">
                        {news?.title}
                      </h1>
                    </div>
                  </div>
                  <div className="main-block-news__bottom">
                    <div className="main-block-news__left-bottom">
                      <span className="main-block-news__date dot">
                        {news?.viewDate}
                      </span>
                      <p className="main-block-news__time-reading">
                        <span className="main-block-news__minutes">
                          1 минута
                        </span>
                          на чтение
                      </p>
                    </div>
                    <div className="main-block-news__right-bottom">
                      <Link
                        href="#"
                        data-goto="#comments"
                        data-goto-header
                        className="main-block-news__link-comments dot"
                      >
                        <Image src={CommentsImage} alt="Иконка" />
                        <span className="main-block-news__comments-number">
                          {comments?.length}
                        </span>
                      </Link>
                      <div className="main-block-news__right-share">
                        <button
                          type="button"
                          className="main-block-news__actions"
                        >
                          <Image src={CopyImage} alt="Иконка" />
                        </button>
                        <ul className="main-block-news__actions-list">
                          <li className="main-block-news__actions-item">
                            <Link
                              href="#"
                              className="main-block-news__actions-link"
                            >
                              <Image src={CopyLinkImage} alt="Иконка" />{" "}
                              Скопировать ссылку
                            </Link>
                          </li>
                          <li className="main-block-news__actions-item">
                            <Link
                              href="#"
                              className="main-block-news__actions-link"
                            >
                              <Image src={fb} alt="Иконка" />
                              Facebook
                            </Link>
                          </li>
                          <li className="main-block-news__actions-item">
                            <Link
                              href="#"
                              className="main-block-news__actions-link"
                            >
                              <Image src={twitter} alt="Иконка" />
                              Twitter
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="main-block-news__image">
                    <picture>
                      {isUrl ? (
                        <Image fill={true} src={news!.fullImgUrl} alt="Image" />
                      ) : (
                        <Image
                          fill={true}
                          src={`/img/fullImage-news/${news?.fullImgUrl}`}
                          alt="Image"
                        />
                      )}
                    </picture>
                  </div>
                </div>
                <div className="news-single__content content-news-single">
                  <h2 className="content-news-single__title">
                    {news?.title}
                  </h2>
                  <div className="content-news-single__text">
                    {paragraphs?.map((paragraph, index) => (
                      <p key={index} className="text" >{`${paragraph}.`}</p>
                    ))}
                  </div>
                  <div className="content-news-single__bottom">
                    <span className="content-news-single__time">{news?.createdAtTime}</span>
                    <Link
                      href="#"
                      className="content-news-single__share flex gap-[5px]"
                    >
                      <Image src={ShareGrey} alt="Иконка" />
                      Поделиться
                    </Link>
                  </div>
                  <div className="content-news-single__choose-like">
                    <form action="#" className="content-news-single__form">
                      <div className="options options_likes">
                        <div className="options__items options__items_likes">
                          <input
                            id="like"
                            className="options__input"
                            type="checkbox"
                            value="like"
                            name="opros1"
                          />
                          <label
                            htmlFor="like"
                            className="options__label options__label_like options__label_2"
                          >
                            <span className="options__text options__text_like">
                              Понравилось
                            </span>
                            <span className="options__number-likes">45624</span>
                          </label>
                        </div>
                        <div className="options__items options__items_likes">
                          <input
                            id="dislike"
                            className="options__input"
                            type="checkbox"
                            value="nolike"
                            name="opros1"
                          />
                          <label
                            htmlFor="dislike"
                            className="options__label options__label_like options__label_1"
                          >
                            <span className="options__text options__text_like">
                              Не понравилось
                            </span>
                            <span className="options__number-likes">45624</span>
                          </label>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="content-news-single__comments comments-content-news">
                    <div className="comments-content-news__top top-comments-news">
                      <p className="top-comments-news__comments-quantity">
                        <span className="top-comments-news__number">{comments?.length}</span>{" "}
                        комментариев
                      </p>
                      <div className="top-comments-news__sort">
                        <button
                          type="button"
                          className="top-comments-news__btn-sort"
                        >
                          <Image src={SortIcon} alt="Иконка" />
                        </button>
                        <ul className="top-comments-news__list">
                          <li className="top-comments-news__item">
                            <Link href="#" className="top-comments-news__link">
                              Лучшие
                            </Link>
                          </li>
                          <li className="top-comments-news__item">
                            <Link href="#" className="top-comments-news__link">
                              Последние
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="comments-content-news__body">
                      <form
                        action="#"
                        className="comments-content-news__comments-form"
                        onSubmit={handleSubmit}
                      >
                        <textarea
                          autoComplete="off"
                          name="form[]"
                          placeholder="Написать комментарий..."
                          className="comments-content-news__input"
                          onChange={e => setComment(e.target.value)}
                        />
                        <button
                          type="submit"
                          className="comments-content-news__button"
                        >
                          Отправить
                        </button>
                      </form>
                    </div>
                    <div
                      id="comments"
                      className="comments-content-news__bottom bottom-comments-news"
                    >
                      <div className="bottom-comments-news__level-1">
                        {comments?.map((item, index) => (
                          <Comments key={index}
                                    name={item.username}
                                    text={item.text!}
                                    class1="bottom-comments-news__comment-item"
                                    img={item.userImage!}
                                    time={item.viewDate!}
                                    likes={0}
                          />
                        ))}
                      </div>
                    </div>
                    {loading && <p>Загрузка...</p>}
                    {hasMore && !loading &&
                      <button onClick={handleLoadMore} className="comments-content-news__btn-more btn-more">
                        Ещё 5 комментариев
                      </button>}
                  </div>
                </div>
              </div>
              <div className="news-single__wrap-right sidebar">
                <aside className="news-single__latest-news latest-news latest-news_big">
                  <Link href={'/lastnews'} className="latest-news__main-title-link">
                    <h3 className="latest-news__title">Последние новости</h3>
                  </Link>
                  {sidebar?.map(n => (
                    <LatestNews key={n.id}
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
          {search == 1 && <Search onSearch={setSearch} />}
        </AnimatePresence>
      </div>
    </div>
  );
}
