import React from 'react';
import { useOne, useShow } from '@refinedev/core';
import { Show } from '@refinedev/antd';
import { Typography } from 'antd';
import { INews } from '@/app/adminopozitia/interfaces';
import Image from 'next/image';

const {Title, Text} = Typography
export const NewsShow: React.FC = () => {
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

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Заголовок</Title>
      <Text>{categoryData?.data.title}</Text>
      <Title level={5}>Дата публикации</Title>
      <Text>{categoryData?.data.viewDate}</Text>
      <Title level={5}>Категория</Title>
      <Text>{categoryData?.data.category}</Text>
      <Title level={5}>Содержание</Title>
      <Text>{categoryData?.data.description}</Text>
      <Title level={5}>Картинка</Title>
      <Image
        width={400}
        height={250}
        src={categoryData?.data!.fullImgUrl!}
        alt={'image'}
        className={'rounded'}
      />
      <Title level={5} className={'mt-2'}>Голоса</Title>
      <Text>
        Понравилось - {categoryData?.data.votePositive} |
        Не понравилось - {categoryData?.data.voteNegative} |
        Нейтрально - {categoryData?.data.voteNeutral}
      </Text>
    </Show>)
}