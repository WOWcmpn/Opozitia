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

export type HeaderProps = {
  className?: string;
}

export type PageNewsProps = {
  title: string;
  img: StaticImageData;
  link1: string;
  link2: string;
  link3: string;
};

export type CommentProps = {
  name: string;
  img: StaticImageData;
  class1: string;
  time: string;
  text: string;
  likes: number | string;
};
