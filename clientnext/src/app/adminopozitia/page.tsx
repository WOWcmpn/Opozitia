"use client"
import { Suspense } from 'react';
import { NavigateToResource } from "@refinedev/nextjs-router";

export default function Home() {
  return(
    <Suspense>
      <NavigateToResource />
    </Suspense>
  )
}