// "use client";
// import React, { Suspense, useEffect, useState } from 'react';
// import { Header } from "@/components/Header/Header";
// import { signOut, useSession } from 'next-auth/react';
// import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { AccountSupport } from "@/components/AccountSupport/AccountSupport";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { cities } from '@/utils/cities';
// import { AnimatePresence } from 'framer-motion';
// import { Search } from '@/components/Search/Search';
// import { PopupNews } from '@/components/PopupNews/PopupNews';
// import Link from 'next/link';
// import { PopupRecovery } from '@/components/PopupLogin/PopupRecovery';
// import { PopupRecoveryCode } from '@/components/PopupLogin/PopupRecoveryCode';
// import { PopupNewRecoveryPassword } from '@/components/PopupLogin/PopupNewRecoveryPassword';
// import { PopupNewPass } from '@/components/PopupLogin/PopupNewPass';
// import { AuthService } from '@/service/auth.service';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { UsersService } from '@/service/users.service';
//
// const Account = () => {
//   const [option, setOption] = useState<number>(0);
//   const [change, setChange] = useState<number>(0);
//   const [login, setLogin] = useState<string>('');
//   const [email, setEmail] = useState<string>('');
//   const [location, setLocation] = useState<string>('');
//   const [age, setAge] = useState<string>('');
//   const [favoriteNewsCategory, setFavoriteNewsCategory] = useState<string>('');
//   const [search, setSearch] = useState<number>(0);
//   const [createNews, setCreateNews] = useState<number>(0);
//
//   const [recovery, setRecovery] = useState<number>(0);
//   const [newPass, setNewPass] = useState<number>(0);
//   const [prevPassword, setPrevPassword] = useState<string>('');
//   const [pass, setPass] = useState<string>('');
//   const [confirmPass, setConfirmPass] = useState<string>('');
//   const [confirmationCode, setConfirmationCode] = useState<string>('');
//   const [inputConfirmationCode, setInputConfirmationCode] = useState<string>('');
//   const [recoveryPass, setRecoveryPass] = useState<string>('');
//   const [confirmRecoveryPass, setConfirmRecoveryPass] = useState<string>('');
//   const { data: session, status, update } = useSession()
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const searchOption = searchParams.get('option')
//
//   useEffect(() => {
//     async function loadOption() {
//       if(searchOption) {
//         setOption(+searchOption)
//       }
//     }
//     loadOption()
//   }, [searchOption]);
//
//   useEffect(() => {
//     async function loadUtils() {
//       if(status === "unauthenticated") {
//         router.push("/")
//       }
//       setLogin(session?.user?.name!)
//       setEmail(session?.user?.email!)
//       //@ts-ignore
//       setLocation(session?.user?.location!)
//       //@ts-ignore
//       setAge(session?.user?.age!)
//       //@ts-ignore
//       setFavoriteNewsCategory(session?.user?.favoriteNewsCategory!)
//     }
//     loadUtils()
//   }, [session, status]);
//
//   const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     try {
//       const isExists = cities.find(city => city.name === location)
//       if(isExists || location === 'Неизвестно') {
//         const data = await UsersService.changeProfile(
//           //@ts-ignore
//           session!.user?.id,
//           email,
//           login,
//           age,
//           location,
//           favoriteNewsCategory
//         )
//         if(data) {
//           await update({ name: login, email: email, location: location, age: age, favoriteNewsCategory: favoriteNewsCategory})
//           toast.success('Ваши данные были обновлены')
//           setChange(0)
//         } else {
//           toast.error('Введенные вами данные уже заняты либо невалидны')
//         }
//       } else {
//         toast.error('Введите существующий город')
//       }
//     } catch (err) {
//       toast.error('Введенные вами данные уже заняты либо невалидны')
//       console.warn('Account error ', err);
//     }
//   }
//
//   async function newPassword() {
//     try {
//       if(pass !== confirmPass) {
//         toast.error('Введенные пароли не совпадают')
//         return
//       } else if(pass.length < 5) {
//         toast.error('Пароль должен быть длиннее 5 символов')
//         return
//       } else if(pass.length > 25) {
//         toast.error('Пароль должен быть не длиннее 25 символов')
//         return
//       }
//       const isLegit = await AuthService.comparePasswords(prevPassword, session?.user?.name!)
//       if(isLegit) {
//         const data = await AuthService.changePassword(pass, session?.user?.name!)
//         if(data) {
//           toast.success('Пароль был изменён')
//           setNewPass(0)
//           setPass('')
//           setConfirmPass('')
//         } else {
//           toast.error('Что-то пошло не так')
//         }
//       } else {
//         toast.error('Вы неправильно ввели ваш старый пароль')
//       }
//     } catch (err) {
//       console.error('User account error ', err);
//     }
//   }
//
//   async function sendRecoveryCode() {
//     try {
//       if(email !== session?.user?.email!) {
//         toast.error('Вы должны ввести e-mail, который использовали при регистрации')
//         return
//       } else if(email === session?.user?.email!) {
//         const data = await AuthService.sendRecoveryPassCode(email)
//         if(data) {
//           setConfirmationCode(data.code)
//           setRecovery(2)
//         } else {
//           toast.error('Что-то пошло не так')
//         }
//       }
//     } catch (err) {
//       console.error('RecoveryCode error ', err);
//     }
//   }
//
//   async function confirmCode() {
//     try {
//       if(inputConfirmationCode !== confirmationCode) {
//         toast.error('Введённый код не совпадает с отправленным')
//         return
//       } else if (inputConfirmationCode === confirmationCode) {
//         setRecovery(3)
//         setRecoveryPass('')
//         setConfirmRecoveryPass('')
//       }
//     } catch (err) {
//       console.error('Confirm code error ', err);
//     }
//   }
//
//   async function newRecoveryPassword() {
//     try {
//       if(recoveryPass !== confirmRecoveryPass) {
//         toast.error('Введенные пароли не совпадают')
//         return
//       } else if (recoveryPass.length < 5) {
//         toast.error('Пароль должен быть длиннее 5 символов')
//         return
//       } else if (recoveryPass.length > 25) {
//         toast.error('Пароль должен быть не длиннее 25 символов')
//         return
//       }
//       const data = await AuthService.setNewPassword(recoveryPass, confirmationCode)
//       if(data) {
//         toast.success('Вы успешно изменили пароль')
//         setRecoveryPass('')
//         setConfirmRecoveryPass('')
//         setConfirmationCode('')
//         setInputConfirmationCode('')
//         setRecovery(0)
//       } else {
//         toast.error('Что-то пошло не так')
//       }
//     } catch (err) {
//       console.error('newRecoveryPassword error ', err);
//     }
//   }
//
//   return (
//       <div className={`wrapper ${
//         search === 1 || createNews === 1 || newPass === 1 || recovery === 1 || recovery === 2 || recovery === 3
//           ? "overflow" : ""
//       }`}>
//         <div className={`${
//           search === 1 || createNews === 1 || newPass === 1 || recovery === 1 || recovery === 2 || recovery === 3
//             ? "wrapper__popup blur"
//             : ""
//         }`}>
//           <Header onSearch={setSearch} onNews={setCreateNews} className={"header menu-visual"} />
//           {status === "authenticated" ? (
//             <main className="page page_account">
//               <section className="page__account account">
//                 <div className="account__container">
//                   <div data-tabs={true} className="account__tabs">
//                     <nav
//                       data-tabs-titles={true}
//                       className="account__navigation navigation-tabs"
//                     >
//                       <button
//                         type="button"
//                         className={
//                           option == 0
//                             ? "account__title title-tabs _tab-active"
//                             : "account__title title-tabs"
//                         }
//                         onClick={() => setOption(0)}
//                       >
//                         Аккаунт
//                       </button>
//                       <button
//                         type="button"
//                         className={
//                           option == 1
//                             ? "account__title title-tabs _tab-active"
//                             : "account__title title-tabs"
//                         }
//                         onClick={() => setOption(1)}
//                       >
//                         Поддержка
//                       </button>
//                     </nav>
//                     <div data-tabs-body={true} className="account__content">
//                       {option == 0 && change == 0 ? (
//                         <div className={`account__body body-account`}>
//                           <h2 className="body-account__title">
//                             Привет, <span>{session?.user?.name}</span> !
//                           </h2>
//                           <div className="body-account__blocks blocks-body-account">
//                             <div className="blocks-body-account__block left-blocks-body">
//                               <h3 className="left-blocks-body__title title-account title-account_main">
//                                 Информация об аккаунте
//                               </h3>
//                               <div className="left-blocks-body__actual">
//                                 <div className="left-blocks-body__top">
//                                   <div className="left-blocks-body__item">
//                 <span className="left-blocks-body__title-info">
//                   Имя
//                 </span>
//                                     <span className="left-blocks-body__title-name">
//                   {session?.user?.name || 'Неизвестно'}
//                 </span>
//                                   </div>
//                                   <div className="left-blocks-body__item">
//                 <span className="left-blocks-body__title-info">
//                   E-mail
//                 </span>
//                                     <span className="left-blocks-body__title-name">
//                   {session?.user?.email || 'Неизвестно'}
//                 </span>
//                                   </div>
//                                   <Link
//                                     href="#"
//                                     className="left-blocks-body__link link-account"
//                                     onClick={() => setChange(1)}
//                                   >
//                                     Изменить
//                                   </Link>
//                                 </div>
//                                 <div className="left-blocks-body__bottom">
//                                   <Link
//                                     href="#"
//                                     className="left-blocks-body__link link-account"
//                                     onClick={() => setNewPass(1)}
//                                   >
//                                     Изменить пароль
//                                   </Link>
//                                   <Link
//                                     href="#"
//                                     className="left-blocks-body__link-password"
//                                     onClick={() => {
//                                       setRecovery(1);
//                                     }}
//                                   >
//                                     Забыли пароль?
//                                   </Link>
//                                 </div>
//                                 <div className={'left-button-body__bottom'}>
//                                   <button
//                                     className={'border-solid rounded-2xl border-2 border-red-500 ' +
//                                       'bg-red-500 text-white font-medium h-10 w-32 hover:bg-red-400 ' +
//                                       'hover:border-red-400'}
//                                     onClick={() => signOut({callbackUrl: '/'})}
//                                   >
//                                     Sign out
//                                   </button>
//                                 </div>
//                               </div>
//                             </div>
//                             <div className="blocks-body-account__block right-blocks-body right-blocks-body_first">
//                               <h3 className="right-blocks-body__title title-account">
//                                 Мой профиль
//                               </h3>
//                               <form
//                                 action="#"
//                                 data-one-select={true}
//                                 className="right-blocks-body__form"
//                               >
//                                 <div className="right-blocks-body__item">
//                                   <label
//                                     htmlFor="form[]"
//                                     className="right-blocks-body__label"
//                                   >
//                                     Местоположение
//                                   </label>
//                                   <div>
//                                     {/*@ts-ignore*/}
//                                     <p className={'bold  text-[1.2em]'}>{session?.user?.location || 'Неизвестно'}</p>
//                                   </div>
//                                 </div>
//                                 <div className="right-blocks-body__item">
//                                   <label
//                                     htmlFor="form[]"
//                                     className="right-blocks-body__label"
//                                   >
//                                     Дата рождения
//                                   </label>
//                                   <input
//                                     id="birthday"
//                                     type="text"
//                                     name="form[]"
//                                     //@ts-ignore
//                                     value={session?.user?.age || 'Неизвестно'}
//                                     className="right-blocks-body__input-date text-[1.2em]"
//                                   />
//                                 </div>
//                                 <div className="right-blocks-body__item right-blocks-body__item_news">
//                                   <label
//                                     htmlFor="form[]"
//                                     className="right-blocks-body__label"
//                                   >
//                                     Интересующие категории новостей
//                                   </label>
//                                   <div>
//                                     {/*@ts-ignore*/}
//                                     <p className={'bold text-[1.2em]'}>{session?.user?.favoriteNewsCategory || 'Неизвестно'}</p>
//                                   </div>
//                                 </div>
//                               </form>
//                             </div>
//                           </div>
//                         </div>
//                       ) : option == 0 && change == 1 ? (
//                         <div className="account__body body-account">
//                           <h2 className="body-account__title">
//                             Привет, <span>{session?.user?.name!}</span> !
//                           </h2>
//                           <div className="body-account__blocks blocks-body-account">
//                             <form
//                               method={'put'}
//                               className="blocks-body-account__block left-blocks-body"
//                               onSubmit={handleSubmit}
//                             >
//                               <div className="left-blocks-body__top left-blocks-body__top_change">
//                                 <h3 className="left-blocks-body__title title-account">
//                                   Информация об аккаунте
//                                 </h3>
//                                 <div className="left-blocks-body__items">
//                                   <div className="left-blocks-body__item">
//                                     <label
//                                       htmlFor="form[]"
//                                       className="left-blocks-body__title-info"
//                                     >
//                                       Имя
//                                     </label>
//                                     <input
//                                       defaultValue={session?.user?.name!}
//                                       autoComplete="off"
//                                       type="text"
//                                       name="form[]"
//                                       data-error="Ошибка"
//                                       placeholder="Введите имя..."
//                                       className="left-blocks-body__input select-input"
//                                       required
//                                       onChange={(e) => setLogin(e.target.value)}
//                                     />
//                                   </div>
//                                   <div className="left-blocks-body__item">
//                                     <label
//                                       htmlFor="form[]"
//                                       className="left-blocks-body__title-info"
//                                     >
//                                       E-mail
//                                     </label>
//                                     <input
//                                       defaultValue={session?.user?.email!}
//                                       autoComplete="off"
//                                       type="email"
//                                       name="form[]"
//                                       data-error="Ошибка"
//                                       placeholder="Введите e-mail..."
//                                       className="left-blocks-body__input select-input"
//                                       required
//                                       onChange={(e) => setEmail(e.target.value)}
//                                     />
//                                   </div>
//                                 </div>
//                                 <div className="left-blocks-body__bottom-btns">
//                                   <button
//                                     type="submit"
//                                     className="left-blocks-body__btn link-account"
//                                     // onClick={() => update({ name: login })}
//                                   >
//                                     Сохранить
//                                   </button>
//                                   <button
//                                     type="button"
//                                     className="left-blocks-body__btn link-account link-account_black"
//                                     onClick={() => setChange(0)}
//                                   >
//                                     Отмена
//                                   </button>
//                                 </div>
//                               </div>
//                             </form>
//                             <div className="blocks-body-account__block right-blocks-body right-blocks-body_first">
//                               <h3 className="right-blocks-body__title title-account">
//                                 Мой профиль
//                               </h3>
//                               <form
//                                 method={'put'}
//                                 data-one-select={true}
//                                 className="right-blocks-body__form"
//                                 onSubmit={handleSubmit}
//                               >
//                                 <div className="right-blocks-body__item">
//                                   <label
//                                     htmlFor="form[]"
//                                     className="right-blocks-body__label"
//                                   >
//                                     Местоположение
//                                   </label>
//                                   <div>
//                                     <input
//                                       type={'text'}
//                                       id={'country'}
//                                       name="form[]"
//                                       className="left-blocks-body__input select-input"
//                                       /*@ts-ignore*/
//                                       defaultValue={session!.user!.location!}
//                                       onChange={(e) => setLocation(e.target.value)}
//                                     />
//                                   </div>
//                                 </div>
//                                 <div className="right-blocks-body__item">
//                                   <label
//                                     htmlFor="form[]"
//                                     className="right-blocks-body__label"
//                                   >
//                                     Дата рождения
//                                   </label>
//                                   <input
//                                     type="date"
//                                     id="birthday"
//                                     name="form[]"
//                                     className="right-blocks-body__input-date"
//                                     onChange={(e) => setAge(e.target.value)}
//                                   />
//                                 </div>
//                                 <div className="right-blocks-body__item right-blocks-body__item_news">
//                                   <label
//                                     htmlFor="form[]"
//                                     className="right-blocks-body__label"
//                                   >
//                                     Интересующие категории новостей
//                                   </label>
//                                   <div className="w-[480px] bg-white !border-[1px] !border-black border-solid rounded-[12px] text-black  ">
//                                     <Select onValueChange={(category) => setFavoriteNewsCategory(category)}>
//                                       <SelectTrigger>
//                                         {/*@ts-ignore*/}
//                                         <SelectValue placeholder={session?.user?.favoriteNewsCategory} />
//                                       </SelectTrigger>
//                                       <SelectContent className="border-white bg-white rounded-2xl text-black">
//                                         <SelectGroup>
//                                           <SelectItem className="cursor-pointer" key={"Политика"} value="Политика">Политика</SelectItem>
//                                           <SelectItem className="cursor-pointer hover:bg-[#ededed]" key={"Экономика"} value="Экономика">Экономика</SelectItem>
//                                           <SelectItem className="cursor-pointer hover:bg-[#ededed]" key={"Бизнес"} value="Бизнес">Бизнес</SelectItem>
//                                           <SelectItem className="cursor-pointer hover:bg-[#ededed]" key={"Мир"} value="Мир">Мировые новости</SelectItem>
//                                         </SelectGroup>
//                                       </SelectContent>
//                                     </Select>
//                                   </div>
//                                 </div>
//                               </form>
//                             </div>
//                           </div>
//                         </div>
//                       ) : (
//                         <AccountSupport location={location} />
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </section>
//             </main>
//           ) : null}
//           <footer className="footer">
//             <div className="footer__container">
//               <p className="footer__text">©2024 Opozitia</p>
//             </div>
//           </footer>
//         </div>
//         <ToastContainer position={'top-center'} autoClose={3000} />
//         <AnimatePresence>
//           {search === 1 && <Search onSearch={setSearch} />}
//         </AnimatePresence>
//         <AnimatePresence>
//           {createNews === 1 && <PopupNews onPopupNews={setCreateNews} />}
//         </AnimatePresence>
//         <AnimatePresence>
//           {recovery === 1 &&
//             <PopupRecovery
//               onClick={setRecovery}
//               setEmail={setEmail}
//               sendRecoveryCode={sendRecoveryCode}
//             />
//           }
//         </AnimatePresence>
//         <AnimatePresence>
//           {recovery === 2 &&
//             <PopupRecoveryCode
//               onClick={setRecovery}
//               setInputConfirmCode={setInputConfirmationCode}
//               email={email}
//               confirmCode={confirmCode}
//             />
//           }
//         </AnimatePresence>
//         <AnimatePresence>
//           {recovery === 3 &&
//             <PopupNewRecoveryPassword
//               onClick={setRecovery}
//               recoveryPass={recoveryPass}
//               setRecoveryPass={setRecoveryPass}
//               confirmRecoveryPass={confirmRecoveryPass}
//               setConfirmRecoveryPass={setConfirmRecoveryPass}
//               newRecoveryPassword={newRecoveryPassword}
//             />
//           }
//         </AnimatePresence>
//         <AnimatePresence>
//           {newPass === 1 &&
//             <PopupNewPass
//               onClick={setNewPass}
//               pass={pass}
//               setPass={setPass}
//               confirmPass={confirmPass}
//               setConfirmPass={setConfirmPass}
//               setPrevPassword={setPrevPassword}
//               newPassword={newPassword}
//             />
//           }
//         </AnimatePresence>
//       </div>
//   );
// }
//
// export default Account
import { Suspense } from 'react';
import { AccountPage } from '@/components/AccountPage/AccountPage';

const Account = () => {
  return (
    <Suspense>
      <AccountPage />
    </Suspense>
  )
}

export default Account