import { HTMLAttributes } from 'react';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
}

export default function Skeleton({
  variant = 'rectangular',
  className = '',
  ...props
}: SkeletonProps) {
  // Base style: pulse animation with hardware-accelerated layer hint
  const baseClass = 'animate-pulse bg-gray-800/50 will-change-transform';

  const variantClasses = {
    text: 'h-4 w-full rounded',
    circular: 'rounded-full flex-shrink-0',
    rectangular: 'rounded-md',
  };

  return (
    <div
      className={`${baseClass} ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}
