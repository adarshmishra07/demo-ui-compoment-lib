import React from 'react'
import { render, screen } from '@testing-library/react'
import { Card } from './Card'
import '@testing-library/jest-dom'

// Mock CSS modules
jest.mock('./Card.module.css', () => ({
  card: 'mock-card',
  'elevation-low': 'mock-elevation-low',
  'elevation-medium': 'mock-elevation-medium',
  'elevation-high': 'mock-elevation-high',
  'padding-sm': 'mock-padding-sm',
  'padding-md': 'mock-padding-md',
  'padding-lg': 'mock-padding-lg',
  hover: 'mock-hover',
  interactive: 'mock-interactive',
  header: 'mock-header',
  body: 'mock-body',
  footer: 'mock-footer'
}))

describe('Card', () => {
  it('renders basic card correctly', () => {
    render(<Card>Test content</Card>)
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('applies correct elevation classes', () => {
    const { container } = render(<Card elevation="high">Content</Card>)
    expect(container.firstChild).toHaveClass('mock-elevation-high')
  })

  it('applies correct padding classes', () => {
    const { container } = render(<Card padding="lg">Content</Card>)
    expect(container.firstChild).toHaveClass('mock-padding-lg')
  })

  it('renders as button when onClick is provided', () => {
    const handleClick = jest.fn()
    render(<Card onClick={handleClick}>Click me</Card>)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Click me')
  })

  it('renders compound components correctly', () => {
    render(
      <Card>
        <Card.Header>Header content</Card.Header>
        <Card.Body>Body content</Card.Body>
        <Card.Footer>Footer content</Card.Footer>
      </Card>
    )
    
    expect(screen.getByText('Header content')).toBeInTheDocument()
    expect(screen.getByText('Body content')).toBeInTheDocument()
    expect(screen.getByText('Footer content')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<Card className="custom-class">Content</Card>)
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('applies hover class when hover prop is true', () => {
    const { container } = render(<Card hover>Content</Card>)
    expect(container.firstChild).toHaveClass('mock-hover')
  })
})