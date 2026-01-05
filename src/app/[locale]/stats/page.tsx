'use client';

import { useTranslations } from 'next-intl';
import { IconArrowDownRight } from '@tabler/icons-react';

export default function StatsPage() {
  const t = useTranslations('Index');

  const categories = [
    { key: 'DigitalProduct', label: t('DigitalProduct'), ratio: 0, color: 'var(--ui-green)' },
    { key: 'ClothingBag', label: t('ClothingBag'), ratio: 0, color: 'var(--ui-yellow)' },
    { key: 'Other', label: t('Other'), ratio: 0, color: 'var(--ui-red)' },
  ];

  return (
    <main className="flex min-h-screen flex-col p-4 pb-24" style={{ backgroundColor: 'var(--background)' }}>
      {/* 日均成本大卡片 */}
      <section 
        className="rounded-3xl p-6 mb-6 shadow-sm"
        style={{ backgroundColor: 'var(--surface-foreground)', color: 'white' }}
      >
        <p className="text-sm opacity-60 mb-2">{t('AvgDailyCost')}</p>
        <p className="text-4xl font-black mb-6">¥0.00</p>
        
        <div 
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl w-fit text-xs font-bold"
          style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'var(--primary)' }}
        >
          <IconArrowDownRight size={14} stroke={3} />
          {t('Stable')}
        </div>
      </section>

      {/* 基础数据卡片组 */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div 
          className="rounded-3xl p-6 shadow-sm"
          style={{ backgroundColor: 'var(--surface)' }}
        >
          <p className="text-xs mb-2" style={{ color: 'var(--font-color-secondary)' }}>{t('TotalValue')}</p>
          <p className="text-2xl font-black" style={{ color: 'var(--font-color)' }}>¥0</p>
        </div>
        <div 
          className="rounded-3xl p-6 shadow-sm"
          style={{ backgroundColor: 'var(--surface)' }}
        >
          <p className="text-xs mb-2" style={{ color: 'var(--font-color-secondary)' }}>{t('ActiveCount')}</p>
          <p className="text-2xl font-black" style={{ color: 'var(--font-color)' }}>0</p>
        </div>
      </div>

      {/* 支出占比 */}
      <section 
        className="rounded-3xl p-6 mb-6 shadow-sm"
        style={{ backgroundColor: 'var(--surface)' }}
      >
        <h3 className="text-lg font-bold mb-6" style={{ color: 'var(--font-color)' }}>{t('SpendingRatio')}</h3>
        <div className="space-y-6">
          {categories.map((cat) => (
            <div key={cat.key} className="space-y-2">
              <div className="flex justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span style={{ color: 'var(--font-color)' }}>{cat.label}</span>
                </div>
                <span className="font-bold" style={{ color: 'var(--font-color)' }}>{cat.ratio}%</span>
              </div>
              <div className="h-1.5 rounded-full" style={{ backgroundColor: 'var(--background)' }}>
                <div 
                  className="h-full rounded-full transition-all duration-500"
                  style={{ backgroundColor: cat.color, width: `${cat.ratio}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 年度趋势 */}
      <section 
        className="rounded-3xl p-6 shadow-sm flex-1 min-h-[300px]"
        style={{ backgroundColor: 'var(--surface)' }}
      >
        <h3 className="text-lg font-bold mb-10" style={{ color: 'var(--font-color)' }}>{t('YearlyTrend')}</h3>
        <div className="flex justify-between items-end h-40 px-2 mt-auto">
          {['7月', '8月', '9月', '10月', '11月', '12月'].map((month, idx) => (
            <div key={idx} className="flex flex-col items-center gap-4">
              <div 
                className="w-8 rounded-t-lg opacity-10"
                style={{ backgroundColor: 'var(--primary)', height: '10%' }}
              />
              <span className="text-[10px]" style={{ color: 'var(--font-color-secondary)' }}>{month}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
