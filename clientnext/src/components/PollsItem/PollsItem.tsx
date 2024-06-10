"use client";
import { PollsItemProps, quizVotes } from "@/types/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { NewsService } from "@/service/news.service";

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
  const [select, setSelect] = useState(0);
  const [isUrl, setIsUrl] = useState<boolean>(false);

  useEffect(() => {
    async function loadUtils() {
      try {
        if(img.startsWith('http')) setIsUrl(true)
      } catch (err) {
        console.warn('PageNews err ', err);
      }
    }
    loadUtils()
  }, [img]);

  const handleVote = async (vote: quizVotes) => {
    console.log('THIS IS ID ', title);
    await NewsService.sendVote(vote, id)
  }

  const sum = agree + disagree + neutral
  const perAgree = (agree / sum) * 100
  const perDisagree = (disagree / sum) * 100
  const perNeutral = (neutral / sum) * 100

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
                  onNegativeVote(perDisagree)
                  onPositiveVote(perAgree)
                  onNeutralVote(perNeutral)
                  onTitle(title)
                }}
              >
                <span className="options__text">Не поддерживаю</span>{" "}
                <span className="percent percent_nosupport">{perDisagree || 0}%</span>
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
                  onNegativeVote(perDisagree)
                  onPositiveVote(perAgree)
                  onNeutralVote(perNeutral)
                  onTitle(title)
                }}
              >
                <span className="options__text">Поддерживаю</span>
                <span className="percent percent_support">{perAgree || 0}%</span>
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
                  onNegativeVote(perDisagree)
                  onPositiveVote(perAgree)
                  onNeutralVote(perNeutral)
                  onTitle(title)
                }}
              >
                <span className="options__text">Нейтрально</span>
                <span className="percent percent_neutral">{perNeutral || 0}%</span>
                <div className="options__row row">
                  <div className="options__progress progress  progress_neutral"></div>
                </div>
              </label>
            </div>
          </div>
          <div className="item-tabs-oprosi__image-ibg">
            <picture>
              {isUrl ? (
                <Image fill={true} src={img} alt="Image" />
              ) : (
                <Image
                  fill={true}
                  src={`/img/fullImage-news/${img}`}
                  alt="Image"
                />
              )}
            </picture>
          </div>
        </form>
      </div>
    </div>
  );
};
