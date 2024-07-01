import React from 'react';
import { Edit, useForm } from '@refinedev/antd';
import { IComments } from '@/app/adminopozitia/interfaces';
import { Form, Input } from 'antd';

export const CommentsEdit: React.FC = () => {
  const {formProps, saveButtonProps, queryResult} = useForm<IComments>({
    warnWhenUnsavedChanges: true,
  })

  return(
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout={'vertical'}>
        <Form.Item
          label={'Комментарий'}
          name={'text'}
          rules={[
            {
              required: true,
              min: 5,
              max: 1000
            }
          ]}
        >
          <Input placeholder={'Напишите комментарий'} />
        </Form.Item>
      </Form>
    </Edit>
  )
}