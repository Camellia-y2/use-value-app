'use client';

import { useRouter } from 'next/navigation';
import { IconArrowLeft } from '@tabler/icons-react';
import { Button } from 'antd';

export default function BackButton() {
  const router = useRouter();

  return (
    <div className="fixed left-4 top-4 z-50">
      <Button
        type="text"
        onClick={() => router.back()}
        className="flex items-center justify-center w-10 h-10 p-0 rounded-full"
        style={{
          backgroundColor: 'var(--surface)',
          color: 'var(--font-color)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.05), 0 -4px 6px -1px rgba(0, 0, 0, 0.02), 0 -2px 4px -1px rgba(0, 0, 0, 0.03)',
        }}
        icon={<IconArrowLeft className="w-6 h-6" strokeWidth={2.5} />}
      />
    </div>
  );
}

