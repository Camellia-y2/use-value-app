'use client';

import { useState } from 'react';
import { Drawer } from 'antd';
import { IconChevronRight, IconCheck } from '@tabler/icons-react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

const languages = [
  { code: 'zh', name: '简体中文' },
  { code: 'en', name: 'English' },
  { code: 'zh-TW', name: '繁體中文' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' },
];

export default function LanguageSelector() {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('Languages');
  const ts = useTranslations('Settings');

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  // 处理语言切换，确保切换语言后仍停留在当前页
  const handleLanguageChange = (newLocale: string) => {
    setOpen(false);
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    const targetPath = pathWithoutLocale.startsWith('/') ? pathWithoutLocale : `/${pathWithoutLocale}`;
    router.push(`/${newLocale}${targetPath}`); // 跳转新语言的路径
    router.refresh(); // 强制刷新
  };

  return (
    <>
      <div 
        className="flex items-center gap-1 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <span style={{ color: 'var(--font-color-secondary)' }}>
          {t(currentLanguage.code as any) || currentLanguage.name}
        </span>
        <IconChevronRight size={18} style={{ color: 'var(--font-color-secondary)' }} />
      </div>

      <Drawer
        title={ts('SelectLanguage')}
        placement="bottom"
        onClose={() => setOpen(false)}
        open={open}
        height="auto"
        styles={{
          header: {
            textAlign: 'center',
            borderBottom: 'none',
            paddingTop: '24px',
          },
          body: {
            padding: '12px 16px 32px 16px',
            backgroundColor: 'var(--background)',
          },
        }}
      >
        <div className="flex flex-col gap-3">
          {languages.map((item) => (
            <div
              key={item.code}
              className="flex items-center justify-between p-5 rounded-2xl cursor-pointer transition-all active:scale-95"
              onClick={() => handleLanguageChange(item.code)}
              style={{
                backgroundColor: locale === item.code ? 'var(--surface)' : 'transparent',
                boxShadow: locale === item.code ? '0 4px 12px var(--border)' : 'none',
              }}
            >
              <span 
                className={`text-lg ${locale === item.code ? 'font-bold' : ''}`}
                style={{ color: 'var(--font-color)' }}
              >
                {t(item.code as any) || item.name}
              </span>
              {locale === item.code && (
                <IconCheck size={20} style={{ color: 'var(--primary)' }} />
              )}
            </div>
          ))}
        </div>
      </Drawer>
    </>
  );
}
