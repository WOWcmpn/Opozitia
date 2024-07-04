'use client';
import { useState, useEffect } from 'react';

export default function DelayWrapper({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) {
    return (
      <span className={'font-bold text-xl'}>Подсчитываем голоса...</span>
    )
  } else {
    return children;
  }
}
