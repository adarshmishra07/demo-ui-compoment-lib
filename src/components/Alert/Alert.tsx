import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertTriangle, XCircle, Info, X } from 'lucide-react'
import { ComponentBaseProps } from '../../types'
import styles from './Alert.module.css'

export type AlertVariant = 'success' | 'warning' | 'error' | 'info'

export interface AlertProps extends ComponentBaseProps {
  /**
   * The visual and semantic variant of the alert
   * - success: Green with CheckCircle icon for successful operations
   * - warning: Orange with AlertTriangle icon for warnings
   * - error: Red with XCircle icon for errors
   * - info: Blue with Info icon for informational messages
   */
  variant: AlertVariant
  
  /**
   * Whether the alert can be dismissed by the user
   * @default false
   */
  dismissible?: boolean
  
  /**
   * Callback function called when alert is dismissed
   */
  onDismiss?: () => void
  
  /**
   * Optional title for the alert
   */
  title?: string
  
  /**
   * Whether to show the variant icon
   * @default true
   */
  icon?: boolean
}

const variantIcons = {
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
  info: Info,
} as const

const variantAnimations = {
  success: {
    initial: { opacity: 0, y: -20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, scale: 0.9, y: -10 },
  },
  warning: {
    initial: { opacity: 0, y: -20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, scale: 0.9, y: -10 },
  },
  error: {
    initial: { opacity: 0, y: -20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, scale: 0.9, y: -10 },
  },
  info: {
    initial: { opacity: 0, y: -20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, scale: 0.9, y: -10 },
  },
} as const

/**
 * Alert component with glassmorphism styling, semantic variants, and smooth animations.
 * 
 * Features:
 * - Four semantic variants (success, warning, error, info)
 * - Optional dismissible functionality with smooth exit animation
 * - Framer Motion animations with reduced motion support
 * - Glassmorphism effects using ZyFAi theme system
 * - Full accessibility support with ARIA roles and screen reader compatibility
 * - Keyboard navigation support (Enter/Space to dismiss)
 * - WCAG AA compliant color contrast and focus indicators
 * - Lucide React icons for consistent visual hierarchy
 */
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({
    children,
    className,
    variant,
    dismissible = false,
    onDismiss,
    title,
    icon = true,
    ...props
  }, ref) => {
    const [isVisible, setIsVisible] = useState(true)
    const [isExiting, setIsExiting] = useState(false)

    const IconComponent = variantIcons[variant]
    const animations = variantAnimations[variant]

    const handleDismiss = () => {
      if (!dismissible || isExiting) return
      
      setIsExiting(true)
      // Small delay to allow exit animation to complete before calling onDismiss
      setTimeout(() => {
        setIsVisible(false)
        onDismiss?.()
      }, 300) // Match the animation duration
    }

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if ((event.key === 'Enter' || event.key === ' ') && dismissible) {
        event.preventDefault()
        handleDismiss()
      }
    }

    if (!isVisible) return null

    const alertClasses = [
      'zyfi-components', // Add zyfi-components wrapper class
      styles.alert,
      styles[`variant-${variant}`],
      dismissible && styles.dismissible,
      className
    ].filter(Boolean).join(' ')

    // Determine appropriate ARIA role based on variant
    const ariaRole = variant === 'error' ? 'alert' : 'status'
    const ariaLive = variant === 'error' ? 'assertive' : 'polite'

    return (
      <AnimatePresence mode="wait">
        {!isExiting && (
          <motion.div
            ref={ref}
            className={alertClasses}
            role={ariaRole}
            aria-live={ariaLive}
            aria-atomic="true"
            initial={animations.initial}
            animate={animations.animate}
            exit={animations.exit}
            transition={{
              duration: 0.3,
              ease: 'easeOut',
              // Respect user's motion preferences
              ...(window.matchMedia('(prefers-reduced-motion: reduce)').matches && {
                duration: 0.1,
                ease: 'linear'
              })
            }}
            {...props}
          >
            <div className={styles.content}>
              {icon && IconComponent && (
                <div className={styles.iconWrapper} aria-hidden="true">
                  <IconComponent className={styles.icon} />
                </div>
              )}
              
              <div className={styles.messageWrapper}>
                {title && (
                  <div className={styles.title}>
                    {title}
                  </div>
                )}
                
                <div className={styles.message}>
                  {children}
                </div>
              </div>
            </div>

            {dismissible && (
              <button
                type="button"
                className={styles.dismissButton}
                onClick={handleDismiss}
                onKeyDown={handleKeyDown}
                aria-label="Dismiss alert"
                tabIndex={0}
              >
                <X className={styles.dismissIcon} aria-hidden="true" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    )
  }
)

Alert.displayName = 'Alert'