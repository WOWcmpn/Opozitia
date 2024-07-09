"use client"
import React from 'react';
import { useOne, useShow } from '@refinedev/core';
import { IComments } from '@/app/adminopozitia/interfaces';
import { Show } from '@refinedev/antd';
import { Typography } from 'antd';

const {Title, Text} = Typography
export default function CommentsShow(){
  const {queryResult} = useShow()
  const {data, isLoading} = queryResult
  const record = data?.data

  const {data: categoryData} = useOne<IComments>({
    resource: "comments",
    id: record?.id || '',
    queryOptions: {
      enabled: !!record?.id
    }
  })

  return(
    <Show isLoading={isLoading}>
      <div className={'border-solid border-b border-black pb-2'}>
        <Title level={4} className={'mt-4'}>Автор</Title>
        <Text className={'font-xl'}>{categoryData?.data.username}</Text>
      </div>
      <div className={'border-solid border-b border-black pb-2'}>
        <Title level={4} className={'mt-4'}>Айди новости</Title>
        <Text className={'font-xl'}>{categoryData?.data.newsId}</Text>
      </div>
      <div className={'border-solid border-b border-black pb-2'}>
        <Title level={4} className={'mt-4'}>Дата публикации</Title>
        <Text className={'font-xl'}>{categoryData?.data.viewDate}</Text>
      </div>
      <div>
        <Title level={4} className={'mt-4'}>Комментарий</Title>
        <Text className={'font-xl'}>{categoryData?.data.text}</Text>
      </div>
    </Show>
  )
}