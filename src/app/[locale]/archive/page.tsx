import { getTranslations } from 'next-intl/server';

export default async function ArchivePage() {
  const t = await getTranslations('Index');
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-2xl font-bold" style={{ color: 'var(--font-color)' }}>
        {t('ArchivePageTitle')}
      </h1>
      <p className="mt-4" style={{ color: 'var(--font-color-secondary)' }}>
        {t('ArchivePageDesc')}
      </p>
    </main>
  );
}

