import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'ch', 'ja', 'ko', 'tw'],

  // Used when no locale matches
  defaultLocale: 'ch'
});

export const config = {
  // Match only internationalized pathnames
  // 过滤器数组。
  // 只有当用户访问的 URL 匹配数组中的规则时，上面的 createMiddleware 逻辑才会执行
  matcher: ['/', '/(ch|en|ja|ko|tw)/:path*']
};

 