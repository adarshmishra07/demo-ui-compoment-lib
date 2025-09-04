import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Copy, Check, Package, Code, Sparkles, ExternalLink, Play, ArrowRight } from 'lucide-react'
import { Button, Card } from './LocalLibrary'

type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun'

const InstallationSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PackageManager>('npm')
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const installCommands = {
    npm: 'npm install am-zy-components',
    pnpm: 'pnpm add am-zy-components',
    yarn: 'yarn add am-zy-components',
    bun: 'bun add am-zy-components'
  }

  const quickStartCode = `import 'am-zy-components/dist/style.css'
import { Button, Card, Alert, Modal } from 'am-zy-components'

function App() {
  return (
    <div className="min-h-screen bg-[#121313] text-[#e4e7e7]">
      <div className="container mx-auto p-8">
        <Card elevation="medium" className="p-8">
          <h1 className="text-2xl font-bold mb-4">
            Welcome to ZyFAi UI
          </h1>
          <p className="text-gray-300 mb-6">
            Beautiful glassmorphism components ready to use.
          </p>
          <div className="flex gap-3">
            <Button variant="primary">
              Get Started
            </Button>
            <Button variant="secondary">
              Learn More
            </Button>
            <Button variant="outline">
              View Docs
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}`

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedCode(type)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <section id="installation" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-900/5 to-transparent" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 border border-indigo-500/30 text-sm text-indigo-200 mb-6">
            <Sparkles className="h-4 w-4" />
            Ready in minutes
          </motion.div>
          
          <motion.h2 variants={fadeInUp} className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">Quick</span>
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent ml-4">
              Installation
            </span>
          </motion.h2>
          
          <motion.p variants={fadeInUp} className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Get ZyFAi UI up and running in your project with just a few commands. 
            No complex setup, no configuration headaches.
          </motion.p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Quick Start Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Card elevation="high" className="overflow-hidden border border-white/10">
              {/* Header */}
              <div className="p-6 border-b border-white/10 bg-gradient-to-r from-indigo-500/10 to-cyan-500/10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white">
                      <Package className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">Install Package</h3>
                      <p className="text-sm text-gray-400">Choose your preferred package manager</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(installCommands[activeTab], 'install')}
                    className="shrink-0"
                  >
                    {copiedCode === 'install' ? (
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
                
                {/* Package Manager Tabs */}
                <div className="flex gap-2">
                  {Object.keys(installCommands).map((pm) => (
                    <Button
                      key={pm}
                      variant={activeTab === pm ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => setActiveTab(pm as PackageManager)}
                    >
                      {pm}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Command Display */}
              <div className="relative">
                <SyntaxHighlighter
                  language="bash"
                  style={oneDark}
                  customStyle={{
                    margin: 0,
                    background: 'rgba(0, 0, 0, 0.4)',
                    fontSize: '16px',
                    padding: '24px',
                  }}
                >
                  {installCommands[activeTab]}
                </SyntaxHighlighter>
              </div>
            </Card>
          </motion.div>

          {/* Usage Example */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card elevation="high" className="overflow-hidden border border-white/10">
              {/* Header */}
              <div className="p-6 border-b border-white/10 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      <Code className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">Quick Start Example</h3>
                      <p className="text-sm text-gray-400">Import and start using components immediately</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(quickStartCode, 'quickstart')}
                    className="shrink-0"
                  >
                    {copiedCode === 'quickstart' ? (
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
              </div>

              {/* Code Display */}
              <div className="relative">
                <div className="max-h-80 overflow-auto">
                  <SyntaxHighlighter
                    language="tsx"
                    style={oneDark}
                    customStyle={{
                      margin: 0,
                      background: 'rgba(0, 0, 0, 0.4)',
                      fontSize: '14px',
                      padding: '24px',
                    }}
                  >
                    {quickStartCode}
                  </SyntaxHighlighter>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 text-center"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                variant="primary"
                size="lg"
                className="group px-8 py-4 text-lg font-semibold"
                onClick={() => document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Play className="h-5 w-5 mr-2" />
                View Live Examples
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg"
                onClick={() => window.open('https://www.npmjs.com/package/am-zy-components', '_blank')}
              >
                <Package className="h-5 w-5 mr-2" />
                View on NPM
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <p className="text-gray-400 text-sm mt-6">
              Need help? Check out our{' '}
              <button 
                className="text-indigo-400 hover:text-indigo-300 transition-colors underline underline-offset-2"
                onClick={() => document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' })}
              >
                component documentation
              </button>
              {' '}or see the{' '}
              <button 
                className="text-indigo-400 hover:text-indigo-300 transition-colors underline underline-offset-2"
                onClick={() => window.open('https://github.com/yourusername/zyfai-ui-lib', '_blank')}
              >
                GitHub repository
              </button>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default InstallationSection