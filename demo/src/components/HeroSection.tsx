import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Github, BookOpen } from "lucide-react";
import { Button } from "./LocalLibrary";

import ParticleSystem from "./ParticleSystem";

const HeroSection: React.FC = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 to-black">
      {/* Background Elements */}
      <ParticleSystem />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40 z-[3]" />

      {/* Hero Content */}
      <motion.div
        className="mx-auto px-6 py-20 relative z-10 flex flex-col gap-8"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div
          variants={fadeInUp}
          className="max-w-4xl w-full mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            variants={fadeInUp}
            className="inline-flex gap-2 items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm text-white/90 mb-8"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            Now available on npm
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              Beautiful
            </span>
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Glassmorphism
            </span>
            <br />
            <span className="text-white">Components</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Modern React components with stunning glassmorphism effects, built
            with TypeScript and designed for production applications.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              variant="primary"
              size="lg"
              className="group px-8 py-4 text-lg font-semibold"
              onClick={() => {
                document.getElementById("installation")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              Install Library
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <div className="flex gap-3">
              <Button
                variant="secondary"
                size="lg"
                className="px-6 py-4"
                onClick={() => {
                  document.getElementById("showcase")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                <BookOpen className="mr-2 h-5 w-5" />
                View Components
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="px-6 py-4"
                onClick={() =>
                  window.open(
                    "https://github.com/yourusername/zyfai-ui-lib",
                    "_blank"
                  )
                }
              >
                <Github className="mr-2 h-5 w-5" />
                GitHub
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeInUp}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto"
          >
            {[
              { label: "Components", value: "10+" },
              { label: "TypeScript", value: "100%" },
              { label: "Bundle Size", value: "<50KB" },
              { label: "Performance", value: "A+" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{
                y: [0, 16, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
