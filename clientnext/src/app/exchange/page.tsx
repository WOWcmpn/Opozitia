"use client";
import React, { useEffect, useState } from "react";
import { Header } from "@/components/Header/Header";
import { CurrencyValue } from "@/components/CurrencyValue/CurrencyValue";
import { ICrypto, ICurrency } from "@/types/types";
import { NewsService } from "@/service/news.service";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CryptoValue } from "@/components/CryptoValue/CryptoValue";

export default function Exchange() {
  const [option, setOption] = useState<string>("currency");
  const [currency, setCurrency] = useState<ICurrency>();
  const [crypto, setCrypto] = useState<ICrypto>();

  useEffect(() => {
    async function loadData() {
      try {
        const currencyData = await NewsService.getCurrency()
        setCurrency(currencyData)
        const cryptoData = await NewsService.getLastCrypto()
        setCrypto(cryptoData)
      } catch (err) {
        console.warn('Currency error: ', err);
      }
    }
    loadData()
  }, []);

  function handleOption(e: string) {
    setOption(e);
  }

  return (
    <div className="wrapper">
      <Header className={"header menu-visual"} />
      <main className="page">
        <section className="page__exchange exchange">
          <div className="exchange__container content-news">
            <header className="content-news__header content-news__header_exchange">
              <div className="w-[1180px] bg-white !border-[1px] !border-black border-solid rounded-[12px] text-black mt-[50px] select_currency">
                <Select onValueChange={(option) => handleOption(option)}>
                  <SelectTrigger className="select_currency-trigger">
                    <SelectValue placeholder="Валюты" defaultValue={'currency'} />
                  </SelectTrigger>
                  <SelectContent className="bg-white rounded text-black text-[25px]">
                    <SelectGroup className="text-black text-[25px]">
                      <SelectItem className="cursor-pointer text-black text-[25px] max-h-xs" key={"currency"} value="currency">Валюты</SelectItem>
                      <SelectItem className="cursor-pointer text-black text-[25px] max-h-xs" key={"crypto"} value="indexes">Криптовалюта</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </header>
            {option == "currency" ? (
              <div className="tabs-oprosi__body">
                <table className="tabs-oprosi__table table-exchange">
                  <thead>
                    <tr>
                      <th>Валюта</th>
                      <th>Курс</th>
                      <th>Изменение, %</th>
                      <th>Изменение</th>
                      <th>Тех. рейтинг</th>
                    </tr>
                  </thead>
                  <tbody>
                  <CurrencyValue percentage={currency?.percentageEURToUSD!} difference={currency?.differenceEURToUSD!}
                                 name1={'EUR'} name2={'USD'}
                                 rate={Number(currency?.EURToUSD!).toFixed(4)!} img1={'euro.png'} img2={'usa.webp'} />
                  <CurrencyValue percentage={currency?.percentageUSDToJPY!} difference={currency?.differenceUSDToJPY!}
                                 name1={'USD'} name2={'JPY'}
                                 rate={Number(currency?.USDToJPY!).toFixed(4)!} img1={'usa.webp'} img2={'china.webp'} />
                  <CurrencyValue percentage={currency?.percentageGBPToUSD!} difference={currency?.differenceGBPToUSD!}
                                 name1={'GBP'} name2={'USD'}
                                 rate={Number(currency?.GBPToUSD!).toFixed(4)!} img1={'UK.svg'} img2={'usa.webp'} />
                  <CurrencyValue percentage={currency?.percentageUSDToRUB!} difference={currency?.differenceUSDToRUB!}
                                 name1={'USD'} name2={'RUB'}
                                 rate={Number(currency?.USDToRUB!).toFixed(4)!} img1={'usa.webp'} img2={'rub.svg'} />
                  <CurrencyValue percentage={currency?.percentageEURToRUB!} difference={currency?.differenceEURToRUB!}
                                 name1={'EUR'} name2={'RUB'}
                                 rate={Number(currency?.EURToRUB!).toFixed(4)!} img1={'euro.png'} img2={'rub.svg'} />
                  <CurrencyValue percentage={currency?.percentageUSDToRON!} difference={currency?.differenceUSDToRON!}
                                 name1={'USD'} name2={'RON'}
                                 rate={Number(currency?.USDToRON!).toFixed(4)!} img1={'usa.webp'} img2={'roman.svg'} />
                  <CurrencyValue percentage={currency?.percentageEURToRON!} difference={currency?.differenceEURToRON!}
                                 name1={'EUR'} name2={'RON'}
                                 rate={Number(currency?.EURToRON!).toFixed(4)!} img1={'euro.png'} img2={'roman.svg'} />
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="tabs-oprosi__body">
                <table className="tabs-oprosi__table table-exchange">
                  <thead>
                    <tr>
                      <th>Инструмент</th>
                      <th>Цена</th>
                      <th>Изменение, %</th>
                      <th>Изменение</th>
                      <th>Тех. рейтинг</th>
                    </tr>
                  </thead>
                  <tbody>
                  <CryptoValue name={'Bitcoin'} img={'btc.svg'} rate={Number(crypto?.rateBTC!).toFixed(4)}
                               percentage={crypto?.percentageBTC!} difference={crypto?.differenceBTC!} />
                  <CryptoValue name={'Ethereum'} img={'eth.svg'} rate={Number(crypto?.rateETH!).toFixed(4)}
                               percentage={crypto?.percentageETH!} difference={crypto?.differenceETH!} />
                  <CryptoValue name={'BNB'} img={'bnb.svg'} rate={Number(crypto?.rateBNB!).toFixed(4)}
                               percentage={crypto?.percentageBNB!} difference={crypto?.differenceBNB!} />
                  <CryptoValue name={'Notcoin'} img={'not.png'} rate={Number(crypto?.rateNOT!).toFixed(4)}
                               percentage={crypto?.percentageNOT!} difference={crypto?.differenceNOT!} />
                  <CryptoValue name={'Solana'} img={'sol.svg'} rate={Number(crypto?.rateSOL!).toFixed(4)}
                               percentage={crypto?.percentageSOL!} difference={crypto?.differenceSOL!} />
                  <CryptoValue name={'Litecoin'} img={'ltc.svg'} rate={Number(crypto?.rateLTC!).toFixed(4)}
                               percentage={crypto?.percentageLTC!} difference={crypto?.differenceLTC!} />
                  <CryptoValue name={'Bitcoin Cash'} img={'bch.svg'} rate={Number(crypto?.rateBCH!).toFixed(4)}
                               percentage={crypto?.percentageBCH!} difference={crypto?.differenceBCH!} />
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="footer__container">
          <p className="footer__text">©2024 Opozitia</p>
        </div>
      </footer>
    </div>
  );
}
