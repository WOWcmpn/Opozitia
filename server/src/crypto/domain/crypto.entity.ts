import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CryptoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @Column()
  viewDate: string;

  @Column()
  time: string;

  @Column('decimal')
  rateBTC: number;

  @Column('decimal')
  rateETH: number;

  @Column('decimal')
  rateBNB: number;

  @Column('decimal')
  rateNOT: number;

  @Column('decimal')
  rateSOL: number;

  @Column('decimal')
  rateLTC: number;

  @Column('decimal')
  rateBCH: number;

  @Column('decimal', { nullable: true })
  percentageBTC: string;

  @Column('decimal', { nullable: true })
  percentageETH: string;

  @Column('decimal', { nullable: true })
  percentageBNB: string;

  @Column('decimal', { nullable: true })
  percentageNOT: string;

  @Column('decimal', { nullable: true })
  percentageSOL: string;

  @Column('decimal', { nullable: true })
  percentageLTC: string;

  @Column('decimal', { nullable: true })
  percentageBCH: string;

  @Column('decimal', { nullable: true })
  differenceBTC: string;

  @Column('decimal', { nullable: true })
  differenceETH: string;

  @Column('decimal', { nullable: true })
  differenceBNB: string;

  @Column('decimal', { nullable: true })
  differenceNOT: string;

  @Column('decimal', { nullable: true })
  differenceSOL: string;

  @Column('decimal', { nullable: true })
  differenceLTC: string;

  @Column('decimal', { nullable: true })
  differenceBCH: string;

  static createCrypto(
    viewDate: string,
    time: string,
    rateBTC: number,
    rateETH: number,
    rateBNB: number,
    rateNOT: number,
    rateSOL: number,
    rateLTC: number,
    rateBCH: number,
    percentageBTC: string,
    percentageETH: string,
    percentageBNB: string,
    percentageNOT: string,
    percentageSOL: string,
    percentageLTC: string,
    percentageBCH: string,
    differenceBTC: string,
    differenceETH: string,
    differenceBNB: string,
    differenceNOT: string,
    differenceSOL: string,
    differenceLTC: string,
    differenceBCH: string,
  ) {
    const crypto = new CryptoEntity();

    crypto.date = new Date();
    crypto.viewDate = viewDate;
    crypto.time = time;
    crypto.rateBTC = rateBTC;
    crypto.rateETH = rateETH;
    crypto.rateBNB = rateBNB;
    crypto.rateNOT = rateNOT;
    crypto.rateSOL = rateSOL;
    crypto.rateLTC = rateLTC;
    crypto.rateBCH = rateBCH;
    crypto.percentageBTC = percentageBTC;
    crypto.percentageETH = percentageETH;
    crypto.percentageBNB = percentageBNB;
    crypto.percentageNOT = percentageNOT;
    crypto.percentageSOL = percentageSOL;
    crypto.percentageLTC = percentageLTC;
    crypto.percentageBCH = percentageBCH;
    crypto.differenceBTC = differenceBTC;
    crypto.differenceETH = differenceETH;
    crypto.differenceBNB = differenceBNB;
    crypto.differenceNOT = differenceNOT;
    crypto.differenceSOL = differenceSOL;
    crypto.differenceLTC = differenceLTC;
    crypto.differenceBCH = differenceBCH;

    return crypto;
  }
}
