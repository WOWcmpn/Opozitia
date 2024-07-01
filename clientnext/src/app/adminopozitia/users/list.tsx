import React from 'react';
import { INews, ISearchUsers, IUsers } from '@/app/adminopozitia/interfaces';
import {
  useTable,
  DeleteButton,
  EditButton,
  FilterDropdown,
  getDefaultSortOrder,
  List,
  SaveButton,
  ShowButton,
  TagField, BooleanField,
} from '@refinedev/antd';
import { HttpError } from '@refinedev/core';
import { Form, Input, Radio, Space, Table } from 'antd';

export const UsersList: React.FC = () => {
  const { tableProps, searchFormProps, sorter } = useTable<IUsers, HttpError, ISearchUsers>({
    onSearch: (values) => {
      return [
        {
          field: "login",
          operator: 'contains',
          value: values.login
        }
      ]
    },
    sorters: {
      initial: [
        {
          field: "createdAt",
          order: "desc"
        }
      ]
    }
  });

  const TrueIcon = () => <span>✅</span>;
  const FalseIcon = () => <span>❌</span>;

  return (
    <List>
      <Form {...searchFormProps} layout={'inline'}>
        <Form.Item name={"login"}>
          <Input placeholder={'Поиск по логину'} />
        </Form.Item>
        <SaveButton onClick={searchFormProps.form?.submit} />
      </Form>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="login"
          title="Логин"
        />
        <Table.Column
          dataIndex="email"
          title="Почта"
        />
        <Table.Column
          dataIndex="location"
          title="Местонахождение"
        />
        <Table.Column
          dataIndex={"favoriteNewsCategory"}
          title={"Любимая категория новостей"}
          render={(value: string) => <TagField value={value} />}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Radio.Group>
                <Radio value={"Бизнес"}>Бизнес</Radio>
                <Radio value={"Экономика"}>Экономика</Radio>
                <Radio value={"Политика"}>Политика</Radio>
                <Radio value={"Мир"}>Мир</Radio>
                <Radio value={"Неизвестно"}>Неизвестно</Radio>
              </Radio.Group>
            </FilterDropdown>
          )}
        />
        <Table.Column
          dataIndex="isConfirmed"
          title="Подтверждён"
          render={(value) => (
            <BooleanField
              value={value === true}
              trueIcon={<TrueIcon/>}
              falseIcon={<FalseIcon />}
              valueLabelTrue={'true'}
              valueLabelFalse={'false'}
            />
          )}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Radio.Group>
                <Radio value={'true'}>Подтвержден</Radio>
                <Radio value={'false'}>Не подтвержден</Radio>
              </Radio.Group>
            </FilterDropdown>
          )}
        />
        <Table.Column
          dataIndex="age"
          title="Дата рождения"
        />
        <Table.Column
          dataIndex="createdAt"
          title="Дата создания"
          sorter={{ multiple: 1 }}
          width={200}
          defaultSortOrder={getDefaultSortOrder("createdAt", sorter)}
        />
        <Table.Column<INews>
          title={'Действия'}
          dataIndex={'actions'}
          width={150}
          render={(_text, record): React.ReactNode => {
            return (
              <Space>
                <ShowButton size={'small'} recordItemId={record.id} hideText />
                <EditButton size={'small'} recordItemId={record.id} hideText />
                <DeleteButton size={'small'} recordItemId={record.id} hideText />
              </Space>
            )
          }}
        />
      </Table>
    </List>
  )
}