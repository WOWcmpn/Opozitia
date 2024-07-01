import React from 'react';
import { Edit, useForm } from '@refinedev/antd';
import { INews } from '@/app/adminopozitia/interfaces';
import { Form, Input, Select } from 'antd';

export const NewsEdit: React.FC = () => {
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
              min: 8,
              max: 35
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
          label={'Картинка'}
          name={'fullImgUrl'}
          rules={[
            {required: true}
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  )
}