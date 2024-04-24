import { StaticImageData } from "next/image";


export type LatestNewsProps = {
    title: string;
    text: string;
    img: StaticImageData;
    time: string;
}