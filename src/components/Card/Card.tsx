import React from 'react'
import { motion } from 'framer-motion'
import { ComponentBaseProps } from '../../types'
import { fadeInUp, hoverLift, staggerContainer } from '../../utils/animations'
import styles from './Card.module.css'

export interface CardProps extends ComponentBaseProps {
  /**
   * The elevation level of the card affecting the glassmorphism blur intensity
   * - low: Subtle glass effect (blur(4px))
   * - medium: Moderate glass effect (blur(8px))
   * - high: Strong glass effect (blur(16px))
   */
  elevation?: 'low' | 'medium' | 'high'
  
  /**
   * The padding size for the card content
   * - sm: Small padding (12px)
   * - md: Medium padding (16px)
   * - lg: Large padding (24px)
   */
  padding?: 'sm' | 'md' | 'lg'
  
  /**
   * Whether the card should have hover effects
   */
  hover?: boolean
  
  /**
   * Click handler for interactive cards
   */
  onClick?: () => void
  
  /**
   * Content for the card
   */
  children?: React.ReactNode
  
  /**
   * Whether to animate the card on mount (fadeInUp animation)
   */
  animate?: boolean
  
  /**
   * Animation delay for staggered card animations (in seconds)
   */
  animationDelay?: number
  
  /**
   * Whether this card is part of a stagger container
   */
  isStaggerChild?: boolean
}

export interface CardHeaderProps extends ComponentBaseProps {
  children: React.ReactNode
}

export interface CardBodyProps extends ComponentBaseProps {
  children: React.ReactNode
}

export interface CardFooterProps extends ComponentBaseProps {
  children: React.ReactNode
}

/**
 * Card Header component for the card's header section
 */
export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className, ...props }, ref) => {
    const headerClasses = [
      styles.header,
      className
    ].filter(Boolean).join(' ')

    return (
      <motion.div
        ref={ref}
        className={headerClasses}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

CardHeader.displayName = 'CardHeader'

/**
 * Card Body component for the card's main content section
 */
export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ children, className, ...props }, ref) => {
    const bodyClasses = [
      styles.body,
      className
    ].filter(Boolean).join(' ')

    return (
      <motion.div
        ref={ref}
        className={bodyClasses}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

CardBody.displayName = 'CardBody'

/**
 * Card Footer component for the card's footer section
 */
export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className, ...props }, ref) => {
    const footerClasses = [
      styles.footer,
      className
    ].filter(Boolean).join(' ')

    return (
      <motion.div
        ref={ref}
        className={footerClasses}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

CardFooter.displayName = 'CardFooter'

/**
 * Card component with glassmorphism styling and flexible content areas.
 * 
 * Features:
 * - Three elevation levels with different backdrop-blur intensities
 * - Flexible padding sizes for different content densities
 * - Hover animations with enhanced glass effects
 * - Proper semantic HTML structure for accessibility
 * - Compound component pattern with Header, Body, and Footer
 * - Interactive card support with focus states
 * - WCAG AA compliant focus indicators
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({
    children,
    className,
    elevation = 'medium',
    padding = 'md',
    hover = false,
    onClick,
    animate = true,
    animationDelay,
    isStaggerChild = false,
    ...props
  }, ref) => {
    const isInteractive = Boolean(onClick)
    
    const cardClasses = [
      'zyfi-components', // Add zyfi-components wrapper class
      styles.card,
      styles[`elevation-${elevation}`],
      styles[`padding-${padding}`],
      hover && styles.hover,
      isInteractive && styles.interactive,
      className
    ].filter(Boolean).join(' ')

    const motionProps = {
      variants: isStaggerChild ? undefined : (animate !== false ? fadeInUp : undefined),
      initial: animate !== false && !isStaggerChild ? "initial" : undefined,
      animate: animate !== false && !isStaggerChild ? "animate" : undefined,
      whileHover: hover || isInteractive ? hoverLift.hover : undefined,
      transition: animationDelay ? { delay: animationDelay } : undefined
    }

    if (isInteractive) {
      return (
        <motion.button
          ref={ref as any}
          className={cardClasses}
          onClick={onClick}
          type="button"
          {...motionProps}
          {...(props as any)}
        >
          {children}
        </motion.button>
      )
    }

    return (
      <motion.div
        ref={ref}
        className={cardClasses}
        {...motionProps}
        {...(props as any)}
      >
        {children}
      </motion.div>
    )
  }
)

Card.displayName = 'Card'

/**
 * Container component for staggered card animations
 */
export interface CardContainerProps extends ComponentBaseProps {
  children: React.ReactNode
}

export const CardContainer = React.forwardRef<HTMLDivElement, CardContainerProps>(
  ({ children, className, ...props }, ref) => {
    const containerClasses = [
      className
    ].filter(Boolean).join(' ')

    return (
      <motion.div
        ref={ref}
        className={containerClasses}
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === Card) {
            return React.cloneElement(child as React.ReactElement<CardProps>, {
              isStaggerChild: true
            } as Partial<CardProps>)
          }
          return child
        })}
      </motion.div>
    )
  }
)

CardContainer.displayName = 'Card.Container'

// Attach compound components as static properties
const CardWithCompounds = Object.assign(Card, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
  Container: CardContainer
})

export default CardWithCompounds