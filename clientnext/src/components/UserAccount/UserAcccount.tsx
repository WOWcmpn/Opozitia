import Link from "next/link";
import React, { useState } from "react";
import { userAccount } from "@/types/types";
import { useSession } from "next-auth/react";
import { AnimatePresence } from "framer-motion";
import { PopupRecovery } from "@/components/PopupLogin/PopupRecovery";

export const UserAccount = ({ setChange }: userAccount) => {
  const [recoveryOption, setRecoveryOption] = useState<number>(0);
  const [recovery, setRecovery] = useState<number>(0);
  const {data: session, status, update} = useSession()

  return (
    <div className={`account__body body-account`}>

      <h2 className="body-account__title">
        Привет, <span>{session?.user?.name}</span> !
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
                  {session?.user?.name}
                </span>
              </div>
              <div className="left-blocks-body__item">
                <span className="left-blocks-body__title-info">
                  E-mail
                </span>
                <span className="left-blocks-body__title-name">
                  {session?.user?.email}
                </span>
              </div>
              <Link
                href="#"
                className="left-blocks-body__link link-account"
                onClick={() => setChange(1)}
              >
                Изменить
              </Link>
            </div>
            <div className="left-blocks-body__bottom">
              <Link
                href="#"
                className="left-blocks-body__link link-account"
              >
                Изменить пароль
              </Link>
              <Link
                href="#"
                className="left-blocks-body__link-password"
                onClick={() => setRecovery(1)}
              >
                Забыли пароль?
              </Link>
            </div>
          </div>
        </div>
        <div className="blocks-body-account__block right-blocks-body right-blocks-body_first">
          <h3 className="right-blocks-body__title title-account">
            Мой профиль
          </h3>
          <form
            action="#"
            data-one-select={true}
            className="right-blocks-body__form"
          >
            <div className="right-blocks-body__item">
              <label
                htmlFor="form[]"
                className="right-blocks-body__label"
              >
                Местоположение
              </label>
              <div>
                {/*@ts-ignore*/}
                <p className={'bold  text-[1.2em]'}>{session?.user?.location || 'Неизвестно'}</p>
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
                //@ts-ignore
                value={session?.user?.age || 'Неизвестно'}
                className="right-blocks-body__input-date text-[1.2em]"
              />
            </div>
            <div className="right-blocks-body__item right-blocks-body__item_news">
              <label
                htmlFor="form[]"
                className="right-blocks-body__label"
              >
                Интересующие категории новостей
              </label>
              <div>
                {/*@ts-ignore*/}
                <p className={'bold text-[1.2em]'}>{session?.user?.favoriteNewsCategory || 'Неизвестно'}</p>
              </div>
            </div>
          </form>
        </div>
      </div>
      <AnimatePresence>
        {recovery === 1 && <PopupRecovery setOption={setRecoveryOption} />}
      </AnimatePresence>
    </div>
  )
}