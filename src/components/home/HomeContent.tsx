'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { 
  IconMenu2
} from '@tabler/icons-react';
import { Drawer } from 'antd';
import SmallSider from './SmallSider';

export default function HomeContent() {
  const t = useTranslations('Index');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeStatus, setActiveStatus] = useState('All');
  const [isBillingDrawerOpen, setIsBillingDrawerOpen] = useState(false);
  const [billingMode, setBillingMode] = useState('All');

  const categories = [
    { key: 'All', label: t('All') },
    { key: 'Digital', label: t('Digital') },
    { key: 'Clothing', label: t('Clothing') },
    { key: 'Life', label: t('Life') },
    { key: 'Uncategorized', label: t('Uncategorized') },
  ];

  const statuses = [
    { key: 'All', label: t('All') },
    { key: 'InService', label: t('InService') },
    { key: 'Idle', label: t('Idle') },
    { key: 'Retired', label: t('Retired') },
    { key: 'Sold', label: t('Sold') },
  ];

  const billingModes = [
    { key: 'All', label: t('All') },
    { key: 'ByDay', label: t('ByDay') },
    { key: 'ByTime', label: t('ByTime') },
  ];

  const items = [
    { label: t('InService'), count: 0, color: 'var(--ui-blue)' },
    { label: t('Retired'), count: 0, color: 'var(--ui-gray)' },
    { label: t('Sold'), count: 0, color: 'var(--ui-red)' },
  ];
  return (
    <div className="flex flex-col pb-24 w-full pt-4">
      {/* 资产总览卡片 */}
      <section 
        className="rounded-3xl p-6 mb-6 shadow-sm relative overflow-hidden"
        style={{ backgroundColor: 'var(--surface)' }}
      >
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-xl font-bold" style={{ color: 'var(--font-color)' }}>
            {t('AssetOverview')}
          </h2>
          <div 
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{ backgroundColor: 'var(--background)', color: 'var(--font-color-secondary)' }}
          >
            0/0
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-4">
          <div>
            <p className="text-sm mb-1" style={{ color: 'var(--font-color-secondary)' }}>
              {t('TotalAssets')}
            </p>
            <p className="text-3xl font-black" style={{ color: 'var(--font-color)' }}>
              ¥0.00
            </p>
          </div>
          <div>
            <p className="text-sm mb-1" style={{ color: 'var(--font-color-secondary)' }}>
              {t('DailyCost')}
            </p>
            <p className="text-3xl font-black" style={{ color: 'var(--font-color)' }}>
              ¥0.00
            </p>
          </div>
        </div>

        <div className="pt-3 border-t border-dashed flex justify-between" style={{ borderColor: 'var(--border)' }}>
            {
              items.map((item)=>{
                return <SmallSider key={item.label} {...item} />
              })
            }
        </div>
      </section>

      {/* 分类和操作栏 */}
      <div className="flex items-center justify-between mb-1 overflow-x-auto no-scrollbar py-1">
        <div className="flex gap-2 shrink-0">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-2 py-1 rounded-xl text-sm font-bold transition-all ${
                activeCategory === cat.key 
                  ? 'shadow-sm' 
                  : ''
              }`}
              style={{
                backgroundColor: activeCategory === cat.key ? 'var(--primary)' : 'transparent',
                color: activeCategory === cat.key ? 'var(--primary-foreground)' : 'var(--font-color-secondary)',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <button 
          onClick={() => setIsBillingDrawerOpen(true)}
          className="p-1 rounded-xl transition-all active:scale-90 shrink-0"
          style={{ color: 'var(--font-color-secondary)' }}
        >
          <IconMenu2 size={24} stroke={1.5} />
        </button>
      </div>

      {/* 状态筛选 */}
      <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar py-1">
        {statuses.map((status) => (
          <button
            key={status.key}
            onClick={() => setActiveStatus(status.key)}
            className={`px-2.5 py-2 rounded-full text-sm transition-all shrink-0 ${
              activeStatus === status.key ? 'font-bold' : ''
            }`}
            style={{
              backgroundColor: activeStatus === status.key ? 'var(--font-color)' : 'var(--surface)',
              color: activeStatus === status.key ? 'var(--background)' : 'var(--font-color-secondary)',
            }}
          >
            {status.label}
          </button>
        ))}
      </div>

      {/* 空状态 */}
      <div className="flex-1 flex flex-col items-center justify-center py-20 opacity-40">
        <p className="text-lg font-medium" style={{ color: 'var(--font-color-secondary)' }}>
          {t('NoAssets')}
        </p>
      </div>

      {/* 计费方式选择抽屉 */}
      <Drawer
        title={<span style={{ marginLeft: '-15px' }}>{t('BillingMode')}</span>}
        placement="bottom"
        onClose={() => setIsBillingDrawerOpen(false)}
        open={isBillingDrawerOpen}
        height="auto"
        styles={{
          header: { textAlign: 'center', borderBottom: 'none', paddingTop: '24px' },
          body: { padding: '12px 16px', backgroundColor: 'var(--background)' }
        }}
      >
        <div className="flex flex-col gap-2">
          {billingModes.map(mode => (
            <div 
              key={mode.key}
              className="flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all active:scale-95"
              onClick={() => {
                setBillingMode(mode.key);
                setIsBillingDrawerOpen(false);
              }}
              style={{
                backgroundColor: billingMode === mode.key ? 'var(--primary)' : 'var(--surface)',
                boxShadow: billingMode === mode.key ? '0 4px 12px var(--border)' : 'none',
              }}
            >
              <span 
                className={`text-sm ${billingMode === mode.key ? 'font-bold' : ''}`} 
                style={{ color: billingMode === mode.key ? 'var(--primary-foreground)' : 'var(--font-color)' }}
              >
                {mode.label}
              </span>
            </div>
          ))}
        </div>
      </Drawer>
    </div>
  );
}
