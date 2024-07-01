"use client"
import React from 'react';
import {
  useTable,
  DeleteButton,
  EditButton,
  getDefaultSortOrder,
  List,
  SaveButton,
  ShowButton,
} from '@refinedev/antd';
import { Form, Input, Space, Table } from 'antd';
import { IComments, INews, ISearchComments } from '@/app/adminopozitia/interfaces';
import { HttpError } from '@refinedev/core';

export default function CommentsList(){
  const { tableProps, searchFormProps, sorter } = useTable<IComments, HttpError, ISearchComments>({
    onSearch: (values) => {
      return [
        {
          field: "text",
          operator: 'contains',
          value: values.text
        },
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

  return (
    <List>
      <Form {...searchFormProps} layout={'inline'}>
        <Form.Item name={"text"}>
          <Input placeholder={'Поиск по тексту'} />
        </Form.Item>
        <SaveButton onClick={searchFormProps.form?.submit} />
      </Form>
      <Form {...searchFormProps} layout={'inline'} className={'mt-[10px] mb-[10px]'}>
        <Form.Item name={"login"}>
          <Input placeholder={'Поиск по никнейму'} />
        </Form.Item>
        <SaveButton onClick={searchFormProps.form?.submit} />
      </Form>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="text"
          title="Текст"
        />
        <Table.Column
          dataIndex="username"
          title="Автор"
        />
        <Table.Column
          dataIndex="viewDate"
          title="Дата публикации"
        />
        <Table.Column
          dataIndex="createdAt"
          title="Дата публикации (для сортировки)"
          sorter={{ multiple: 1 }}
          defaultSortOrder={getDefaultSortOrder("createdAt", sorter)}
          width={200}
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