import Image from "next/image";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Logo from "@/img/logo.png";
import UploadFile from "@/img/icons/uploadfile.svg";
import ImageFile from "@/img/icons/imagefile.png";
import { AccountPopupProps } from "@/types/types";
import Link from "next/link";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NewsService } from "@/service/news.service";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const PopupNews = ({ onClick }: AccountPopupProps) => {
  const [option, setOption] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [file, setFile] = useState<File>();
  const [newsCategory, setNewsCategory] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const fileTest = useRef<HTMLInputElement>(null);
  const popup = () => {
    onClick(0);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(!file) return
    try {
      const data = new FormData()
      data.set('file', file)
      const res = await NewsService.createNews({ file, title, newsCategory, description })
      if(res) {
        console.log('ok');
        toast.success('Комментарий был успешно создан')
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      }
    } catch (err) {
      toast.error('Ваши данные невалидны.')
      console.warn('PopupNews err ', err);
    }
  }

  return (
    <motion.div
      id="popup-vote"
      className="popup popup__active"
      initial={{ scale: 0.4 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.6 }}
      transition={{ ease: "all", duration: 0 }}
    >
      <div className="popup__wrapper">
        <div className=" popup_show popup__content_vote content-popup !px-[80px] !pt-[30px] !pb-[5px]">
          <div className="popup__top !w-[100%]">
            <Link href={'/'} className="popup__logo">
              <picture>
                <source srcSet="img/logo.webp" type="image/webp" />
                <Image src={Logo} alt="Logo" height={38} />
              </picture>
            </Link>
            <button
              data-close
              type="button"
              className="popup__close"
              onClick={popup}
            ></button>
          </div>
          <div className="popup__body body-popup body-popup_vote !w-[100%]">
            <div className="body-popup__top">
              <h3 className="body-popup__title">Сообщить новость</h3>
              <p className="body-popup__text body-popup__text_vote">
                Для сообщения новости, заполните пожалуйста поля ниже
              </p>
            </div>
            <div className="body-popup__content">
              <form
                id="form-pass"
                action="#"
                data-dev
                data-popup-message="#popup-registration-recovery"
                className="body-popup__form body-popup__form_code !gap-[25px]"
                onSubmit={onSubmit}
              >
                <input
                  type="text"
                  name="form[]"
                  placeholder="Заголовок"
                  className="body-popup__input-name input !p-[20px]"
                  required
                  onChange={e => setTitle(e.target.value)}
                />
                <label
                  htmlFor="file"
                  className={`input flex items-center justify-between !px-[20px] !py-[15px] cursor-pointer !text-inheri ${
                    option == 1 ? "bg-[#EAE8E8]" : ""
                  }`}
                >
                  <span className="cursor-pointer text-inherit">
                    {fileTest.current?.files && option == 1
                      ? fileTest.current.files[0].name
                      : "Загрузить файл изображения"}
                  </span>

                  <input
                    type="file"
                    id="fileupload"
                    name="form[]"
                    ref={fileTest}
                    data-required={''}
                    onChange={(e) => {
                      setOption(1);
                      setFile(e.target.files?.[0])
                    }}
                    placeholder="Загрузить файл изображения"
                    accept="image/*"
                    className="absolute opacity-0 cursor-pointer"
                    required
                  />
                  <Image
                    src={option == 0 ? UploadFile : ImageFile}
                    alt="upload"
                    width={40}
                    height={40}
                    className="cursor-pointer"
                  />
                </label>

                <div className="bg-pink !border-[1px] !border-black border-solid rounded-[12px] text-black py-[10px] pl-[15px] !text-[35px]">
                  <Select onValueChange={(category) => setNewsCategory(category)}>
                    <SelectTrigger className='text-[23px] w-full'>
                      <SelectValue placeholder="Категория новости" />
                    </SelectTrigger>
                    <SelectContent className="text-black max-h-xs z-[10000] bg-white rounded border-4 border-b-black">
                      <SelectGroup>
                        <SelectItem className="cursor-pointer text-[18px]" key={"Policy"} value="Policy">Политика</SelectItem>
                        <SelectItem className="cursor-pointer text-[18px]" key={"Economy"} value="Economy">Экономика</SelectItem>
                        <SelectItem className="cursor-pointer text-[18px]" key={"Business"} value="Business">Бизнес</SelectItem>
                        <SelectItem className="cursor-pointer text-[18px]" key={"World"} value="World">Мировые новости</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <input
                  type="text"
                  name="form[]"
                  data-required={''}
                  placeholder="Описание новости"
                  className="body-popup__input-password input !pb-[100px] !p-[20px]"
                  required
                  onChange={e => setDescription(e.target.value)}
                />
                <button
                  type="submit"
                  className="body-popup__button body-popup__button_code"
                >
                  Предложить
                </button>
                <br />
              </form>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
