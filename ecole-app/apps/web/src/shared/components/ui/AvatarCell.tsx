import React from 'react';

interface AvatarCellProps {
  url?: string | null;
  name: string;
  size?: number; // pixels, default 32
}

export const AvatarCell: React.FC<AvatarCellProps> = ({ url, name, size = 32 }) => {
  const fallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;
  const src = url && url !== '/uploads/anonym.png' ? url : fallback;
  return (
    <img
      src={src}
      alt="avatar"
      className="rounded-full object-cover border border-slate-200"
      style={{ width: size, height: size }}
    />
  );
};
