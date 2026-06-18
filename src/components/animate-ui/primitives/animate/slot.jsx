'use client';

import * as React from 'react';
import { motion, isMotionComponent } from 'motion/react';

function cn(...inputs) {
  return inputs.filter(Boolean).join(' ');
}

function mergeRefs(...refs) {
  return (node) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === 'function') {
        ref(node);
      } else {
        ref.current = node;
      }
    });
  };
}

function mergeProps(childProps, slotProps) {
  const merged = { ...childProps, ...slotProps };

  if (childProps.className || slotProps.className) {
    merged.className = cn(
      childProps.className,
      slotProps.className,
    );
  }

  if (childProps.style || slotProps.style) {
    merged.style = {
      ...childProps.style,
      ...slotProps.style,
    };
  }

  return merged;
}

function Slot({ children, ref, ...props }) {
  if (!React.isValidElement(children)) return null;

  const isAlreadyMotion =
    typeof children.type === 'object' &&
    children.type !== null &&
    isMotionComponent(children.type);

  const Base = React.useMemo(
    () =>
      isAlreadyMotion
        ? children.type
        : motion.create(children.type),
    [isAlreadyMotion, children.type],
  );

  const { ref: childRef, ...childProps } = children.props;

  const mergedProps = mergeProps(childProps, props);

  return (
    <Base {...mergedProps} ref={mergeRefs(childRef, ref)} />
  );
}

export { Slot };
