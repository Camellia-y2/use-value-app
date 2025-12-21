/**
 * 成就系统配置
 * 不需要建表，通过实时计算总榨干值来判断解锁状态
 */

export interface Achievement {
  /** 成就唯一标识 */
  id: string;
  /** 成就标题 */
  title: string;
  /** 成就图标 */
  icon: string;
  /** 解锁阈值（总榨干值需要达到这个数值） */
  threshold: number;
  /** 是否已解锁（动态计算，不持久化） */
  unlocked: boolean;
}

/**
 * 成就配置列表（按阈值从低到高排序）
 */
export const ACHIEVEMENTS_CONFIG: Omit<Achievement, 'unlocked'>[] = [
  {
    id: "first_drain",
    title: "初榨者",
    icon: "🌱",
    threshold: 0,
  },
  {
    id: "thousand_yuan",
    title: "千元榨取者",
    icon: "💰",
    threshold: 1000,
  },
  {
    id: "five_thousand",
    title: "五千榨取者",
    icon: "🔥",
    threshold: 5000,
  },
  // 可以继续添加更多成就...
];

/**
 * 计算总榨干值
 * 逻辑：已退役物品 + 已卖出物品的总价值 = 总榨干值
 * 
 * @param assets 资产列表
 * @returns 总榨干值
 */
export function calculateTotalDrainValue(assets: Array<{
  price: number;
  status: 'active' | 'retired' | 'idle' | 'sold';
}>): number {
  return assets
    .filter(asset => 
      asset.status === 'retired' || asset.status === 'sold'
    )
    .reduce((total, asset) => total + asset.price, 0);
}

/**
 * 根据总榨干值计算成就解锁状态
 * @param totalValue 总榨干值
 * @returns 带解锁状态的成就列表
 */
export function calculateAchievements(totalValue: number): Achievement[] {
  return ACHIEVEMENTS_CONFIG.map(achievement => ({
    ...achievement,
    unlocked: totalValue >= achievement.threshold,
  }));
}

