/**
 * Shared animation constants and utilities for ZyFAi components
 * Based on architecture.md specifications
 */

import type { Variants, Transition } from 'framer-motion'

// Base transition configurations
export const transitions = {
  fast: { duration: 0.15, ease: [0.4, 0, 0.2, 1] } as Transition,
  base: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } as Transition,
  slow: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } as Transition,
} as const

// Reduced motion detection
export const shouldReduceMotion = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Get appropriate transition based on user preferences
export const getTransition = (transition: Transition): Transition => {
  if (shouldReduceMotion()) {
    return { ...transition, duration: 0.01 }
  }
  return transition
}

// Animation variants from architecture.md
export const fadeInUp: Variants = {
  initial: {
    opacity: 0,
    y: 60
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: getTransition(transitions.slow)
  }
}

export const fadeIn: Variants = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
    transition: getTransition(transitions.base)
  }
}

export const slideUp: Variants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: getTransition(transitions.base)
  }
}

// Stagger container pattern from architecture.md
export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
}

// Hover and tap animations for buttons
export const buttonHover: Variants = {
  hover: {
    scale: shouldReduceMotion() ? 1 : 1.02,
    transition: getTransition(transitions.fast)
  },
  tap: {
    scale: shouldReduceMotion() ? 1 : 0.98,
    transition: getTransition(transitions.fast)
  }
}

// Card hover lift effect
export const hoverLift: Variants = {
  hover: {
    y: shouldReduceMotion() ? 0 : -2,
    transition: getTransition(transitions.base)
  }
}

// Modal animations
export const modalBackdrop: Variants = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
    transition: getTransition(transitions.base)
  },
  exit: {
    opacity: 0,
    transition: getTransition(transitions.base)
  }
}

export const modalEnter: Variants = {
  initial: {
    scale: 0.9,
    opacity: 0,
    y: 20
  },
  animate: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: getTransition(transitions.base)
  },
  exit: {
    scale: 0.9,
    opacity: 0,
    y: -10,
    transition: getTransition(transitions.fast)
  }
}

// Mobile modal slide up
export const modalMobileSlide: Variants = {
  initial: {
    opacity: 0,
    y: '100%'
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: getTransition({
      duration: 0.4,
      ease: [0.32, 0.72, 0, 1]
    })
  },
  exit: {
    opacity: 0,
    y: '100%',
    transition: getTransition(transitions.base)
  }
}

// Loading spinner rotation
export const spinnerRotate: Variants = {
  animate: {
    rotate: shouldReduceMotion() ? 0 : 360,
    transition: {
      duration: shouldReduceMotion() ? 0 : 1,
      ease: 'linear',
      repeat: shouldReduceMotion() ? 0 : Infinity
    }
  }
}

// Alert animations
export const alertSlideIn: Variants = {
  initial: {
    opacity: 0,
    y: -20,
    scale: 0.95
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: getTransition(transitions.base)
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: -10,
    transition: getTransition(transitions.fast)
  }
}

// Toast animations (for future implementation)
export const toastSlideIn: Variants = {
  initial: {
    opacity: 0,
    x: 300,
    scale: 0.9
  },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: getTransition({
      duration: 0.4,
      ease: [0.36, 0.66, 0.04, 1]
    })
  },
  exit: {
    opacity: 0,
    x: 300,
    scale: 0.9,
    transition: getTransition(transitions.base)
  }
}

// Utility function to create custom variants with reduced motion support
export const createVariant = (
  initial: Record<string, any>,
  animate: Record<string, any>,
  exit?: Record<string, any>,
  transition: Transition = transitions.base
): Variants => {
  const variant: Variants = {
    initial,
    animate: {
      ...animate,
      transition: getTransition(transition)
    }
  }
  
  if (exit) {
    variant.exit = {
      ...exit,
      transition: getTransition(transition)
    }
  }
  
  return variant
}

// Animation presets for common use cases
export const presets = {
  fadeInUp,
  fadeIn,
  slideUp,
  staggerContainer,
  buttonHover,
  hoverLift,
  modalBackdrop,
  modalEnter,
  modalMobileSlide,
  spinnerRotate,
  alertSlideIn,
  toastSlideIn
} as const

export type AnimationPreset = keyof typeof presets