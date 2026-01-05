'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { 
  IconX, 
  IconPencil, 
  IconCoin, 
  IconCalendar, 
  IconPuzzle, 
  IconArrowUp,
  IconWallet,
  IconChartLine,
  IconBox,
  IconMoneybag,
  IconPackage
} from '@tabler/icons-react';
import { Switch, DatePicker, Select, ConfigProvider } from 'antd';
import dayjs from 'dayjs';

export default function AddItemPage() {
  const t = useTranslations('Index');
  const [billingMode, setBillingMode] = useState('ByDay');
  const [purchaseDate, setPurchaseDate] = useState(dayjs());

  const InputCard = ({ children }: { children: React.ReactNode }) => (
    <div 
      className="rounded-3xl p-2 mb-4 shadow-sm"
      style={{ backgroundColor: 'var(--surface)' }}
    >
      {children}
    </div>
  );

  const ListItem = ({ icon: Icon, label, rightContent, isLast = false }: any) => (
    <div 
      className={`flex items-center justify-between p-4 ${!isLast ? 'border-b' : ''}`}
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="flex items-center gap-3">
        <Icon size={20} style={{ color: 'var(--font-color)' }} stroke={1.5} />
        <span className="font-medium" style={{ color: 'var(--font-color)' }}>{label}</span>
      </div>
      <div className="flex-1 flex justify-end">
        {rightContent}
      </div>
    </div>
  );

  return (
    <main className="flex min-h-screen flex-col p-4 pb-32" style={{ backgroundColor: 'var(--background)' }}>
      {/* 顶部导航 */}
      <div className="flex items-center justify-between mb-8">
        <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-sm active:scale-90 transition-all">
          <IconX size={20} />
        </button>
        <h1 className="text-xl font-bold" style={{ color: 'var(--font-color)' }}>{t('AddAsset')}</h1>
        <div className="w-10" /> {/* 占位平衡 */}
      </div>

      {/* 图片上传区域 */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative group">
          <div 
            className="w-32 h-32 rounded-[2.5rem] flex items-center justify-center shadow-inner overflow-hidden"
            style={{ backgroundColor: 'var(--surface)' }}
          >
            <IconPackage size={48} className="opacity-20" />
          </div>
          <button className="absolute -right-1 -bottom-1 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center border-4 border-[#f4f5fb] active:scale-90 transition-all">
            <IconPencil size={14} />
          </button>
        </div>
        
        <input 
          type="text" 
          placeholder={t('EnterItemName')}
          className="mt-6 w-full text-center text-2xl font-bold bg-transparent outline-none placeholder:text-gray-300"
          style={{ color: 'var(--font-color)' }}
        />
      </div>

      {/* 计费模式切换 */}
      <div className="flex p-1 rounded-2xl mb-6 bg-gray-200/50 backdrop-blur-sm shadow-inner" style={{ backgroundColor: 'rgba(200, 200, 200, 0.2)' }}>
        {['ByDay', 'ByTime'].map((mode) => (
          <button
            key={mode}
            onClick={() => setBillingMode(mode)}
            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
              billingMode === mode ? 'bg-white shadow-md scale-[1.02]' : 'text-gray-400'
            }`}
          >
            {t(mode)}
          </button>
        ))}
      </div>

      {/* 基础信息卡片 */}
      <InputCard>
        <ListItem 
          icon={IconCoin} 
          label={t('Price')} 
          rightContent={
            <input 
              type="number" 
              placeholder={t('EnterPrice')}
              className="w-full text-right bg-transparent outline-none text-sm font-bold placeholder:font-normal"
              style={{ color: 'var(--font-color)' }}
            />
          }
        />
        <ListItem 
          icon={IconCalendar} 
          label={t('PurchaseDate')} 
          rightContent={
            <ConfigProvider
              theme={{
                token: {
                  borderRadius: 12,
                  colorPrimary: '#b1f641',
                },
              }}
            >
              <DatePicker 
                variant="borderless"
                suffixIcon={null}
                value={purchaseDate}
                onChange={(date) => date && setPurchaseDate(date)}
                format="YYYY/MM/DD"
                className="p-0 text-right font-bold w-32"
                allowClear={false}
              />
            </ConfigProvider>
          }
        />
        <ListItem 
          icon={IconPuzzle} 
          label={t('Category')} 
          isLast
          rightContent={
            <Select
              variant="borderless"
              defaultValue="Digital"
              options={[
                { value: 'Digital', label: t('Digital') },
                { value: 'Clothing', label: t('Clothing') },
                { value: 'Life', label: t('Life') },
              ]}
              className="w-24 text-right font-bold"
            />
          }
        />
      </InputCard>

      {/* 高级设置卡片 */}
      <InputCard>
        <ListItem icon={IconArrowUp} label={t('PinTop')} rightContent={<Switch size="small" />} />
        <ListItem icon={IconWallet} label={t('ExcludeFromTotal')} rightContent={<Switch size="small" />} />
        <ListItem icon={IconChartLine} label={t('ExcludeFromDaily')} isLast rightContent={<Switch size="small" />} />
      </InputCard>

      {/* 状态卡片 */}
      <InputCard>
        <ListItem icon={IconBox} label={t('Retired')} rightContent={<Switch size="small" />} />
        <ListItem icon={IconMoneybag} label={t('Sold')} isLast rightContent={<Switch size="small" />} />
      </InputCard>

      {/* 底部保存按钮 */}
      <div className="fixed bottom-6 left-4 right-4">
        <button 
          className="w-full py-5 rounded-[2rem] font-black text-lg shadow-xl active:scale-95 transition-all"
          style={{ backgroundColor: 'var(--font-color)', color: 'var(--background)' }}
        >
          {t('Save')}
        </button>
      </div>
    </main>
  );
}
