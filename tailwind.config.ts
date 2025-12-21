import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // 如果不写在 extend 里，直接写在 theme 下，会覆盖掉 Tailwind 所有的默认配置(失去所有默认)
    extend: {
      // 配置文件的核心，用于定义“设计规范”
      // 保留 Tailwind 默认的样式（比如 text-red-500, mt-4），并增加自己的样式。
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        surface: {
          DEFAULT: 'var(--surface)',
          foreground: 'var(--surface-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
      },
    },
  },
  plugins: [],
};
export default config;

