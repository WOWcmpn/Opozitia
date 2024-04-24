import Image from "next/image";
import Message from "../img/icons/message.svg"
import Logo from "../img/logo.png"
import LatestNews02 from "../img/latest-news/02.png"
import { LatestNews } from "@/components/LatestNews/LatestNews";


export default function Home() {
  return (
    <div className="home">

      <div className="wrapper">
        <div className="help">
          <div className="help__wrap">
            <p className="help__text">Work with us and help Moldova </p>
            <button className="help__btn">x</button>
          </div>
        </div>
        <header className="header menu-visual-hidden-box">
          <div className="header__container">
            <div className="header__top top-header">
              <a href="home.html" className="top-header__logo">
                <picture><source srcSet="img/logo.webp" type="image-webp"/><Image src={Logo} alt="Logo"/></picture>
              </a>
              <div className="top-header__right">
                <div className="top-header__actions">
                  <a href="oprosi.html" className="top-header__link link-top-header">
                    <Image  src={Message} alt="Icon"/>
                  </a>
                  <a data-popup="#search" href="#" className="top-header__link-search link-top-header">
                    <Image width={20} height={20} src="/img/icons/search.svg" alt="Icon"/>
                  </a>
                  <a data-popup="#popup-login" href="#" className="top-header__link-login link-top-header">
                    <picture><source srcSet="img/icons/login.webp" type="image-webp"/>
                    <Image width={55} height={50} src="/img/icons/login.png" alt="Icon"/></picture>
                  </a>
                </div>
                <div className="top-header__weather weather-header">
                  <a href="#" className="weather-header__info">
                    <span id="temperature" className="weather-header__temperature">11°</span>
                    <Image width={30} height={30} src="/img/icons/sun.svg" className="weather-header__icon" alt="icon"/>
                  </a>
                  <div className="weather-header__location">
                    <span id="location" className="weather-header__city">Москва</span>
                    <Image width={15} height={15} src="/img/icons/location.svg" alt="icon"/>
                  </div>
                </div>
                <button type="button" className="top-header__icon-menu icon-menu"><span></span><span></span></button>
              </div>
            </div>
            <div className="header__bottom bottom-header">
              <div className="bottom-header__menu menu">
                <nav className="menu__body">
                  <ul className="menu__list">
                    <li className="menu__item">
                      <a href="economika.html" className="menu__link">ЭКОНОМИКА</a>
                    </li>
                    <li className="menu__item">
                      <a href="policy.html" className="menu__link">ПОЛИТИКА</a>
                    </li>
                    <li className="menu__item">
                      <a href="business.html" className="menu__link">БИЗНЕС</a>
                    </li>
                    <li className="menu__item">
                      <a href="world-news.html" className="menu__link">МИРОВЫЕ НОВОСТИ</a>
                    </li>
                  </ul>
                </nav>
              </div>
              <a href="#" data-popup="#popup-vote" className="bottom-header__link"><span className="bottom-header__link-news">Сообщить новость</span><span className="bottom-header__link-news-icon">
                <Image fill src="/img/icons/plus.svg" alt="Иконка"/></span></a>
            </div>
          </div>
        </header>
        <main className="page">
          <section className="page__main-block main-block">
            <div className="main-block__container">
              <div className="main-block__wrap-slider">
                <div className="main-block__wrap-btns">
                  <button type="button" data-da=".main-block__wrap-slider,1266,1" className="main-block__swiper-button-prev btn-slider"></button>
                  <button type="button" data-da=".main-block__wrap-slider,1266,1" className="main-block__swiper-button-next btn-slider btn-slider_right"></button>
                </div>
                <div className="main-block__slider swiper">
                  <div className="main-block__wrapper swiper-wrapper">
                    <div className="main-block__slide slide-main-block swiper-slide">
                      <a href="#" className="slide-main-block__item-link">
                        <picture><source srcSet="img/main-block/01.webp" type="image-webp"/>
                        <Image fill src="/img/main-block/01.png" alt="Image"/></picture>
                        </a>
                      <div className="slide-main-block__right">
                        <h5 className="slide-main-block__sub-title">Бизнес</h5>
                        <a href="#" className="slide-main-block__right-link">
                          <h3 className="slide-main-block__title">Курс доллара упал предельно низко в 2024 году. Что ждать
                            даль...
                          </h3>
                        </a>
                      </div>
                    </div>
                    <div className="main-block__slide slide-main-block swiper-slide">
                      <a href="#" className="slide-main-block__item-link">
                        <picture><source srcSet="img/main-block/02.webp" type="image-webp"/>
                        <Image fill src="/img/main-block/02.png" alt="Image"/>
                          </picture>
                          </a>
                      <div className="slide-main-block__right">
                        <h5 className="slide-main-block__sub-title">Мировые новости</h5>
                        <a href="#" className="slide-main-block__right-link">
                          <h3 className="slide-main-block__title">Премьер-министр Молдовы одобрил вступление в
                            ЕС
                          </h3>
                        </a>
                      </div>
                    </div>
                    <div className="main-block__slide slide-main-block swiper-slide">
                      <a href="#" className="slide-main-block__item-link"><picture><source srcSet="img/main-block/03.webp" type="image-webp"/>
                      <Image fill src="/img/main-block/03.png" alt="Image"/></picture></a>
                      <div className="slide-main-block__right">
                        <h5 className="slide-main-block__sub-title">Политика</h5>
                        <a href="#" className="slide-main-block__right-link">
                          <h3 className="slide-main-block__title">Война в Израиле продолжается. Когда ожидать переговоры
                          </h3>
                        </a>
                      </div>
                    </div>
                    <div className="main-block__slide slide-main-block swiper-slide">
                      <a href="#" className="slide-main-block__item-link"><picture><source srcSet="img/main-block/01.webp" type="image-webp"/>
                      <Image fill src="/img/main-block/01.png" alt="Image"/></picture></a>
                      <div className="slide-main-block__right">
                        <h5 className="slide-main-block__sub-title">Бизнес</h5>
                        <a href="#" className="slide-main-block__right-link">
                          <h3 className="slide-main-block__title">Курс доллара упал предельно низко в 2024 году. Что ждать
                            даль...
                          </h3>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="page__block block">
            <div className="block__container">
              <div className="block__graphics graphics-left-block">
                <div className="graphics-left-block__item">
                  <div className="graphics-left-block__slider swiper">
                    <div className="graphics-left-block__wrapper swiper-wrapper">
                      <div className="graphics-left-block__slide swiper-slide">
                        <div className="graphics-left-block__top">
                          <a href="exchange.html#tab-0-1" className="graphics-left-block__info">
                            <span className="graphics-left-block__name">
                              SNPIND
                            </span>
                            <h4 className="graphics-left-block__title">DOW JONES</h4>
                          </a>
                          <a href="exchange.html#tab-0-1" className="graphics-left-block__trade">
                            <span className="graphics-left-block__trade-info">$15400.55</span>
                            <span className="graphics-left-block__change graphics-left-block__change_plus">1.99%</span>
                          </a>
                        </div>
                      </div>
                      <div className="graphics-left-block__slide swiper-slide">
                        <div className="graphics-left-block__top">
                          <a href="exchange.html#tab-0-1" className="graphics-left-block__info">
                            <span className="graphics-left-block__name">
                              SNPIND
                            </span>
                            <h4 className="graphics-left-block__title">Индекс USD</h4>
                          </a>
                          <a href="exchange.html#tab-0-1" className="graphics-left-block__trade">
                            <span className="graphics-left-block__trade-info">104,43</span>
                            <span className="graphics-left-block__change graphics-left-block__change_plus">1,02%</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <a href="exchange.html#tab-0-1" className="graphics-left-block__image">
                    {/* <Image fill src="/img/graphics/01.svg" alt="image"/> */}
                  </a>
                </div>
                <div className="graphics-left-block__item">
                  <div className="graphics-left-block__slider2 swiper">
                    <div className="graphics-left-block__wrapper swiper-wrapper">
                      <div className="graphics-left-block__slide swiper-slide">
                        <div className="graphics-left-block__top">
                          <a href="exchange.html" className="graphics-left-block__info">
                            <span className="graphics-left-block__name">
                              FOREX
                            </span>
                            <h4 className="graphics-left-block__title">EUR/USD</h4>
                          </a>
                          <a href="exchange.html" className="graphics-left-block__trade">
                            <span className="graphics-left-block__trade-info">1.08</span>
                            <span className="graphics-left-block__change graphics-left-block__change_minus">1.99%</span>
                          </a>
                        </div>
                      </div>
                      <div className="graphics-left-block__slide swiper-slide">
                        <div className="graphics-left-block__top">
                          <a href="exchange.html" className="graphics-left-block__info">
                            <span className="graphics-left-block__name">
                              FOREX
                            </span>
                            <h4 className="graphics-left-block__title">USD/EUR</h4>
                          </a>
                          <a href="exchange.html" className="graphics-left-block__trade">
                            <span className="graphics-left-block__trade-info">1.18</span>
                            <span className="graphics-left-block__change graphics-left-block__change_plus">1.69%</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <a href="exchange.html" className="graphics-left-block__image">
                    {/* <Image fill src="/img/graphics/02.svg" alt="image"/> */}
                  </a>
                </div>
              </div>
              <div data-da=".main-block__container,600" className="block__bottom bottom-left-block">
                <div className="bottom-left-block__thumbs thumbs-images">
                  <div className="thumbs-images__wrapper swiper-wrapper">
                    <div className="thumbs-images__slide swiper-slide">
                      <a href="#" className="thumbs-images__image-ibg">
                        <picture><source srcSet="img/actual-news/01.webp" type="image-webp"/>
                        <Image fill src="/img/actual-news/01.jpg" alt="Картинка"/></picture>
                      </a>
                    </div>
                    <div className="thumbs-images__slide swiper-slide">
                      <a href="#" className="thumbs-images__image-ibg">
                        <picture><source srcSet="img/actual-news/02.webp" type="image-webp"/>
                        <Image fill src="/img/actual-news/02.jpg" alt="Картинка"/></picture>
                      </a>
                    </div>
                    <div className="thumbs-images__slide swiper-slide">
                      <a href="#" className="thumbs-images__image-ibg">
                        <picture><source srcSet="img/actual-news/03.webp" type="image-webp"/>
                        <Image fill src="/img/actual-news/03.jpg" alt="Картинка"/></picture>
                      </a>
                    </div>
                    <div className="thumbs-images__slide swiper-slide">
                      <a href="#" className="thumbs-images__image-ibg">
                        <picture><source srcSet="img/actual-news/04.webp" type="image-webp"/>
                        <Image fill src="/img/actual-news/04.jpg" alt="Картинка"/></picture>
                      </a>
                    </div>
                    <div className="thumbs-images__slide swiper-slide">
                      <a href="#" className="thumbs-images__image-ibg">
                        <picture><source srcSet="img/actual-news/05.webp" type="image-webp"/>
                        <Image fill src="/img/actual-news/05.jpg" alt="Картинка"/></picture>
                      </a>
                    </div>
                    <div className="thumbs-images__slide swiper-slide">
                      <a href="#" className="thumbs-images__image-ibg">
                        <picture><source srcSet="img/actual-news/06.webp" type="image-webp"/>
                        <Image fill src="/img/actual-news/06.jpg" alt="Картинка"/></picture>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="bottom-left-block__content">
                  <div className="bottom-left-block__slider-main slider-bottom-left-block swiper">
                    <div className="bottom-left-block__wrapper swiper-wrapper">
                      <div className="bottom-left-block__slide swiper-slide">
                        <a href="#" className="bottom-left-block__news-link">
                          <h4 className="bottom-left-block__title">В Японии госпитализировали 26 человек после приема БАДов
                          </h4>
                        </a>
                      </div>
                      <div className="bottom-left-block__slide swiper-slide">
                        <a href="#" className="bottom-left-block__news-link">
                          <h4 className="bottom-left-block__title">На Украине заявили о нехватке работников в сельском
                            хозяйстве</h4>
                        </a>
                      </div>
                      <div className="bottom-left-block__slide swiper-slide">
                        <a href="#" className="bottom-left-block__news-link">
                          <h4 className="bottom-left-block__title">Лидер левой партии призвал Турцию не умирать за грязные
                            интересы США</h4>
                        </a>
                      </div>
                      <div className="bottom-left-block__slide swiper-slide">
                        <a href="#" className="bottom-left-block__news-link">
                          <h4 className="bottom-left-block__title">Ким Чен Ын проинспектировал танковую дивизию</h4>
                        </a>
                      </div>
                      <div className="bottom-left-block__slide swiper-slide">
                        <a href="#" className="bottom-left-block__news-link">
                          <h4 className="bottom-left-block__title">Таиланд потрясен терактом в Красногорске, заявили в МИД
                          </h4>
                        </a>
                      </div>
                      <div className="bottom-left-block__slide swiper-slide">
                        <a href="#" className="bottom-left-block__news-link">
                          <h4 className="bottom-left-block__title">При землетрясении в Папуа — Новой Гвинее погибли люди
                          </h4>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="bottom-left-block__body">
                    <div className="bottom-left-block__item">
                      <div className="bottom-left-block__slider slider-bottom-left-block swiper">
                        <div className="bottom-left-block__wrapper swiper-wrapper">
                          <div className="bottom-left-block__slide swiper-slide">
                            <a href="#" className="bottom-left-block__link">Чего ожидать Молдове в ближайшие несколько
                              недель?</a>
                          </div>
                          <div className="bottom-left-block__slide swiper-slide">
                            <a href="#" className="bottom-left-block__link">Молдова высылает сотрудника российского
                              посольства</a>
                          </div>
                          <div className="bottom-left-block__slide swiper-slide">
                            <a href="#" className="bottom-left-block__link">Чего ожидать Молдове в ближайшие несколько
                              недель?</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bottom-left-block__item">
                      <div className="bottom-left-block__slider2 slider-bottom-left-block swiper">
                        <div className="bottom-left-block__wrapper swiper-wrapper">
                          <div className="bottom-left-block__slide swiper-slide">
                            <a href="#" className="bottom-left-block__link">Чего ожидать Молдове в ближайшие несколько
                              недель?</a>
                          </div>
                          <div className="bottom-left-block__slide swiper-slide">
                            <a href="#" className="bottom-left-block__link">Молдова высылает сотрудника российского
                              посольства</a>
                          </div>
                          <div className="bottom-left-block__slide swiper-slide">
                            <a href="#" className="bottom-left-block__link">Чего ожидать Молдове в ближайшие несколько
                              недель?</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bottom-left-block__item">
                      <div className="bottom-left-block__slider3 slider-bottom-left-block swiper">
                        <div className="bottom-left-block__wrapper swiper-wrapper">
                          <div className="bottom-left-block__slide swiper-slide">
                            <a href="#" className="bottom-left-block__link">Чего ожидать Молдове в ближайшие несколько
                              недель?</a>
                          </div>
                          <div className="bottom-left-block__slide swiper-slide">
                            <a href="#" className="bottom-left-block__link">Молдова высылает сотрудника российского
                              посольства</a>
                          </div>
                          <div className="bottom-left-block__slide swiper-slide">
                            <a href="#" className="bottom-left-block__link">Чего ожидать Молдове в ближайшие несколько
                              недель?</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <aside className="block__latest-news latest-news">
                <a href="last-news.html" className="latest-news__main-title-link">
                  <h3 className="latest-news__title latest-news__title_posts">Последние новости</h3>
                </a>
                
                <LatestNews
                  title="Молдова высылает сотрудника российского посольства"
                  text="Один из сотрудников посольства России в Кишиневе объявлен персоной нон
                  грата в знак протеста против открытия в Приднестровье избирательных участков по выборам президента
                  РФ, сообщила пресс-служба МИД Молдавии."
                  img={LatestNews02}
                  time="11:00"
                />
                <LatestNews
                  title="Молдова высылает сотрудника российского посольства"
                  text="Один из сотрудников посольства России в Кишиневе объявлен персоной нон
                  грата в знак протеста против открытия в Приднестровье избирательных участков по выборам президента
                  РФ, сообщила пресс-служба МИД Молдавии."
                  img={LatestNews02}
                  time="11:00"
                />

                <LatestNews
                  title="Молдова высылает сотрудника российского посольства"
                  text="Один из сотрудников посольства России в Кишиневе объявлен персоной нон
                  грата в знак протеста против открытия в Приднестровье избирательных участков по выборам президента
                  РФ, сообщила пресс-служба МИД Молдавии."
                  img={LatestNews02}
                  time="11:00"
                />
                <LatestNews
                  title="Молдова высылает сотрудника российского посольства"
                  text="Один из сотрудников посольства России в Кишиневе объявлен персоной нон
                  грата в знак протеста против открытия в Приднестровье избирательных участков по выборам президента
                  РФ, сообщила пресс-служба МИД Молдавии."
                  img={LatestNews02}
                  time="11:00"
                />
                <LatestNews
                  title="Молдова высылает сотрудника российского посольства"
                  text="Один из сотрудников посольства России в Кишиневе объявлен персоной нон
                  грата в знак протеста против открытия в Приднестровье избирательных участков по выборам президента
                  РФ, сообщила пресс-служба МИД Молдавии."
                  img={LatestNews02}
                  time="11:00"
                />
                <LatestNews
                  title="Молдова высылает сотрудника российского посольства"
                  text="Один из сотрудников посольства России в Кишиневе объявлен персоной нон
                  грата в знак протеста против открытия в Приднестровье избирательных участков по выборам президента
                  РФ, сообщила пресс-служба МИД Молдавии."
                  img={LatestNews02}
                  time="11:00"
                />
                <LatestNews
                  title="Молдова высылает сотрудника российского посольства"
                  text="Один из сотрудников посольства России в Кишиневе объявлен персоной нон
                  грата в знак протеста против открытия в Приднестровье избирательных участков по выборам президента
                  РФ, сообщила пресс-служба МИД Молдавии."
                  img={LatestNews02}
                  time="11:00"
                />
                <LatestNews
                  title="Молдова высылает сотрудника российского посольства"
                  text="Один из сотрудников посольства России в Кишиневе объявлен персоной нон
                  грата в знак протеста против открытия в Приднестровье избирательных участков по выборам президента
                  РФ, сообщила пресс-служба МИД Молдавии."
                  img={LatestNews02}
                  time="11:00"
                />
                <LatestNews
                  title="Молдова высылает сотрудника российского посольства"
                  text="Один из сотрудников посольства России в Кишиневе объявлен персоной нон
                  грата в знак протеста против открытия в Приднестровье избирательных участков по выборам президента
                  РФ, сообщила пресс-служба МИД Молдавии."
                  img={LatestNews02}
                  time="11:00"
                />
                

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
      <div id="search" aria-hidden="true" className="popup popup_search">
        <div className="popup__wrapper popup__wrapper_search">
          <div className="popup__content popup__content_search">
            <form action="#" className="popup__search search-popup">
              <input autoComplete="off" type="text" name="form[]" placeholder="Search..." className="search-popup__input"/>
              <button type="submit" className="search-popup__button">
                <Image fill src="/img/icons/search-black.svg" alt="Icon"/>
              </button>
            </form>
          </div>
        </div>
      </div>

      <div id="popup-login" aria-hidden="true" className="popup">
        <div className="popup__wrapper">
          <div className="popup__content content-popup popup__content_first">
            <div className="popup__top">
              <a href="#" className="popup__logo">
                <picture><source srcSet="img/logo.webp" type="image-webp"/>
                  <Image fill src="/img/logo.png" alt="Logo"/></picture>
              </a>
              <button data-close type="button" className="popup__close">
              </button>
            </div>
            <div className="popup__body body-popup">
              <div className="body-popup__top">
                <h3 className="body-popup__title">Войти</h3>
                <p className="body-popup__text">Введите ваш e-mail, чтобы войти</p>
              </div>
              <form action="#" data-dev data-popup-message="#popup-login-password" className="body-popup__form">
                <input type="email" name="form[]" data-error="Введен не верный E-mail" data-required="email" placeholder="E-mail@mail.ru" className="body-popup__input input"/>
                <div className="body-popup__checkbox checkbox">
                  <input id="c_1" className="checkbox__input" data-required type="checkbox" value="1" name="form[]"/>
                  <label htmlFor="c_1" className="checkbox__label"><span className="checkbox__text">Отправляя свои данные, я принимаю
                      политику конфиденциальности</span></label>
                </div>
                <button type="submit" className="body-popup__button">Продолжить</button>
              </form>
              <ul className="body-popup__list-social">
                <li className="body-popup__item-social">
                  <a href="#" className="body-popup__link-social link-social">
                    <Image fill src="/img/social/01.svg" alt="icon"/>
                  </a>
                </li>
                <li className="body-popup__item-social">
                  <a href="#" className="body-popup__link-social link-social link-social_facebook">
                    <Image fill src="/img/social/02.svg" alt="icon"/>
                  </a>
                </li>
                <li className="body-popup__item-social">
                  <a href="#" className="body-popup__link-social link-social">
                    <Image fill src="/img/social/03.svg" alt="icon"/>
                  </a>
                </li>
                <li className="body-popup__item-social">
                  <a href="#" className="body-popup__link-social link-social">
                    <Image fill src="/img/social/04.svg" alt="icon"/>
                  </a>
                </li>
              </ul>
            </div>
            <div className="popup__bottom bottom-popup">
              <p className="bottom-popup__text">
                Ещё нет аккаунта? <a data-popup="#popup-registration" href="#">Зарегистрируйтесь!</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div id="popup-login-password" aria-hidden="true" className="popup">
        <div className="popup__wrapper">
          <div className="popup__content content-popup">
            <div className="popup__top">
              <a href="#" className="popup__logo">
                <picture><source srcSet="img/logo.webp" type="image-webp"/>
                  <Image fill src="/img/logo.png" alt="Logo"/></picture>
              </a>
              <button data-close type="button" className="popup__close">
              </button>
            </div>
            <div className="popup__body body-popup">
              <div className="body-popup__top body-popup__top_single">
                <h3 className="body-popup__title">Введите пароль</h3>
              </div>
              <form action="#" data-dev data-popup-message="#popup-registration-code" className="body-popup__form">
                <input type="password" name="form[]" minLength={10} data-required placeholder="Введите ваш пароль" className="body-popup__input input"/>
                <button type="submit" className="body-popup__button">Подтвердить</button>
              </form>
            </div>
            <div className="popup__bottom bottom-popup">
              <p className="bottom-popup__text">
                Забыли пароль? <a href="#">Нажмите сюда для восстановления</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div id="popup-registration" aria-hidden="true" className="popup">
        <div className="popup__wrapper">
          <div className="popup__content content-popup">
            <div className="popup__top">
              <a href="#" className="popup__logo">
                <picture><source srcSet="img/logo.webp" type="image-webp"/>
                  <Image fill src="/img/logo.png" alt="Logo"/></picture>
              </a>
              <button data-close type="button" className="popup__close">
              </button>
            </div>
            <div className="popup__body body-popup">
              <div className="body-popup__top">
                <h3 className="body-popup__title">Регистрация</h3>
                <p className="body-popup__text body-popup__text_register">Для регистрации введите e-mail или воспользуйтесь
                  сервисами ниже</p>
              </div>
              <form action="#" data-dev data-popup-message="#popup-login-password" className="body-popup__form">
                <input type="email" name="form[]" data-error="Введен не верный E-mail" data-required="email" placeholder="E-mail@mail.ru" className="body-popup__input input"/>
                <div className="body-popup__checkbox checkbox">
                  <input id="c_3" className="checkbox__input" data-required type="checkbox" value="1" name="form[]"/>
                  <label htmlFor="c_3" className="checkbox__label"><span className="checkbox__text">Отправляя свои данные, я принимаю
                      политику конфиденциальности</span></label>
                </div>
                <button type="submit" className="body-popup__button">Продолжить</button>
              </form>
              <ul className="body-popup__list-social">
                <li className="body-popup__item-social">
                  <a href="#" className="body-popup__link-social link-social">
                    <Image fill src="/img/social/01.svg" alt="icon"/>
                  </a>
                </li>
                <li className="body-popup__item-social">
                  <a href="#" className="body-popup__link-social link-social link-social_facebook">
                    <Image fill src="/img/social/02.svg" alt="icon"/>
                  </a>
                </li>
                <li className="body-popup__item-social">
                  <a href="#" className="body-popup__link-social link-social">
                    <Image fill src="/img/social/03.svg" alt="icon"/>
                  </a>
                </li>
                <li className="body-popup__item-social">
                  <a href="#" className="body-popup__link-social link-social">
                    <Image fill src="/img/social/04.svg" alt="icon"/>
                  </a>
                </li>
              </ul>
            </div>
            <div className="popup__bottom bottom-popup">
              <p className="bottom-popup__text">
                Уже есть аккаунт? <a data-popup="#popup-login" href="#">Войдите!</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div id="popup-registration-code" aria-hidden="true" className="popup">
        <div className="popup__wrapper">
          <div className="popup__content content-popup">
            <div className="popup__top">
              <a href="#" className="popup__logo">
                <picture><source srcSet="img/logo.webp" type="image-webp"/>
                  <Image fill src="/img/logo.png" alt="Logo"/></picture>
              </a>
              <button data-close type="button" className="popup__close">
              </button>
            </div>
            <div className="popup__body body-popup">
              <div className="body-popup__top">
                <h3 className="body-popup__title">Введите код</h3>
                <p className="body-popup__text">На E-mail@mail.ru отправлен одноразовый код</p>
              </div>
              <form action="#" data-dev data-popup-message="#popup-registration-password" className="body-popup__form body-popup__form_code">
                <div className="body-popup__wrap-input">
                  <input type="number" maxLength={1} className="body-popup__block " name="digit1" required />
                  <input type="number" maxLength={1} className="body-popup__block " name="digit2" required />
                  <input type="number" maxLength={1} className="body-popup__block " name="digit3" required />
                  <input type="number" maxLength={1} className="body-popup__block " name="digit4" required />
                  <input type="number" maxLength={1} className="body-popup__block " name="digit5" required />
                  <input type="number" maxLength={1} className="body-popup__block " name="digit6" required />
                </div>
                <button type="submit" className="body-popup__button">Продолжить</button>
              </form>
            </div>
            <div className="popup__bottom bottom-popup">
              <p className="bottom-popup__text">
                Код не пришел? <a data-popup="#popup-login" href="#">Нажмите сюда, чтобы прислать заново</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div id="popup-registration-password" aria-hidden="true" className="popup">
        <div className="popup__wrapper">
          <div className="popup__content content-popup">
            <div className="popup__top">
              <a href="#" className="popup__logo">
                <picture><source srcSet="img/logo.webp" type="image-webp"/>
                  <Image fill src="/img/logo.png" alt="Logo"/></picture>
              </a>
              <button data-close type="button" className="popup__close">
              </button>
            </div>
            <div className="popup__body body-popup">
              <div className="body-popup__top body-popup__top_password">
                <h3 className="body-popup__title">Придумайте имя и пароль</h3>
                <p className="body-popup__text">Пароль должен содержать хотя бы 10 символов</p>
              </div>
              <form id="form-pass" action="#" data-dev data-popup-message="#popup-registration-recovery" className="body-popup__form body-popup__form_code">
                <input type="text" name="form[]" placeholder="Введите ваше имя" className="body-popup__input-name input" required />
                <input type="password" id="pass" name="form[]" minLength={10} data-required placeholder="Введите ваш пароль" className="body-popup__input-password input" />
                <input type="password" id="pass2" name="form[]" minLength={10} data-required placeholder="Повторите введенный пароль" className="body-popup__input-password input" />
                <button type="submit" className="body-popup__button body-popup__button_code">Подтвердить</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div id="popup-registration-recovery" aria-hidden="true" className="popup">
        <div className="popup__wrapper">
          <div className="popup__content content-popup">
            <div className="popup__top">
              <a href="#" className="popup__logo">
                <picture><source srcSet="img/logo.webp" type="image-webp"/>
                  <Image fill src="/img/logo.png" alt="Logo"/></picture>
              </a>
              <button data-close type="button" className="popup__close">
              </button>
            </div>
            <div className="popup__body body-popup">
              <div className="body-popup__top">
                <h3 className="body-popup__title">Восстановление пароля</h3>
                <p className="body-popup__text">Введите e-mail, который использовали для регистрации</p>
              </div>
              <form action="#" data-dev data-popup-message="#popup-registration-send" className="body-popup__form">
                <input type="email" name="form[]" data-error="Введен не верный E-mail" data-required="email" placeholder="E-mail@mail.ru" className="body-popup__input input"/>
                <button type="submit" className="body-popup__button">Продолжить</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div id="popup-registration-send" aria-hidden="true" className="popup">
        <div className="popup__wrapper">
          <div className="popup__content content-popup">
            <div className="popup__top">
              <a href="#" className="popup__logo">
                <picture><source srcSet="img/logo.webp" type="image-webp"/>
                  <Image fill src="/img/logo.png" alt="Logo"/></picture>
              </a>
              <button data-close type="button" className="popup__close">
              </button>
            </div>
            <div className="popup__body body-popup body-popup_ok">
              <div className="body-popup__wrap-top">
                <div className="body-popup__top">
                  <h3 className="body-popup__title">Инструкция отправлена!</h3>
                  <p className="body-popup__text">На вашу почту отправлена инструкция по восстановлению пароля</p>
                </div>
              </div>
              <div className="popup__bottom bottom-popup">
                <p className="bottom-popup__text bottom-popup__text_ok">
                  Ничего не пришло? <a className="bottom-popup__link-ok" href="#">Нажмите сюда, чтобы прислать заново</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="popup-vote" aria-hidden="true" className="popup">
        <div className="popup__wrapper">
          <div className="popup__content popup__content_vote content-popup">
            <div className="popup__top popup__top_vote">
              <a href="#" className="popup__logo">
                <picture><source srcSet="img/logo.webp" type="image-webp"/>
                  <Image fill src="/img/logo.png" alt="Logo"/></picture>
              </a>
              <button data-close type="button" className="popup__close">
              </button>
            </div>
            <div className="popup__body body-popup body-popup_vote">
              <div className="body-popup__top">
                <h3 className="body-popup__title">Спасибо за ваше мнение!</h3>
                <p className="body-popup__text body-popup__text_vote">После окончания голосования, на вашу почту будут присланы
                  результаты</p>
              </div>
              <div className="body-popup__content">
                <div className="item-tabs-oprosi item-tabs-oprosi_vote">
                  <div className="item-tabs-oprosi__top item-tabs-oprosi__top_vote">
                    <h4 className="item-tabs-oprosi__top-title item-tabs-oprosi__top-title_vote">Премьер-министр Молдовы одобрил
                      вступление в ЕС</h4>
                  </div>
                  <form action="#" className="item-tabs-oprosi__form">
                    <fieldset>
                      <div className="options options_vote">
                        <div className="options__item selected">
                          <input hidden id="o_41" className="options__input" checked type="checkbox" value="supportno" name="opros1"/>
                          <label htmlFor="o_41" className="options__label options__label_1"><span className="options__text">Не
                              поддерживаю</span> <span className="percent percent_nosupport">38%</span>
                            <div className="options__row row">
                              {/* <div className="options__progress progress  progress_nosupport" style='--w:38;'></div> */}
                            </div>
                          </label>
                          <input hidden id="o_51" className="options__input" type="checkbox" value="support" name="opros1"/>
                          <label htmlFor="o_51" className="options__label options__label_2"><span className="options__text">Поддерживаю</span><span className="percent percent_support">56%</span>
                            <div className="options__row row">
                              {/* <div className="options__progress progress  progress_support" style='--w:56;'></div> */}
                            </div>
                          </label>
                          <input hidden id="o_61" className="options__input" type="checkbox" value="neutral" name="opros1"/>
                          <label htmlFor="o_61" className="options__label options__label_3"><span className="options__text">Нейтрально</span><span className="percent percent_neutral">6%</span>
                            <div className="options__row row">
                              {/* <div className="options__progress progress  progress_neutral" style='--w:6;'></div> */}
                            </div>
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </form>
                </div>
              </div>
            </div>
            <div className="popup__bottom bottom-popup">
              <p className="bottom-popup__text bottom-popup__text_ok">
                <span className="bottom-popup__text-vote">Не приходят результаты?</span> <a className="bottom-popup__link-ok" href="#">Нажмите сюда, чтобы обратититься в
                  поддержку</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div id="popup-account-answer" aria-hidden="true" className="popup">
        <div className="popup__wrapper">
          <div className="popup__content content-popup">
            <div className="popup__top">
              <a href="#" className="popup__logo">
                <picture><source srcSet="img/logo.webp" type="image-webp"/>
                  <Image fill src="/img/logo.png" alt="Logo"/></picture>
              </a>
              <button data-close type="button" className="popup__close">
              </button>
            </div>
            <div className="popup__body body-popup body-popup_ok">
              <div className="body-popup__wrap-top">
                <div className="body-popup__top">
                  <h3 className="body-popup__title">Спасибо за ваш вопрос!</h3>
                  <p className="body-popup__text">На вашу почту в скором времени поступит ответ.</p>
                </div>
              </div>
              <div className="popup__bottom bottom-popup">
                <p className="bottom-popup__text">
                  Не приходит ответ? <a className="bottom-popup__link-ok bottom-popup__link-ok_account" href="#">Нажмите сюда,
                    чтобы обратититься еще раз в поддержку</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
