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

export const PopupAccount = ({ onClick }: AccountPopupProps) => {
  const [option, setOption] = useState(1);
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  async function register() {
    const data = await AuthService.register({
      email,
      login,
      password: pass,
      confirmPassword: pass,
    });
    console.log(data);
  }
  //yarefi3608@nweal.com
  //yarefi3608
  //yarefi3608fdfdfd
  //yarefi3608fdfdfd

  // async function confirmationCode() {
  //   const data = await AuthService.registrationCode({
  //     confirmationCode: "bc0db192-49a5-47c5-883e-08474cd671ed",
  //   });
  //   console.log(data);
  // }

  // confirmationCode();

  async function loginToAcc() {
    const data = await AuthService.login({
      email,
      password: pass,
    });
    console.log(data);

    inMemoryJWT.setToken(data.accessToken);
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
