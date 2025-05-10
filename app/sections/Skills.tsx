'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

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
      "#FF4500", // Orange-Red
      "#FF5722", // Deep Orange
      "#FF7043", // Lighter Orange
      "#E64A19", // Dark Orange
      "#FF3D00", // Bright Orange
      "#DD2C00", // Dark Orange-Red
      "#FF8A65", // Light Orange
      "#FFAB91", // Very Light Orange
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
      };

      const handleMouseLeave = () => {
        setIsHovering(false);
      };

      moveToElement(firstItem);
      container.addEventListener("mousemove", moveHighlight);
      container.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        container.removeEventListener("mousemove", moveHighlight);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  // Click handler for mobile
  const handleItemClick = (index: number) => {
    if (isMobile) {
      setActiveIndex(index);

      const gridItems = containerRef.current?.querySelectorAll(".grid-item");
      if (gridItems && gridItems[index]) {
        const element = gridItems[index] as HTMLElement;
        const highlight = highlightRef.current;

        if (element && highlight) {
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
      title: "Frontend Development",
      desc: "React, Next.js, TypeScript, Tailwind CSS",
      icon: (
        <svg className="w-8 h-8 mb-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4.75L19.25 9L12 13.25L4.75 9L12 4.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9.25 11.5L4.75 14L12 18.25L19.25 14L14.75 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      title: "Backend Development",
      desc: "Node.js, Express, Python, PostgreSQL",
      icon: (
        <svg className="w-8 h-8 mb-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 4L12 12L4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 4V20H20V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      title: "UI/UX Design",
      desc: "Figma, Adobe XD, Responsive Design",
      icon: (
        <svg className="w-8 h-8 mb-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 8V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M8 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    },
    {
      title: "Mobile Development",
      desc: "React Native, Flutter, iOS, Android",
      icon: (
        <svg className="w-8 h-8 mb-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="7" y="4" width="10" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <line x1="7" y1="8" x2="17" y2="8" stroke="currentColor" strokeWidth="1.5" />
          <line x1="7" y1="16" x2="17" y2="16" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )
    },
    {
      title: "DevOps",
      desc: "Docker, AWS, CI/CD, GitHub Actions",
      icon: (
        <svg className="w-8 h-8 mb-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      title: "Testing",
      desc: "Jest, Cypress, React Testing Library",
      icon: (
        <svg className="w-8 h-8 mb-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )
    },
    {
      title: "Database",
      desc: "MongoDB, Firebase, Redis, GraphQL",
      icon: (
        <svg className="w-8 h-8 mb-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M4 10H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M4 14H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M4 18H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    },
    {
      title: "Performance",
      desc: "Web Vitals, Lighthouse, Optimization",
      icon: (
        <svg className="w-8 h-8 mb-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M12 18V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M4 12H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M18 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M16.24 7.76L14.12 9.88" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M14.12 14.12L16.24 16.24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M7.76 16.24L9.88 14.12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M9.88 9.88L7.76 7.76" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    }
  ];

  return (
    <div className="relative w-full min-h-[100svh] bg-black overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_10%_20%,rgba(255,69,0,0.15)_0%,rgba(0,0,0,0)_80%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_90%_90%,rgba(255,69,0,0.1)_0%,rgba(0,0,0,0)_80%)]"></div>

        {/* Abstract mesh lines */}
        <svg className="absolute w-full h-full opacity-10" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,69,0,0.3)" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Accent circles */}
        <div className="absolute top-[-10%] left-[-5%] w-1/3 h-1/3 rounded-full bg-gradient-to-br from-orange-600/10 to-transparent blur-3xl"></div>
        <div className="absolute bottom-[-15%] right-[-10%] w-2/3 h-2/3 rounded-full bg-gradient-to-tl from-orange-600/10 to-transparent blur-3xl"></div>
      </div>

      {/* Main content */}
      <div className="container relative  w-full min-h-[100svh] flex flex-col justify-center items-center px-4 md:px-8 py-12 md:py-16" ref={containerRef}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16 w-full"
        >
          <div className=" flex ">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 text-end leading-6">
              what <span className="text-orange-500 font-extrabold">SKILLS</span> <br /> <span className='text-2xl font-myfont2'>can i have ?</span>
            </h1>
          </div>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid-main text-white relative mx-auto w-full max-w-5xl md:h-auto h-max flex flex-col border border-gray-800 rounded-xl overflow-hidden backdrop-blur-sm bg-black/40">
          {/* First row */}
          <div className="grid-row grid grid-cols-1 md:grid-cols-3 border-b border-gray-800">
            {gridContent.slice(0, 3).map((item, index) => (
              <div
                key={`row1-${index}`}
                onClick={() => handleItemClick(index)}
                className={`grid-item w-full px-6 py-8 flex flex-col justify-center items-center cursor-pointer transition-all duration-300 
                  ${index < 3 ? 'md:border-r border-b md:border-b-0 border-gray-800' : 'border-b md:border-b-0'}`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative z-10 text-center group"
                >
                  {item.icon}
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className={`text-sm text-gray-400 transition-all duration-300 
                    ${(isMobile && activeIndex === index) || (!isMobile && (isHovering ? activeIndex === index : true))
                      ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}
                  >
                    {item.desc}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Second row */}
          <div className="grid-row grid grid-cols-1 md:grid-cols-4">
            {gridContent.slice(4).map((item, index) => (
              <div
                key={`row2-${index}`}
                onClick={() => handleItemClick(index + 3)}
                className={`grid-item w-full px-6 py-8 flex flex-col justify-center items-center cursor-pointer transition-all duration-300
                  ${index < 3 ? 'md:border-r border-b md:border-b-0 border-gray-800' : ''}`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (index + 3) * 0.1 }}
                  className="relative z-10 text-center group"
                >
                  {item.icon}
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className={`text-sm text-gray-400 transition-all duration-300 
                    ${(isMobile && activeIndex === index + 3) || (!isMobile && (isHovering ? activeIndex === index + 3 : true))
                      ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}
                  >
                    {item.desc}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Highlight element - with improved visual effect */}
        <div
          className="highlight absolute top-0 left-0 pointer-events-none transition-all duration-300 ease-out opacity-20 rounded-lg"
          ref={highlightRef}
        ></div>

      </div>
      
    </div>
  );
};

export default Skills;