export function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function safeHtml(str: string) {
  // 只允许换行，其他全部转义
  return escapeHtml(str).replace(/\n/g, '<br>');
}