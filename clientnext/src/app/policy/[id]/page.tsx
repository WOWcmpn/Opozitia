import { Header } from "@/components/Header/Header";
import React from 'react';
import Image from 'next/image';
import CommentsImage from '@/img/icons/comments.svg';
import CopyImage from '@/img/icons/copy.svg';
import CopyLinkImage from '@/img/icons/copy-link.svg';
import fb from '@/img/icons/fb.svg';
import twitter from '@/img/icons/twitter.svg';
import ShareGrey from '@/img/icons/share-gray.svg';
import SortIcon from '@/img/icons/sort.svg';
import { Comments } from '@/components/Comment/Comments';
import CommentImage from '@/img/icons/comments-image.png';
import { LatestNews } from '@/components/LatestNews/LatestNews';
import { NewsService } from '@/service/news.service';

export default async function NewsId({params} : {params: {id: string}}) {
  const data = await NewsService.getNewsById(params.id)

  let isUrl = false;
  if (data!.news.fullImgUrl.substring(0, 4) == "http") isUrl = true;

  const paragraphs = data?.news.description.split('.').filter(paragraph => paragraph.trim() !== '');

  return (
    <div className="wrapper">
      <Header className={"header menu-visual"} />
      <main className="page">
        <section className="page__news-single news-single">
          <div className="news-single__container">
            <div className="news-single__body body-sidebar">
              <div className="news-single__left">
                <div className="news-single__main-block main-block-news">
                  <div className="main-block-news__top">
                    <div className="main-block-news__text-block">
                      <h2 className="main-block-news__category-title dot">
                        Политика
                      </h2>
                      <h1 className="main-block-news__title">
                        {data?.news.title}
                      </h1>
                    </div>
                  </div>
                  <div className="main-block-news__bottom">
                    <div className="main-block-news__left-bottom">
                      <span className="main-block-news__date dot">
                        {data?.news.viewDate}
                      </span>
                      <p className="main-block-news__time-reading">
                        <span className="main-block-news__minutes">
                          1 минута
                        </span>
                          на чтение
                      </p>
                    </div>
                    <div className="main-block-news__right-bottom">
                      <a
                        href="#"
                        data-goto="#comments"
                        data-goto-header
                        className="main-block-news__link-comments dot"
                      >
                        <Image src={CommentsImage} alt="Иконка" />
                        <span className="main-block-news__comments-number">
                          7
                        </span>
                      </a>
                      <div className="main-block-news__right-share">
                        <button
                          type="button"
                          className="main-block-news__actions"
                        >
                          <Image src={CopyImage} alt="Иконка" />
                        </button>
                        <ul className="main-block-news__actions-list">
                          <li className="main-block-news__actions-item">
                            <a
                              href="#"
                              className="main-block-news__actions-link"
                            >
                              <Image src={CopyLinkImage} alt="Иконка" />{" "}
                              Скопировать ссылку
                            </a>
                          </li>
                          <li className="main-block-news__actions-item">
                            <a
                              href="#"
                              className="main-block-news__actions-link"
                            >
                              <Image src={fb} alt="Иконка" />
                              Facebook
                            </a>
                          </li>
                          <li className="main-block-news__actions-item">
                            <a
                              href="#"
                              className="main-block-news__actions-link"
                            >
                              <Image src={twitter} alt="Иконка" />
                              Twitter
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="main-block-news__image">
                    <picture>
                      {isUrl ? (
                        <Image fill={true} src={data!.news.fullImgUrl} alt="Image" />
                      ) : (
                        <Image
                          fill={true}
                          src={`/img/fullImage-news/${data!.news.fullImgUrl}`}
                          alt="Image"
                        />
                      )}
                    </picture>
                  </div>
                </div>
                <div className="news-single__content content-news-single">
                  <h2 className="content-news-single__title">
                    {data?.news.title}
                  </h2>
                  <div className="content-news-single__text">
                    {paragraphs!.map((paragraph, index) => (
                      <p key={index} className="text" >{`${paragraph}.`}</p>
                    ))}
                  </div>
                  <div className="content-news-single__bottom">
                    <span className="content-news-single__time">{data?.news.createdAtTime}</span>
                    <a
                      href="#"
                      className="content-news-single__share flex gap-[5px]"
                    >
                      <Image src={ShareGrey} alt="Иконка" />
                      Поделиться
                    </a>
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
                        <span className="top-comments-news__number">7</span>{" "}
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
                            <a href="#" className="top-comments-news__link">
                              Лучшие
                            </a>
                          </li>
                          <li className="top-comments-news__item">
                            <a href="#" className="top-comments-news__link">
                              Последние
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="comments-content-news__body">
                      <form
                        action="#"
                        className="comments-content-news__comments-form"
                      >
                        <textarea
                          autoComplete="off"
                          name="form[]"
                          placeholder="Написать комментарий..."
                          className="comments-content-news__input"
                        ></textarea>
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
                        <Comments
                          name="Dmitry"
                          text="Maecenas dictum diam non purus facilisis, ut egestas nulla eleifend. Suspendisse non ante
                                                condimentum, pharetra arcu eu, mattis massa. Nam ullamcorper nisl sit amet neque pretium, vel
                                                scelerisque eros dapibus. Aliquam erat volutpat. In a nisl faucibus, tincidunt mi ac, ornare
                                                tortor. Pellentesque felis lacus, viverra vel molestie ut, viverra eu nisl."
                          class1="bottom-comments-news__comment-item"
                          img={CommentImage}
                          time="5 часов назад"
                          likes={5}
                        />
                      </div>
                      <div className="bottom-comments-news__level-2">
                        <Comments
                          name="Dmitry"
                          text="Maecenas dictum diam non purus facilisis, ut egestas nulla eleifend. Suspendisse non ante
                                                condimentum, pharetra arcu eu, mattis, tincidunt mi ac, ornare
                                                tortor. Pellentesque felis lacus, viverra vel molestie ut, viverra eu nisl."
                          class1="bottom-comments-news__comment-item item-block"
                          img={CommentImage}
                          time="5 часов назад"
                          likes={5}
                        />
                        <Comments
                          name="Dmitry"
                          text="Maecenas dictum diam non purus facilisis, ut egestas nulla eleifend. Suspendisse non ante
                                                condimentum, pharetra arcu eu, mattis, tincidunt mi ac, ornare
                                                tortor. Pellentesque felis lacus, viverra vel molestie ut, viverra eu nisl."
                          class1="bottom-comments-news__comment-item item-block"
                          img={CommentImage}
                          time="5 часов назад"
                          likes={5}
                        />
                      </div>
                      <div className="bottom-comments-news__level-1 item-block hidden">
                        <Comments
                          name="Dmitry"
                          text="Maecenas dictum diam non purus facilisis, ut egestas nulla eleifend. Suspendisse non ante
                                                condimentum, pharetra arcu eu, mattis massa. Nam ullamcorper nisl sit amet neque pretium, vel
                                                scelerisque eros dapibus. Aliquam erat volutpat. In a nisl faucibus, tincidunt mi ac, ornare
                                                tortor. Pellentesque felis lacus, viverra vel molestie ut, viverra eu nisl."
                          class1="bottom-comments-news__comment-item"
                          img={CommentImage}
                          time="5 часов назад"
                          likes={5}
                        />
                      </div>
                      <div className="bottom-comments-news__level-1 item-block hidden">
                        <Comments
                          name="Dmitry"
                          text="Maecenas dictum diam non purus facilisis, ut egestas nulla eleifend. Suspendisse non ante
                                                condimentum, pharetra arcu eu, mattis massa. Nam ullamcorper nisl sit amet neque pretium, vel
                                                scelerisque eros dapibus. Aliquam erat volutpat. In a nisl faucibus, tincidunt mi ac, ornare
                                                tortor. Pellentesque felis lacus, viverra vel molestie ut, viverra eu nisl."
                          class1="bottom-comments-news__comment-item"
                          img={CommentImage}
                          time="5 часов назад"
                          likes={5}
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      className="comments-content-news__btn-more btn-more"
                    >
                      Еще 6 комментариев
                    </button>
                  </div>
                </div>
              </div>
              <div className="news-single__wrap-right sidebar">
                <aside className="news-single__latest-news latest-news latest-news_big">
                  <a
                    href="lastnews"
                    className="latest-news__main-title-link"
                  >
                    <h3 className="latest-news__title">Latest news</h3>
                  </a>
                  {data?.sidebarNews!.map(n => (
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
  );
}
