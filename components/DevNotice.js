import { Construction } from 'lucide-react';
import { safeFetch } from '../lib/sanity/client';
import { siteSettingsQuery } from '../lib/sanity/queries';

const DEFAULT_TEXT = 'Website đang trong giai đoạn thử nghiệm, thông tin tour và giá có thể chưa chính xác. Vui lòng liên hệ Hotline/Zalo để xác nhận.';

export default async function DevNotice() {
  const settings = await safeFetch(siteSettingsQuery) || {};

  // Chưa từng chỉnh trong Studio (undefined) thì vẫn hiện; chỉ ẩn khi tắt hẳn
  if (settings.showDevNotice === false) return null;

  return (
    <div
      role="status"
      className="w-full bg-orange-50 dark:bg-orange-950/40 border-b border-orange-200 dark:border-orange-900/60 text-orange-800 dark:text-orange-200 transition-all duration-300"
    >
      <div className="max-w-[1380px] mx-auto px-4 md:px-8 py-2 flex items-start md:items-center justify-center gap-2 text-xs md:text-sm font-medium text-center">
        <Construction className="w-4 h-4 shrink-0 mt-0.5 md:mt-0 text-orange-500 dark:text-orange-400" aria-hidden="true" />
        <p>{settings.devNoticeText || DEFAULT_TEXT}</p>
      </div>
    </div>
  );
}
