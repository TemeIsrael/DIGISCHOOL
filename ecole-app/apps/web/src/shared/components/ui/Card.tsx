import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  className = '',
  hover = false,
  children,
  ...props
}) => {
  return (
    <div
      className={`bg-white rounded-2xl border border-[#E5E7EB] p-6 transition-all duration-300 ${
        hover ? 'hover:shadow-lg hover:border-slate-200' : 'shadow-sm'
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
