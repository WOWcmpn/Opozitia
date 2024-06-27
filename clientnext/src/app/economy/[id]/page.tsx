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
import { Comments } from '@/components/Comment/Comments';
import { LatestNews } from '@/components/LatestNews/LatestNews';
import { NewsService } from '@/service/news.service';
import Link from 'next/link';
import { IComments, INews, ISingleNews, quizVotes } from "@/types/types";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AnimatePresence } from "framer-motion";
import { Search } from "@/components/Search/Search";
import { useSession } from "next-auth/react";
import { PopupAccount } from "@/components/PopupLogin/PopupAccount";
import { PopupNews } from '@/components/PopupNews/PopupNews';

export default function NewsId({params} : {params: {id: string}}) {
  const [defaultOption, setDefaultOption] = useState<'ASC' | 'DESC'>('DESC');
  const [option, setOption] = useState<'ASC' | 'DESC'>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [countComments, setCountComments] = useState<number>(0);
  const [news, setNews] = useState<ISingleNews>();
  const [comments, setComments] = useState<IComments[]>([]);
  const [sidebar, setSidebar] = useState<INews[]>([]);
  const [comment, setComment] = useState<string>();
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [search, setSearch] = useState<number>(0);
  const [login, setLogin] = useState<number>(0);
  const [createNews, setCreateNews] = useState<number>(0);
  const [isVoted, setIsVoted] = useState<boolean>(false);
  const [isClickable, setIsClickable] = useState<boolean>(true);
  const [lastClicked, setLastClicked] = useState(0);
  const delay = 5000
  const session = useSession()

  const sum = +news?.votePositive! + +news?.voteNegative!
  const perAgree = ((+news?.votePositive! / sum) * 100).toFixed(0)
  const perDisagree = ((+news?.voteNegative! / sum) * 100).toFixed(0)

  const handleVote = async (vote: quizVotes) => {
    if(!session.data) {
      toast.error("Неавторизованные пользователи не могут голосовать");
      return
    } else {
      if(isClickable) {
        setLastClicked(Date.now())
        setIsClickable(false)
        if(vote === quizVotes.Like) toast.success('Вам понравилась данная новость')
        if(vote === quizVotes.Dislike) toast.success('Вам не понравилась данная новость')
        await NewsService.sendVote(vote, params.id, session.data?.user?.name!)
        const newData = await NewsService.getNewsById(params.id)
        setNews(newData)
        setIsVoted(true)
      } else {
        toast.error('Голосовать можно один раз в 5 секунд')
        return
      }
    }
  }

  const throwError = async(name: string) => {
    if(name === 'comments') {
      toast.error("Неавторизованные пользователи не могут оставлять комментарии");
    } else if(name === 'polls') {
      toast.error("Неавторизованные пользователи не могут голосовать");
    }
  }

  const handleSubmit = async(e: any) => {
    try {
      if(!session.data) {
        toast.error("Неавторизованные пользователи не могут оставлять комментарии");
        return
      } else {
        e.preventDefault()
        await NewsService.createComment(params.id, comment!, session.data.user?.name!)
        setComment('')
        toast.success('Комментарий был успешно создан')
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      }
    } catch (e: any) {
      console.warn(e);
      toast.error('Комментарий должен содержать больше четырёх символов')
    }
  }

  useEffect(() => {
    if(!isClickable) {
      const timer = setTimeout(() => {
        setIsClickable(true)
      }, delay)

      return () => clearTimeout(timer)
    }
  }, [isClickable, delay]);

  useEffect(() => {
    async function loadComments() {
      if(page > 1) {
        if(option) {
          if(option !== defaultOption) {
            setLoading(true)
            setPage(1)
            setDefaultOption(option)
            try{
              const newComments = await NewsService.getComments(params.id, page, option)
              setComments(newComments)
              setHasMore(newComments.length === 5)
              setLoading(false)
            } catch (error) {
              console.log('Error loading data:', error);
            } finally {
              setLoading(false)
            }
          } else {
            setLoading(true)
            try{
              const newComments = await NewsService.getComments(params.id, page, option)
              setComments(prevData => [...prevData, ...newComments])
              setHasMore(newComments.length === 5)
              setLoading(false)
            } catch (error) {
              console.log('Error loading data:', error);
            } finally {
              setLoading(false)
            }
          }
        } else {
          setLoading(true)
          try{
            const newComments = await NewsService.getComments(params.id, page)
            setComments(prevData => [...prevData, ...newComments])
            setHasMore(newComments.length === 5)
            setLoading(false)
          } catch (error) {
            console.log('Error loading data:', error);
          } finally {
            setLoading(false)
          }
        }
      } else {
        if(option) {
          try{
            const newComments = await NewsService.getComments(params.id, page, option)
            setComments(newComments)
            setHasMore(newComments.length === 5)
            setLoading(false)
          } catch (error) {
            console.log('Error loading data:', error);
          }
        } else {
          try{
            const newComments = await NewsService.getComments(params.id, page)
            setComments(newComments)
            setHasMore(newComments.length === 5)
            setLoading(false)
          } catch (error) {
            console.log('Error loading data:', error);
          }
        }
      }
    }
    loadComments()
  }, [page, params.id, option, defaultOption])

  useEffect(() => {
    async function loadCountComments() {
      try {
        const data = await NewsService.getCountComments(params.id)
        setCountComments(data)
      } catch (err) {
        console.error('loadCountComments error ', err);
      }
    }
    loadCountComments()
  }, [params.id]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1)
  }

  const copyUrl = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url).then(() => {
      toast.success('Ссылка скопирована')
    }).catch((err) => {
      console.error('copy url error ', err);
      toast.error('Что-то пошло не так')
    })
  }

  useEffect(() => {
    async function loadNews() {
      const newData = await NewsService.getNewsById(params.id)
      const news = await NewsService.getSidebarNews('Economy')
      setSidebar(news)
      setNews(newData)
    }
    loadNews()
  }, [params.id]);

  return (
    <div className="wrapper">
      <div
        className={`home ${
          search === 1 || login === 1 || createNews === 1
            ? "overflow" : ""
        } w-[100vw]`}
      >
        <div
          className={`wrapper ${
            search === 1 || login === 1 || createNews === 1
              ? "wrapper__popup blur"
              : ""
          }`}
        >
      <Header onSearch={setSearch} onLogin={setLogin} onNews={setCreateNews} className={"header menu-visual"} />
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
                        Экономика
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
                          1 минута {' '}
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
                          {countComments}
                        </span>
                      </Link>
                      <div className="main-block-news__right-share">
                        <button
                          type="button"
                          className="main-block-news__actions"
                          onClick={copyUrl}
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
                      <Image fill={true} src={news?.fullImgUrl!} alt={news?.fullImgUrl!} />
                    </picture>
                  </div>
                </div>
                <div className="news-single__content content-news-single">
                  <h2 className="content-news-single__title">
                    {news?.title}
                  </h2>
                  <div className="content-news-single__text">
                    <p className="indent-8 text" >{news?.description}</p>
                  </div>
                  <div className="content-news-single__bottom">
                    <span className="content-news-single__time">{news?.createdAtTime}</span>
                    <button
                      className="content-news-single__share flex gap-[5px]"
                      onClick={copyUrl}
                    >
                      <Image src={ShareGrey} alt="Иконка" />
                      Поделиться
                    </button>
                  </div>
                  <div className="content-news-single__choose-like">
                    <form action="#" className="content-news-single__form">
                      {session.data ? (
                        <div className="options options_likes">
                          <div className="options__items options__items_likes">
                            <input
                              id="like"
                              className="options__input"
                              type="checkbox"
                              value="like"
                              name="opros1"
                              onClick={() => handleVote(quizVotes.Like)}
                            />
                            <label
                              htmlFor="like"
                              className="options__label options__label_like options__label_2"
                            >
                            <span className="options__text options__text_like">
                              Понравилось
                            </span>
                              {isVoted ? (
                                <span className="options__number-likes">{perAgree || 0}%</span>
                              ) : (
                                <span></span>
                              )}
                            </label>
                          </div>
                          <div className="options__items options__items_likes">
                            <input
                              id="dislike"
                              className="options__input"
                              type="checkbox"
                              value="nolike"
                              name="opros1"
                              onClick={() => handleVote(quizVotes.Dislike)}
                            />
                            <label
                              htmlFor="dislike"
                              className="options__label options__label_like options__label_1"
                            >
                            <span className="options__text options__text_like">
                              Не понравилось
                            </span>
                              {isVoted ? (
                                <span className="options__number-likes">{perDisagree || 0}%</span>
                              ) : (
                                <span></span>
                              )}
                            </label>
                          </div>
                        </div>
                      ) : (
                        <div className="options options_likes">
                          <div className="options__items options__items_likes">
                            <input
                              id="like"
                              className="options__input"
                              type="checkbox"
                              value="like"
                              name="opros1"
                              onClick={() => throwError('polls')}
                            />
                            <label
                              htmlFor="like"
                              className="options__label options__label_like options__label_2"
                            >
                            <span className="options__text options__text_like">
                              Понравилось
                            </span>
                            </label>
                          </div>
                          <div className="options__items options__items_likes">
                            <input
                              id="dislike"
                              className="options__input"
                              type="checkbox"
                              value="nolike"
                              name="opros1"
                              onClick={() => throwError('polls')}
                            />
                            <label
                              htmlFor="dislike"
                              className="options__label options__label_like options__label_1"
                            >
                            <span className="options__text options__text_like">
                              Не понравилось
                            </span>
                            </label>
                          </div>
                        </div>
                      )}
                    </form>
                  </div>
                  <div className="content-news-single__comments comments-content-news">
                    <div className="comments-content-news__top top-comments-news">
                      <p className="top-comments-news__comments-quantity">
                        <span className="top-comments-news__number">{countComments}</span>{" "}
                        комментариев
                      </p>
                      <div className="top-comments-news__sort">
                        <button
                          type="button"
                          className="top-comments-news__btn-sort"
                          onClick={() => setIsOpen(!isOpen)}
                        >
                          <Image src={SortIcon} alt="Иконка" />
                        </button>
                        <ul className={`top-comments-news__list ${isOpen ? 'active' : ''}`}>
                          <li className="top-comments-news__item">
                            <Link
                              href="#"
                              className="top-comments-news__link"
                              onClick={() => {
                                setOption('ASC')
                                setIsOpen(!isOpen);
                              }}
                            >
                              Старые
                            </Link>
                          </li>
                          <li className="top-comments-news__item">
                            <Link
                              href="#"
                              className="top-comments-news__link"
                              onClick={() => {
                                setOption('DESC')
                                setIsOpen(!isOpen);
                              }}
                            >
                              Последние
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="comments-content-news__body">
                      {session.data ? (
                        <form
                          action='#'
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
                      ) : (
                        <div
                          className="comments-content-news__comments-form"
                        >
                        <textarea
                          autoComplete="off"
                          placeholder="Написать комментарий..."
                          className="comments-content-news__input"
                        />
                          <button
                            type="submit"
                            className="comments-content-news__button"
                            onClick={() => throwError('comments')}
                          >
                            Отправить
                          </button>
                        </div>
                      )}
                    </div>
                    <div
                      id="comments"
                      className="comments-content-news__bottom bottom-comments-news"
                    >
                      <div className="bottom-comments-news__level-1">
                        {comments?.map((item, index) => (
                          <Comments key={index}
                            commentId={item.id}
                            name={item.username}
                            text={item.text!}
                            class1={'bottom-comments-news__comment-item'}
                            class2={'bottom-comments-news__level-2'}
                            img={item.userImage!}
                            time={item.viewDate!}
                          />
                        ))}
                      </div>
                    </div>
                    {loading && <p>Загрузка...</p>}
                    {hasMore && !loading &&
                      <button onClick={handleLoadMore} className="comments-content-news__btn-more btn-more">
                        Показать еще
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
          {login == 1 && <PopupAccount onPopupAccount={setLogin} />}
        </AnimatePresence>
        <AnimatePresence>
          {search == 1 && <Search onSearch={setSearch} />}
        </AnimatePresence>
        <AnimatePresence>
          {createNews == 1 && <PopupNews onPopupNews={setCreateNews} />}
        </AnimatePresence>
      </div>
    </div>
  );
}
