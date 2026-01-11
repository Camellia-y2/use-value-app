import { ReactNode } from 'react';

interface ListItemProps {
  icon: React.ComponentType<any>;
  iconBg: string;
  iconColor: string;
  label: string;
  description?: string;
  rightContent?: ReactNode;
  onClick?: () => void;
  isLast?: boolean;
}

export default function ListItem({
  icon: Icon,
  iconBg, // 图标背景颜色
  iconColor, // 图标颜色
  label, // 标签
  description,
  rightContent, // 右侧内容
  onClick,
  isLast = false, // 是否是最后一个
}: ListItemProps) {
  return (
    <div
      className={`flex items-center justify-between p-4 
        ${!isLast ? 'border-b' : ''} 
        ${onClick ? 'cursor-pointer active:opacity-70' : ''}`}
      style={{ borderColor: 'var(--border)' }}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-xl flex items-center justify-center`} style={{ backgroundColor: iconBg, color: iconColor }}>
          <Icon size={20} stroke={2} />
        </div>
        <div className="flex flex-col">
          <span className="font-medium" style={{ color: 'var(--font-color)' }}>{label}</span>
          {description && <span className="text-xs" style={{ color: 'var(--font-color-secondary)' }}>{description}</span>}
        </div>
      </div>
      <div>{rightContent}</div>
    </div>
  );
}
