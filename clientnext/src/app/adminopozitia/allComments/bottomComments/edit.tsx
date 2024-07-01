import React from 'react';
import { Edit, useForm } from '@refinedev/antd';
import { IBottomComments } from '@/app/adminopozitia/interfaces';
import { Form, Input } from 'antd';

export const BottomCommentsEdit: React.FC = () => {
  const {formProps, saveButtonProps, queryResult} = useForm<IBottomComments>({
    warnWhenUnsavedChanges: true,
  })

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout={'vertical'}>
        <Form.Item
          label={'Ответ к комментарию'}
          name={'text'}
          rules={[
            {
              required: true,
              min: 5,
              max: 1000
            }
          ]}
        >
          <Input placeholder={'Напишите ответ к комментарию'} />
        </Form.Item>
      </Form>
    </Edit>
  )
}