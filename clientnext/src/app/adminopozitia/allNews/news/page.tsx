"use client"
import {
  EditButton,
  List,
  ShowButton,
  useTable,
  DeleteButton, FilterDropdown, SaveButton, getDefaultSortOrder, TagField,
} from '@refinedev/antd';
import { Form, Input, Radio, Space, Table } from 'antd';
import { INews, ISearchNews } from '@/app/adminopozitia/interfaces';
import React from 'react';
import { HttpError } from "@refinedev/core";

export default function NewsList(){
  const { tableProps, searchFormProps, sorter } = useTable<INews, HttpError, ISearchNews>({
    syncWithLocation: true,
    resource: 'news',
    onSearch: (values) => {
      return [
        {
          field: "title",
          operator: 'contains',
          value: values.title
        },
        {
          field: "id",
          operator: 'contains',
          value: values.id
        },
      ]
    },
    sorters: {
      initial: [
        {
          field: "createdAtDate",
          order: "desc"
        }
      ]
    }
  });

  return (
    <List>
      <Form {...searchFormProps} layout={'inline'}>
        <Form.Item name={"title"}>
          <Input placeholder={'Поиск по заголовку'} />
        </Form.Item>
        <SaveButton onClick={searchFormProps.form?.submit} />
      </Form>
      <Form {...searchFormProps} layout={'inline'} className={'mt-[10px] mb-[10px]'}>
        <Form.Item name={"id"}>
          <Input placeholder={'Поиск по айди'} />
        </Form.Item>
        <SaveButton onClick={searchFormProps.form?.submit} />
      </Form>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="title"
          title="Заголовок"
        />
        <Table.Column dataIndex="viewDate" title="Дата создания" />
        <Table.Column
          dataIndex="createdAtDate"
          title="Дата создания (для сортировки)"
          sorter={{ multiple: 1 }}
          width={200}
          defaultSortOrder={getDefaultSortOrder("createdAtDate", sorter)}
        />
        <Table.Column
          dataIndex={"category"}
          title={"Категория"}
          render={(value: string) => <TagField value={value} />}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Radio.Group>
                <Radio value={"Business"}>Бизнес</Radio>
                <Radio value={"Economy"}>Экономика</Radio>
                <Radio value={"Policy"}>Политика</Radio>
                <Radio value={"World"}>Мир</Radio>
              </Radio.Group>
            </FilterDropdown>
          )}
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
  );
};