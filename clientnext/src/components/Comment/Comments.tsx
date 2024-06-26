import { CommentProps } from "@/types/types";
import Image from "next/image";
import React from "react";

export const Comments = ({
  class1,
  img,
  name,
  time,
  text,
}: CommentProps) => {
  return (
    <div className={class1}>
      <div className="bottom-comments-news__top-info">
        <div className="bottom-comments-news__image">
          <Image height={50} width={50} src={`/img/icons/user.png`} alt='Image' />
        </div>
        <div className="bottom-comments-news__right">
          <h4 className="bottom-comments-news__name">{name}</h4>
          <p className="bottom-comments-news__time">
            <span className="bottom-comments-news__time-info">{time}</span>
          </p>
        </div>
      </div>
      <p className="bottom-comments-news__text">{text}</p>
      <div className="bottom-comments-news__actions">
        <button type="button" className="bottom-comments-news__answer-btn">
          Ответить
        </button>
      </div>
    </div>
  );
};
