
import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  label: string;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'compostable' | 'recyclable' | 'non-recyclable';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'default',
  size = 'md',
  className = '',
  icon,
}) => {
  const variantStyles = {
    default: 'bg-eco-neutral-100 text-eco-neutral-800 border-eco-neutral-200',
    success: 'bg-eco-green/10 text-eco-green border-eco-green/20',
    warning: 'bg-eco-yellow/10 text-eco-yellow-dark border-eco-yellow/20',
    danger: 'bg-eco-red/10 text-eco-red border-eco-red/20',
    info: 'bg-eco-blue/10 text-eco-blue border-eco-blue/20',
    compostable: 'bg-eco-green/10 text-eco-green border-eco-green/20',
    recyclable: 'bg-eco-yellow/10 text-eco-yellow-dark border-eco-yellow/20',
    'non-recyclable': 'bg-eco-red/10 text-eco-red border-eco-red/20',
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'text-base px-3 py-1',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-medium',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {label}
    </span>
  );
};

export default Badge;
