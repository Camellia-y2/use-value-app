"use client";
import { IconLock, IconMail } from "@tabler/icons-react";
import { Button, Input } from "antd";
import { useTranslations } from "next-intl";

interface RenderFormProps {
  mode: 'login' | 'register';
  email: string;
  password: string;
  loading?: boolean;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  handleLogin: () => void;
  handleRegister: () => void;
  onSwitchMode: () => void;
}

export function RenderForm(props: RenderFormProps) {
  const t = useTranslations('Index');
  return (
    <div className="flex flex-col gap-2">
      <Input
        prefix={<IconMail size={18} style={{ color: 'var(--font-color-secondary)' }} />}
        placeholder={t('EnterEmail')}
        value={props.email}
        onChange={(e) => props.setEmail(e.target.value)}
        size="large"
        style={{
          backgroundColor: 'var(--background)',
          borderColor: 'var(--border)',
          color: 'var(--font-color)',
        }}
      />
      <Input.Password
        prefix={<IconLock size={18} style={{ color: 'var(--font-color-secondary)' }} />}
        placeholder={t('EnterPassword')}
        value={props.password}
        onChange={(e) => props.setPassword(e.target.value)}
        size="large"
        onPressEnter={props.mode === 'login' ? props.handleLogin : props.handleRegister}
        style={{
          backgroundColor: 'var(--background)',
          borderColor: 'var(--border)',
          color: 'var(--font-color)',
        }}
      />
      <div className="flex flex-col gap-4">
        <Button
          type="primary"
          onClick={props.mode === 'login' ? props.handleLogin : props.handleRegister}
          loading={props.loading}
          size="large"
          block
          style={{
            backgroundColor: 'var(--primary)',
            borderColor: 'var(--primary)',
            height: '48px',
            borderRadius: '12px',
            fontWeight: 'bold',
          }}
        >
          {props.mode === 'login' ? t('Login') : t('Register')}
        </Button>
        <div className="text-center">
          <button
            onClick={props.onSwitchMode}
            className="text-sm underline"
            style={{ color: 'var(--primary)' }}
          >
            {props.mode === 'login' ? `${t('NoAccount')} ${t('Register')}` : `${t('HasAccount')} ${t('Login')}`}
          </button>
        </div>
      </div>
    </div>
  );
}