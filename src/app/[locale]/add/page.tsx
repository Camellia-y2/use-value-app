'use client';

import BackButton from '@/components/BackButton';
import { useTranslations } from 'next-intl';

export default function AddItemPage() {
  const t = useTranslations('Index');
  
  return (
    <>
      <BackButton />
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--font-color)' }}>
          {t('AddPageTitle')}
        </h1>
        <p className="mt-4" style={{ color: 'var(--font-color-secondary)' }}>
          {t('AddPageDesc')}
        </p>
      </main>
    </>
  );
}

