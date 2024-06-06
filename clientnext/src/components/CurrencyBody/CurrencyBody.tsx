import Image from "next/image";
import React, { useEffect, useState } from "react";
import btn1 from "@/img/icons/graphic-btn1.svg";
import btn2 from "@/img/icons/graphic-btn2.svg";
import { CurrencyBodyProps, IFullCurrency } from "@/types/types";
import { NewsService } from "@/service/news.service";
import Schedule from "@/components/Schedule/Schedule";

export const CurrencyBody = ({
  name,
}: CurrencyBodyProps) => {
  // const [option, setOption] = useState(0);
  const [currency, setCurrency] = useState<IFullCurrency[]>([]);

  useEffect(() => {
    async function loadCurrency() {
      try {
        const data = await NewsService.getCurrencyFullById(name)
        setCurrency(data)
      } catch (err) {
        console.warn('Currency body: ', err);
      }
    }
    loadCurrency()
  }, [name]);
  console.log(currency.map(c => c.viewDate).reverse());

  return (
    <div className="body-main-currency__body">
      <div data-tabs className="body-main-currency-inside">
        {/*<nav data-tabs-titles className="body-main-currency-inside__navigation">*/}
        {/*  <button*/}
        {/*    type="button"*/}
        {/*    className={`body-main-currency-inside__title ${*/}
        {/*      option == 0 ? " _tab-active" : ""*/}
        {/*    }`}*/}
        {/*    onClick={() => setOption(0)}*/}
        {/*  >*/}
        {/*    <Image src={btn1} alt="Иконка" />*/}
        {/*  </button>*/}
        {/*  <button*/}
        {/*    type="button"*/}
        {/*    className={`body-main-currency-inside__title ${*/}
        {/*      option == 1 ? " _tab-active" : ""*/}
        {/*    }`}*/}
        {/*    onClick={() => setOption(1)}*/}
        {/*  >*/}
        {/*    <Image src={btn2} alt="Иконка" />*/}
        {/*  </button>*/}
        {/*</nav>*/}
        <div data-tabs-body className="body-main-currency-inside__content">
          <div className="body-main-currency-inside__body">
            <div className="body-main-currency-inside__wrap">
              <div className="graphics-left-block__item">
                <Schedule labels={currency.map(c => c.viewDate).reverse()}
                          data={currency.map(c => c.rate).reverse()}/>
              </div>
            </div>
          </div>
          {/*{option == 0 ? (*/}
          {/*  <div className="body-main-currency-inside__body">*/}
          {/*    <div className="body-main-currency-inside__wrap">*/}
          {/*      <div className="body-main-currency-inside__main">*/}
          {/*        <div className="body-main-currency-inside__image body-main-currency-inside__image_dot">*/}
          {/*          <Image src={graph1} alt="График" />*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*      <div className="body-main-currency-inside__right">*/}
          {/*        {colr.map((el) => (*/}
          {/*          <span*/}
          {/*            className="body-main-currency-inside__info-right body-main-currency-inside__info-right_desktop"*/}
          {/*            key={el}*/}
          {/*          >*/}
          {/*            {el}*/}
          {/*          </span>*/}
          {/*        ))}*/}
          {/*      </div>*/}
          {/*      <div className="body-main-currency-inside__bottom">*/}
          {/*        {colb.map((el) => (*/}
          {/*          <span*/}
          {/*            className="body-main-currency-inside__info-bottom"*/}
          {/*            key={el}*/}
          {/*          >*/}
          {/*            {el}*/}
          {/*          </span>*/}
          {/*        ))}*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*) : (*/}
          {/*  <div className="body-main-currency-inside__body">*/}
          {/*    <div className="body-main-currency-inside__wrap">*/}
          {/*      <div className="body-main-currency-inside__main">*/}
          {/*        <div className="body-main-currency-inside__image body-main-currency-inside__image_1">*/}
          {/*          <Image src={graph2} alt="График" />*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*      <div className="body-main-currency-inside__right">*/}
          {/*        {colr.map((el) => (*/}
          {/*          <span*/}
          {/*            className="body-main-currency-inside__info-right body-main-currency-inside__info-right_desktop"*/}
          {/*            key={el}*/}
          {/*          >*/}
          {/*            {el}*/}
          {/*          </span>*/}
          {/*        ))}*/}
          {/*      </div>*/}
          {/*      <div className="body-main-currency-inside__bottom">*/}
          {/*        {colb.map((el) => (*/}
          {/*          <span*/}
          {/*            className="body-main-currency-inside__info-bottom"*/}
          {/*            key={el}*/}
          {/*          >*/}
          {/*            {el}*/}
          {/*          </span>*/}
          {/*        ))}*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*)}*/}
        </div>
      </div>
    </div>
  );
};
