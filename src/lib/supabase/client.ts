import { createBrowserClient } from '@supabase/ssr'

/**
 * 模块级单例模式实现
 * 优点：
 * 1. 确保整个应用只创建一个 Supabase 客户端实例
 * 2. 避免重复创建实例导致的性能问题
 * 3. 保证所有组件共享同一个客户端实例，状态一致
 * 4. 适合客户端环境，因为模块只会加载一次
 */
let browserClient: ReturnType<typeof createBrowserClient> | null = null;

export function createClient() {
  // 懒加载单例：只在第一次调用时创建实例
  if (browserClient) {
    return browserClient;
  }
  
  // 创建新的客户端实例并缓存
  // 浏览器自动处理 cookie
  // 通过 HTTP 请求头自动发送和接收 cookies
  browserClient = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  
  return browserClient;
}

