"use client";

import Image from "next/image";
import React, { useState } from "react";
import Social1 from "@/img/social/02.svg";
import Social2 from "@/img/social/04.svg";
import { Header } from "@/components/Header/Header";
import { Select as SelectMenu, SelectItem } from "@nextui-org/react";

export default function Account() {
  const [option, setOption] = useState(0);
  const [change, setChange] = useState(0);

  return (
    <div className="wrapper">
      <Header className={"header menu-visual"} />
      <main className="page page_account">
        <section className="page__account account">
          <div className="account__container">
            <div data-tabs className="account__tabs">
              <nav
                data-tabs-titles
                className="account__navigation navigation-tabs"
              >
                <button
                  type="button"
                  className={
                    option == 0
                      ? "account__title title-tabs _tab-active"
                      : "account__title title-tabs"
                  }
                  onClick={() => setOption(0)}
                >
                  Аккаунт
                </button>
                <button
                  type="button"
                  className={
                    option == 1
                      ? "account__title title-tabs _tab-active"
                      : "account__title title-tabs"
                  }
                  onClick={() => setOption(1)}
                >
                  Поддержка
                </button>
              </nav>
              <div data-tabs-body className="account__content">
                {option == 0 && change == 0 ? (
                  <div className="account__body body-account">
                    <h2 className="body-account__title">
                      Привет, <span>Имя</span>!
                    </h2>
                    <div className="body-account__blocks blocks-body-account">
                      <div className="blocks-body-account__block left-blocks-body">
                        <h3 className="left-blocks-body__title title-account title-account_main">
                          Информация об аккаунте
                        </h3>
                        <div className="left-blocks-body__actual">
                          <div className="left-blocks-body__top">
                            <div className="left-blocks-body__item">
                              <span className="left-blocks-body__title-info">
                                Имя
                              </span>
                              <span className="left-blocks-body__title-name">
                                Саша
                              </span>
                            </div>
                            <div className="left-blocks-body__item">
                              <span className="left-blocks-body__title-info">
                                E-mail
                              </span>
                              <span className="left-blocks-body__title-name">
                                ааааа0303@gmail.com
                              </span>
                            </div>
                            <a
                              href="#"
                              className="left-blocks-body__link link-account"
                              onClick={() => setChange(1)}
                            >
                              Изменить
                            </a>
                          </div>
                          <div className="left-blocks-body__bottom">
                            <a
                              href="#"
                              className="left-blocks-body__link link-account"
                            >
                              Изменить пароль
                            </a>
                            <a
                              href="#"
                              className="left-blocks-body__link-password"
                            >
                              Забыли пароль?
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="blocks-body-account__block right-blocks-body right-blocks-body_first">
                        <h3 className="right-blocks-body__title title-account">
                          Мой профиль
                        </h3>
                        <form
                          action="#"
                          data-one-select
                          className="right-blocks-body__form"
                        >
                          <div className="right-blocks-body__item">
                            <label
                              htmlFor="form[]"
                              className="right-blocks-body__label"
                            >
                              Местоположение
                            </label>
                            <div className="w-[480px] bg-white !border-[1px] !border-black border-solid rounded-[12px] text-black  ">
                              <SelectMenu
                                className="text-black text-[25px] max-h-xs"
                                size="lg"
                              >
                                <SelectItem
                                  key={1}
                                  value="1"
                                  className="text-black text-[25px]"
                                >
                                  Страна
                                </SelectItem>
                                <SelectItem key={2} value="2">
                                  Страна
                                </SelectItem>
                                <SelectItem key={3} value="3">
                                  Страна
                                </SelectItem>
                                <SelectItem key={4} value="4">
                                  Страна
                                </SelectItem>
                              </SelectMenu>
                            </div>
                          </div>
                          <div className="right-blocks-body__item">
                            <label
                              htmlFor="form[]"
                              className="right-blocks-body__label"
                            >
                              Дата рождения
                            </label>
                            <input
                              id="birthday"
                              type="text"
                              name="form[]"
                              value="22.12.2004"
                              className="right-blocks-body__input-date"
                            />
                          </div>
                          <div className="right-blocks-body__item right-blocks-body__item_news">
                            <label
                              htmlFor="form[]"
                              className="right-blocks-body__label"
                            >
                              Интересующие категории новостей
                            </label>
                            <div className="w-[480px] bg-white !border-[1px] !border-black border-solid rounded-[12px] text-black  ">
                              <SelectMenu
                                className="text-black text-[25px] max-h-xs"
                                size="lg"
                              >
                                <SelectItem
                                  key={1}
                                  value="1"
                                  className="text-black text-[25px] "
                                >
                                  Экономика
                                </SelectItem>
                                <SelectItem key={2} value="2">
                                  Политика
                                </SelectItem>
                                <SelectItem key={3} value="3">
                                  Мировые новости
                                </SelectItem>
                                <SelectItem key={4} value="4">
                                  Бизнес
                                </SelectItem>
                              </SelectMenu>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                ) : option == 0 && change == 1 ? (
                  <div className="account__body body-account">
                    <h2 className="body-account__title">
                      Привет, <span>Имя</span>!
                    </h2>
                    <div className="body-account__blocks blocks-body-account">
                      <form
                        action="#"
                        className="blocks-body-account__block left-blocks-body"
                      >
                        <div className="left-blocks-body__top left-blocks-body__top_change">
                          <h3 className="left-blocks-body__title title-account">
                            Информация об аккаунте
                          </h3>
                          <div className="left-blocks-body__items">
                            <div className="left-blocks-body__item">
                              <label
                                htmlFor="form[]"
                                className="left-blocks-body__title-info"
                              >
                                Имя
                              </label>
                              <input
                                autoComplete="off"
                                type="text"
                                name="form[]"
                                data-error="Ошибка"
                                placeholder="Введите имя..."
                                className="left-blocks-body__input select-input"
                                required
                              />
                            </div>
                            <div className="left-blocks-body__item">
                              <label
                                htmlFor="form[]"
                                className="left-blocks-body__title-info"
                              >
                                E-mail
                              </label>
                              <input
                                autoComplete="off"
                                type="email"
                                name="form[]"
                                data-error="Ошибка"
                                placeholder="Введите e-mail..."
                                className="left-blocks-body__input select-input"
                                required
                              />
                            </div>
                          </div>
                          <div className="left-blocks-body__bottom-btns">
                            <button
                              type="submit"
                              className="left-blocks-body__btn link-account"
                              onClick={() => setChange(0)}
                            >
                              Сохранить
                            </button>
                            <button
                              type="button"
                              className="left-blocks-body__btn link-account link-account_black"
                              onClick={() => setChange(0)}
                            >
                              Отмена
                            </button>
                          </div>
                        </div>
                      </form>
                      <div className="blocks-body-account__block right-blocks-body right-blocks-body_first">
                        <h3 className="right-blocks-body__title title-account">
                          Мой профиль
                        </h3>
                        <form
                          action="#"
                          data-one-select
                          className="right-blocks-body__form"
                        >
                          <div className="right-blocks-body__item">
                            <label
                              htmlFor="form[]"
                              className="right-blocks-body__label"
                            >
                              Местоположение
                            </label>
                            <div className="w-[480px] bg-white !border-[1px] !border-black border-solid rounded-[12px] text-black  ">
                              <SelectMenu
                                className="text-black text-[25px] max-h-xs"
                                size="lg"
                              >
                                <SelectItem
                                  key={1}
                                  value="1"
                                  className="text-black text-[25px]"
                                >
                                  Страна
                                </SelectItem>
                                <SelectItem key={2} value="2">
                                  Страна
                                </SelectItem>
                                <SelectItem key={3} value="3">
                                  Страна
                                </SelectItem>
                                <SelectItem key={4} value="4">
                                  Страна
                                </SelectItem>
                              </SelectMenu>
                            </div>
                          </div>
                          <div className="right-blocks-body__item">
                            <label
                              htmlFor="form[]"
                              className="right-blocks-body__label"
                            >
                              Дата рождения
                            </label>
                            <input
                              type="text"
                              id="birthday"
                              name="form[]"
                              value="22.12.2004"
                              className="right-blocks-body__input-date"
                            />
                          </div>
                          <div className="right-blocks-body__item right-blocks-body__item_news">
                            <label
                              htmlFor="form[]"
                              className="right-blocks-body__label"
                            >
                              Интересующие категории новостей
                            </label>
                            <div className="w-[480px] bg-white !border-[1px] !border-black border-solid rounded-[12px] text-black  ">
                              <SelectMenu
                                className="text-black text-[25px] max-h-xs"
                                size="lg"
                              >
                                <SelectItem
                                  key={1}
                                  value="1"
                                  className="text-black text-[25px]"
                                >
                                  Страна
                                </SelectItem>
                                <SelectItem key={2} value="2">
                                  Страна
                                </SelectItem>
                                <SelectItem key={3} value="3">
                                  Страна
                                </SelectItem>
                                <SelectItem key={4} value="4">
                                  Страна
                                </SelectItem>
                              </SelectMenu>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="account__body body-account">
                    <h2 className="body-account__title">Свяжитесь с нами</h2>
                    <div className="body-account__blocks body-account__blocks_support blocks-body-account">
                      <div className="blocks-body-account__block left-blocks-body">
                        <h3 className="left-blocks-body__title title-account title-account_main">
                          Контакты
                        </h3>
                        <div className="left-blocks-body__actual">
                          <div className="left-blocks-body__top">
                            <div className="left-blocks-body__item">
                              <span className="left-blocks-body__title-info">
                                Наш e-mail
                              </span>
                              <a
                                href="mailto:ааааа0303@gmail.com"
                                className="left-blocks-body__title-name left-blocks-body__title-name_link"
                              >
                                ааааа0303@gmail.com
                              </a>
                            </div>
                            <div className="left-blocks-body__item">
                              <span className="left-blocks-body__title-info">
                                Наш номер
                              </span>
                              <a
                                href="tel:+77777777777"
                                className="left-blocks-body__title-name left-blocks-body__title-name_link"
                              >
                                +7 777 777 77 77
                              </a>
                            </div>
                            <div className="left-blocks-body__item">
                              <span className="left-blocks-body__title-info">
                                Наши соцсети
                              </span>
                              <ul className="left-blocks-body__social-list">
                                <li className="left-blocks-body__social-item">
                                  <a
                                    href="#"
                                    className="left-blocks-body__social-link link-social link-social_small link-social_small-facebook"
                                  >
                                    <Image src={Social1} alt="icon" />
                                  </a>
                                </li>
                                <li className="left-blocks-body__social-item">
                                  <a
                                    href="#"
                                    className="left-blocks-body__social-link link-social link-social_small link-social_small-twitter"
                                  >
                                    <Image src={Social2} alt="icon" />
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="blocks-body-account__block right-blocks-body">
                        <h3 className="right-blocks-body__title title-account">
                          Есть вопросы?
                        </h3>
                        <form
                          action="#"
                          data-dev
                          data-popup-message="#popup-account-answer"
                          className="right-blocks-body__form right-blocks-body__form_questions"
                        >
                          <div className="right-blocks-body__items-wrap">
                            <div className="right-blocks-body__item">
                              <input
                                autoComplete="off"
                                type="text"
                                name="form[]"
                                data-error="Ошибка"
                                placeholder="ФИО..."
                                className="right-blocks-body__input select-input"
                                required
                              />
                            </div>
                            <div className="right-blocks-body__item">
                              <div className="w-[480px] bg-white !border-[1px] !border-black border-solid rounded-[12px] text-black  ">
                                <SelectMenu
                                  className="text-black text-[25px] max-h-xs"
                                  size="lg"
                                >
                                  <SelectItem
                                    key={1}
                                    value="1"
                                    className="text-black text-[25px]"
                                  >
                                    Страна
                                  </SelectItem>
                                  <SelectItem key={2} value="2">
                                    Страна
                                  </SelectItem>
                                  <SelectItem key={3} value="3">
                                    Страна
                                  </SelectItem>
                                  <SelectItem key={4} value="4">
                                    Страна
                                  </SelectItem>
                                </SelectMenu>
                              </div>
                            </div>
                            <div className="right-blocks-body__item">
                              <textarea
                                autoComplete="off"
                                name="form[]"
                                placeholder="Введите вопрос..."
                                data-error="Ошибка"
                                className="right-blocks-body__txt select-input"
                                required
                              ></textarea>
                            </div>
                          </div>
                          <div className="right-blocks-body__checkbox checkbox checkbox_account">
                            <input
                              id="c_30"
                              className="checkbox__input"
                              data-required
                              data-error="Подтвердите свое согласие"
                              type="checkbox"
                              value="1"
                              name="form[]"
                            />
                            <label
                              htmlFor="c_30"
                              className="checkbox__label checkbox__label_account"
                            >
                              <p className="checkbox__text checkbox__text_account">
                                Подтверждаю, что я согласен на обработку моих
                                персональных данных в соответствии с{" "}
                                <a href="#" className="blue">
                                  Условиями
                                </a>
                              </p>
                            </label>
                          </div>
                          <button
                            type="submit"
                            className="right-blocks-body__btn link-account"
                          >
                            Отправить
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                )}
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
