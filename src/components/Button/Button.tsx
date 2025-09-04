import React from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { ComponentBaseProps, ComponentVariant, ComponentSize } from '../../types'
import { buttonHover, spinnerRotate } from '../../utils/animations'
import styles from './Button.module.css'

export interface ButtonProps extends ComponentBaseProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  /**
   * The visual variant of the button
   * - primary: Blue accent with glassmorphism background
   * - secondary: Transparent with glass border
   * - outline: Border-only with hover fill effect
   */
  variant?: ComponentVariant
  
  /**
   * The size of the button
   * - sm: Small (28px height)
   * - md: Medium (36px height)
   * - lg: Large (44px height)
   */
  size?: ComponentSize
  
  /**
   * Whether the button is in a loading state
   * Shows a spinner and disables interaction
   */
  loading?: boolean
  
  /**
   * Whether the button should take full width of its container
   */
  fullWidth?: boolean
  
  /**
   * Icon to display before the button text
   */
  leftIcon?: React.ReactNode
  
  /**
   * Icon to display after the button text
   */
  rightIcon?: React.ReactNode
  
  /**
   * Whether to disable hover animations (for buttons within staggered containers)
   */
  disableAnimations?: boolean
}

/**
 * Button component with glassmorphism styling and full accessibility support.
 * 
 * Features:
 * - Three visual variants (primary, secondary, outline)
 * - Three sizes (sm, md, lg)
 * - Loading states with spinner animation
 * - Full keyboard accessibility and ARIA support
 * - Glassmorphism effects using ZyFAi theme system
 * - Smooth transitions and hover effects
 * - WCAG AA compliant focus indicators
 * - Respects prefers-reduced-motion
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    children,
    className,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    fullWidth = false,
    leftIcon,
    rightIcon,
    type = 'button',
    disableAnimations = false,
    ...props
  }, ref) => {
    const isDisabled = disabled || loading
    
    const buttonClasses = [
      'zyfi-components', // Add zyfi-components wrapper class
      styles.button,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      loading && styles.loading,
      isDisabled && styles.disabled,
      fullWidth && styles.fullWidth,
      className
    ].filter(Boolean).join(' ')

    // Extract motion-specific props and HTML props
    const motionProps = {
      variants: !disableAnimations ? buttonHover : undefined,
      whileHover: !isDisabled && !disableAnimations ? "hover" : undefined,
      whileTap: !isDisabled && !disableAnimations ? "tap" : undefined,
    }

    return (
      <motion.button
        ref={ref}
        type={type}
        className={buttonClasses}
        disabled={isDisabled}
        aria-busy={loading}
        aria-disabled={isDisabled}
        {...motionProps}
        {...(props as any)}
      >
        {loading && (
          <motion.span 
            className={styles.spinner} 
            aria-hidden="true"
            variants={spinnerRotate}
            animate="animate"
          >
            <Loader2 className={styles.spinnerIcon} />
          </motion.span>
        )}
        
        {!loading && leftIcon && (
          <span className={styles.leftIcon} aria-hidden="true">
            {leftIcon}
          </span>
        )}
        
        <span className={styles.content}>
          {children}
        </span>
        
        {!loading && rightIcon && (
          <span className={styles.rightIcon} aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'