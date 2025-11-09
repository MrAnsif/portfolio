'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision';
import { Bot, Code, GitBranch, Monitor, Server } from 'lucide-react';

const Skills = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const highlightRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Run on initial load
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const highlightColors = [
      "rgba(255, 69, 0, 0.15)", // Orange-Red with transparency
      "rgba(255, 87, 34, 0.15)", // Deep Orange
      "rgba(255, 112, 67, 0.15)", // Lighter Orange
      "rgba(230, 74, 25, 0.15)", // Dark Orange
      "rgba(255, 140, 0, 0.15)", // Dark Orange for AI section
      "rgba(255, 69, 0, 0.20)", // Slightly more vibrant for the new section
    ];

    const container = containerRef.current;
    const highlight = highlightRef.current;

    if (container && highlight) {
      const gridItems = container.querySelectorAll(".grid-item");
      const firstItem = container.querySelector(".grid-item") as HTMLElement;

      gridItems.forEach((item, index) => {
        const gridItem = item as HTMLElement;
        gridItem.dataset.color = highlightColors[index % highlightColors.length];
        gridItem.dataset.index = index.toString();
      });

      const moveToElement = (element: HTMLElement | null) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();

          highlight.style.transform = `translate(${rect.left - containerRect.left}px, ${rect.top - containerRect.top}px)`;
          highlight.style.width = `${rect.width}px`;
          highlight.style.height = `${rect.height}px`;
          highlight.style.backgroundColor = element.dataset.color || '';

          // Update active index for mobile view
          setActiveIndex(element.dataset.index ? parseInt(element.dataset.index) : null);
        }
      };

      const moveHighlight = (e: MouseEvent) => {
        if (!isMobile) {
          setIsHovering(true);
          const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);

          if (hoveredElement && hoveredElement.classList.contains("grid-item")) {
            moveToElement(hoveredElement as HTMLElement);
          } else if (
            hoveredElement &&
            hoveredElement.parentElement &&
            hoveredElement.parentElement.classList.contains("grid-item")
          ) {
            moveToElement(hoveredElement.parentElement as HTMLElement);
          }
        }
      };

      const handleMouseLeave = () => {
        setIsHovering(false);
      };

      if (!isMobile) {
        moveToElement(firstItem);
      }
      container.addEventListener("mousemove", moveHighlight);
      container.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        container.removeEventListener("mousemove", moveHighlight);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [isMobile]);

  // Click handler for mobile
  const handleItemClick = (index: number) => {
    if (isMobile) {
      setActiveIndex(activeIndex === index ? null : index);

      const gridItems = containerRef.current?.querySelectorAll(".grid-item");
      if (gridItems && gridItems[index]) {
        const element = gridItems[index] as HTMLElement;
        const highlight = highlightRef.current;

        if (element && highlight && activeIndex !== index) {
          const rect = element.getBoundingClientRect();
          const containerRect = containerRef.current?.getBoundingClientRect() || { left: 0, top: 0 };

          highlight.style.transform = `translate(${rect.left - containerRect.left}px, ${rect.top - containerRect.top}px)`;
          highlight.style.width = `${rect.width}px`;
          highlight.style.height = `${rect.height}px`;
          highlight.style.backgroundColor = element.dataset.color || '';
        }
      }
    }
  };

  // Content for grid items - your development skills
  const gridContent = [
    {
      title: "Programming Languages & Data",
      desc: "JavaScript, TypeScript, Python, SQL",
      icon: <Code />
    },
    {
      title: "Frontend Development",
      desc: "React.js, Next.js, Tailwind CSS, Vite, GSAP, Lenis, ShadCN, HTML & CSS",
      icon: <Monitor />
    },
    {
      title: "Backend & Database",
      desc: "Node.js, Express.js, MongoDB, PostgreSQL, Prisma, REST APIs, JWT",
      icon: <Server />
    },
    {
      title: "AI & Integrations",
      desc: "OpenRouter AI models, Gemini API",
      icon: <Bot />,
      isNew: true
    },
    {
      title: "DevOps & Tools",
      desc: "Git, GitHub, Vercel, Render, Railway, Supabase, Cloudinary, Clerk, Stripe",
      icon: <GitBranch />
    }
  ];


  return (
    <div className="relative w-full min-h-[100svh] bg-black overflow-hidden">
      <BackgroundBeamsWithCollision>
        {/* Main content */}
        <div className="container relative w-full min-h-[100svh] flex flex-col justify-center items-center px-4 md:px-8 py-12 md:py-16" ref={containerRef}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16 md:mb-20 w-full"
          >
            <div className=" flex ">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 text-end leading-6  flex">
                <span className=''>
                  what <span className="text-orange-500 font-extrabold">SKILLS</span> <br /> <span className='text-2xl font-myfont2'>can i have</span>
                </span>
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: [0, 10, -10, 15, 0] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
                  className='text-white text-7xl md:text-9xl font-light -translate-y-4 md:-translate-y-9'
                >
                  <p className='text-white text-9xl font-light font-myfont2 -translate-y-4 rotate-15'>?</p>
                </motion.div>
              </h1>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid-main text-white relative mx-auto w-full max-w-6xl border border-white/10 rounded-2xl overflow-hidden"
          >
            {/* First row - 3 items */}
            <div className="grid-row grid grid-cols-1 md:grid-cols-3">
              {gridContent.slice(0, 3).map((item, index) => (
                <motion.div
                  key={`row1-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  onClick={() => handleItemClick(index)}
                  className={`grid-item group w-full px-8 py-12 flex flex-col justify-center items-center cursor-pointer transition-all duration-500 hover:bg-white/5 border-b border-white/10
                  ${index < 2 ? 'md:border-r border-white/10' : ''}`}
                >
                  <div className="relative z-10 text-left">
                    <div className="text-orange-500 group-hover:text-orange-400  duration-300 group-hover:scale-90 transform transition-transform">
                      {item.icon}
                      <h3 className="text-sm md:text-base font-bold mb-4 group-hover:text-orange-400 transition-colors duration-300">{item.title}</h3>
                    </div>
                    <p className={`text-xl md:text-2xl text-gray-300 leading-relaxed transition-all duration-500 group-hover:text-white
                    ${isMobile ? 'opacity-100' : ((isHovering ? activeIndex === index : true) ? 'opacity-100' : 'opacity-70')}`}
                    >
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Second row - 2 items */}
            <div className="grid-row grid grid-cols-1 md:grid-cols-2">
              {gridContent.slice(3).map((item, index) => (
                <motion.div
                  key={`row2-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  onClick={() => handleItemClick(index + 3)}
                  className={`grid-item group w-full px-8 py-12 flex flex-col justify-center items-center cursor-pointer transition-all duration-500 hover:bg-white/5
                  ${index === 0 ? 'md:border-r border-white/10' : ''}`}
                >
                  <div className="relative z-10 text-left">
                    <div className="text-orange-500 group-hover:text-orange-400 duration-300 group-hover:scale-90 transform transition-transform">
                      {item.icon}
                      <h3 className="text-sm md:text-base font-bold mb-4 group-hover:text-orange-400 transition-colors duration-300">{item.title}</h3>
                    </div>
                    <p className={`text-xl md:text-2xl text-gray-300 leading-relaxed transition-all duration-500 group-hover:text-white
                    ${isMobile ? 'opacity-100' : ((isHovering ? activeIndex === index + 3 : true) ? 'opacity-100' : 'opacity-70')}`}
                    >
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Highlight element - with modern glow effect */}
          {!isMobile && (
            <div
              className="highlight absolute top-0 left-0 pointer-events-none transition-all duration-500 ease-out opacity-60  blur-sm"
              ref={highlightRef}
            ></div>
          )}
        </div>
      </BackgroundBeamsWithCollision>
    </div>
  );
};

export default Skills;
