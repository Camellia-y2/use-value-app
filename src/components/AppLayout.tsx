'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import TopNav from '@/components/TopNav';
import BottomNav from '@/components/BottomNav';
import { useTranslations, useLocale } from 'next-intl';
import { path } from '@/lib/paths';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const t = useTranslations('Index');
  const locale = useLocale();
  const pathname = usePathname();

  // 判断是否是首页
  const isHomePage = () => {
    const homePath = path(locale);
    return pathname === homePath || pathname === `${homePath}/`;
  };

  // 判断是否应该隐藏标题（搜索页、AI页、添加页）
  const shouldHideTitle = () => {
    const searchPath = path(locale, 'search');
    const aiPath = path(locale, 'ai');
    const addPath = path(locale, 'add');
    return pathname.startsWith(searchPath) || pathname.startsWith(aiPath) || pathname.startsWith(addPath);
  };

  // 根据当前路径获取标题
  const getPageTitle = () => {
    const homePath = path(locale);
    const archivePath = path(locale, 'archive');
    const statsPath = path(locale, 'stats');
    const settingsPath = path(locale, 'settings');

    if (pathname === homePath || pathname === `${homePath}/`) {
      return t('AppTitle');
    } else if (pathname.startsWith(archivePath)) {
      return t('ArchiveTitle');
    } else if (pathname.startsWith(statsPath)) {
      return t('StatsTitle');
    } else if (pathname.startsWith(settingsPath)) {
      return t('SettingsTitle');
    }
    return t('AppTitle');
  };

  return (
    <>
      <div 
        className="pb-20 p-4 relative" 
        style={{
          backgroundColor: 'var(--background)',
          color: 'var(--font-color)',
        }}
      >
        {/* 首页渐变背景 */}
        {isHomePage() && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '40vh',
              background: 'linear-gradient(to bottom, #b1f641, rgba(177, 246, 65, 0.3), var(--background))',
              zIndex: 0,
            }}
          />
        )}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {!shouldHideTitle() && (
            <div className="flex flex-row items-center gap-2">
              <h1 
                className="ml-4 mt-4 font-bold text-[1.9rem]"
                style={{
                  color: 'var(--font-color)',
                  fontFamily: 'var(--font-family-title)'
                }}
              >
                {getPageTitle()}
              </h1>
              <TopNav />
            </div>
          )}
          {children}
        </div>
      </div>
      <BottomNav />
    </>
  );
}

