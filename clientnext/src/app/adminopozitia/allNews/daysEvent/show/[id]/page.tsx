"use client"
import React from 'react';
import { Typography } from 'antd';
import { useOne, useShow } from '@refinedev/core';
import { Show } from '@refinedev/antd';
import { IDaysEvent } from '@/app/adminopozitia/interfaces';

const {Title, Text} = Typography
export default function DaysEventShow(){
  const {queryResult} = useShow()
  const {data, isLoading} = queryResult
  const record = data?.data

  const {data: categoryData} = useOne<IDaysEvent>({
    resource: "daysEvent",
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
    </Show>
  )
}