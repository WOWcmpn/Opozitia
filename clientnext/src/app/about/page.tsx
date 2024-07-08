"use client"
import { Header } from '@/components/Header/Header';
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { PopupAccount } from '@/components/PopupLogin/PopupAccount';
import { Search } from '@/components/Search/Search';
import { PopupNews } from '@/components/PopupNews/PopupNews';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

export default function About() {
  const [search, setSearch] = useState<number>(0);
  const [login, setLogin] = useState<number>(0);
  const [createNews, setCreateNews] = useState<number>(0);

  return (
    <>
      <div className="wrapper">
        <ToastContainer position={'top-center'} autoClose={2500} />
        <div className={`home ${search === 1 || login === 1 || createNews === 1
          ? "overflow" : ""} w-[100vw]`}>
          <div className={`wrapper ${search === 1 || login === 1 || createNews === 1
            ? "wrapper__popup blur" : ""}`}>
            <Header onSearch={setSearch} onLogin={setLogin} onNews={setCreateNews} />
            <main className={'mt-60 item-about'}>
              <div className={'item-content-news__image'}>
                <Image src={'/moldova.webp'} alt={'About'} width={200} height={200} />
              </div>
            </main>
          </div>
        </div>
        <AnimatePresence>
          {login == 1 && <PopupAccount onPopupAccount={setLogin} />}
        </AnimatePresence>
        <AnimatePresence>
          {search == 1 && <Search onSearch={setSearch} />}
        </AnimatePresence>
        <AnimatePresence>
          {createNews == 1 && <PopupNews onPopupNews={setCreateNews} />}
        </AnimatePresence>
      </div>
    </>
  )
}