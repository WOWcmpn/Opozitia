"use client"
import React from 'react';
import { Create, useForm, useSelect } from '@refinedev/antd';
import { INews } from '@/app/adminopozitia/interfaces';
import { DatePicker, Form, Input, Radio } from 'antd';

export default function DaysEventCreate(){
  const {formProps, saveButtonProps} = useForm<INews>()
  const {selectProps: categorySelectProps} = useSelect<INews>({
    resource: "daysEvent"
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
              min: 5,
              max: 40
            }
          ]}
        >
          <Input placeholder={'День конституции ....'} />
        </Form.Item>
        <Form.Item
          label={'Дата создания'}
          name={'viewDate'}
          rules={[
            {
              required: true,
            }
          ]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label={'Опубликовать?'}
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
    </Create>
  )
}