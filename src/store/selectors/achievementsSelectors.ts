/**
 * Redux Selectors - 成就相关
 * 用于从 Redux Store 中获取计算后的成就数据
 */

import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import { 
  calculateTotalDrainValue, 
  calculateAchievements 
} from '@/lib/achievements';

/**
 * 选择器：获取所有资产
 */
const selectAllAssets = (state: RootState) => state.assets.items;

/**
 * 选择器：计算总榨干值（带缓存，只有 assets 变化时才重新计算）
 */
export const selectTotalDrainValue = createSelector(
  [selectAllAssets],
  (assets) => calculateTotalDrainValue(assets)
);

/**
 * 选择器：获取所有成就（带解锁状态）
 */
export const selectAchievements = createSelector(
  [selectTotalDrainValue],
  (totalValue) => calculateAchievements(totalValue)
);

/**
 * 选择器：获取已解锁的成就
 */
export const selectUnlockedAchievements = createSelector(
  [selectAchievements],
  (achievements) => achievements.filter(a => a.unlocked)
);

/**
 * 选择器：获取下一个待解锁的成就
 */
export const selectNextAchievement = createSelector(
  [selectAchievements],
  (achievements) => achievements.find(a => !a.unlocked) || null
);

