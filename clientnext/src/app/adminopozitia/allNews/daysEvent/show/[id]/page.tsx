"use client"
import React from 'react';
import { Typography } from 'antd';
import { useOne, useShow } from '@refinedev/core';
import { BooleanField, Show } from '@refinedev/antd';
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

  const TrueIcon = () => <span>✅</span>;
  const FalseIcon = () => <span>❌</span>;

  return (
    <Show isLoading={isLoading}>
      <div className={'border-solid border-b border-black pb-2'}>
        <Title level={5} className={'mt-4'}>Заголовок</Title>
        <Text>{categoryData?.data.title}</Text>
      </div>
      <div className={'border-solid border-b border-black pb-2'}>
        <Title level={5} className={'mt-4'}>Дата публикации</Title>
        <Text>{categoryData?.data.viewDate}</Text>
      </div>
      <div>
        <Title level={5} className={'mt-5'}>Опубликовано</Title>
        <BooleanField
          value={categoryData?.data.isPublished === true}
          trueIcon={<TrueIcon/>}
          falseIcon={<FalseIcon />}
          valueLabelTrue={'true'}
          valueLabelFalse={'false'}
          className={'font-xl'}>
        </BooleanField>
      </div>
    </Show>
  )
}