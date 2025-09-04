import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Palette, Code, Zap, Shield, Smartphone, Accessibility } from 'lucide-react'
import { Card } from './LocalLibrary'

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
  color: string
}

const FeatureGrid: React.FC = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const features: Feature[] = [
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Modern Design",
      description: "Beautiful glassmorphism effects with carefully crafted animations and transitions that enhance user experience.",
      color: "from-indigo-500 to-purple-600"
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "TypeScript First",
      description: "Built from the ground up with TypeScript for better developer experience, autocompletion, and type safety.",
      color: "from-cyan-500 to-blue-600"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Performance Optimized",
      description: "Lightweight components with tree-shaking support, optimized bundle sizes, and zero-config performance.",
      color: "from-yellow-500 to-orange-600"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Production Ready",
      description: "Battle-tested components used in production applications with comprehensive testing and documentation.",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Mobile First",
      description: "Responsive design out of the box with mobile-first approach and touch-friendly interactions.",
      color: "from-pink-500 to-rose-600"
    },
    {
      icon: <Accessibility className="h-8 w-8" />,
      title: "Accessible",
      description: "WCAG 2.1 AA compliant with proper ARIA labels, keyboard navigation, and screen reader support.",
      color: "from-violet-500 to-purple-600"
    }
  ]

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    }
  }

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Why Choose</span>
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent ml-3">
              ZyFAi?
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Built for modern web applications with performance, accessibility, and developer experience in mind.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              <Card 
                hover 
                className="p-8 h-full group cursor-pointer relative overflow-hidden"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-white transition-colors">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors">
                    {feature.description}
                  </p>

                  {/* Decorative Element */}
                  <div className={`absolute top-4 right-4 w-20 h-20 bg-gradient-to-br ${feature.color} rounded-full opacity-5 group-hover:opacity-10 transition-opacity duration-500 blur-2xl`} />
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 text-sm text-white/90">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></span>
            Ready to use in your next project
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FeatureGrid