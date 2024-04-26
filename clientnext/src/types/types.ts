import { StaticImageData } from "next/image";

export type LatestNewsProps = {
  title: string;
  text: string;
  img: StaticImageData;
  time: string;
};

export type MainBlockSlideProps = {
  title: string;
  img: StaticImageData;
};

export type GraphicsBlockProps = {
  name: string;
  title: string;
  tradeInfo: string;
  changeMinus: string;
  img: StaticImageData;
};

export type BlockContentProps = {
  title: string;
  img: StaticImageData;
  link1: string;
  link2: string;
  link3: string;
};
