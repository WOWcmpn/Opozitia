import Link from "next/link";
import Image from "next/image";
import Social1 from "@/img/social/02.svg";
import Social2 from "@/img/social/04.svg";
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { UsersService } from '@/service/users.service';

export const AccountSupport = ({location, email}: {location: string, email: string}) => {
  const [name, setName] = useState<string>('');
  const [text, setText] = useState<string>('');

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const data = await UsersService.sendEmail(name, location, text, email)
      if(data) {
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

  return (
    <div className="account__body body-account">
      <h2 className="body-account__title">Свяжитесь с нами</h2>
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
                  opozitia@gmail.com
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
  )
}