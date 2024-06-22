import Link from "next/link";
import React, { useState } from "react";
import { userAccount } from "@/types/types";
import { signOut, useSession } from 'next-auth/react';
import { AnimatePresence } from "framer-motion";
import { PopupRecovery } from "@/components/PopupLogin/PopupRecovery";
import { PopupNewPass } from '@/components/PopupLogin/PopupNewPass';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { AuthService } from '@/service/auth.service';
import { PopupRecoveryCode } from '@/components/PopupLogin/PopupRecoveryCode';
import { PopupNewRecoveryPassword } from '@/components/PopupLogin/PopupNewRecoveryPassword';

export const UserAccount = ({ setChange, setPassRecovery }: userAccount) => {
  const [recovery, setRecovery] = useState<number>(0);
  const [newPass, setNewPass] = useState<number>(0);
  const [prevPassword, setPrevPassword] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const [confirmPass, setConfirmPass] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [confirmationCode, setConfirmationCode] = useState<string>('');
  const [inputConfirmationCode, setInputConfirmationCode] = useState<string>('');
  const [recoveryPass, setRecoveryPass] = useState<string>('');
  const [confirmRecoveryPass, setConfirmRecoveryPass] = useState<string>('');
  const {data: session, status, update} = useSession()

  async function newPassword() {
    try {
      if(pass !== confirmPass) {
        toast.error('Введенные пароли не совпадают')
        return
      } else if(pass.length < 5) {
        toast.error('Пароль должен быть длиннее 5 символов')
        return
      } else if(pass.length > 25) {
        toast.error('Пароль должен быть не длиннее 25 символов')
        return
      }
      const isLegit = await AuthService.comparePasswords(prevPassword, session?.user?.name!)
      console.log(isLegit);
      if(isLegit) {
        const data = await AuthService.changePassword(pass, session?.user?.name!)
        if(data) {
          toast.success('Пароль был изменён')
          setNewPass(0)
          setPass('')
          setConfirmPass('')
        } else {
          toast.error('Что-то пошло не так')
        }
      } else {
        toast.error('Вы неправильно ввели ваш старый пароль')
      }
    } catch (err) {
      console.error('User account error ', err);
    }
  }

  async function sendRecoveryCode() {
    try {
      if(email !== session?.user?.email!) {
        toast.error('Вы должны ввести e-mail, который использовали при регистрации')
        return
      } else if(email === session?.user?.email!) {
        const data = await AuthService.sendRecoveryPassCode(email)
        if(data) {
          setConfirmationCode(data.code)
          setRecovery(2)
        } else {
          toast.error('Что-то пошло не так')
        }
      }
    } catch (err) {
      console.error('RecoveryCode error ', err);
    }
  }

  async function confirmCode() {
    try {
      if(inputConfirmationCode !== confirmationCode) {
        toast.error('Введённый код не совпадает с отправленным')
        return
      } else if (inputConfirmationCode === confirmationCode) {
        setRecovery(3)
        setRecoveryPass('')
        setConfirmRecoveryPass('')
      }
    } catch (err) {
      console.error('Confirm code error ', err);
    }
  }

  async function newRecoveryPassword() {
    try {
      if(recoveryPass !== confirmRecoveryPass) {
        toast.error('Введенные пароли не совпадают')
        return
      } else if (recoveryPass.length < 5) {
        toast.error('Пароль должен быть длиннее 5 символов')
        return
      } else if (recoveryPass.length > 25) {
        toast.error('Пароль должен быть не длиннее 25 символов')
        return
      }
      const data = await AuthService.setNewPassword(recoveryPass, confirmationCode)
      if(data) {
        toast.success('Вы успешно изменили пароль')
        setRecoveryPass('')
        setConfirmRecoveryPass('')
        setConfirmationCode('')
        setInputConfirmationCode('')
        setRecovery(0)
      } else {
        toast.error('Что-то пошло не так')
      }
    } catch (err) {
      console.error('newRecoveryPassword error ', err);
    }
  }

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
                  {session?.user?.name || 'Неизвестно'}
                </span>
              </div>
              <div className="left-blocks-body__item">
                <span className="left-blocks-body__title-info">
                  E-mail
                </span>
                <span className="left-blocks-body__title-name">
                  {session?.user?.email || 'Неизвестно'}
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
                onClick={() => setNewPass(1)}
              >
                Изменить пароль
              </Link>
              <Link
                href="#"
                className="left-blocks-body__link-password"
                onClick={() => {
                  setRecovery(1);
                  setPassRecovery(1)
                }}
              >
                Забыли пароль?
              </Link>
            </div>
            <div className={'left-button-body__bottom'}>
              <button
                className={'border-solid rounded-2xl border-2 border-red-500 ' +
                  'bg-red-500 text-white font-medium h-10 w-32 hover:bg-red-400 ' +
                  'hover:border-red-400'}
                onClick={() => signOut({callbackUrl: '/'})}
              >
                Sign out
              </button>
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
        {recovery === 1 &&
          <PopupRecovery
          onClick={setRecovery}
          setPassRecovery={setPassRecovery}
          setEmail={setEmail}
          sendRecoveryCode={sendRecoveryCode}
        />
        }
      </AnimatePresence>
      <AnimatePresence>
        {recovery === 2 &&
          <PopupRecoveryCode
            onClick={setRecovery}
            setInputConfirmCode={setInputConfirmationCode}
            email={email}
            confirmCode={confirmCode}
          />
        }
      </AnimatePresence>
      <AnimatePresence>
        {recovery === 3 && 
        <PopupNewRecoveryPassword
          onClick={setRecovery}
          recoveryPass={recoveryPass}
          setRecoveryPass={setRecoveryPass}
          confirmRecoveryPass={confirmRecoveryPass}
          setConfirmRecoveryPass={setConfirmRecoveryPass}
          newRecoveryPassword={newRecoveryPassword}
        />
        }
      </AnimatePresence>
      <AnimatePresence>
        {newPass === 1 &&
          <PopupNewPass
          onClick={setNewPass}
          pass={pass}
          setPass={setPass}
          confirmPass={confirmPass}
          setConfirmPass={setConfirmPass}
          setPrevPassword={setPrevPassword}
          newPassword={newPassword}
        />
        }
      </AnimatePresence>
    </div>
  )
}