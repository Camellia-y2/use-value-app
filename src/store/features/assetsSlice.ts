import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 定义资产的数据接口（对应数据库表结构）
export interface Asset {
  /** 资产唯一标识符 (UUID) */
  id: string;
  
  /** 资产名称 */
  name: string;
  
  /** 购买价格 (精确到分，前端通常作为 number 处理) */
  price: number;
  
  /** 购买日期 (YYYY-MM-DD) */
  purchase_date: string;
  
  /** 资产标签 (如: 数码, 服饰, 箱包等) */
  label: string;
  
  /** 计费模式 (按天计费 'daily' 或 按次计费 'per_use') */
  billing_mode: 'daily' | 'per_use';
  
  /** 使用次数 (仅适用于按次计费模式，可为空) */
  usage_count: number | null;
  
  /** 资产状态 ('active'服役中, 'retired'已退役, 'idle'闲置, 'sold'已卖出) */
  status: 'active' | 'retired' | 'idle' | 'sold';
  
  /** 是否置顶显示 */
  is_pinned: boolean;
  
  /** 是否排除在总资产计算之外 */
  is_excluded_from_total: boolean;
  
  /** 是否排除在日均成本计算之外 */
  is_excluded_from_daily: boolean;
  
  /** 资产图片的URL地址 (可为空) */
  image_url: string | null;
  
  /** 关联的用户ID (UUID) */
  user_id: string;
  
  /** 资产记录创建时间 (ISO Timestamp) */
  created_at: string;
  
  /** 资产记录最后更新时间 (ISO Timestamp) */
  updated_at: string;
}

interface AssetsState {
  items: Asset[];
  loading: boolean;
  error: string | null;
}

const initialState: AssetsState = {
  items: [],
  loading: false,
  error: null,
};

export const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    // 设置资产列表 (通常用于初始化加载)
    setAssets: (state, action: PayloadAction<Asset[]>) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    // 添加单个资产
    addAsset: (state, action: PayloadAction<Asset>) => {
      // 保持置顶的在前面，或者根据 created_at 排序，这里简单 push
      // 如果需要更复杂的排序逻辑，可以在这里处理，或者在 select 时处理
      state.items.unshift(action.payload); // 新加的放前面
    },
    // 更新单个资产
    updateAsset: (state, action: PayloadAction<Asset>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    // 删除单个资产
    deleteAsset: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    // 设置加载状态
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    // 设置错误信息
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    }
  },
});

export const { 
  setAssets, 
  addAsset, 
  updateAsset, 
  deleteAsset, 
  setLoading, 
  setError 
} = assetsSlice.actions;

export default assetsSlice.reducer;
