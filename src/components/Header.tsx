'use client';

import { motion } from 'framer-motion';

export const Header = () => {
  return (
    <header className="w-full h-[12%] flex items-center justify-between px-8  backdrop-blur-sm bg-white/80">
      {/* Left - Logo/Name */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
      >
        <h1 className="text-4xl font-black text-black">
          mani
        </h1>
      </motion.div>

      {/* Right - Navigation */}
      <motion.nav
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex gap-12 text-sm font-semibold"
      >
        {['', '', ''].map((item, idx) => (
          <motion.a
            key={item}
            href="#"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-gray-600 hover:text-black transition-all relative group cursor-pointer"
          >
            {item}
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-black"
              initial={{ width: 0 }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
        ))}
      </motion.nav>
    </header>
  );
};
