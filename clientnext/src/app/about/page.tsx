"use client"
import { Header } from '@/components/Header/Header';
import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { PopupAccount } from '@/components/PopupLogin/PopupAccount';
import { Search } from '@/components/Search/Search';
import { PopupNews } from '@/components/PopupNews/PopupNews';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
import Link from 'next/link';
import Social1 from '@/img/social/02.svg';
import Social2 from '@/img/social/04.svg';
import { UsersService } from '@/service/users.service';
import { useSession } from 'next-auth/react';

export default function About() {
  const [search, setSearch] = useState<number>(0);
  const [login, setLogin] = useState<number>(0);
  const [createNews, setCreateNews] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const { data: session, status } = useSession()

  useEffect(() => {
    async function loadSession() {
      try {
        if (status === "unauthenticated") {
          setLocation('Неизвестно')
        } else if (status === "authenticated") {
          //@ts-ignore
          setLocation(session?.user?.location!)
        }
      } catch (err) {
        console.warn('Load session error - about ', err);
      }
    }
    loadSession()
  }, [session, status]);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === "unauthenticated") {
      toast.error('Неавторизованные пользователи не могут оставлять комментарии')
      return
    }
    else if (status === "authenticated") {
      try {
        const data = await UsersService.sendEmail(name, location, text)
        if (data) {
          toast.success('Ваше сообщение было отправлено')
          setName('')
          setText('')
          setTimeout(() => {
            window.location.reload()
          }, 1500)
          return
        } else {
          toast.error('Что-то пошло не так')
          return
        }
      } catch (err) {
        console.error('Send email error ', err);
        toast.error('Что-то пошло не так, попробуйте снова')
      }
    }

  }

  return (
    <>
      <div className="wrapper">
        <ToastContainer position={'top-center'} autoClose={2500} />
        <div className={`home ${search === 1 || login === 1 || createNews === 1
          ? "overflow" : ""} w-[100vw]`}>
          <div className={`wrapper ${search === 1 || login === 1 || createNews === 1
            ? "wrapper__popup blur" : ""}`}>
            <Header onSearch={setSearch} onLogin={setLogin} onNews={setCreateNews} />
            <main className='page-about'>
              <div className="about__container about__image mt-60">
                {/* <Image src={'/moldova.webp'} alt={'About'} fill={true} /> */}
                <div className='background-image-container'>
                  <h1 className={'relative text-5xl'}>О партии “NOI”</h1>
                  <p className={'relative text-3xl'}>Здесь находится всё то, что
                    нам хотелось бы рассказать вам</p>
                </div>
                <div className={'about__information'}>
                  <h2 className={'text-xl about__information-text'}>Чем отличается партия <div className='about__information-world'>«NOI»</div> от десятков других партий в Республике Молдова? В молдове партии чаще всего
                    создаются действующими и бывшими политиками, чтобы сохранить или снова вернуться во <div className='about__information-world'>власть.</div> Это и есть самое
                    важное отличие, так как эта партия создана патриотически настроенными гражданами, которые ранее не были
                    испачканы участием в молдавской политике и их финансовых схемах.</h2>
                </div>
                <div className={'about__information'}>
                  <h2 className={'text-xl about__information-text font-bold about__custom-information'}>Лидер партии <div className='about__information-world'>«NOI»</div> Владимир Даки сочетает в себе успешного <br/> бизнесмена
                    и <div className='about__information-world'>дисциплину</div> военного человека.</h2>
                </div>
                <div className={'about__information'}>
                  <h2 className={'text-xl about__information-text'}>Это человек, который привык отдавать приказы и наводить порядок, плюс хорошее знание
                    экономики на собственном удачном опыте. Поэтому в партии состоят люди с хорошими знаниями и опытом, имеющие хорошую репутацию
                    в обществе.</h2>
                </div>
                <div className={'about__information'}>
                  <h2 className={'text-xl about__information-text font-bold about__custom-information'}>Наша главная <div className='about__information-world'>цель</div> - навести порядок в <div className='about__information-world'>стране</div> на основе <br/> собственного богатого опыта.</h2>
                </div>
                <div className={'about__information'}>
                  <h2 className={'text-xl about__information-text'}>Мы не идём во власть ради обогощения, так как являемся уже достаточно успешными
                    и обеспеченными людьми.</h2>
                </div>
                <div className="account-support-about__body body-account about__information">
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
                            <Link
                              href="mailto:ааааа0303@gmail.com"
                              className="left-blocks-body__title-name left-blocks-body__title-name_link"
                            >
                              namelesssyes@gmail.com
                            </Link>
                          </div>
                          <div className="left-blocks-body__item">
                            <span className="left-blocks-body__title-info">
                              Наш номер
                            </span>
                            <Link
                              href="tel:+77777777777"
                              className="left-blocks-body__title-name left-blocks-body__title-name_link"
                            >
                              +7 777 777 77 77
                            </Link>
                          </div>
                          <div className="left-blocks-body__item">
                            <span className="left-blocks-body__title-info">
                              Наши соцсети
                            </span>
                            <ul className="left-blocks-body__social-list">
                              <li className="left-blocks-body__social-item">
                                <Link
                                  href="#"
                                  className="left-blocks-body__social-link link-social link-social_small link-social_small-facebook"
                                >
                                  <Image src={Social1} alt="icon" />
                                </Link>
                              </li>
                              <li className="left-blocks-body__social-item">
                                <Link
                                  href="#"
                                  className="left-blocks-body__social-link link-social link-social_small link-social_small-twitter"
                                >
                                  <Image src={Social2} alt="icon" />
                                </Link>
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
                        method={'post'}
                        data-popup-message="#popup-account-answer"
                        className="right-blocks-body__form right-blocks-body__form_questions"
                        onSubmit={handleSubmit}
                      >
                        <div className="right-blocks-body__items-wrap">
                          <div className="right-blocks-body__item">
                            <input
                              autoComplete="off"
                              type="text"
                              name="form[]"
                              data-error="Ошибка"
                              placeholder="ФИО..."
                              minLength={5}
                              maxLength={45}
                              className="right-blocks-body__input select-input"
                              required
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                          <div className="right-blocks-body__item">
                            <textarea
                              autoComplete="off"
                              name="form[]"
                              placeholder="Введите вопрос..."
                              minLength={20}
                              maxLength={700}
                              data-error="Ошибка"
                              className="right-blocks-body__txt select-input"
                              required
                              onChange={(e) => setText(e.target.value)}
                            ></textarea>
                          </div>
                        </div>
                        <div className="right-blocks-body__checkbox checkbox checkbox_account">
                          <input
                            id="c_30"
                            className="checkbox__input"
                            data-required={true}
                            required={true}
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
                              <Link href="#" className="blue">
                                Условиями
                              </Link>
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
              </div>
            </main>
            <footer className="footer">
              <div className="footer__container">
                <p className="footer__text">©2024 Opozitia</p>
              </div>
            </footer>
          </div>
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
    </>
  )
}