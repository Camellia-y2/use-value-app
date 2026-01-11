'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { createClient } from '@/lib/supabase/client';
import { IconUser, IconX } from '@tabler/icons-react';
import { Modal, Button, message } from 'antd';
import { RenderForm } from './RenderForm';
import DetailsModal from './DetailsModal';

interface OnboardingModalProps {
  open: boolean;              // 控制模态框显示/隐藏
  onClose: () => void;        // 关闭回调
  onGuestMode: () => void;    // 游客模式回调
  onLoginSuccess: () => void; // 登录成功回调
}

export default function OnboardingModal({ 
  open, 
  onClose, 
  onGuestMode, 
  onLoginSuccess 
}: OnboardingModalProps) {
  const t = useTranslations('Index');
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoginMode, setIsLoginMode] = useState(true);  // 登录/注册模式切换
  const [email, setEmail] = useState('');                // 邮箱输入
  const [password, setPassword] = useState('');          // 密码输入
  const [loading, setLoading] = useState(false);         // 加载状态（用于按钮禁用）
  const supabase = createClient(); // Supabase客户端实例
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  // 游客模式处理
  const handleGuestMode = () => {
    localStorage.setItem('userMode', 'guest');
    onGuestMode();
    onClose();
  };

  // 登录处理
  const handleLogin = async () => {
    if (!email || !password) {
      messageApi.error(t('FillAllFields'));
      return;
    }

    setLoading(true);
    const hide = messageApi.loading(t('LoggingIn'), 0);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        localStorage.setItem('userMode', 'authenticated');
        hide();
        messageApi.success(t('LoginSuccess'), 2.5).then(() => {
          onLoginSuccess();
          onClose();
        });
      }
    } catch (error: any) {
      hide();
      messageApi.error(t('LoginFailed'), 2.5);
      setLoading(false);
    }
  };

  // 注册处理
  const handleRegister = async () => {
    if (!email || !password) {
      messageApi.error(t('FillAllFields'));
      return;
    }

    if (password.length < 6) {
      messageApi.error(t('PasswordMinLength'));
      return;
    }

    setLoading(true);
    const hide = messageApi.loading(t('Registering'), 0);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      // 检查是否需要邮箱验证
      if (data.user && data.session) {
        // 注册成功且已有 session，已自动登录（开发环境或已禁用邮箱验证）
        hide();
        localStorage.setItem('userMode', 'authenticated');
        messageApi.success(t('LoginSuccess'), 2.5).then(() => {
          onLoginSuccess();
          onClose();
        });
      } else if (data.user && !data.session) {
        // 需要邮箱验证的情况
        hide();
        messageApi.success(t('RegisterSuccess'), 2.5).then(() => {
          // 切换到登录模式，提示用户验证后登录
          setIsLoginMode(true);
          setEmail('');
          setPassword('');
          setLoading(false);
        });
      } else {
        // 其他情况（理论上不应该发生）
        hide();
        messageApi.warning(t('RegisterSuccess'), 2.5);
        setIsLoginMode(true);
        setLoading(false);
      }
    } catch (error: any) {
      console.error('注册错误:', error);
      hide();
      messageApi.error(t('RegisterFailed'), 2.5);
      setLoading(false);
    }
  };

  // 关闭
  const handleClose = () => {
    onClose();
  };

  return (
    <>
      {contextHolder}
      <Modal
      open={open}
      onCancel={handleClose}
      footer={null}
      closable={true}
      closeIcon={<IconX size={20} style={{ color: 'var(--font-color)' }} />}
      centered
      width={400}
      styles={{
        content: {
          borderRadius: '24px',
          backgroundColor: 'var(--surface)',
          padding: '24px',
        },
        mask: {
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(2px)',
        },
      }}
      className="onboarding-modal"
      maskClosable={false}
    >
      <div className="flex flex-col gap-6">
        {/* 标题和副标题 */}
        <div className="text-center">
          <h2 
            className="text-2xl font-bold mb-2"
            style={{ color: 'var(--font-color)' }}
          >
            ✨ {t('OnboardingWelcome')}
          </h2>
          <p 
            className="text-sm italic"
            style={{ color: 'var(--font-color-secondary)' }}
          >
            {t('OnboardingSubtitle')}
          </p>
        </div>

        {/* 登录/注册表单 */}
        <RenderForm 
          mode={isLoginMode ? 'login' : 'register'}
          email={email} 
          password={password} 
          loading={loading} 
          setEmail={setEmail} 
          setPassword={setPassword} 
          handleLogin={handleLogin} 
          handleRegister={handleRegister}
          onSwitchMode={() => setIsLoginMode(!isLoginMode)}
        />

        {/* 分隔线 */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border)' }} />
          <span className="text-xs" style={{ color: 'var(--font-color-secondary)' }}>
            {t('Or')}
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border)' }} />
        </div>

        {/* 游客模式按钮 */}
        <Button
          size="large"
          onClick={handleGuestMode}
          block
          style={{
            backgroundColor: 'var(--background)',
            borderColor: 'var(--border)',
            color: 'var(--font-color)',
            height: '48px',
            borderRadius: '12px',
            fontWeight: 'bold',
          }}
          icon={<IconUser size={20} />}
        >
          {t('GuestMode')}
        </Button>

        {/* 隐私声明 */}
        <p 
          className="text-xs text-center leading-relaxed"
          style={{ color: 'var(--font-color-secondary)' }}
        >
          {t('PrivacyNotice')}{' '}
          <button
            onClick={() => {
              // 打开详情弹窗
              setIsDetailsModalOpen(true);
            }}
            className="underline"
            style={{ color: 'var(--primary)' }}
          >
            {t('ViewDetails')}
          </button>
        </p>
      </div>
    </Modal>

    <DetailsModal open={isDetailsModalOpen} onClose={() => setIsDetailsModalOpen(false)} />
    </>
  );
}
