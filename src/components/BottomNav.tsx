'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Button } from 'antd';
import { 
  IconHomeFilled, 
  IconArchiveFilled, 
  IconChartPie2Filled, 
  IconSettingsFilled,
  IconPlus,
  IconMessageFilled
} from '@tabler/icons-react';
import { path } from '@/lib/paths';

export default function BottomNav() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  // 判断是否应该隐藏底部导航栏（搜索页和添加页不显示）
  const shouldHideNav = () => {
    const searchPath = path(locale, 'search');
    const addPath = path(locale, 'add');
    return pathname.startsWith(searchPath) || pathname.startsWith(addPath);
  };

  // 如果应该隐藏，直接返回 null
  if (shouldHideNav()) {
    return null;
  }

  // 获取当前激活的 key
  const getActiveKey = () => {
    const homePath = path(locale);
    if (pathname === homePath || pathname === `${homePath}/`) {
      return homePath;
    }
    const navPaths = [
      path(locale, 'archive'),
      path(locale, 'ai'),
      path(locale, 'stats'),
      path(locale, 'settings'),
      path(locale, 'add'),
    ];
    for (const navPath of navPaths) {
      if (pathname.startsWith(navPath)) {
        return navPath;
      }
    }
    return '';
  };

  const activeKey = getActiveKey();

  const tabs = [
    {
      key: path(locale),
      icon: IconHomeFilled,
    },
    {
      key: path(locale, 'archive'),
      icon: IconArchiveFilled,
    },
    {
      key: path(locale, 'ai'),
      icon: IconMessageFilled,
    },
    {
      key: path(locale, 'stats'),
      icon: IconChartPie2Filled,
    },
    {
      key: path(locale, 'settings'),
      icon: IconSettingsFilled,
    },
  ];

  const handleChange = (newValue: string) => {
    router.push(newValue);
  };

  return (
    <>
      <div className="fixed bottom-4 left-1 right-1 z-50 px-4 pb-safe">
        <div className="relative mx-auto">
          <div 
            className="relative overflow-hidden rounded-full border-2 flex items-center justify-between p-1"
            style={{ 
              backgroundColor: 'var(--surface)', 
              width: '84%',
              height: '65px',
              borderColor: 'transparent',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.01), 0 2px 4px rgba(0, 0, 0, 0.02), 0 -4px 6px rgba(0, 0, 0, 0.01), 0 -2px 4px rgba(0, 0, 0, 0.01)'
            }}
          >
            {/* 所有导航项 */}
            {tabs.map((item) => {
              const Icon = item.icon;
              const isActive = activeKey === item.key;
              
              return (
                <Button
                  key={item.key}
                  type="text"
                  onClick={() => handleChange(item.key)}
                  className="flex items-center justify-center flex-1 h-[52px] rounded-[30px] transition-all p-1"
                  style={{
                    backgroundColor: isActive ? 'var(--background)' : 'transparent',
                    color: isActive 
                      ? 'var(--font-color)' 
                      : 'var(--font-color-secondary)',
                  }}
                  icon={<Icon className="w-6 h-6" strokeWidth={2.5} />}
                />
              );
            })}
          </div>
        </div>
      </div>
      {/* 添加按钮 - 大圆形，在导航栏右边 */}
      <Button
        type="primary"
        shape="circle"
        onClick={() => router.push(path(locale, 'add'))}
        className="fixed bottom-5 right-4 z-50 flex items-center justify-center transition-all active:scale-95"
        style={{
          width: 56,
          height: 56,
          backgroundColor: 'var(--primary)',
          color: 'var(--font-color)',
          boxShadow: '0 10px 15px -6px rgba(0, 0, 0, 0.15), 0 4px 6px rgba(0, 0, 0, 0.02)',
          border: 'none',
        }}
        icon={<IconPlus className="w-7 h-7" strokeWidth={2.5} />}
      />
    </>
  );
}