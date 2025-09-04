import React, { 
  useEffect, 
  useRef, 
  useCallback, 
  createContext, 
  useContext,
  useState 
} from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { ComponentBaseProps } from '../../types'
import { modalBackdrop, modalEnter, modalMobileSlide } from '../../utils/animations'
import styles from './Modal.module.css'

export type ModalSize = 'sm' | 'md' | 'lg'

export interface ModalProps extends ComponentBaseProps {
  /**
   * Whether the modal is open
   */
  isOpen: boolean
  
  /**
   * Callback function called when modal should close
   */
  onClose: () => void
  
  /**
   * Title for the modal (used for aria-labelledby)
   */
  title?: string
  
  /**
   * Size of the modal
   * - sm: 400px max-width
   * - md: 600px max-width  
   * - lg: 800px max-width
   */
  size?: ModalSize
  
  /**
   * Whether clicking the backdrop should close the modal
   * @default true
   */
  closeOnBackdropClick?: boolean
  
  /**
   * Whether pressing Escape should close the modal
   * @default true
   */
  closeOnEscape?: boolean
  
  /**
   * Element to focus when modal opens (defaults to first focusable element)
   */
  initialFocusRef?: React.RefObject<HTMLElement>
  
  /**
   * Element to focus when modal closes (defaults to previously focused element)
   */
  finalFocusRef?: React.RefObject<HTMLElement>
  
  /**
   * Whether to use mobile slide animation on small screens
   * @default true
   */
  mobileSlide?: boolean
}

interface ModalContextValue {
  onClose: () => void
  titleId: string
}

const ModalContext = createContext<ModalContextValue | null>(null)

// Focus trap utilities
const getFocusableElements = (container: HTMLElement): HTMLElement[] => {
  const focusableSelectors = [
    'button:not([disabled])',
    'input:not([disabled])',
    'textarea:not([disabled])',
    'select:not([disabled])',
    'details',
    'summary:not([disabled])',
    'a[href]',
    'audio[controls]',
    'video[controls]',
    '[contenteditable]:not([contenteditable="false"])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(', ')

  return Array.from(container.querySelectorAll(focusableSelectors))
    .filter(element => {
      // Additional checks for visibility and accessibility
      if (element instanceof HTMLElement) {
        const style = getComputedStyle(element)
        return (
          style.display !== 'none' &&
          style.visibility !== 'hidden' &&
          !element.hasAttribute('aria-hidden')
        )
      }
      return false
    }) as HTMLElement[]
}

// Body scroll lock management with counter for multiple modals
let scrollLockCounter = 0
let originalBodyStyle: string | null = null

const lockBodyScroll = () => {
  if (scrollLockCounter === 0) {
    const body = document.body
    originalBodyStyle = body.style.overflow
    body.style.overflow = 'hidden'
  }
  scrollLockCounter++
}

const unlockBodyScroll = () => {
  scrollLockCounter--
  if (scrollLockCounter === 0) {
    const body = document.body
    if (originalBodyStyle !== null) {
      body.style.overflow = originalBodyStyle
      originalBodyStyle = null
    } else {
      body.style.removeProperty('overflow')
    }
  }
}

/**
 * Modal component with glassmorphism overlay, focus management, and comprehensive accessibility.
 * 
 * Features:
 * - Portal rendering to document.body
 * - Focus trap implementation with Tab cycling
 * - Escape key and backdrop click handlers
 * - Body scroll lock with multi-modal support
 * - Compound component pattern (Modal.Header, Modal.Body, Modal.Footer)
 * - Full ARIA compliance and screen reader support
 * - Glassmorphism overlay effects using ZyFAi theme system
 * - Smooth enter/exit animations
 * - Mobile-responsive design
 * - Respects prefers-reduced-motion
 */
export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({
    isOpen,
    onClose,
    title,
    size = 'md',
    closeOnBackdropClick = true,
    closeOnEscape = true,
    initialFocusRef,
    finalFocusRef,
    mobileSlide = true,
    className,
    children,
    ...props
  }, ref) => {
    const modalRef = useRef<HTMLDivElement>(null)
    const backdropRef = useRef<HTMLDivElement>(null)
    const previousActiveElement = useRef<Element | null>(null)
    const titleId = useRef(`modal-title-${Math.random().toString(36).substr(2, 9)}`)
    const [isVisible, setIsVisible] = useState(false)

    // Focus trap state
    const focusableElements = useRef<HTMLElement[]>([])
    const firstFocusableElement = useRef<HTMLElement | null>(null)
    const lastFocusableElement = useRef<HTMLElement | null>(null)

    // Update focusable elements when modal content changes
    const updateFocusableElements = useCallback(() => {
      if (!modalRef.current) return

      focusableElements.current = getFocusableElements(modalRef.current)
      firstFocusableElement.current = focusableElements.current[0] || null
      lastFocusableElement.current = focusableElements.current[focusableElements.current.length - 1] || null
    }, [])

    // Handle focus trap
    const handleKeyDown = useCallback((event: KeyboardEvent) => {
      if (!isOpen) return

      if (event.key === 'Escape' && closeOnEscape) {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key === 'Tab') {
        updateFocusableElements()

        if (focusableElements.current.length === 0) {
          event.preventDefault()
          return
        }

        if (event.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstFocusableElement.current) {
            event.preventDefault()
            lastFocusableElement.current?.focus()
          }
        } else {
          // Tab
          if (document.activeElement === lastFocusableElement.current) {
            event.preventDefault()
            firstFocusableElement.current?.focus()
          }
        }
      }
    }, [isOpen, closeOnEscape, onClose, updateFocusableElements])

    // Handle backdrop click
    const handleBackdropClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
      if (closeOnBackdropClick && event.target === backdropRef.current) {
        onClose()
      }
    }, [closeOnBackdropClick, onClose])

    // Focus management
    useEffect(() => {
      if (isOpen) {
        // Store previously focused element
        previousActiveElement.current = document.activeElement

        // Lock body scroll
        lockBodyScroll()

        // Add event listeners
        document.addEventListener('keydown', handleKeyDown)

        // Small delay to ensure DOM is ready, then focus
        const focusTimeout = setTimeout(() => {
          setIsVisible(true)
          updateFocusableElements()

          if (initialFocusRef?.current) {
            initialFocusRef.current.focus()
          } else if (firstFocusableElement.current) {
            firstFocusableElement.current.focus()
          } else {
            // Fallback to modal container
            modalRef.current?.focus()
          }
        }, 10)

        return () => {
          clearTimeout(focusTimeout)
          document.removeEventListener('keydown', handleKeyDown)
          unlockBodyScroll()
          setIsVisible(false)

          // Restore focus
          if (finalFocusRef?.current) {
            finalFocusRef.current.focus()
          } else if (previousActiveElement.current instanceof HTMLElement) {
            previousActiveElement.current.focus()
          }
        }
      }
    }, [isOpen, handleKeyDown, updateFocusableElements, initialFocusRef, finalFocusRef])

    const modalClasses = [
      'zyfi-components', // Add zyfi-components wrapper class
      styles.modal,
      styles[`size-${size}`],
      isVisible && styles.visible,
      className
    ].filter(Boolean).join(' ')

    const contextValue: ModalContextValue = {
      onClose,
      titleId: titleId.current
    }

    // Detect mobile for animation variant
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640
    const modalVariant = mobileSlide !== false && isMobile ? modalMobileSlide : modalEnter

    return createPortal(
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            ref={backdropRef}
            className={styles.backdrop}
            onClick={handleBackdropClick}
            aria-hidden="true"
            variants={modalBackdrop}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <motion.div
              ref={ref || modalRef}
              className={modalClasses}
              role="dialog"
              aria-modal="true"
              aria-labelledby={title ? titleId.current : undefined}
              tabIndex={-1}
              variants={modalVariant}
              initial="initial"
              animate="animate"
              exit="exit"
              {...props}
            >
              <ModalContext.Provider value={contextValue}>
                {children}
              </ModalContext.Provider>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    )
  }
)

Modal.displayName = 'Modal'

// Modal Header Component
export interface ModalHeaderProps extends ComponentBaseProps {
  /**
   * Whether to show the close button
   * @default true
   */
  showCloseButton?: boolean
}

export const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ className, children, showCloseButton = true, ...props }, ref) => {
    const context = useContext(ModalContext)
    
    if (!context) {
      throw new Error('ModalHeader must be used within a Modal component')
    }

    const { onClose, titleId } = context

    return (
      <div
        ref={ref}
        className={[styles.header, className].filter(Boolean).join(' ')}
        {...props}
      >
        <div id={titleId} className={styles.title}>
          {children}
        </div>
        {showCloseButton && (
          <motion.button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close modal"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <X className={styles.closeIcon} aria-hidden="true" />
          </motion.button>
        )}
      </div>
    )
  }
)

ModalHeader.displayName = 'Modal.Header'

// Modal Body Component
export interface ModalBodyProps extends ComponentBaseProps {}

export const ModalBody = React.forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ className, children, ...props }, ref) => {
    const context = useContext(ModalContext)
    
    if (!context) {
      throw new Error('ModalBody must be used within a Modal component')
    }

    return (
      <div
        ref={ref}
        className={[styles.body, className].filter(Boolean).join(' ')}
        {...props}
      >
        {children}
      </div>
    )
  }
)

ModalBody.displayName = 'Modal.Body'

// Modal Footer Component
export interface ModalFooterProps extends ComponentBaseProps {}

export const ModalFooter = React.forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ className, children, ...props }, ref) => {
    const context = useContext(ModalContext)
    
    if (!context) {
      throw new Error('ModalFooter must be used within a Modal component')
    }

    return (
      <div
        ref={ref}
        className={[styles.footer, className].filter(Boolean).join(' ')}
        {...props}
      >
        {children}
      </div>
    )
  }
)

ModalFooter.displayName = 'Modal.Footer'

// Attach compound components as static properties
const ModalWithCompounds = Object.assign(Modal, {
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter
})

export default ModalWithCompounds