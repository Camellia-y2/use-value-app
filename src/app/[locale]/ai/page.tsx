'use client';

import { useTranslations } from 'next-intl';
import { IconThumbUp, IconThumbDown, IconSend } from '@tabler/icons-react';

export default function AIPage() {
  const t = useTranslations('Index');

  return (
    <main className="flex min-h-screen flex-col p-4 pb-24" style={{ backgroundColor: 'var(--background)' }}>
      {/* 消息展示区 */}
      <div className="flex-1 space-y-6 pt-4">
        <div className="flex gap-3">
          {/* AI 头像 */}
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0 border border-gray-100 overflow-hidden">
             <div className="text-xl">🧠</div>
          </div>
          
          {/* AI 消息气泡 */}
          <div className="flex flex-col gap-2 max-w-[85%]">
            <div 
              className="p-4 rounded-3xl shadow-sm relative group"
              style={{ backgroundColor: 'var(--surface)', borderRadius: '4px 24px 24px 24px' }}
            >
              <p className="text-[15px] leading-relaxed" style={{ color: 'var(--font-color)' }}>
                {t('AiWelcome')}
              </p>
              
              {/* 反馈按钮 */}
              <div className="flex gap-3 mt-3 opacity-0 group-hover:opacity-100 transition-opacity justify-end">
                <button className="text-gray-300 hover:text-yellow-400 transition-colors">
                  <IconThumbUp size={16} />
                </button>
                <button className="text-gray-300 hover:text-gray-500 transition-colors">
                  <IconThumbDown size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部输入框 */}
      <div className="fixed bottom-24 left-4 right-4">
        <div 
          className="flex items-center gap-2 p-2 pl-5 rounded-full shadow-lg border border-white/50"
          style={{ backgroundColor: 'var(--surface)' }}
        >
          <input 
            type="text" 
            placeholder={t('AskMe')}
            className="flex-1 bg-transparent border-none outline-none text-sm h-10"
            style={{ color: 'var(--font-color)' }}
          />
          <button 
            className="px-6 h-10 rounded-full font-bold flex items-center gap-2 transition-all active:scale-95"
            style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
          >
            {t('Send')}
          </button>
        </div>
      </div>
    </main>
  );
}
