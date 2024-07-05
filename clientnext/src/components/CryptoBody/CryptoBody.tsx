import React, { useEffect, useState } from "react";
import { CurrencyBodyProps, IFullCrypto } from "@/types/types";
import Schedule from "@/components/Schedule/Schedule";
import { CryptoCurrency } from '@/service/cryptoCurrency';

export const CryptoBody = ({ name, page }: CurrencyBodyProps) => {
  const [currency, setCurrency] = useState<IFullCrypto[]>([]);

  useEffect(() => {
    async function loadCurrency() {
      try {
        const data = await CryptoCurrency.getCryptoFull(name, page)
        setCurrency(data)
      } catch (err) {
        console.warn('Currency body: ', err);
      }
    }
    loadCurrency()
  }, [name, page]);

  return (
    <div className="body-main-currency__body">
      <div data-tabs={true} className="body-main-currency-inside">
        <div data-tabs-body={true} className="body-main-currency-inside__content">
          <div className="body-main-currency-inside__body">
            <div className="body-main-currency-inside__wrap">
              <div className="graphics-left-block__item">
                <Schedule labels={currency.map(c => c.viewDate).reverse()}
                          data={currency.map(c => c.rate).reverse()}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
