import React from 'react';
import { Edit, useForm } from '@refinedev/antd';
import { IUsers } from '@/app/adminopozitia/interfaces';
import { DatePicker, Form, Input, Radio, Select } from 'antd';

export const UsersEdit: React.FC = () => {
  const {formProps, saveButtonProps, queryResult} = useForm<IUsers>({
    warnWhenUnsavedChanges: true,
  })

  return (
    <Edit saveButtonProps={saveButtonProps}>
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
          <Input placeholder={'Введите дату рождения'}/>
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
    </Edit>
  )
}