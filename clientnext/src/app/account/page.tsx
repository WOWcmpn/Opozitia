"use client";
import React, { useEffect, useState } from "react";
import { Header } from "@/components/Header/Header";
import { useSession } from "next-auth/react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserAccount } from "@/components/UserAccount/UserAcccount";
import { AccountSupport } from "@/components/AccountSupport/AccountSupport";
import { NewsService } from "@/service/news.service";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { cities } from '@/utils/cities';

export default function Account() {
  const [option, setOption] = useState<number>(0);
  const [change, setChange] = useState<number>(0);
  const [passRecovery, setPassRecovery] = useState<number>(0);
  const [login, setLogin] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [favoriteNewsCategory, setFavoriteNewsCategory] = useState<string>('');
  const { data: session, status, update } = useSession()

  useEffect(() => {
    async function loadUtils() {
      setLogin(session?.user?.name!)
      setEmail(session?.user?.email!)
      //@ts-ignore
      setLocation(session?.user?.location!)
      //@ts-ignore
      setAge(session?.user?.age!)
      //@ts-ignore
      setFavoriteNewsCategory(session?.user?.favoriteNewsCategory!)
    }
    loadUtils()
  }, [session]);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const isExists = cities.find(city => city.name === location)
      if(isExists || location === 'Неизвестно') {
        const data = await NewsService.changeProfile(
          //@ts-ignore
          session!.user?.id,
          email,
          login,
          age,
          location,
          favoriteNewsCategory
        )
        if(data) {
          await update({ name: login, email: email, location: location, age: age, favoriteNewsCategory: favoriteNewsCategory})
          toast.success('Ваши данные были обновлены')
          setChange(0)
        } else {
          toast.error('Введенные вами данные уже заняты либо невалидны')
        }
      } else {
        toast.error('Введите существующий город')
      }
    } catch (err) {
      toast.error('Введенные вами данные уже заняты либо невалидны')
      console.warn('Account error ', err);
    }
  }

  return (
    <div className={`wrapper ${
      passRecovery === 1
        ? "overflow" : ""
    }`}>
      <div className={`${
        passRecovery === 1
          ? "wrapper__popup blur"
          : ""
      }`}></div>
      <Header className={"header menu-visual"} />
      <ToastContainer position={'top-center'} autoClose={3000} />
      <main className="page page_account">
        <section className="page__account account">
          <div className="account__container">
            <div data-tabs={true} className="account__tabs">
              <nav
                data-tabs-titles={true}
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
              <div data-tabs-body={true} className="account__content">
                {option == 0 && change == 0 ? (
                  <UserAccount
                    setChange={setChange}
                    setPassRecovery={setPassRecovery}
                  />
                ) : option == 0 && change == 1 ? (
                  <div className="account__body body-account">
                    <h2 className="body-account__title">
                      Привет, <span>{session?.user?.name!}</span> !
                    </h2>
                    <div className="body-account__blocks blocks-body-account">
                       <form
                         method={'put'}
                        className="blocks-body-account__block left-blocks-body"
                        onSubmit={handleSubmit}
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
                                defaultValue={session?.user?.name!}
                                autoComplete="off"
                                type="text"
                                name="form[]"
                                data-error="Ошибка"
                                placeholder="Введите имя..."
                                className="left-blocks-body__input select-input"
                                required
                                onChange={(e) => setLogin(e.target.value)}
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
                                defaultValue={session?.user?.email!}
                                autoComplete="off"
                                type="email"
                                name="form[]"
                                data-error="Ошибка"
                                placeholder="Введите e-mail..."
                                className="left-blocks-body__input select-input"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="left-blocks-body__bottom-btns">
                            <button
                              type="submit"
                              className="left-blocks-body__btn link-account"
                              // onClick={() => update({ name: login })}
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
                          method={'put'}
                          data-one-select={true}
                          className="right-blocks-body__form"
                          onSubmit={handleSubmit}
                        >
                          <div className="right-blocks-body__item">
                            <label
                              htmlFor="form[]"
                              className="right-blocks-body__label"
                            >
                              Местоположение
                            </label>
                            <div>
                              <input
                                type={'text'}
                                id={'country'}
                                name="form[]"
                                className="left-blocks-body__input select-input"
                                /*@ts-ignore*/
                                defaultValue={session!.user!.location!}
                                onChange={(e) => setLocation(e.target.value)}
                              />
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
                              type="date"
                              id="birthday"
                              name="form[]"
                              className="right-blocks-body__input-date"
                              onChange={(e) => setAge(e.target.value)}
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
                              <Select onValueChange={(category) => setFavoriteNewsCategory(category)}>
                                <SelectTrigger>
                                  {/*@ts-ignore*/}
                                  <SelectValue placeholder={session?.user?.favoriteNewsCategory} />
                                </SelectTrigger>
                                <SelectContent className="border-white bg-white rounded-2xl text-black">
                                  <SelectGroup>
                                    <SelectItem className="cursor-pointer" key={"Политика"} value="Политика">Политика</SelectItem>
                                    <SelectItem className="cursor-pointer hover:bg-[#ededed]" key={"Экономика"} value="Экономика">Экономика</SelectItem>
                                    <SelectItem className="cursor-pointer hover:bg-[#ededed]" key={"Бизнес"} value="Бизнес">Бизнес</SelectItem>
                                    <SelectItem className="cursor-pointer hover:bg-[#ededed]" key={"Мир"} value="Мир">Мировые новости</SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                ) : (
                  <AccountSupport location={location} />
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
