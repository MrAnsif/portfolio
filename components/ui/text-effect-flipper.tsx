import React from "react"
import { motion } from "framer-motion"

const DURATION = 0.25
const STAGGER = 0.025

interface FlipLinkProps {
  children: string
  href: string
  rel?: string
  ariaLabel?: string
}

const FlipLink: React.FC<FlipLinkProps> = ({
  children,
  href,
  rel = "noopener noreferrer me",
  ariaLabel,
}) => {
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      target="_blank"
      rel={rel}
      href={href}
      aria-label={ariaLabel || `Ansif Muhammed on ${children}`}
      className="relative block overflow-hidden whitespace-nowrap text-4xl font-semibold uppercase text-white dark:text-white/90 sm:text-5xl md:text-6xl "
      style={{
        lineHeight: 0.75,
      }}
    >
      <div aria-hidden="true">
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: 0,
              },
              hovered: {
                y: "-100%",
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0" aria-hidden="true">
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: "100%",
              },
              hovered: {
                y: 0,
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.a>
  )
}

export default FlipLink
