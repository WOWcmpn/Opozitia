import React, { useState } from "react";
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
import { signIn } from "next-auth/react";

export const PopupAccount = ({ onClick }: AccountPopupProps) => {
  const [option, setOption] = useState<number>(1);
  const [email, setEmail] = useState<string>("");
  const [login, setLogin] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");
  const [confirmationCode, setConfirmationCode] = useState<string>('');
  const [inputConfirmCode, setInputConfirmCode] = useState<string>('');

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

  return (
    <>
      {option === 1 && (
        <PopupLogin
          onClick={onClick}
          setOption={setOption}
          email={email}
          setEmail={setEmail}
        />
      )}
      {option === 2 && (
        <PopupPassword
          onClick={onClick}
          setOption={setOption}
          pass={pass}
          setPass={setPass}
          login={loginToAcc}
        />
      )}
       {option == 7 && (
         <PopupRegistration
         onClick={onClick}
         setOption={setOption}
         email={email}
         setEmail={setEmail}
         />
       )}
      {option === 4 && (
        <PopupRegPass
          onClick={onClick}
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
          onClick={onClick}
          setInputConfirmCode={setInputConfirmCode}
          email={email}
          confirm={confirmCode}
        />
      )}
      {/*{option == 6 && <PopupRegSend onClick={onClick} setOption={setOption} />}*/}
    </>
  );
};
