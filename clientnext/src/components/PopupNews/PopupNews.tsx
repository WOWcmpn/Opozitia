import Image from "next/image";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import UploadFile from "@/img/icons/uploadfile.svg";
import ImageFile from "@/img/icons/imagefile.png";
import { NewsPopupProps } from '@/types/types';
import Link from "next/link";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NewsService } from "@/service/news.service";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { UploadButton } from '@/utils/uploadthing';

export const PopupNews = ({ onPopupNews }: NewsPopupProps) => {
  const [title, setTitle] = useState<string>('');
  const [newsCategory, setNewsCategory] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [imgNews, setImgNews] = useState<string>('');
  const popup = () => {
    onPopupNews(0);
  };
  const root = useRef()

  React.useEffect(() => {
    //@ts-ignore
    const onClick = e => root.current.contains(e.target) || onPopupNews();
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [onPopupNews]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await NewsService.createNews({ file: imgNews, title, newsCategory, description })
      if(res) {
        console.log('ok');
        toast.success('Новость была успешно создана')
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      }
    } catch (err) {
      toast.error('Ваши данные невалидны')
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
      {/*@ts-ignore*/}
      <div className="popup__wrapper" ref={root}>
        <div className=" popup_show popup__content_vote content-popup !px-[40px] !pt-[30px] !pb-[5px]">
          <div className="popup__top !w-[100%]">
            <Link href={'/'} className="popup__logo">
              <picture>
                <Image src={'/img/logo.webp'} width={110} alt="Logo" height={38} />
              </picture>
            </Link>
            <button
              data-close={true}
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
                data-dev={true}
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

                <UploadButton
                  className={'text-black'}
                  // appearance={{
                  //   button: {
                  //     fontSize: '1.3rem',
                  //     fontWeight: 'bold',
                  //     color: 'black',
                  //     width: '100%',
                  //     // background: rgba(136, 162, 255, 1.1),
                  //   },
                  //   allowedContent: {
                  //     margin: '0 0 -1em 0'
                  //   }
                  // }}
                  endpoint={'imageUploader'}
                  onClientUploadComplete={(res) => {
                    setImgNews(res[0].url)
                    toast.success('Изображение успешно загружено')
                    console.log(res);
                  }}
                  onUploadError={(err) => {
                    console.error('Upload error ', err);
                    toast.error('Ваше изображение не подходит')
                  }}
                />
                {/*<label*/}
                {/*  htmlFor="file"*/}
                {/*  className={`input flex items-center justify-between !px-[20px] !py-[15px] cursor-pointer !text-inheri ${*/}
                {/*    option == 1 ? "bg-[#EAE8E8]" : ""*/}
                {/*  }`}*/}
                {/*>*/}
                {/*  <span className="cursor-pointer text-inherit">*/}
                {/*    {fileTest.current?.files && option == 1*/}
                {/*      ? fileTest.current.files[0].name*/}
                {/*      : "Загрузить файл изображения"}*/}
                {/*  </span>*/}

                {/*  <input*/}
                {/*    type="file"*/}
                {/*    id="fileupload"*/}
                {/*    name="form[]"*/}
                {/*    ref={fileTest}*/}
                {/*    data-required={''}*/}
                {/*    onChange={(e) => {*/}
                {/*      setOption(1);*/}
                {/*      setFile(e.target.files?.[0])*/}
                {/*    }}*/}
                {/*    placeholder="Загрузить файл изображения"*/}
                {/*    accept="image/*"*/}
                {/*    className="absolute opacity-0 cursor-pointer"*/}
                {/*    required*/}
                {/*  />*/}
                {/*  <Image*/}
                {/*    src={option == 0 ? UploadFile : ImageFile}*/}
                {/*    alt="upload"*/}
                {/*    width={40}*/}
                {/*    height={40}*/}
                {/*    className="cursor-pointer"*/}
                {/*  />*/}
                {/*</label>*/}

                <div className="popup-news__category bg-pink !border-[1px] !border-black border-solid rounded-[12px] text-black py-[10px] pl-[20px] !text-[35px]">
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
