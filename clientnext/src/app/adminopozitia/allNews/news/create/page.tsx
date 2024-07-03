"use client"
import React from 'react';
import { Create, useForm, useSelect } from '@refinedev/antd';
import { INews } from '@/app/adminopozitia/interfaces';
import { Form, Input, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';

export default function NewsCreate() {
  const {formProps, saveButtonProps} = useForm<INews>()
  const {selectProps: categorySelectProps} = useSelect<INews>({
    resource: "news"
  })

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout={'vertical'}>
        <Form.Item
          label={'Заголовок'}
          name={'title'}
          rules={[
            {
              required: true,
              min: 8,
              max: 35
            }
          ]}
        >
          <Input placeholder={'Аренда жилья подорожала из-за ...'} />
        </Form.Item>
        <Form.Item

          label={'Категория'}
          name={'category'}
          rules={[
            {required: true}
          ]}
        >
          <Select
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
          <TextArea placeholder={'На HeadHunter подали в суд из-за негативных отзывов о работодателе...'} />
        </Form.Item>
        <Form.Item
          label={'Превью картинка (ссылка)'}
          name={'imgUrl'}
          rules={[
            {required: true}
          ]}
        >
          <Input placeholder={'https://i.ytimg.com/vi/lSO0b8n_8BA/maxresdefault.jpg'} />
        </Form.Item>
        <Form.Item
          label={'Главная картинка (ссылка)'}
          name={'fullImgUrl'}
          rules={[
            {required: true}
          ]}
        >
          <Input placeholder={'https://i.ytimg.com/vi/lSO0b8n_8BA/maxresdefault.jpg'} />
        </Form.Item>
      </Form>
    </Create>
  )
}