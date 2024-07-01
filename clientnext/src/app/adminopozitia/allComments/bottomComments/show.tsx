import React from 'react';
import { useOne, useShow } from '@refinedev/core';
import { IBottomComments } from '@/app/adminopozitia/interfaces';
import { Show } from '@refinedev/antd';
import { Typography } from 'antd';

const {Title, Text} = Typography
export const BottomCommentsShow: React.FC = () => {
  const {queryResult} = useShow()
  const {data, isLoading} = queryResult
  const record = data?.data

  const {data: categoryData} = useOne<IBottomComments>({
    resource: "bottomComments",
    id: record?.id || '',
    queryOptions: {
      enabled: !!record?.id
    }
  })

  return (
    <Show isLoading={isLoading}>
      <Title level={4}>Автор</Title>
      <Text className={'font-xl'}>{categoryData?.data.username}</Text>
      <Title level={4}>Айди комментария</Title>
      <Text className={'font-xl'}>{categoryData?.data.commentId}</Text>
      <Title level={4}>Дата публикации</Title>
      <Text className={'font-xl'}>{categoryData?.data.viewDate}</Text>
      <Title level={4}>Комментарий</Title>
      <Text className={'font-xl'}>{categoryData?.data.text}</Text>
    </Show>
  )
}