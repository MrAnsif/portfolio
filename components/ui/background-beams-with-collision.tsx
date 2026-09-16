"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React from "react";

export const BackgroundBeamsWithCollision = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  // const containerRef = useRef<HTMLDivElement>(null!);

  const beams = [
    {
      initialX: 10,
      translateX: 10,
      duration: 7,
      repeatDelay: 3,
      delay: 2,
    },
    {
      initialX: 600,
      translateX: 600,
      duration: 3,
      repeatDelay: 3,
      delay: 4,
    },
    {
      initialX: 100,
      translateX: 100,
      duration: 7,
      repeatDelay: 7,
      className: "h-6 rotate-45 border border-gray-300",
    },
    {
      initialX: 400,
      translateX: 400,
      duration: 5,
      repeatDelay: 14,
      delay: 4,
      className: "rotate-20",
    },
    {
      initialX: 800,
      translateX: 800,
      duration: 11,
      repeatDelay: 2,
      className: "h-20  ",
    },
    {
      initialX: 1000,
      translateX: 1000,
      duration: 4,
      repeatDelay: 2,
      className: "h-12 -rotate-30",
    },
    {
      initialX: 1200,
      translateX: 1200,
      duration: 6,
      repeatDelay: 4,
      delay: 2,
      className: "h-6 rotate-20",
    },
  ];

  return (
    <div
      className={cn(
        "relative flex flex-col w-full overflow-hidden",
        className
      )}
      style={{
        background: "radial-gradient(125% 125% at 50% 10%, #000000 40%, #310500 100%)",
      }}
    >
      {beams.map((beam, index) => (
        <div
          key={`track-${index}`}
          className="absolute top-0 bottom-0 w-px bg-white/5"
          style={{ left: beam.initialX }}
        />
      ))}

      {beams.map((beam, index) => (
        <BeamAnimation
          key={`beam-${index}`}
          beamOptions={beam}
        />
      ))}

      {children}
    </div>
  );
};

const BeamAnimation = ({
  beamOptions = {},
}: {
  beamOptions?: {
    initialX?: number;
    translateX?: number;
    initialY?: number;
    translateY?: number;
    rotate?: number;
    className?: string;
    duration?: number;
    delay?: number;
    repeatDelay?: number;
  };
}) => {
  return (
    <motion.div
      animate="animate"
      initial={{
        translateY: beamOptions.initialY || "-200px",
        translateX: beamOptions.initialX || "0px",
        rotate: beamOptions.rotate || 0,
      }}
      variants={{
        animate: {
          translateY: beamOptions.translateY || "1800px",
          translateX: beamOptions.translateX || "0px",
          rotate: beamOptions.rotate || 0,
        },
      }}
      transition={{
        duration: beamOptions.duration || 8,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        delay: beamOptions.delay || 0,
        repeatDelay: beamOptions.repeatDelay || 0,
      }}
      className={cn(
        "absolute left-0 top-20 m-auto h-14 w-px rounded-full bg-gradient-to-t from-red-500 via-orange-500 to-transparent",
        beamOptions.className
      )}
    />
  );
};