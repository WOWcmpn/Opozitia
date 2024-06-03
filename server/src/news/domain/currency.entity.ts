import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { formatCurrencyDate } from '../../base/helpers/formatCurrencyDate';

@Entity()
export class CurrencyEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @Column()
  viewDate: string;

  @Column('decimal')
  EURToUSD: number;

  @Column('decimal')
  USDToJPY: number;

  @Column('decimal')
  GBPToUSD: number;

  @Column('decimal')
  USDToRUB: number;

  @Column('decimal')
  EURToRUB: number;

  @Column('decimal')
  USDToRON: number;

  @Column('decimal')
  EURToRON: number;

  @Column('decimal', { nullable: true })
  percentageEURToUSD: string;

  @Column('decimal', { nullable: true })
  percentageUSDToJPY: string;

  @Column('decimal', { nullable: true })
  percentageGBPToUSD: string;

  @Column('decimal', { nullable: true })
  percentageUSDToRUB: string;

  @Column('decimal', { nullable: true })
  percentageEURToRUB: string;

  @Column('decimal', { nullable: true })
  percentageUSDToRON: string;

  @Column('decimal', { nullable: true })
  percentageEURToRON: string;

  @Column('decimal', { nullable: true })
  differenceEURToUSD: string;

  @Column('decimal', { nullable: true })
  differenceUSDToJPY: string;

  @Column('decimal', { nullable: true })
  differenceGBPToUSD: string;

  @Column('decimal', { nullable: true })
  differenceUSDToRUB: string;

  @Column('decimal', { nullable: true })
  differenceEURToRUB: string;

  @Column('decimal', { nullable: true })
  differenceUSDToRON: string;

  @Column('decimal', { nullable: true })
  differenceEURToRON: string;

  static createCurrency(
    EURToUSD: number,
    USDToJPY: number,
    GBPToUSD: number,
    USDToRUB: number,
    EURToRUB: number,
    USDToRON: number,
    EURToRON: number,
    percentageEURToUSD: string,
    percentageUSDToJPY: string,
    percentageGBPToUSD: string,
    percentageUSDToRUB: string,
    percentageEURToRUB: string,
    percentageUSDToRON: string,
    percentageEURToRON: string,
    differenceEURToUSD: string,
    differenceUSDToJPY: string,
    differenceGBPToUSD: string,
    differenceUSDToRUB: string,
    differenceEURToRUB: string,
    differenceUSDToRON: string,
    differenceEURToRON: string,
  ) {
    const currency = new CurrencyEntity();
    const viewDate = formatCurrencyDate(new Date().toLocaleDateString());

    currency.date = new Date();
    currency.viewDate = viewDate;
    currency.EURToUSD = EURToUSD;
    currency.USDToJPY = USDToJPY;
    currency.GBPToUSD = GBPToUSD;
    currency.USDToRUB = USDToRUB;
    currency.EURToRUB = EURToRUB;
    currency.USDToRON = USDToRON;
    currency.EURToRON = EURToRON;
    currency.percentageEURToUSD = percentageEURToUSD;
    currency.percentageUSDToJPY = percentageUSDToJPY;
    currency.percentageGBPToUSD = percentageGBPToUSD;
    currency.percentageUSDToRUB = percentageUSDToRUB;
    currency.percentageEURToRUB = percentageEURToRUB;
    currency.percentageUSDToRON = percentageUSDToRON;
    currency.percentageEURToRON = percentageEURToRON;
    currency.differenceEURToUSD = differenceEURToUSD;
    currency.differenceUSDToJPY = differenceUSDToJPY;
    currency.differenceGBPToUSD = differenceGBPToUSD;
    currency.differenceUSDToRUB = differenceUSDToRUB;
    currency.differenceEURToRUB = differenceEURToRUB;
    currency.differenceUSDToRON = differenceUSDToRON;
    currency.differenceEURToRON = differenceEURToRON;

    return currency;
  }
}
