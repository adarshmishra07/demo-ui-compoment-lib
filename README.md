# am-zy-components

React components inspired by ZyFAi's glassmorphism design system.

## Installation

```bash
npm install am-zy-components
# or
pnpm add am-zy-components
# or
yarn add am-zy-components
```

## Usage

```tsx
// Import styles in your root component or index.css
import 'am-zy-components/dist/style.css'

// Import components
import { Button, Card, Modal, Alert } from 'am-zy-components'

function App() {
  return (
    <div className="zyfi-theme-dark">
      <Card className="p-6">
        <h1>Welcome to ZyFAi UI</h1>
        <Button variant="primary">
          Get Started
        </Button>
      </Card>
    </div>
  )
}
```

## Tailwind CSS Configuration

If you're using Tailwind CSS, update your `tailwind.config.js` to include the component paths:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/am-zy-components/dist/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        'zyfi': {
          'accent': 'hsla(230, 100%, 67%, 1)',
          'bg-primary': '#121313',
          // ... other ZyFAi colors will be available via CSS variables
        }
      }
    },
  },
  plugins: [],
}
```

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build library
pnpm build

# Type checking
pnpm typecheck

# Linting
pnpm lint
```

## Components

- [x] Button - Primary, secondary, outline variants with glassmorphism styling
- [x] Card - Multiple elevation levels with glass background effects  
- [x] Modal - Backdrop blur with focus management
- [x] Alert - Success, warning, error variants with semantic colors
- [ ] Toast - Notification system with positioning and auto-dismiss (coming soon)

## License

MIT