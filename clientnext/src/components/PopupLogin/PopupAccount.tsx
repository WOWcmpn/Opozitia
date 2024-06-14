import React, { useState } from "react";
import { PopupLogin } from "./PopupLogin";
import { AccountPopupProps, LoginPopupProps } from "@/types/types";
import { PopupPassword } from "./PopupPassword";
import { PopupCode } from "./PopupCode";
import { PopupRegPass } from "./PopupRegPass";
import { PopupRecovery } from "./PopupRecovery";
import { PopupRegSend } from "./PopupRegSend";
import { PopupRegistration } from "./PopupRegistration";
import { AuthService } from "@/service/auth.service";
import inMemoryJWT from "@/service/inMemoryJWT";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const PopupAccount = ({ onClick }: AccountPopupProps) => {
  const [option, setOption] = useState<number>(1);
  const [email, setEmail] = useState<string>("");
  const [login, setLogin] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");

  async function register() {
    const data = await AuthService.register({
      email,
      login,
      password: pass,
      confirmPassword: pass,
    });
    console.log(data);
  }
  // async function confirmationCode() {
  //   const data = await AuthService.registrationCode({
  //     confirmationCode: "bc0db192-49a5-47c5-883e-08474cd671ed",
  //   });
  //   console.log(data);
  // }

  // confirmationCode();

  async function loginToAcc() {
    try {
      const data = await AuthService.login({
        email,
        password: pass,
      });
      if(data) {
        inMemoryJWT.setToken(data.accessToken);
        toast.success(`Добро пожаловать, ${data?.login}`)
      } else {
        toast.error('Неверные логин или пароль')
      }
    } catch (err) {
      console.warn('Login error: ', err);
    }
  }
  console.log(inMemoryJWT.getToken());
  return (
    <>
      {option == 1 && (
        <PopupLogin
          onClick={onClick}
          setOption={setOption}
          email={email}
          setEmail={setEmail}
        />
      )}
      {option == 2 && (
        <PopupPassword
          onClick={onClick}
          setOption={setOption}
          pass={pass}
          setPass={setPass}
          login={loginToAcc}
        />
      )}
      {/* {option == 3 && <PopupCode onClick={onClick} setOption={setOption} />} */}
      {option == 4 && (
        <PopupRegPass
          onClick={onClick}
          setOption={setOption}
          login={login}
          setLogin={setLogin}
          pass={pass}
          setPass={setPass}
          confirmPass={confirmPass}
          setConfirmPass={setConfirmPass}
          register={register}
        />
      )}
      {/* {option == 5 && <PopupRecovery onClick={onClick} setOption={setOption} />}
      {option == 6 && <PopupRegSend onClick={onClick} setOption={setOption} />} */}
      {option == 7 && (
        <PopupRegistration
          onClick={onClick}
          setOption={setOption}
          email={email}
          setEmail={setEmail}
        />
      )}
    </>
  );
};
