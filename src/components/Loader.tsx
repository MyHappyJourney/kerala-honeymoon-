import React from 'react';

interface LoaderProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  title = 'Loading...',
  subtitle,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-6 text-center select-none ${className}`}>
      <div className="flex items-center justify-center">
        <div className="loading">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
      {title && (
        <p className="mt-4 text-base sm:text-lg font-bold text-white tracking-wide drop-shadow-sm">
          {title}
        </p>
      )}
      {subtitle && (
        <p className="mt-1 text-xs sm:text-sm text-blue-200/90 font-medium max-w-xs">
          {subtitle}
        </p>
      )}
    </div>
  );
};
