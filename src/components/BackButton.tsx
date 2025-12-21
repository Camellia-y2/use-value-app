'use client';

import { useRouter } from 'next/navigation';
import { IconArrowLeft } from '@tabler/icons-react';
import { IconButton } from '@mui/material';

export default function BackButton() {
  const router = useRouter();

  return (
    <div className="fixed left-4 top-4 z-50">
      <IconButton
        onClick={() => router.back()}
        sx={{
          backgroundColor: 'var(--surface)',
          color: 'var(--font-color)',
          width: 40,
          height: 40,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.05), 0 -4px 6px -1px rgba(0, 0, 0, 0.02), 0 -2px 4px -1px rgba(0, 0, 0, 0.03)',
          '&:hover': {
            backgroundColor: 'var(--surface)',
          },
        }}
      >
        <IconArrowLeft className="w-6 h-6" strokeWidth={2.5} />
      </IconButton>
    </div>
  );
}

