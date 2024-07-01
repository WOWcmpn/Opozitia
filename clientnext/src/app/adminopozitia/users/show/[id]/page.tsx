"use client"
import React from 'react';
import { Typography } from 'antd';
import { useOne, useShow } from '@refinedev/core';
import { IUsers } from '@/app/adminopozitia/interfaces';
import { BooleanField, Show } from '@refinedev/antd';

const {Title, Text} = Typography
export default function UsersShow(){
  const {queryResult} = useShow()
  const {data, isLoading} = queryResult
  const record = data?.data
  const TrueIcon = () => <span>✅</span>;
  const FalseIcon = () => <span>❌</span>;


  const {data: categoryData} = useOne<IUsers>({
    resource: "users",
    id: record?.id || '',
    queryOptions: {
      enabled: !!record?.id
    }
  })

  return (
    <div>
      <Show isLoading={isLoading}>
        <Title level={4}>Логин</Title>
        <Text className={'font-xl'}>{categoryData?.data.login}</Text>
        <Title level={4}>Почта</Title>
        <Text className={'font-xl'}>{categoryData?.data.email}</Text>
        <Title level={4}>Местонахождение</Title>
        <Text className={'font-xl'}>{categoryData?.data.location}</Text>
        <Title level={4}>Любимая категория новостей</Title>
        <Text className={'font-xl'}>{categoryData?.data.favoriteNewsCategory}</Text>
        <Title level={4}>Подтверждён</Title>
        <BooleanField
          value={categoryData?.data.isConfirmed === true}
          trueIcon={<TrueIcon/>}
          falseIcon={<FalseIcon />}
          valueLabelTrue={'true'}
          valueLabelFalse={'false'}
          className={'font-xl'}>
        </BooleanField>
        <Title level={4}>Дата рождения</Title>
        <Text className={'font-xl'}>{categoryData?.data.age}</Text>
        <Title level={4}>Дата регистрации</Title>
        <Text className={'font-[24px]'}>{categoryData?.data.createdAt}</Text>
      </Show>
    </div>
  )
}