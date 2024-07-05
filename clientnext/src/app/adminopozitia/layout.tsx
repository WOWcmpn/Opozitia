"use client"
import { Refine } from "@refinedev/core";
import {
  useNotificationProvider,
  RefineThemes
} from "@refinedev/antd";
import routerProvider from "@refinedev/nextjs-router";
import dataProvider from '@refinedev/simple-rest';
import { ConfigProvider, App as AntdApp } from 'antd';
import "@refinedev/antd/dist/reset.css";
import { Suspense } from 'react';

const API_URL = "https://opozitia-server.vercel.app";

export default function RootLayout({ children }:
  Readonly<{
  children: React.ReactNode; }>
) {
  return (
    <html lang={'en'}>
    <body>
    <Suspense>
      <ConfigProvider theme={RefineThemes.Blue}>
      <AntdApp>
      <Refine
        dataProvider={dataProvider(API_URL)}
        routerProvider={routerProvider}
        resources={[
          {
            name: "allNews",
            meta: {
              label: 'Новости и события'
            }
          },
          {
            name: "news",
            meta: {
              label: 'Новости',
              canDelete: true,
              parent: "allNews"
            },
            list: '/adminopozitia/allNews/news',
            show: '/adminopozitia/allNews/news/show/:id',
            edit: "/adminopozitia/allNews/news/edit/:id",
            create: '/adminopozitia/allNews/news/create',
          },
          {
            name: "daysEvent",
            meta: {
              label: 'События дня',
              canDelete: true,
              parent: "allNews"
            },
            list: '/adminopozitia/allNews/daysEvent',
            show: '/adminopozitia/allNews/daysEvent/show/:id',
            edit: "/adminopozitia/allNews/daysEvent/edit/:id",
            create: '/adminopozitia/allNews/daysEvent/create',
          },
          {
            name: "users",
            meta: {
              label: 'Пользователи',
              canDelete: true
            },
            list: '/adminopozitia/users',
            show: '/adminopozitia/users/show/:id',
            edit: "/adminopozitia/users/edit/:id",
            create: '/adminopozitia/users/create',
          },
          {
            name: "allComments",
            meta: {
              label: "Комментарии"
            },
          },
          {
            name: "comments",
            meta: {
              label: 'Основные комментарии',
              canDelete: true,
              parent: 'allComments'
            },
            list: '/adminopozitia/allComments/comments',
            show: '/adminopozitia/allComments/comments/show/:id',
            edit: '/adminopozitia/allComments/comments/edit/:id',
          },
          {
            name: "bottomComments",
            meta: {
              label: 'Ответы к комментариям',
              canDelete: true,
              parent: 'allComments'
            },
            list: '/adminopozitia/allComments/bottomComments',
            show: '/adminopozitia/allComments/bottomComments/show/:id',
            edit: "/adminopozitia/allComments/bottomComments/edit/:id",
          },
        ]}
        notificationProvider={useNotificationProvider}
        options={{
          syncWithLocation: true,
          warnWhenUnsavedChanges: true,
          useNewQueryKeys: true,
        }}
      >
        {children}
        {/*<UnsavedChangesNotifier />*/}
        {/*<DocumentTitleHandler />*/}
      </Refine>
      </AntdApp>
      </ConfigProvider>
    </Suspense>
    </body>
    </html>
  )
}