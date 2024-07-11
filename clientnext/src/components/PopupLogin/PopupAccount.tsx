import React, { useEffect, useState } from 'react';
import { PopupLogin } from "./PopupLogin";
import { AccountPopupProps } from "@/types/types";
import { PopupPassword } from "./PopupPassword";
import { PopupCode } from "./PopupCode";
import { PopupRegPass } from "./PopupRegPass";
import { PopupRegistration } from "./PopupRegistration";
import { AuthService } from "@/service/auth.service";
import inMemoryJWT from "@/service/inMemoryJWT";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { signIn } from 'next-auth/react';
import { PopupRecovery } from '@/components/PopupLogin/PopupRecovery';
import { PopupRecoveryCode } from '@/components/PopupLogin/PopupRecoveryCode';
import { PopupNewRecoveryPassword } from '@/components/PopupLogin/PopupNewRecoveryPassword';

export const PopupAccount = ({ onPopupAccount }: AccountPopupProps) => {
  const [option, setOption] = useState<number>(1);
  const [email, setEmail] = useState<string>("");
  const [login, setLogin] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");
  const [confirmationCode, setConfirmationCode] = useState<string>('');
  const [recoveryConfirmationCode, setRecoveryConfirmationCode] = useState<string>('');
  const [inputConfirmCode, setInputConfirmCode] = useState<string>('');
  const [recovery, setRecovery] = useState<number>(0);
  const [inputRecoveryConfirmationCode, setInputRecoveryConfirmationCode] = useState<string>('');
  const [recoveryPass, setRecoveryPass] = useState<string>('');
  const [confirmRecoveryPass, setConfirmRecoveryPass] = useState<string>('');
  const [isClickable, setIsClickable] = useState<boolean>(true);
  const [lastClicked, setLastClicked] = useState(0);
  const delay = 180000

  useEffect(() => {
    if(!isClickable) {
      const timer = setTimeout(() => {
        setIsClickable(true)
      }, delay)

      return () => clearTimeout(timer)
    }
  }, [isClickable, delay]);

  async function register() {
    try {
      if(login.length < 3) {
        toast.error("Логин должен состоять из трёх и более символов");
        return
      }
      if(login.length > 15) {
        toast.error("Логин должен быть не длиннее 15 символов");
        return
      }
      const data = await AuthService.register({
        email,
        login,
        password: pass,
        confirmPassword: pass,
      });

      if(data) {
        setOption(5)
        setConfirmationCode(data.code)
      } else {
        toast.error('Введенные вами логин или почта уже заняты')
      }
    } catch (err) {
      toast.error('Что-то пошло не так...')
      console.warn('Registration error ', err);
    }
  }

  async function confirmCode() {
    if(confirmationCode !== inputConfirmCode) {
      toast.error('Введенный вами код не совпадает с отправленным')
    } else if (confirmationCode === inputConfirmCode) {
      try {
        await AuthService.registrationCode({
          confirmationCode: inputConfirmCode!,
        });
        toast.success('Поздравляем, вы прошли регистрацию!')
        setOption(1)
        setEmail('')
        setLogin('')
        setPass('')
        setConfirmPass('')
      } catch (err) {
        console.warn('Confirm code error ', err);
      }
    }
  }

  async function loginToAcc() {
    try {
      const data = await AuthService.login({
        email,
        password: pass,
      });
      if(data) {
        inMemoryJWT.setToken(data.accessToken);
        await signIn('credentials', {
          email: email,
          password: pass,
          redirect: false
        }, {
          id: data.id,
          name: data.login,
          email: data.email,
          location: data.location,
          favoriteNewsCategory: data.favoriteNewsCategory,
          age: data.age
        })
        toast.success(`Добро пожаловать, ${data?.login}`)
      } else {
        toast.error('Неверные логин или пароль')
      }
    } catch (err) {
      console.warn('Login error: ', err);
    }
  }

  async function sendRecoveryCode() {
    try {
        const data = await AuthService.sendRecoveryPassCode(email)
        if(data) {
          setRecoveryConfirmationCode(data.code)
          setRecovery(2)
        } else {
          toast.error('Что-то пошло не так')
        }
    } catch (err) {
      console.error('RecoveryCode error ', err);
    }
  }

  async function recoveryConfirmCode() {
    try {
      if(recoveryConfirmationCode !== inputRecoveryConfirmationCode) {
        toast.error('Введённый код не совпадает с отправленным')
        return
      } else if (inputRecoveryConfirmationCode === recoveryConfirmationCode) {
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
      } else {
        const data = await AuthService.setNewPassword(recoveryPass, email)
        if(data) {
          toast.success('Вы успешно изменили пароль')
          setRecoveryPass('')
          setConfirmRecoveryPass('')
          setRecoveryConfirmationCode('')
          setInputRecoveryConfirmationCode('')
          setRecovery(0)
          onPopupAccount(0)
        } else {
          toast.error('Что-то пошло не так')
        }
      }
    } catch (err) {
      console.error('newRecoveryPassword error ', err);
    }
  }

  async function sendConfirmationCodeAgain() {
    try {
      if(isClickable) {
        setLastClicked(Date.now())
        setIsClickable(false)
        toast.warn('Идет отправка...')
        const data = await AuthService.sendRecoveryPassCode(email)
        if(data) {
          toast.success(`Код повторно был отправлен на ${email}`)
          setRecoveryConfirmationCode(data.code)
        } else {
          toast.error('Что-то пошло не так')
        }
      } else {
        toast.error('Повторно отправить код можно через 3 минуты')
        return
      }
    } catch (err) {
      console.error('sendConfirmationCodeAgain ERROR ', err);
    }
  }

  return (
    <>
      {option === 1 && (
        <PopupLogin
          onClick={onPopupAccount}
          setOption={setOption}
          email={email}
          setEmail={setEmail}
        />
      )}
      {option === 2 && (
        <PopupPassword
          onClick={onPopupAccount}
          setOption={setOption}
          setRecovery={setRecovery}
          pass={pass}
          setPass={setPass}
          login={loginToAcc}
        />
      )}
      {recovery === 1 && (
        <PopupRecovery
          onClick={onPopupAccount}
          setRecovery={setRecovery}
          setEmail={setEmail}
          sendRecoveryCode={sendRecoveryCode}
        />
      )}
      {recovery === 2 && (
        <PopupRecoveryCode
          onClick={onPopupAccount}
          setInputConfirmCode={setInputRecoveryConfirmationCode}
          email={email}
          confirmCode={recoveryConfirmCode}
          sendCodeAgain={sendConfirmationCodeAgain}
        />
      )}
      {recovery === 3 &&
        <PopupNewRecoveryPassword
          onClick={onPopupAccount}
          recoveryPass={recoveryPass}
          setRecoveryPass={setRecoveryPass}
          confirmRecoveryPass={confirmRecoveryPass}
          setConfirmRecoveryPass={setConfirmRecoveryPass}
          newRecoveryPassword={newRecoveryPassword}
        />
      }
       {option == 7 && (
         <PopupRegistration
         onClick={onPopupAccount}
         setOption={setOption}
         email={email}
         setEmail={setEmail}
         />
       )}
      {option === 4 && (
        <PopupRegPass
          onClick={onPopupAccount}
          login={login}
          setLogin={setLogin}
          pass={pass}
          setPass={setPass}
          confirmPass={confirmPass}
          setConfirmPass={setConfirmPass}
          register={register}
        />
      )}
      {option === 5 && (
        <PopupCode
          onClick={onPopupAccount}
          setInputConfirmCode={setInputConfirmCode}
          email={email}
          confirm={confirmCode}
        />
      )}
    </>
  );
};
