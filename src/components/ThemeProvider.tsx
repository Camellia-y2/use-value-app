'use client';

import { useEffect, useState } from 'react';
import { ConfigProvider, theme } from 'antd';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // 初始化主题
    const savedTheme = localStorage.getItem('theme');
    const root = document.documentElement;
    if (savedTheme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      setIsDark(true);
    } else {
      root.removeAttribute('data-theme');
      setIsDark(false);
    }

    // 监听主题变化
    const observer = new MutationObserver(() => {
      const currentTheme = root.getAttribute('data-theme');
      setIsDark(currentTheme === 'dark');
    });

    observer.observe(root, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: isDark ? '#1677ff' : '#b1f641',
          colorBgContainer: isDark ? '#171717' : '#ffffff',
          colorBgBase: isDark ? '#0a0a0a' : '#f4f5fb',
          colorText: isDark ? '#ededed' : '#000000',
          colorTextSecondary: isDark ? '#9ca3af' : '#616767',
          colorBorder: isDark ? '#262626' : '#e5e8eb70',
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}

