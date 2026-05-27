/**
 * Cấu hình màu sắc và label cho từng category blog.
 * Dùng chung ở cả blog listing lẫn blog detail.
 */
export const CATEGORY_CONFIG = {
  'kinh-nghiem': {
    label: 'Kinh nghiệm du lịch',
    emoji: '🧭',
    className: 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300',
  },
  'dia-diem': {
    label: 'Địa điểm',
    emoji: '📍',
    className: 'bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300',
  },
  'am-thuc': {
    label: 'Ẩm thực',
    emoji: '🦞',
    className: 'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300',
  },
  'hoat-dong': {
    label: 'Hoạt động',
    emoji: '🏄',
    className: 'bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300',
  },
  'tin-tuc': {
    label: 'Tin tức',
    emoji: '📰',
    className: 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300',
  },
};

/**
 * Trả về config của category, hoặc fallback nếu không tìm thấy.
 */
export function getCategoryConfig(value) {
  return CATEGORY_CONFIG[value] || {
    label: value || 'Blog',
    emoji: '📝',
    className: 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300',
  };
}
