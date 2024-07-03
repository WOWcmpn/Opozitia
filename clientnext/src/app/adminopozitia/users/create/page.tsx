"use client"
import React from 'react';
import { Create, useForm, useSelect } from '@refinedev/antd';
import { INews, IUsers } from '@/app/adminopozitia/interfaces';
import { Form, Input, Radio, Select, DatePicker } from 'antd';

export default function UsersCreate(){
  const {formProps, saveButtonProps} = useForm<IUsers>()
  const {selectProps: categorySelectProps} = useSelect<INews>({
    resource: "users"
  })

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout={'vertical'}>
        <Form.Item
          label={'Почта'}
          name={'email'}
          rules={[
            {
              required: true,
            }
          ]}
        >
          <Input placeholder={'test03@gmail.com'} />
        </Form.Item>
        <Form.Item
          label={'Логин'}
          name={'login'}
          rules={[
            {
              required: true,
              min: 3,
              max: 15
            }
          ]}
        >
          <Input placeholder={'Введите свой логин'} />
        </Form.Item>
        <Form.Item
          label={'Пароль'}
          name={'password'}
          rules={[
            {
              required: true,
              min: 5,
              max: 25
            }
          ]}
        >
          <Input placeholder={'Введите свой пароль'} />
        </Form.Item>
        <Form.Item
          label={'Местонахождение'}
          name={'location'}
          rules={[
            {
              required: false,
            }
          ]}
        >
          <Input defaultValue={'Неизвестно'} placeholder={'Введите свой логин'} />
        </Form.Item>
        <Form.Item
          label={'Любимая категория новостей'}
          name={'favoriteNewsCategory'}
          rules={[
            {
              required: false,
            }
          ]}
        >
          <Select
            defaultValue={'Неизвестно'}
            placeholder={'Выберите категорию'}
            options={[
              {
                label: 'Бизнес',
                value: 'Business'
              },
              {
                label: 'Экономика',
                value: 'Economy'
              },
              {
                label: 'Политика',
                value: 'Policy'
              },
              {
                label: 'Мир',
                value: 'World'
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          label={'Дата рождения'}
          name={'age'}
          rules={[
            {
              required: false
            }
          ]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label={'Подтвержден'}
          name={'isConfirmed'}
          rules={[
            {
              required: true
            }
          ]}
        >
          <Radio.Group>
            <Radio value={true}>Подтвержден</Radio>
            <Radio value={false}>Не подтвержден</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Create>
  )
}