import React, { useState } from "react";
import { PopupLogin } from "./PopupLogin";
import { AccountPopupProps, LoginPopupProps } from "@/types/types";
import { PopupPassword } from "./PopupPassword";
import { PopupCode } from "./PopupCode";
import { PopupRegPass } from "./PopupRegPass";
import { PopupRecovery } from "./PopupRecovery";
import { PopupRegSend } from "./PopupRegSend";
import { PopupRegistration } from "./PopupRegistration";

export const PopupAccount = ({ onClick }: AccountPopupProps) => {
  const [option, setOption] = useState(1);
  return (
    <>
      {option == 1 && <PopupLogin onClick={onClick} setOption={setOption} />}
      {option == 2 && <PopupPassword onClick={onClick} setOption={setOption} />}
      {option == 3 && <PopupCode onClick={onClick} setOption={setOption} />}
      {option == 4 && <PopupRegPass onClick={onClick} setOption={setOption} />}
      {option == 5 && <PopupRecovery onClick={onClick} setOption={setOption} />}
      {option == 6 && <PopupRegSend onClick={onClick} setOption={setOption} />}
      {option == 7 && (
        <PopupRegistration onClick={onClick} setOption={setOption} />
      )}
    </>
  );
};
