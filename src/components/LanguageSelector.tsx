'use client';

import { useState } from 'react';
import { Drawer, List } from 'antd';
import { IconChevronDown, IconCheck } from '@tabler/icons-react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

const languages = [
  { code: 'zh', name: '简体中文' },
  { code: 'en', name: 'English' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' },
  { code: 'zh-TW', name: '繁體中文' },
];

export default function LanguageSelector() {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('Languages');

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  const handleLanguageChange = (newLocale: string) => {
    setOpen(false);
    // 获取当前路径（去掉 locale 前缀）
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    // 确保路径以 / 开头
    const targetPath = pathWithoutLocale.startsWith('/') ? pathWithoutLocale : `/${pathWithoutLocale}`;
    // 跳转到新语言对应的路径
    router.push(`/${newLocale}${targetPath}`);
    router.refresh(); // 刷新页面以加载新的语言包
  };

  return (
    <>
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <span style={{ color: 'var(--font-color)' }}>
          {t(currentLanguage.code as any) || currentLanguage.name}
        </span>
        <IconChevronDown className="w-4 h-4" style={{ color: 'var(--font-color-secondary)' }} />
      </div>
      <Drawer
        title={t(currentLanguage.code as any) || currentLanguage.name}
        placement="bottom"
        onClose={() => setOpen(false)}
        open={open}
        height="auto"
        styles={{
          body: {
            padding: 0,
          },
        }}
      >
        <List
          dataSource={languages}
          renderItem={(item) => (
            <List.Item
              className="cursor-pointer px-4 py-3 transition-colors"
              onClick={() => handleLanguageChange(item.code)}
              style={{
                backgroundColor: locale === item.code ? 'var(--surface)' : 'transparent',
              }}
            >
              <div className="flex items-center justify-between w-full">
                <span style={{ color: 'var(--font-color)' }}>
                  {t(item.code as any) || item.name}
                </span>
                {locale === item.code && (
                  <IconCheck className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                )}
              </div>
            </List.Item>
          )}
        />
      </Drawer>
    </>
  );
}

