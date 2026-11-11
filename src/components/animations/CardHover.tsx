'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

interface CardHoverProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export const CardHover: React.FC<CardHoverProps> = ({
  children,
  className = '',
  glow = true,
  ...props
}) => {
  return (
    <motion.div
      whileHover={{ y: -3, transition: { duration: 0.2, ease: 'easeOut' } }}
      whileTap={{ scale: 0.99 }}
      className={`group relative rounded-2xl transition-all duration-300 ${
        glow ? 'hover:shadow-[0_12px_30px_-10px_rgba(79,70,229,0.15)]' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};
