import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'zh', 'ja', 'ko', 'zh-TW'],

  // Used when no locale matches
  defaultLocale: 'zh'
});

export const config = {
  // Match only internationalized pathnames
  // 过滤器数组。
  // 只有当用户访问的 URL 匹配数组中的规则时，上面的 createMiddleware 逻辑才会执行
  matcher: ['/', '/(zh|en|ja|ko|zh-TW)/:path*']
};

 