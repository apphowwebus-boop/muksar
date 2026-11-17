import { useState } from 'react';
import { BRAND_LOGO_URL } from '../data/catalog';

interface BrandLogoProps {
  variant?: 'header' | 'footer';
}

export function BrandLogo({ variant = 'header' }: BrandLogoProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <span className="inline-flex items-center gap-3 whitespace-nowrap shrink-0">
      <span
        className={`relative inline-flex items-center justify-center overflow-hidden bg-black border border-neutral-800 shrink-0 ${
          variant === 'footer' ? 'w-12 h-12 rounded-md' : 'w-9 h-9 rounded'
        }`}
      >
        {!imgError ? (
          <img
            src={BRAND_LOGO_URL}
            alt="Muksar Sports Cube Monogram Logo"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover scale-110"
          />
        ) : (
          <svg
            viewBox="0 0 64 64"
            className="w-7 h-7"
            aria-hidden="true"
          >
            <polygon points="32,8 54,20 32,32 10,20" fill="#FFFFFF" />
            <polygon points="10,22 30,33 30,56 10,44" fill="#E10600" />
            <polygon points="34,33 54,22 54,44 34,56" fill="#FFFFFF" />
          </svg>
        )}
      </span>
      <span
        className={`font-display font-extrabold tracking-tight uppercase leading-none ${
          variant === 'footer' ? 'text-2xl' : 'text-xl'
        }`}
      >
        <span className="text-white">MUKSAR </span>
        <span className="text-[#E10600]">SPORTS</span>
      </span>
    </span>
  );
}
