"use client"
import React from 'react';
import { Edit, useForm } from '@refinedev/antd';
import { INews } from '@/app/adminopozitia/interfaces';
import { Form, Input, Radio, Select } from 'antd';

export default function NewsEdit(){
  const {formProps, saveButtonProps, queryResult} = useForm<INews>({
    warnWhenUnsavedChanges: true,
  })

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout={'vertical'}>
        <Form.Item
          label={'Заголовок'}
          name={'title'}
          rules={[
            {
              required: true,
              min: 5,
              max: 85
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={'Категория'}
          name={'category'}
          rules={[
            {required: true}
          ]}
        >
          <Select
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
          label={'Содержание'}
          name={'description'}
          rules={[
            {
              required: true,
              min: 30,
              max: 5000
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={'Дата публикации'}
          name={'viewDate'}
          rules={[
            {required: true}
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={'Превью картинка'}
          name={'imgUrl'}
          rules={[
            {required: true}
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={'Главная картинка'}
          name={'fullImgUrl'}
          rules={[
            {required: true}
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={'Опубликовано'}
          name={'isPublished'}
          rules={[
            {
              required: true
            }
          ]}
        >
          <Radio.Group>
            <Radio value={true}>Да</Radio>
            <Radio value={false}>Нет</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Edit>
  )
}