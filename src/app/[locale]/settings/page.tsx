'use client';

import { Switch } from 'antd';
import { IconSun, IconMoon } from '@tabler/icons-react';
import { useTheme } from '@/hooks/useTheme';

export default function SettingsPage() {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return null; // 防止服务端和客户端不一致
  }

  return (
    <main className="flex min-h-screen flex-col p-4">
      <h1 
        className="text-2xl font-bold mb-6"
        style={{ color: 'var(--font-color)' }}
      >
        设置
      </h1>
      
      <div 
        className="rounded-lg p-4 shadow-sm"
        style={{ 
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border)',
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {theme === 'light' ? (
              <IconSun className="w-5 h-5" style={{ color: 'var(--font-color)' }} />
            ) : (
              <IconMoon className="w-5 h-5" style={{ color: 'var(--font-color)' }} />
            )}
            <span style={{ color: 'var(--font-color)' }}>暗色主题</span>
          </div>
          <Switch
            checked={theme === 'dark'}
            onChange={toggleTheme}
            checkedChildren={<IconMoon className="w-3 h-3" />}
            unCheckedChildren={<IconSun className="w-3 h-3" />}
          />
        </div>
      </div>
    </main>
  );
}

