/**
 * 生成带 locale 的路径
 * @param locale - 语言代码
 * @param path - 路径（不需要包含 locale，会自动添加）
 * @returns 完整的路径，如 /zh/home 或 /zh
 */
export function path(locale: string, path?: string): string {
  if (!path || path === '/') {
    return `/${locale}`;
  }
  // 移除开头的斜杠（如果有）
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `/${locale}/${cleanPath}`;
}

