// import "./App.css";
import { useEffect } from "react";
import { motion } from "framer-motion";
import HeroSection from "./components/HeroSection";
import ComponentShowcase from "./components/ComponentShowcase";
import FeatureGrid from "./components/FeatureGrid";
import InstallationSection from "./components/InstallationSection";
import Footer from "./components/Footer";

function App() {
  useEffect(() => {
    // Smooth scroll behavior for the entire app
    document.documentElement.style.scrollBehavior = "smooth";

    // Handle reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      document.documentElement.style.scrollBehavior = "auto";
    }

    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <div className="zyfi-theme-dark min-h-screen overflow-x-hidden bg-gradient-to-br from-black to-gray-900">
      {/* Skip Navigation for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50"
      >
        Skip to main content
      </a>

      {/* Main Content */}
      <main id="main-content">
        <HeroSection />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <ComponentShowcase />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <FeatureGrid />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <InstallationSection />
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
