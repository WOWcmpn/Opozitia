"use client"
import { Refine } from "@refinedev/core";
import {
  useNotificationProvider,
  ThemedLayoutV2,
  ErrorComponent,
  RefineThemes
} from "@refinedev/antd";
import routerProvider, {
  NavigateToResource,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import dataProvider from '@refinedev/simple-rest';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { NewsCreate, NewsEdit, NewsList, NewsShow } from '@/app/adminopozitia/allNews/news';
import { DaysEventCreate, DaysEventEdit, DaysEventList, DaysEventShow } from '@/app/adminopozitia/allNews/daysEvent';
import { UsersCreate, UsersEdit, UsersList, UsersShow } from '@/app/adminopozitia/users';
import { CommentsEdit, CommentsList, CommentsShow } from '@/app/adminopozitia/allComments/comments';
import { BottomCommentsEdit, BottomCommentsList, BottomCommentsShow } from '@/app/adminopozitia/allComments/bottomComments';
import { ConfigProvider, App as AntdApp } from 'antd';
import "@refinedev/antd/dist/reset.css";

const API_URL = "http://localhost:4000";

export default function Home() {
  return (
    <BrowserRouter>
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
      }}
    >
      <Routes>
        <Route
          path={'/adminopozitia'}
          element={
            <ThemedLayoutV2>
              <Outlet />
            </ThemedLayoutV2>
          }
        >
          <Route index element={<NavigateToResource />} />
          <Route path="allNews/news" element={<NewsList />} />
          <Route path="allNews/news/show/:id" element={<NewsShow />} />
          <Route path="allNews/news/edit/:id" element={<NewsEdit />} />
          <Route path="allNews/news/create" element={<NewsCreate />} />
          <Route path="*" element={<ErrorComponent />} />
        </Route>
        <Route
          path={'/adminopozitia'}
          element={
            <ThemedLayoutV2>
              <Outlet />
            </ThemedLayoutV2>
          }
        >
          <Route index element={<NavigateToResource />} />
          <Route path="allNews/daysEvent" element={<DaysEventList />} />
          <Route path="allNews/daysEvent/show/:id" element={<DaysEventShow />} />
          <Route path="allNews/daysEvent/edit/:id" element={<DaysEventEdit />} />
          <Route path="allNews/daysEvent/create" element={<DaysEventCreate />} />
          <Route path="*" element={<ErrorComponent />} />
        </Route>
        <Route
          path={'/adminopozitia'}
          element={
            <ThemedLayoutV2>
              <Outlet />
            </ThemedLayoutV2>
          }
        >
          <Route index element={<NavigateToResource />} />
          <Route path="users" element={<UsersList />} />
          <Route path="users/show/:id" element={<UsersShow />} />
          <Route path="users/edit/:id" element={<UsersEdit />} />
          <Route path="users/create" element={<UsersCreate />} />
          <Route path="*" element={<ErrorComponent />} />
        </Route>
        <Route
          path={'/adminopozitia'}
          element={
            <ThemedLayoutV2>
              <Outlet />
            </ThemedLayoutV2>
          }
        >
          <Route index element={<NavigateToResource />} />
          <Route path="allComments/comments" element={<CommentsList />} />
          <Route path="allComments/comments/show/:id" element={<CommentsShow />} />
          <Route path="allComments/comments/edit/:id" element={<CommentsEdit />} />
          <Route path="*" element={<ErrorComponent />} />
        </Route>
        <Route
          path={'/adminopozitia'}
          element={
            <ThemedLayoutV2>
              <Outlet />
            </ThemedLayoutV2>
          }
        >
          <Route index element={<NavigateToResource />} />
          <Route path="allComments/bottomComments" element={<BottomCommentsList />} />
          <Route path="allComments/bottomComments/show/:id" element={<BottomCommentsShow />} />
          <Route path="allComments/bottomComments/edit/:id" element={<BottomCommentsEdit />} />
          <Route path="*" element={<ErrorComponent />} />
        </Route>
      </Routes>
      <UnsavedChangesNotifier />
      <DocumentTitleHandler />
    </Refine>
    </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  )
}