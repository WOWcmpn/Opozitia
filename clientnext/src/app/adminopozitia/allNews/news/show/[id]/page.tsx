"use client"
import { useOne, useShow } from '@refinedev/core';
import { Show } from '@refinedev/antd';
import { Typography } from 'antd';
import Image from 'next/image';

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