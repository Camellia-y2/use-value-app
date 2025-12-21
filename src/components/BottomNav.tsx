'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { BottomNavigation, BottomNavigationAction, Fab } from '@mui/material';
import Link from 'next/link';
import { 
  IconHomeFilled, 
  IconArchiveFilled, 
  IconChartPie2Filled, 
  IconSettingsFilled,
  IconPlus 
} from '@tabler/icons-react';
import { path } from '@/lib/paths';

export default function BottomNav() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  // 判断是否应该隐藏底部导航栏（搜索页、AI页和添加页不显示）
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

  // 获取当前激活的 key
  const getActiveKey = () => {
    const homePath = path(locale);
    if (pathname === homePath || pathname === `${homePath}/`) {
      return homePath;
    }
    const navPaths = [
      path(locale, 'archive'),
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
      key: path(locale, 'stats'),
      icon: IconChartPie2Filled,
    },
    {
      key: path(locale, 'settings'),
      icon: IconSettingsFilled,
    },
  ];

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    router.push(newValue);
  };

  return (
    <div>
    <div className="fixed bottom-4 left-1 right-1 z-50 px-4 pb-safe">
      <div className="relative  mx-auto">
        <div 
          className="relative overflow-hidden rounded-full border-2"
          style={{ 
            backgroundColor: 'var(--surface)', 
            width: '83%',
            borderColor: 'transparent',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.01), 0 2px 4px rgba(0, 0, 0, 0.02), 0 -4px 6px rgba(0, 0, 0, 0.01), 0 -2px 4px rgba(0, 0, 0, 0.01)'
          }}
        >
          <BottomNavigation
            value={activeKey}
            onChange={handleChange}
            sx={{
              padding: '4px',
              width: '100%',
              height: '60px',
              position: 'relative',
              display: 'flex',
              justifyContent: 'flex-start',
              gap: '4px',
              '& .MuiBottomNavigationAction-root': {
                padding: '4px 8px',
                width: '78px',
                height: '52px',
                borderRadius: '30px',
                transition: 'all 0.2s',
                minWidth: 'auto',
                flex: '0 1 auto',
                '&.Mui-selected': {
                  backgroundColor: 'var(--background)',
                },
                '& .MuiBottomNavigationAction-label': {
                  display: 'none !important',
                },
              },
            }}
          >
            {/* 所有导航项 */}
            {tabs.map((item) => {
              const Icon = item.icon;
              const isActive = activeKey === item.key;
              
              return (
                <BottomNavigationAction
                  key={item.key}
                  value={item.key}
                  label=""
                  icon={
                    <Icon
                      style={{
                        color: isActive 
                          ? 'var(--font-color)' 
                          : 'var(--font-color-secondary)',
                      }}
                    />
                  }
                />
              );
            })}
          </BottomNavigation>
        </div>
      </div>
    </div>
     {/* 添加按钮 - 大圆形，在导航栏右边 */}
     <Fab
       onClick={() => router.push(path(locale, 'add'))}
       sx={{
         position: 'fixed',
         bottom: '20px',
         right: '16px',
         width: 56,
         height: 56,
         color: 'var(--font-color)',
         backgroundColor: activeKey === path(locale, 'add') 
           ? 'var(--primary)' 
           : 'var(--primary)',
         boxShadow: '0 10px 15px -6px rgba(0, 0, 0, 0.15), 0 4px 6px rgba(0, 0, 0, 0.02)',
         zIndex: 50,
       }}
     >
       <IconPlus className="w-7 h-7" strokeWidth={2.5} />
     </Fab>
   </div>
  );
}