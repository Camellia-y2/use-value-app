'use client';

import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { IconSearch, IconBrain } from '@tabler/icons-react';
import Link from 'next/link';
import { Button } from 'antd';
import { path } from '@/lib/paths';

export default function TopNav() {
  const locale = useLocale();
  const pathname = usePathname();

  // 判断是否应该隐藏顶部导航栏
  const shouldHideNav = () => {
    const searchPath = path(locale, 'search');
    const aiPath = path(locale, 'ai');
    const addPath = path(locale, 'add');
    return pathname.startsWith(searchPath) || pathname.startsWith(aiPath) || pathname.startsWith(addPath);
  };

  // 如果应该隐藏，直接返回 null
  if (shouldHideNav()) {
    return null;
  }

  return (
    <div className="fixed right-4 z-50 flex justify-end items-center p-1 gap-1  w-full"
    style={{
      width: 95,
      height: 40,
      borderRadius: '20px',
      backgroundColor: 'var(--surface)',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.05), 0 -4px 6px -1px rgba(0, 0, 0, 0.02), 0 -2px 4px -1px rgba(0, 0, 0, 0.03)',
    }}
    >
      <Link href={path(locale, 'search')}>
        <Button
          type="text"
          className="flex items-center justify-center w-10 h-10 p-0 border-0 shadow-none"
          style={{
            color: 'var(--font-color)',
          }}
          icon={<IconSearch className="w-6 h-6" strokeWidth={2.5} />}
        />
      </Link>
      <Link href={path(locale, 'ai')}>
        <Button
          type="text"
          className="flex items-center justify-center w-10 h-10 p-0 border-0 shadow-none"
          style={{
            color: 'var(--ai-color)',
          }}
          icon={<IconBrain className="w-6 h-6" strokeWidth={2.5} />}
        />
      </Link>
    </div>
  );
}

