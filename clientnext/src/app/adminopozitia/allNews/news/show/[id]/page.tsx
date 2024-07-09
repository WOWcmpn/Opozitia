"use client"
import { useOne, useShow } from '@refinedev/core';
import { BooleanField, Show } from '@refinedev/antd';
import { Typography } from 'antd';
import Image from 'next/image';
import React from 'react';

enum newsCategory {
  Economy = 'Economy',
  Policy = 'Policy',
  Business = 'Business',
  World = 'World',
}

interface INews {
  id: string
  title: string
  viewDate: string
  category: newsCategory
  createdAtDate: Date
  createdAtTime: string
  description: string
  imgUrl: string
  fullImgUrl: string
  votePositive: number
  voteNegative: number
  voteNeutral: number
  isPublished: boolean
}

const {Title, Text} = Typography
export default function NewsShow() {
  const {queryResult} = useShow()
  const {data, isLoading} = queryResult
  const record = data?.data

  const {data: categoryData} = useOne<INews>({
    resource: "news",
    id: record?.id || '',
    queryOptions: {
      enabled: !!record?.id
    }
  })

  const TrueIcon = () => <span>✅</span>;
  const FalseIcon = () => <span>❌</span>;

  return (
    <Show isLoading={isLoading}>
      <div className={'border-solid border-b border-black pb-2'}>
        <Title level={5}>Заголовок</Title>
        <Text>{categoryData?.data.title}</Text>
      </div>
      <div className={'border-solid border-b border-black pb-2'}>
        <Title level={5} className={'mt-4'}>Дата публикации</Title>
        <Text>{categoryData?.data.viewDate}</Text>
      </div>
      <div className={'border-solid border-b border-black pb-2'}>
        <Title level={5} className={'mt-4'}>Категория</Title>
        <Text>{categoryData?.data.category}</Text>
      </div>
      <div className={'border-solid border-b border-black pb-2'}>
        <Title level={5} className={'mt-4'}>Содержание</Title>
        <Text>{categoryData?.data.description}</Text>
      </div>
      <div className={'border-solid border-b border-black pb-2'}>
        <Title level={5} className={'mt-4'}>Превью картинка</Title>
        <Image
          width={220}
          height={100}
          src={categoryData?.data!.imgUrl!}
          alt={'image'}
          className={'border-solid border-2 border-black rounded'}
        />
      </div>
      <div className={'border-solid border-b border-black pb-2'}>
        <Title level={5} className={'mt-4'}>Главная картинка</Title>
        <Image
          width={400}
          height={250}
          src={categoryData?.data!.fullImgUrl!}
          alt={'image'}
          className={'border-solid border-2 border-black rounded'}
        />
      </div>
      <div className={'border-solid border-b border-black pb-2'}>
        <Title level={5} className={'mt-5'}>Голоса</Title>
        <Text>
          Понравилось - {categoryData?.data.votePositive} |
          Не понравилось - {categoryData?.data.voteNegative} |
          Нейтрально - {categoryData?.data.voteNeutral}
        </Text>
      </div>
      <div>
        <Title level={5} className={'mt-5'}>Подтверждён</Title>
        <BooleanField
          value={categoryData?.data.isPublished === true}
          trueIcon={<TrueIcon/>}
          falseIcon={<FalseIcon />}
          valueLabelTrue={'true'}
          valueLabelFalse={'false'}
          className={'font-xl'}>
        </BooleanField>
      </div>
    </Show>)
}