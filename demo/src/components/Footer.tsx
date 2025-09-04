import React from 'react'
import { motion } from 'framer-motion'
import { Github, BookOpen, Heart, ExternalLink } from 'lucide-react'
import { Button } from './LocalLibrary'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  const links = {
    documentation: [
      { name: 'Getting Started', href: '#installation' },
      { name: 'Components', href: '#showcase' },
      { name: 'Theming', href: '#' },
      { name: 'Examples', href: '#' }
    ],
    community: [
      { name: 'GitHub', href: 'https://github.com/yourusername/zyfai-ui-lib', external: true },
      { name: 'Issues', href: 'https://github.com/yourusername/zyfai-ui-lib/issues', external: true },
      { name: 'Discussions', href: 'https://github.com/yourusername/zyfai-ui-lib/discussions', external: true },
      { name: 'Contributing', href: 'https://github.com/yourusername/zyfai-ui-lib/blob/main/CONTRIBUTING.md', external: true }
    ],
    resources: [
      { name: 'Changelog', href: '#' },
      { name: 'Roadmap', href: '#' },
      { name: 'License', href: '#' },
      { name: 'NPM Package', href: 'https://npmjs.com/package/@zyfai/ui-lib', external: true }
    ]
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-black/40 border-t border-white/10 backdrop-blur-sm">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent -z-10" />
      
      <div className="container mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                ZyFAi UI
              </h3>
              <p className="text-gray-300 mt-2 leading-relaxed">
                Beautiful glassmorphism components for modern React applications. 
                Built with TypeScript and optimized for performance.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                className="p-2"
                onClick={() => window.open('https://github.com/yourusername/zyfai-ui-lib', '_blank')}
              >
                <Github className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="p-2"
                onClick={() => window.open('#', '_blank')}
              >
                <BookOpen className="h-5 w-5" />
              </Button>
            </div>
          </motion.div>

          {/* Documentation Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-semibold text-white mb-4">Documentation</h4>
            <ul className="space-y-3">
              {links.documentation.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                    onClick={(e) => {
                      if (link.href.startsWith('#')) {
                        e.preventDefault()
                        const element = document.querySelector(link.href)
                        element?.scrollIntoView({ behavior: 'smooth' })
                      }
                    }}
                  >
                    {link.name}
                    <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Community Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-semibold text-white mb-4">Community</h4>
            <ul className="space-y-3">
              {links.community.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    {link.name}
                    {link.external && (
                      <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-3">
              {links.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    {link.name}
                    {link.external && (
                      <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="border-t border-white/10 pt-12 mb-8"
        >
          <div className="max-w-md mx-auto text-center">
            <h4 className="font-semibold text-white mb-2">Stay updated</h4>
            <p className="text-gray-300 text-sm mb-4">
              Get notified when we release new components and features.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <Button variant="primary" size="md">
                Subscribe
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-white/10 gap-4"
        >
          <div className="flex items-center text-gray-300 text-sm">
            <span>© {currentYear} ZyFAi UI. Made with</span>
            <Heart className="h-4 w-4 mx-1 text-red-400 fill-current" />
            <span>for the community</span>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={scrollToTop}
            >
              Back to top
            </Button>
            <div className="text-gray-400 text-xs">
              v1.0.0
            </div>
          </div>
        </motion.div>

        {/* Back to Top Floating Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full flex items-center justify-center text-white shadow-lg backdrop-blur-sm z-50 md:hidden"
        >
          ↑
        </motion.button>
      </div>
    </footer>
  )
}

export default Footer