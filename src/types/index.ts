// TypeScript type definitions for the ZyFAi component library

export interface ComponentBaseProps {
  className?: string
  children?: React.ReactNode
}

export type ComponentVariant = 'primary' | 'secondary' | 'outline'
export type ComponentSize = 'sm' | 'md' | 'lg'

// Theme related types
export interface ThemeColors {
  accent: string
  background: {
    primary: string
    secondary: string
    tertiary: string
    elevated: string
  }
  glass: {
    bg: string
    border: string
    hover: string
  }
  text: {
    primary: string
    secondary: string
    muted: string
  }
  semantic: {
    success: string
    warning: string
    error: string
    info: string
  }
}

export interface GlassmorphismProps {
  blur?: 'sm' | 'md' | 'lg'
  opacity?: number
}