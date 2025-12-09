import React from 'react';
import { generateAvatarSVG } from './avatar-generator';

export interface AvatarProps {
  email: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  alt?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  email,
  size = 200,
  className = '',
  style = {},
  alt,
}) => {
  if (!email) {
    return null;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.warn(`Invalid email format: ${email}`);
    return null;
  }

  const svg = generateAvatarSVG(email, size);
  const dataUrl = `data:image/svg+xml,${encodeURIComponent(svg)}`;

  return (
    <img
      src={dataUrl}
      alt={alt || `Avatar for ${email}`}
      width={size}
      height={size}
      className={className}
      style={style}
    />
  );
};

export default Avatar;

