'use client';

import { useState, useEffect, useMemo } from 'react';
import { Switch, Modal, Slider, Drawer } from 'antd';
import OnboardingModal from '@/components/login/OnboardingModal';
import { createClient } from '@/lib/supabase/client';
import { 
  IconSun, 
  IconMoon, 
  IconLanguage, 
  IconCoin, 
  IconUser, 
  IconChevronRight,
  IconBrain,
  IconClock,
  IconBell,
  IconWallet,
  IconShirt,
  IconCloudUpload,
  IconDatabaseExport,
  IconShoppingBag,
  IconLogout
} from '@tabler/icons-react';
import { useTheme } from '@/hooks/useTheme';
import { useTranslations } from 'next-intl';
import LanguageSelector from '@/components/LanguageSelector';
import ListItem from '@/components/settings/ListItem';

export default function SettingsPage() {
  const { theme, toggleTheme, mounted } = useTheme();
  const t = useTranslations('Settings');
  const [isMilestoneModalOpen, setIsMilestoneModalOpen] = useState(false);
  const [isCurrencyDrawerOpen, setIsCurrencyDrawerOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [currency, setCurrency] = useState('CNY');

  // 使用 useMemo 缓存 supabase 客户端实例，避免每次渲染都创建新实例，调用两次api
  const supabase = useMemo(() => createClient(), []);
  
  const [aiEnabled, setAiEnabled] = useState(true);
  const [idleThreshold, setIdleThreshold] = useState(30);
  const [includeInTotal, setIncludeInTotal] = useState(false);
  const [reminderEnabled, setReminderEnabled] = useState(true);
  
  // 用户状态
  const [user, setUser] = useState<any>(null);
  // 是否已登录
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // 是否是浅色主题
  const isLightTheme = theme === 'light';

  // 检查用户登录状态
  useEffect(() => {
    const checkAuth = async () => {
      const userMode = localStorage.getItem('userMode');
      if (userMode === 'authenticated') {
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        if (currentUser) {
          setUser(currentUser);
          setIsAuthenticated(true);
        } else {
          // 如果 Supabase 中没有用户，清除本地状态
          localStorage.setItem('userMode', 'guest');
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
    // supabase 已经通过 useMemo 缓存， 保证稳定，不需要作为依赖项
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 避免SSR水合不一致问题，在客户端挂载前不渲染
  if (!mounted) {
    return null; 
  }

  // 登出
  const handleLogOut = async () => {
    await supabase.auth.signOut();
    localStorage.setItem('userMode', 'guest');
    setUser(null);
    setIsAuthenticated(false);
    window.location.reload(); // 刷新页面
  }

  const milestones = [
    { id: 'first_drain', title: '初榨者', icon: '🌱', threshold: 0 },
    { id: 'thousand_yuan', title: '千元榨取者', icon: '💰', threshold: 1000 },
    { id: 'five_thousand', title: '五千榨取者', icon: '🔥', threshold: 5000 }
  ];

  const currentMilestone = milestones[0];

  const currencies = [
    { code: 'CNY', name: '人民币', symbol: '¥' },
    { code: 'USD', name: '美元', symbol: '$' },
    { code: 'HKD', name: '港元', symbol: 'HK$' },
    { code: 'TWD', name: '新台币', symbol: 'NT$' },
    { code: 'JPY', name: '日元', symbol: '¥' },
  ];

  const CardGroup = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <section className="mb-6">
      <h2 className="text-sm mb-2 px-1" style={{ color: 'var(--font-color-secondary)' }}>{title}</h2>
      <div 
        className="rounded-3xl overflow-hidden shadow-sm"
        style={{ backgroundColor: 'var(--surface)' }}
      >
        {children}
      </div>
    </section>
  );

  return (
    <main className="flex min-h-screen flex-col p-4 pb-32" style={{ backgroundColor: 'var(--background)' }}>
      {/* 账号区块 */}
      <section className="mb-6">
        <h2 className="text-sm mb-2 px-1" style={{ color: 'var(--font-color-secondary)' }}>{t('Account')}</h2>
        <div 
          className="rounded-3xl p-6 flex items-center gap-4 shadow-sm"
          style={{ backgroundColor: 'var(--surface)' }}
        >
          <div 
            onClick={!isAuthenticated ? () => setIsOnboardingOpen(true) : undefined}
            className={`w-16 h-16 rounded-full flex items-center justify-center overflow-hidden ${!isAuthenticated ? 'cursor-pointer active:scale-95 transition-transform' : ''}`}
            style={{ backgroundColor: 'var(--primary)' }}
          >
            <IconUser size={32} style={{ color: 'var(--primary-foreground)' }} stroke={1.5} />
          </div>
          <div className="flex flex-col gap-1 flex-1">
            {/* 用户邮箱/游客 */}
            <span 
              onClick={!isAuthenticated ? () => setIsOnboardingOpen(true) : undefined}
              className={`text-[18px] font-bold ${!isAuthenticated ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
              style={{ color: 'var(--font-color-secondary)' }}
            >
              {isAuthenticated && user?.email ? user.email : t('Guest')}
            </span>
           {/* 榨取里程碑 */}
            <div 
              onClick={() => setIsMilestoneModalOpen(true)}
              className="flex items-center gap-1 px-3 py-1 rounded-full text-xs cursor-pointer w-fit"
              style={{ backgroundColor: 'var(--background)', color: 'var(--font-color)' }}
            >
              <span>{currentMilestone.icon} {currentMilestone.title}</span>
              <IconChevronRight size={12} />
            </div>
          </div>
        </div>
      </section>

      {/* 通用设置 */}
      <CardGroup title={t('General')}>
        <ListItem 
          icon={IconShirt} 
          iconBg="color-mix(in srgb, var(--ui-blue), transparent calc(100% - (var(--ui-icon-bg-opacity) * 100%)))" 
          iconColor="var(--ui-blue)" 
          label={t('ThemeMode')}
          rightContent={
            <div className="flex p-1 rounded-xl gap-1" style={{ backgroundColor: 'var(--background)' }}>
              <button 
                onClick={() => theme === 'dark' && toggleTheme()}
                className={`p-2 rounded-lg transition-all ${isLightTheme ? 'shadow-sm' : ''}`}
                style={{ 
                  backgroundColor: isLightTheme ? 'var(--surface)' : 'transparent',
                  color: isLightTheme ? 'var(--ui-yellow)' : 'var(--font-color-secondary)'
                }}
              >
                <IconSun size={18} />
              </button>
              <button 
                onClick={() => theme === 'light' && toggleTheme()}
                className={`p-2 rounded-lg transition-all ${!isLightTheme ? 'shadow-sm' : ''}`}
                style={{ 
                  backgroundColor: !isLightTheme ? 'var(--surface)' : 'transparent',
                  color: !isLightTheme ? 'var(--ui-yellow)' : 'var(--font-color-secondary)'
                }}
              >
                <IconMoon size={18} />
              </button>
            </div>
          }
        />
        <ListItem 
          icon={IconLanguage} 
          iconBg="color-mix(in srgb, var(--ui-cyan), transparent calc(100% - (var(--ui-icon-bg-opacity) * 100%)))" 
          iconColor="var(--ui-cyan)" 
          label={t('Language')}
          rightContent={<LanguageSelector />}
        />
        <ListItem 
          icon={IconCoin} 
          iconBg="color-mix(in srgb, var(--ui-gray), transparent calc(100% - (var(--ui-icon-bg-opacity) * 100%)))" 
          iconColor="var(--ui-gray)" 
          label={t('Currency')}
          isLast
          onClick={() => setIsCurrencyDrawerOpen(true)}
          rightContent={
            <div className="flex items-center gap-1">
              <span style={{ color: 'var(--font-color-secondary)' }}>
                {currencies.find(c => c.code === currency)?.symbol} {currency}
              </span>
              <IconChevronRight size={18} style={{ color: 'var(--font-color-secondary)' }} />
            </div>
          }
        />
      </CardGroup>

      {/* AI 智能管家 */}
      <CardGroup title={t('AiManager')}>
        <ListItem 
          icon={IconBrain} 
          iconBg="color-mix(in srgb, var(--ui-pink), transparent calc(100% - (var(--ui-icon-bg-opacity) * 100%)))" 
          iconColor="var(--ui-pink)" 
          label={t('EnableAi')}
          rightContent={<Switch checked={aiEnabled} onChange={setAiEnabled} />}
        />
        <div className="p-4 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl" style={{ backgroundColor: 'color-mix(in srgb, var(--ui-gray), transparent calc(100% - (var(--ui-icon-bg-opacity) * 100%)))', color: 'var(--ui-gray)' }}>
                <IconClock size={20} />
              </div>
              <span className="font-medium" style={{ color: 'var(--font-color)' }}>{t('IdleDetection')}</span>
            </div>
            <span style={{ color: 'var(--font-color-secondary)', fontSize: '14px' }}>{idleThreshold}{t('Days')}</span>
          </div>
          <div className="px-2">
            <Slider 
              min={7} 
              max={90} 
              value={idleThreshold} 
              onChange={setIdleThreshold}
              tooltip={{ open: false }}
              styles={{
                track: { background: 'var(--primary)' },
                handle: { borderColor: 'var(--primary)', backgroundColor: 'var(--primary)' }
              }}
            />
          </div>
        </div>
        <ListItem 
          icon={IconWallet} 
          iconBg="color-mix(in srgb, var(--ui-yellow), transparent calc(100% - (var(--ui-icon-bg-opacity) * 100%)))" 
          iconColor="var(--ui-yellow)" 
          label={t('IncludeInTotal')}
          rightContent={<Switch checked={includeInTotal} onChange={setIncludeInTotal} />}
        />
        <ListItem 
          icon={IconBell} 
          iconBg="color-mix(in srgb, var(--ui-green), transparent calc(100% - (var(--ui-icon-bg-opacity) * 100%)))" 
          iconColor="var(--ui-green)" 
          label={t('IdleReminder')}
          isLast
          rightContent={<Switch checked={reminderEnabled} onChange={setReminderEnabled} />}
        />
      </CardGroup>

      {/* 高级功能 */}
      <CardGroup title={t('Advanced')}>
        {!isAuthenticated && (
          <ListItem 
            icon={IconCloudUpload} 
            iconBg="color-mix(in srgb, var(--ui-indigo), transparent calc(100% - (var(--ui-icon-bg-opacity) * 100%)))" 
            iconColor="var(--ui-indigo)" 
            label={t('UpgradeAccount')}
            description={t('UpgradeDesc')}
            onClick={() => setIsOnboardingOpen(true)}
            rightContent={<IconChevronRight size={18} style={{ color: 'var(--font-color-secondary)' }} />}
          />
        )}
        <ListItem 
          icon={IconDatabaseExport} 
          iconBg="color-mix(in srgb, var(--ui-orange), transparent calc(100% - (var(--ui-icon-bg-opacity) * 100%)))" 
          iconColor="var(--ui-orange)" 
          label={t('DataImportExport')}
          onClick={() => {}}
          rightContent={<IconChevronRight size={18} style={{ color: 'var(--font-color-secondary)' }} />}
        />
        <ListItem 
          icon={IconShoppingBag} 
          iconBg="color-mix(in srgb, var(--ui-red), transparent calc(100% - (var(--ui-icon-bg-opacity) * 100%)))" 
          iconColor="var(--ui-red)" 
          label={t('PlatformIntegration')}
          description={t('PlatformDesc')}
          isLast={!isAuthenticated}
          onClick={() => {}}
          rightContent={<IconChevronRight size={18} style={{ color: 'var(--font-color-secondary)' }} />}
        />
        {isAuthenticated && (
          <ListItem 
            icon={IconLogout} 
            iconBg="color-mix(in srgb, var(--ui-red), transparent calc(100% - (var(--ui-icon-bg-opacity) * 100%)))" 
            iconColor="var(--ui-red)" 
            label={t('Logout')}
            onClick={handleLogOut}
            isLast
            rightContent={<IconChevronRight size={18} style={{ color: 'var(--font-color-secondary)' }} />}
          />
        )}
      </CardGroup>

      {/* 里程碑详情弹窗 */}
      <Modal
        title={t('Milestone')}
        open={isMilestoneModalOpen}
        onCancel={() => setIsMilestoneModalOpen(false)}
        footer={null}
        centered
        className="custom-modal"
        styles={{
          content: { borderRadius: '24px', backgroundColor: 'var(--surface)' },
          header: { backgroundColor: 'var(--surface)', borderBottom: 'none' },
        }}
      >
        <div className="flex flex-col gap-6 py-4">
          <div className="text-center">
            <div className="text-5xl mb-2">{currentMilestone.icon}</div>
            <h3 className="text-xl font-bold" style={{ color: 'var(--font-color)' }}>{currentMilestone.title}</h3>
            <p style={{ color: 'var(--font-color-secondary)' }} className="mt-2">🎉 恭喜你榨干价值 ¥0.00！</p>
          </div>
          <div className="space-y-4">
            <h4 className="font-medium" style={{ color: 'var(--font-color-secondary)' }}>所有里程碑</h4>
            {milestones.map(m => (
              <div 
                key={m.id} 
                className={`flex items-center justify-between p-4 rounded-2xl transition-all`}
                style={{
                  backgroundColor: m.id === currentMilestone.id 
                    ? 'color-mix(in srgb, var(--primary), transparent calc(100% - (var(--ui-icon-bg-opacity) * 100%)))' 
                    : 'var(--background)',
                  border: m.id === currentMilestone.id ? '1px solid var(--primary)' : '1px solid transparent'
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{m.icon}</span>
                  <span className={`font-medium ${m.id === currentMilestone.id ? 'font-bold' : ''}`} style={{ color: 'var(--font-color)' }}>{m.title}</span>
                </div>
                <span className="text-xs" style={{ color: 'var(--font-color-secondary)' }}>
                  {m.threshold === 0 ? '初始解锁' : `¥${m.threshold}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* 货币选择抽屉 */}
      <Drawer
        title={t('SelectCurrency')}
        placement="bottom"
        onClose={() => setIsCurrencyDrawerOpen(false)}
        open={isCurrencyDrawerOpen}
        height="auto"
        styles={{
          header: { textAlign: 'center', borderBottom: 'none', paddingTop: '24px' },
          body: { padding: '12px 16px', backgroundColor: 'var(--background)' }
        }}
      >
        <div className="flex flex-col gap-2">
          {currencies.map(c => (
            <div 
              key={c.code}
              className="flex items-center justify-between p-2 rounded-2xl cursor-pointer transition-all active:scale-95"
              onClick={() => {
                setCurrency(c.code);
                setIsCurrencyDrawerOpen(false);
              }}
              style={{
                backgroundColor: currency === c.code ? 'var(--surface)' : 'transparent',
                boxShadow: currency === c.code ? '0 4px 12px var(--border)' : 'none',
              }}
            >
              <div className="flex items-center gap-4">
                <span className="font-mono w-10" style={{ color: 'var(--font-color-secondary)' }}>{c.code}</span>
                <span className={`text-sm ${currency === c.code ? 'font-bold' : ''}`} style={{ color: 'var(--font-color)' }}>{c.name}</span>
              </div>
              <span style={{ color: currency === c.code ? 'var(--primary)' : 'var(--font-color-secondary)' }} className="font-bold text-lg">
                {c.symbol}
              </span>
            </div>
          ))}
        </div>
      </Drawer>

      {/* 引导页弹窗 */}
      <OnboardingModal
        open={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onGuestMode={async () => {
          localStorage.setItem('userMode', 'guest');
          setIsOnboardingOpen(false);
          window.location.reload();
        }}
        onLoginSuccess={async () => {
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            localStorage.setItem('userMode', 'authenticated');
            setIsOnboardingOpen(false);
            window.location.reload();
          }
        }}
      />
    </main>
  );
}
