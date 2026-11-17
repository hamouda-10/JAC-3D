import React, { useState } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackLabel?: string;
  fallbackClassName?: string;
}

export function SafeImage({
  src,
  alt,
  className = '',
  fallbackLabel,
  fallbackClassName = '',
  ...rest
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt || fallbackLabel || 'Visual artwork'}
        className={`flex items-center justify-center bg-gradient-to-br from-[#191B20] via-[#121316] to-[#0C0C0C] text-[#D7E2EA]/50 text-xs uppercase tracking-widest p-4 text-center ${fallbackClassName || className}`}
      >
        <span>{fallbackLabel || alt || '3D Visual'}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      {...rest}
    />
  );
}
