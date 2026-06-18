'use client';

import * as React from 'react';
import { motion } from 'motion/react';

import {
  getVariants,
  useAnimateIconContext,
  IconWrapper } from './icon';



const animations = {
  default: {
    rect1: {
      initial: {
        x: 0,
      },
      animate: {
        x: -8,
        transition: {
          duration: 0.4,
          ease: 'easeInOut',
        },
      },
    },
    rect2: {
      initial: {
        x: 0,
      },
      animate: {
        x: 8,
        transition: {
          duration: 0.4,
          ease: 'easeInOut',
        },
      },
    },
    path1: {
      initial: {
        y: 0,
      },
      animate: {
        y: -10,
        transition: {
          duration: 0.4,
          ease: 'easeInOut',
        },
      },
    },
    path2: {
      initial: {
        y: 0,
      },
      animate: {
        y: 10,
        transition: {
          duration: 0.4,
          ease: 'easeInOut',
        },
      },
    },
  } ,
};

function IconComponent({ size, ...props }) {
  const { controls } = useAnimateIconContext();
  const variants = getVariants(animations);

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <motion.rect
        x={14}
        y={14}
        width={4}
        height={6}
        rx={2}
        variants={variants.rect1}
        initial="initial"
        animate={controls}
      />
      <motion.rect
        x={6}
        y={4}
        width={4}
        height={6}
        rx={2}
        variants={variants.rect2}
        initial="initial"
        animate={controls}
      />
      <motion.path
        d="M6 20h4 M6 14h2v6"
        variants={variants.path1}
        initial="initial"
        animate={controls}
      />
      <motion.path
        d="M14 4h2v6 M14 10h4"
        variants={variants.path2}
        initial="initial"
        animate={controls}
      />
    </motion.svg>
  );
}

function Binary(props) {
  return <IconWrapper icon={IconComponent} {...props} />;
}

export {
  animations,
  Binary,
  Binary as BinaryIcon,
  };
