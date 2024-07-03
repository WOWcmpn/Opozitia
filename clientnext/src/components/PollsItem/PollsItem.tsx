"use client";
import { PollsItemProps, quizVotes } from "@/types/types";
import Image from "next/image";
import React, { useState } from "react";
import { NewsService } from "@/service/news.service";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

export const PollsItem = ({
  id,
  title,
  agree,
  neutral,
  disagree,
  img,
  onClick,
  onPositiveVote,
  onNegativeVote,
  onNeutralVote,
  onTitle
}: PollsItemProps) => {
  const [select, setSelect] = useState<number>(0);
  const session = useSession()

  const handleVote = async (vote: quizVotes) => {
    if(!session.data) {
      toast.error('Неавторизованные пользователи не могут голосовать')
    } else {
      await NewsService.sendVote(vote, id, session.data?.user?.name!)
    }
  }

  const sum = agree + disagree + neutral
  const perAgree = ((agree / sum) * 100).toFixed(0)
  const perDisagree = ((disagree / sum) * 100).toFixed(0)
  const perNeutral = ((neutral / sum) * 100).toFixed(0)

  return (
    <div className="tabs-oprosi__item item-tabs-oprosi item-block">
      <div className="item-tabs-oprosi__top">
        <h4 className="item-tabs-oprosi__top-title">
          Как вы относитесь к этому?
        </h4>
      </div>
      <div className="item-tabs-oprosi__content">
        <form
          action="#"
          className="item-tabs-oprosi__form item-tabs-oprosi__form_main-vote"
        >
          <h4 className="item-tabs-oprosi__title">{title}</h4>
          <div className="options">
            {session.data ? (
              <div className={`options__item ${select == 1 ? "selected" : ""}`}>
                <input
                  hidden
                  id="o_1"
                  className="options__input"
                  type="checkbox"
                  value="supportno"
                  name="opros1"
                />
                <label
                  htmlFor="o_1"
                  className="options__label options__label_1"
                  onClick={() => {
                    setSelect(1);
                    onClick(1)
                    handleVote(quizVotes.Dislike)
                    onNegativeVote(+perDisagree)
                    onPositiveVote(+perAgree)
                    onNeutralVote(+perNeutral)
                    onTitle(title)
                  }}
                >
                  <span className="options__text">Не поддерживаю</span>{" "}
                  <span className="percent percent_nosupport">{+perDisagree || 0}%</span>
                  <div className="options__row row">
                    <div
                      className="options__progress progress  progress_nosupport"
                      style={{}}
                    ></div>
                  </div>
                </label>
                <input
                  hidden
                  id="o_2"
                  className="options__input"
                  type="checkbox"
                  value="support"
                  name="opros1"
                />
                <label
                  htmlFor="o_2"
                  className="options__label options__label_2"
                  onClick={() => {
                    setSelect(1);
                    onClick(1)
                    handleVote(quizVotes.Like)
                    onNegativeVote(+perDisagree)
                    onPositiveVote(+perAgree)
                    onNeutralVote(+perNeutral)
                    onTitle(title)
                  }}
                >
                  <span className="options__text">Поддерживаю</span>
                  <span className="percent percent_support">{+perAgree || 0}%</span>
                  <div className="options__row row">
                    <div className="options__progress progress  progress_support"></div>
                  </div>
                </label>
                <input
                  hidden
                  id="o_3"
                  className="options__input"
                  type="checkbox"
                  value="neutral"
                  name="opros1"
                />
                <label
                  htmlFor="o_3"
                  className="options__label options__label_3"
                  onClick={() => {
                    setSelect(1);
                    onClick(1)
                    handleVote(quizVotes.Whatever)
                    onNegativeVote(+perDisagree)
                    onPositiveVote(+perAgree)
                    onNeutralVote(+perNeutral)
                    onTitle(title)
                  }}
                >
                  <span className="options__text">Нейтрально</span>
                  <span className="percent percent_neutral">{+perNeutral || 0}%</span>
                  <div className="options__row row">
                    <div className="options__progress progress  progress_neutral"></div>
                  </div>
                </label>
              </div>
            ) : (
              <div className={`options__item ${select == 1 ? "selected" : ""}`}>
                <input
                  hidden
                  id="o_1"
                  className="options__input"
                  type="checkbox"
                  value="supportno"
                  name="opros1"
                />
                <label
                  htmlFor="o_1"
                  className="options__label options__label_1"
                  onClick={() => {
                    handleVote(quizVotes.Dislike)
                  }}
                >
                  <span className="options__text">Не поддерживаю</span>{" "}
                  <div className="options__row row">
                    <div
                      className="options__progress progress  progress_nosupport"
                      style={{}}
                    ></div>
                  </div>
                </label>
                <input
                  hidden
                  id="o_2"
                  className="options__input"
                  type="checkbox"
                  value="support"
                  name="opros1"
                />
                <label
                  htmlFor="o_2"
                  className="options__label options__label_2"
                  onClick={() => {
                    handleVote(quizVotes.Like)
                  }}
                >
                  <span className="options__text">Поддерживаю</span>
                  <div className="options__row row">
                    <div className="options__progress progress  progress_support"></div>
                  </div>
                </label>
                <input
                  hidden
                  id="o_3"
                  className="options__input"
                  type="checkbox"
                  value="neutral"
                  name="opros1"
                />
                <label
                  htmlFor="o_3"
                  className="options__label options__label_3"
                  onClick={() => {
                    handleVote(quizVotes.Whatever)
                  }}
                >
                  <span className="options__text">Нейтрально</span>
                  <div className="options__row row">
                    <div className="options__progress progress  progress_neutral"></div>
                  </div>
                </label>
              </div>
            )}
          </div>
          <div className="item-tabs-oprosi__image-ibg">
            <picture>
              <Image fill={true} src={img} alt={img} />
            </picture>
          </div>
        </form>
      </div>
    </div>
  );
};
