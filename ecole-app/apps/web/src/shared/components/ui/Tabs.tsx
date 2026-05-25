import React, { useState } from 'react';

export interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
}

export interface TabsProps {
  tabs: Tab[];
  activeTab?: string;
  defaultTab?: string;
  onTabChange?: (tabId: string) => void;
  variant?: 'underline' | 'pills';
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab: controlledActive,
  defaultTab,
  onTabChange,
  variant = 'underline',
  className = '',
}) => {
  const [internalActive, setInternalActive] = useState(defaultTab || tabs[0]?.id || '');
  const activeId = controlledActive ?? internalActive;

  const handleChange = (tabId: string) => {
    if (!controlledActive) setInternalActive(tabId);
    onTabChange?.(tabId);
  };

  const baseBtn = 'inline-flex items-center gap-2 font-semibold text-sm transition-all duration-200 select-none whitespace-nowrap';

  if (variant === 'pills') {
    return (
      <div className={`flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl ${className}`} role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={tab.id === activeId}
            onClick={() => handleChange(tab.id)}
            className={`${baseBtn} px-4 py-2 rounded-lg ${
              tab.id === activeId
                ? 'bg-white text-digi-purple shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab.icon}
            {tab.label}
            {tab.badge != null && (
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  tab.id === activeId
                    ? 'bg-digi-purple-bg text-digi-purple'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    );
  }

  // Underline variant (default)
  return (
    <div className={`flex items-center border-b border-slate-200 ${className}`} role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={tab.id === activeId}
          onClick={() => handleChange(tab.id)}
          className={`${baseBtn} px-4 py-3 border-b-2 -mb-px ${
            tab.id === activeId
              ? 'border-digi-purple text-digi-purple'
              : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
          }`}
        >
          {tab.icon}
          {tab.label}
          {tab.badge != null && (
            <span
              className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                tab.id === activeId
                  ? 'bg-digi-purple-bg text-digi-purple'
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              {tab.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};
