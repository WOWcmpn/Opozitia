import { CommentProps, IComments } from '@/types/types';
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CommentsService } from '@/service/comments.service';

export const Comments = ({
  commentId,
  class1,
  class2,
  img,
  name,
  time,
  text,
}: CommentProps) => {
  const [resComment, setResComment] = useState<number>(0);
  const [bottomComments, setBottomComments] = useState<IComments[] | []>([]);
  const [commentText, setCommentText] = useState<string>('');
  const [loadMore, setLoadMore] = useState<number>(0);
  const {data: session, status} = useSession()

  useEffect(() => {
    async function loadBottomComments() {
      try {
        const data = await CommentsService.getBottomComments(commentId)
        setBottomComments(data)
      } catch (err) {
        console.error('loadBottomComments error ', err);
      }
    }
    loadBottomComments()
  }, [commentId]);

  const handleSubmit = async (e: any) => {
    if(status === "unauthenticated") {
      toast.error("Неавторизованные пользователи не могут оставлять комментарии")
      return
    } else if(status === "authenticated") {
      e.preventDefault()
      try {
        await CommentsService.createBottomComment(commentId, commentText, session?.user?.name!)
        setCommentText('')
        toast.success('Комментарий был успешно создан')
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      } catch (err) {
        console.error('Bottom comment error ', err);
        toast.error('Что-то пошло не так')
      }
    }
  }

  return (
    <div>
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
        {resComment === 0 ? (
          <button
            type="button"
            className="bottom-comments-news__answer-btn"
            onClick={() => setResComment(1)}
          >
            Ответить
          </button>
        ) : (
          <form
            method={'post'}
            className="comments-content-news__comments-form"
            onSubmit={handleSubmit}
          >
            <button
              data-close={true}
              type="button"
              className="popup__close float-end mt-2 mr-2"
              onClick={() => setResComment(0)}
            />
            <textarea
              autoComplete="off"
              placeholder="Ответить..."
              className="bottom-comments-content-news__input"
              minLength={5}
              maxLength={350}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button
              type="submit"
              className="bottom-comments-content-news__button w-1/4 h-1/5 mr-[-0.65rem] mb-[-0.65rem]"
            >
              Отправить
            </button>
          </form>
        )}
      </div>
    </div>
      {bottomComments.length > 0 && loadMore === 0 ? (
          <div className={class2} key={bottomComments[0].id!}>
            <div className="bottom-comments-news__top-info">
              <div className="bottom-comments-news__image">
                <Image height={50} width={50} src={`/img/icons/user.png`} alt='Image' />
              </div>
              <div className="bottom-comments-news__right">
                <h4 className="bottom-comments-news__name">{bottomComments[0].username}</h4>
                <p className="bottom-comments-news__time">
                  <span className="bottom-comments-news__time-info">{bottomComments[0].viewDate}</span>
                </p>
              </div>
            </div>
            <p className="bottom-comments-news__text"><b className={'font-semibold'}>{name}</b>, {bottomComments[0].text}</p>
            <div className="bottom-comments-news__actions">
            </div>
          </div>
      ) : (
        bottomComments?.map((c) => (
          <div className={class2} key={c.id}>
            <div className="bottom-comments-news__top-info">
              <div className="bottom-comments-news__image">
                <Image height={50} width={50} src={`/img/icons/user.png`} alt='Image' />
              </div>
              <div className="bottom-comments-news__right">
                <h4 className="bottom-comments-news__name">{c.username}</h4>
                <p className="bottom-comments-news__time">
                  <span className="bottom-comments-news__time-info">{c.viewDate}</span>
                </p>
              </div>
            </div>
            <p className="bottom-comments-news__text"><b className={'font-semibold'}>{name}</b>, {c.text}</p>
            <div className="bottom-comments-news__actions">
            </div>
          </div>
        ))
      )}
      {loadMore === 1 ? null : bottomComments?.length! > 1 ? (
        <button className={'bottom-comments-news__answer-btn'} onClick={() => setLoadMore(1)}>Показать еще</button>
      ) : null}
    </div>
  );
};
