"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useSpring } from "motion/react";

interface ScrollProgressProps {
  className?: string;
}

export default function ScrollProgress({ className }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 50,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className={cn(
        "fixed inset-x-0 top-0 z-[1000] h-0.5 origin-left bg-primary",
        className,
      )}
      style={{
        scaleX,
      }}
    />
  );
}
