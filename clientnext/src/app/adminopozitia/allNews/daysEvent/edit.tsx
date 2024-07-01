import React from 'react';
import { Edit, useForm } from '@refinedev/antd';
import { INews } from '@/app/adminopozitia/interfaces';
import { Form, Input, Radio } from 'antd';

export const DaysEventEdit: React.FC = () => {
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
              max: 40
            }
          ]}
        >
          <Input placeholder={'День конституции ....'} />
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
    </Edit>
  )
}