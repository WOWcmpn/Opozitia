"use client"
import React from 'react';
import {
  EditButton,
  List,
  ShowButton,
  useTable,
  DeleteButton, SaveButton, getDefaultSortOrder,
  BooleanField,
  FilterDropdown,
} from '@refinedev/antd';
import { IDaysEvent, INews, ISearchNews } from '@/app/adminopozitia/interfaces';
import { HttpError } from "@refinedev/core";
import { Form, Input, Space, Table, Radio } from 'antd';

export default function DaysEventList(){
  const TrueIcon = () => <span>✅</span>;
  const FalseIcon = () => <span>❌</span>;

  const { tableProps, searchFormProps, sorter } = useTable<IDaysEvent, HttpError, ISearchNews>({
    resource: 'daysEvent',
    onSearch: (values) => {
      return [
        {
          field: "title",
          operator: 'contains',
          value: values.title
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
        <Form.Item name={"title"}>
          <Input placeholder={'Поиск по заголовку'} />
        </Form.Item>
        <SaveButton onClick={searchFormProps.form?.submit} />
      </Form>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="title"
          title="Заголовок"
        />
        <Table.Column
          dataIndex="viewDate"
          title="Дата создания"
        />
        <Table.Column
          dataIndex="createdAt"
          title="Дата создания (для сортировки)"
          sorter={{ multiple: 1 }}
          width={200}
          defaultSortOrder={getDefaultSortOrder("createdAt", sorter)}
        />
        <Table.Column
          dataIndex="isPublished"
          title="Опубликовано"
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
                <Radio value={'true'}>Опубликовано</Radio>
                <Radio value={'false'}>Не опубликовано</Radio>
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
  )
}