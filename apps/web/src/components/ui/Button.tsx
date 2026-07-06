import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost' | 'outline' | 'ghost-outline' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xs' | 'icon';
  loading?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = '',
      variant = 'primary',
      size = 'md',
      loading = false,
      startIcon,
      endIcon,
      fullWidth = false,
      disabled,
      children,
      style,
      ...props
    },
    ref
  ) => {
    // Generate class names based on props
    const getVariantClass = () => {
      switch (variant) {
        case 'primary': return 'btn-primary';
        case 'secondary': return 'btn-secondary';
        case 'success': return 'btn-success';
        case 'danger': return 'btn-danger';
        case 'ghost': return 'btn-ghost';
        case 'outline': return 'btn-outline';
        case 'ghost-outline': return 'btn-ghost-outline';
        case 'white': return 'btn-white';
        default: return 'btn-primary';
      }
    };

    const getSizeClass = () => {
      switch (size) {
        case 'xs': return 'btn-xs';
        case 'sm': return 'btn-sm';
        case 'lg': return 'btn-lg';
        case 'icon': return 'btn-icon';
        case 'md':
        default:
          return ''; 
      }
    };

    const classes = [
      'btn',
      getVariantClass(),
      getSizeClass(),
      fullWidth ? 'w-full' : '',
      className
    ].filter(Boolean).join(' ');

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          ...style,
          width: fullWidth ? '100%' : style?.width
        }}
        {...props}
      >
        {loading && <Loader2 className="animate-spin" size={16} />}
        {!loading && startIcon}
        {children}
        {!loading && endIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
