'use client';

import BackButton from '@/components/BackButton';

export default function AddItemPage() {
  return (
    <>
      <BackButton />
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-2xl font-bold">添加物品页</h1>
        <p className="mt-4">录入新资产</p>
      </main>
    </>
  );
}

