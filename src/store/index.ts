import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import assetsReducer from './features/assetsSlice';

// 创建 Store
export const makeStore = () => {
  return configureStore({
    reducer: {
      assets: assetsReducer,
    },
  });
};

// 推导类型
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

// 封装自定义 Hooks（组件里直接用这两个，不要用原生的）
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

