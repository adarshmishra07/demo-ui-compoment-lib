import React, { useState } from "react";
import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check, Play, AlertTriangle } from "lucide-react";
import { Button, Card, Modal, Alert } from "./LocalLibrary";

interface ComponentDemo {
  id: string;
  name: string;
  description: string;
  component: React.ReactNode;
  code: string;
}

const ComponentShowcase: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState(0);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const copyToClipboard = async (code: string, demoId: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(demoId);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  const demos: ComponentDemo[] = [
    {
      id: "button",
      name: "Button",
      description:
        "Versatile buttons with glassmorphism effects and multiple variants",
      component: (
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="outline">Outline</Button>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" disabled>
              Disabled
            </Button>
            <Button variant="primary" loading>
              Loading
            </Button>
          </div>
        </div>
      ),
      code: `import { Button } from 'am-zy-components'

export function ButtonDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
      <div className="flex gap-3">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
      <div className="flex gap-3">
        <Button disabled>Disabled</Button>
        <Button loading>Loading</Button>
      </div>
    </div>
  )
}`,
    },
    {
      id: "card",
      name: "Card",
      description:
        "Beautiful cards with glassmorphism backgrounds and flexible layouts",
      component: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Basic Card</h3>
            <p className="text-gray-300">
              A simple card with glassmorphism effect and beautiful backdrop
              blur.
            </p>
          </Card>
          <Card hover className="p-6 flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Hover Card</h3>
            <p className="text-gray-300">
              This card has hover effects that enhance user interaction.
            </p>
            <Button variant="primary" size="sm">
              Action
            </Button>
          </Card>
        </div>
      ),
      code: `import { Card, Button } from 'am-zy-components'

export function CardDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-2">Basic Card</h3>
        <p className="text-gray-300">
          A simple card with glassmorphism effect.
        </p>
      </Card>
      
      <Card hover className="p-6">
        <h3 className="text-lg font-semibold mb-2">Interactive Card</h3>
        <p className="text-gray-300">
          This card has hover effects.
        </p>
        <Button variant="primary" size="sm" className="mt-4">
          Action
        </Button>
      </Card>
    </div>
  )
}`,
    },
    {
      id: "modal",
      name: "Modal",
      description: "Accessible modals with smooth animations and backdrop blur",
      component: (
        <div className="flex flex-col gap-4">
          <Button variant="primary" onClick={() => setShowModal(true)}>
            <Play className="mr-2 h-4 w-4" />
            Open Modal
          </Button>
          <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title="Demo Modal"
          >
            <div className="flex flex-col gap-4">
              <p className="text-gray-300">
                This is a beautiful modal with glassmorphism effects. It
                includes smooth animations and proper accessibility features.
              </p>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={() => setShowModal(false)}>
                  Confirm
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      ),
      code: `import { Modal, Button } from 'am-zy-components'
import { useState } from 'react'

export function ModalDemo() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>
      
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Demo Modal"
      >
        <div className="flex flex-col gap-4">
          <p>Modal content goes here...</p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setIsOpen(false)}>
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}`,
    },
    {
      id: "alert",
      name: "Alert",
      description:
        "Contextual alerts with different variants and auto-dismiss functionality",
      component: (
        <div className="flex flex-col gap-4 max-w-md">
          <Button variant="outline" onClick={() => setShowAlert(true)}>
            <AlertTriangle className="mr-2 h-4 w-4" />
            Show Alert
          </Button>
          {showAlert && (
            <Alert
              variant="info"
              title="Demo Alert"
              dismissible
              onDismiss={() => setShowAlert(false)}
            >
              This alert will automatically close after 3 seconds, or you can
              close it manually.
            </Alert>
          )}
          <Alert variant="success" title="Success">
            Operation completed successfully!
          </Alert>
          <Alert variant="warning" title="Warning">
            Please review your input before proceeding.
          </Alert>
        </div>
      ),
      code: `import { Alert, Button } from 'am-zy-components'
import { useState } from 'react'

export function AlertDemo() {
  const [showAlert, setShowAlert] = useState(false)

  return (
    <div className="flex flex-col gap-4">
      <Button onClick={() => setShowAlert(true)}>
        Show Alert
      </Button>
      
      {showAlert && (
        <Alert
          variant="info"
          title="Demo Alert"
          onClose={() => setShowAlert(false)}
          autoClose
          autoCloseDelay={3000}
        >
          This alert auto-closes after 3 seconds.
        </Alert>
      )}
      
      <Alert variant="success" title="Success">
        Operation completed successfully!
      </Alert>
      
      <Alert variant="warning" title="Warning">
        Please review your input.
      </Alert>
    </div>
  )
}`,
    },
  ];

  return (
    <section id="showcase" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Component
            </span>
            <span className="text-white ml-3">Showcase</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore our collection of production-ready components with live
            examples and code snippets.
          </p>
        </motion.div>

        {/* Demo Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {demos.map((demo, index) => (
            <Button
              key={demo.id}
              variant={activeDemo === index ? "primary" : "outline"}
              onClick={() => setActiveDemo(index)}
              size="sm"
            >
              {demo.name}
            </Button>
          ))}
        </motion.div>

        {/* Demo Content */}
        <motion.div
          key={activeDemo}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          {/* Live Demo */}
          <Card className="p-8">
            <div className="mb-6">
              <h3 className="text-2xl font-semibold mb-2">
                {demos[activeDemo].name}
              </h3>
              <p className="text-gray-300">{demos[activeDemo].description}</p>
            </div>
            <div className="bg-black/20 rounded-lg p-6 border border-white/10">
              {demos[activeDemo].component}
            </div>
          </Card>

          {/* Code Example */}
          <Card className="p-0 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h4 className="font-semibold text-white">Code Example</h4>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  copyToClipboard(demos[activeDemo].code, demos[activeDemo].id)
                }
              >
                {copiedCode === demos[activeDemo].id ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            </div>
            <div className="max-h-96 overflow-auto">
              <SyntaxHighlighter
                language="tsx"
                style={oneDark}
                customStyle={{
                  margin: 0,
                  background: "transparent",
                  fontSize: "14px",
                }}
              >
                {demos[activeDemo].code}
              </SyntaxHighlighter>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default ComponentShowcase;
