'use client';

import { useState, useEffect, useMemo } from 'react';
import HomeContent from '@/components/home/HomeContent';
import OnboardingModal from '@/components/login/OnboardingModal';
import { createClient } from '@/lib/supabase/client';

export default function HomePage() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // 使用 useMemo 缓存 supabase 客户端实例，避免每次渲染都创建新实例
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    // 检查是否已经选择过模式
    const userMode = localStorage.getItem('userMode');
    
    // 如果还没有选择过，显示引导页
    if (!userMode) {
      setShowOnboarding(true);
    } else if (userMode === 'authenticated') {
      // 检查认证状态
      checkAuth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setIsAuthenticated(!!user);
    if (!user) {
      localStorage.setItem('userMode', 'guest');
    }
  };

  const handleGuestMode = () => {
    setIsAuthenticated(false);
    // 游客模式数据存储在本地
  };

  const handleLoginSuccess = async () => {
    await checkAuth();
  };

  return (
    <main className="flex min-h-screen flex-col relative">
      <HomeContent />
      <OnboardingModal
        open={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        onGuestMode={handleGuestMode}
        onLoginSuccess={handleLoginSuccess}
      />
    </main>
  );
}
