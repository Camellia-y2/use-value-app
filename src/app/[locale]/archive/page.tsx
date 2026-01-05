'use client';

import { useTranslations } from 'next-intl';
import { IconChevronRight } from '@tabler/icons-react';

export default function ArchivePage() {
  const t = useTranslations('Index');

  const milestones = [
    { id: 'first_drain', title: '初榨者', icon: '🌱', threshold: 0 },
    { id: 'thousand_yuan', title: '千元榨取者', icon: '💰', threshold: 1000 },
  ];

  const currentMilestone = milestones[0];
  const nextMilestone = milestones[1];
  const progress = 0; // 模拟进度

  return (
    <main className="flex min-h-screen flex-col p-4 pb-24" style={{ backgroundColor: 'var(--background)' }}>
      {/* 顶部成就卡片 */}
      <section 
        className="rounded-3xl p-6 mb-8 shadow-lg relative overflow-hidden"
        style={{ backgroundColor: 'var(--primary)' }}
      >
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{currentMilestone.icon}</span>
            <span className="text-xl font-bold" style={{ color: 'var(--primary-foreground)' }}>
              {currentMilestone.title}
            </span>
          </div>
          <div className="flex items-center gap-1 opacity-60 cursor-pointer">
            <span className="text-xs" style={{ color: 'var(--primary-foreground)' }}>点击查看详情</span>
            <IconChevronRight size={14} style={{ color: 'var(--primary-foreground)' }} />
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm opacity-70 mb-1" style={{ color: 'var(--primary-foreground)' }}>
            {t('DrainedValue')}
          </p>
          <p className="text-4xl font-black" style={{ color: 'var(--primary-foreground)' }}>
            ¥0.00
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <p className="text-xs opacity-80" style={{ color: 'var(--primary-foreground)' }}>
              {t('NextMilestone', { title: nextMilestone.title })}
            </p>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
            <div 
              className="h-full rounded-full transition-all duration-500" 
              style={{ backgroundColor: 'rgba(255,255,255,0.4)', width: `${progress}%` }}
            />
          </div>
          <p className="text-[10px] opacity-60" style={{ color: 'var(--primary-foreground)' }}>
            {t('StillNeed', { value: '¥1000.00' })}
          </p>
        </div>
      </section>

      {/* 物品分类展示 */}
      <div className="space-y-10">
        <section>
          <div className="flex items-center gap-2 mb-4 px-1">
            <div className="w-3.5 h-3.5 rounded-full bg-blue-600 shadow-sm" />
            <h3 className="font-bold" style={{ color: 'var(--font-color)' }}>
              {t('RetiredItems')} <span className="text-gray-400 font-normal ml-1">(0)</span>
            </h3>
          </div>
          <div className="flex flex-col items-center justify-center py-12 opacity-30">
            <p className="text-sm" style={{ color: 'var(--font-color-secondary)' }}>{t('NoRetired')}</p>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4 px-1">
            <div className="w-3.5 h-3.5 rounded-full bg-red-600 shadow-sm" />
            <h3 className="font-bold" style={{ color: 'var(--font-color)' }}>
              {t('SoldItems')} <span className="text-gray-400 font-normal ml-1">(0)</span>
            </h3>
          </div>
          <div className="flex flex-col items-center justify-center py-12 opacity-30">
            <p className="text-sm" style={{ color: 'var(--font-color-secondary)' }}>{t('NoSold')}</p>
          </div>
        </section>
      </div>
    </main>
  );
}
