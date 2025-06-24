import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Timeline from './pages/Timeline';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import Page4 from './pages/Page4';
import Page5 from './pages/Page5';
import Footer from './pages/Footer';

import logo1 from './assets/logo2.jpg';

// Animation variants
const pageVariants = {
  initial: {
    opacity: 0,
    x: '100vw',
    scale: 0.8
  },
  in: {
    opacity: 1,
    x: 0,
    scale: 1
  },
  out: {
    opacity: 0,
    x: '-100vw',
    scale: 0.8
  }
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5
};

const logoVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 10,
      delay: 0.2
    }
  }
};

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if mobile on component mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);

    // Simulate loading for a smoother entry animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return <Page1 navigateToPage={setCurrentPage} />;
      case 2:
        return <Page2 navigateToPage={setCurrentPage} />;
      case 3:
        return <Page3 navigateToPage={setCurrentPage} />;
      case 4:
        return <Page4 navigateToPage={setCurrentPage} />;
      case 5:
        return <Page5 navigateToPage={setCurrentPage} />;
      default:
        return <Page1 navigateToPage={setCurrentPage} />;
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <motion.img
            src={logo1}
            alt="Wash On Wheels Logo"
            className="w-32 h-32"
            animate={{
              rotate: [0, 10, 0, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop"
            }}
          />
          <motion.div
            className="mt-4 text-lg sm:text-xl font-semibold"
            style={{ color: '#2f616d' }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Loading...
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col bg-gray-50"
    >
      <div className="flex-grow">
        {/* Header */}
        <header className="bg-white shadow-sm py-2 sm:py-4">
          <div className="container mx-auto px-4">
            <motion.div
              className="flex justify-center"
              variants={logoVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.img
                src={logo1}
                alt="Wash On Wheels Logo"
                className={`${isMobile ? 'w-24 h-24' : 'w-28 h-28 sm:w-32 sm:h-32'} object-contain`}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </motion.div>
          </div>
        </header>

        {/* Main content */}
        <main className="container mx-auto px-4 py-2 sm:py-4">
          {/* Timeline */}
          <Timeline currentPage={currentPage} />

          {/* Page content with animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="mt-2 sm:mt-4 overflow-hidden"
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </motion.div>
  );
};

export default App;