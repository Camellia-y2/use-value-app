'use client';

import { useRef, type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from './index';
import React from 'react';

export default function StoreProvider({
  children,
}: {
  children: ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null); // 初始化为 null，不要用 undefined

  if (!storeRef.current) {
    // 只有在 store 不存在时才创建（保证客户端单例）
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
