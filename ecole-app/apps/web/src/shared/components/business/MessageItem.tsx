import React from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, MailOpen } from 'lucide-react';

export interface MessageItemProps {
  // New flexible API
  from?: string;
  subject?: string;
  preview?: string;
  date?: string;
  read?: boolean;
  onClick?: () => void;
  selected?: boolean;
  // Legacy API (backward compatible)
  objet?: string;
  expediteur?: string;
  lu?: boolean;
}

export const MessageItem: React.FC<MessageItemProps> = (props) => {
  const { t } = useTranslation();
  // Support both old and new prop names
  const from = props.from || props.expediteur || '';
  const subject = props.subject || props.objet || '';
  const preview = props.preview || '';
  const date = props.date || '';
  const read = props.read ?? props.lu ?? false;
  const selected = props.selected ?? false;

  return (
    <div
      onClick={props.onClick}
      className={`flex items-start gap-4 px-5 py-4 cursor-pointer select-none transition-all ${
        !read ? 'bg-digi-purple-bg/10' : ''
      } ${selected ? 'bg-digi-purple-bg/20 border-l-4 border-l-digi-purple' : 'border-l-4 border-l-transparent'} hover:bg-slate-50`}
    >
      <div className={`p-2.5 rounded-xl mt-0.5 flex-shrink-0 ${read ? 'bg-slate-100 text-slate-400' : 'bg-digi-purple-bg text-digi-purple'}`}>
        {read ? <MailOpen className="w-5 h-5" /> : <Mail className="w-5 h-5" />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h4 className={`text-sm tracking-tight truncate ${read ? 'font-semibold text-slate-700' : 'font-extrabold text-slate-800'}`}>
            {subject}
          </h4>
          <span className="text-[10px] text-slate-400 font-bold whitespace-nowrap">{date}</span>
        </div>
        <p className="text-xs text-slate-500 font-semibold">{from}</p>
        {preview && (
          <p className="text-xs text-slate-400 mt-1 truncate">{preview}</p>
        )}
      </div>
      {!read && (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-digi-purple-bg text-digi-purple flex-shrink-0">
          {t('messages.newBadge')}
        </span>
      )}
    </div>
  );
};
