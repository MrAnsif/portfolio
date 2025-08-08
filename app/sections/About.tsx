import React, { useEffect } from 'react'
import './About.css'
import Image from 'next/image';

const About = () => {
  useEffect(() => {
    const aboutSection = document.getElementById('about');

    const fillSvgPaths = () => {
      if (!aboutSection) return;

      const sectionTop = aboutSection.offsetTop;
      const sectionHeight = aboutSection.offsetHeight;
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Calculate scroll percentage (0 to 1) within the about section
      const scrollPercentage = Math.min(
        Math.max((scrollPosition - sectionTop) / (sectionHeight - viewportHeight), 0),
        1
      );

      // Animate vertical line (starts immediately, finishes at 50% scroll)
      const verticalLine = document.querySelector('.lines') as SVGPathElement;
      if (verticalLine) {
        const verticalProgress = Math.min(scrollPercentage * 0.9, 0.6); // Double speed
        const pathLength = verticalLine.getTotalLength();
        const drawLength = pathLength * verticalProgress;
        verticalLine.style.strokeDasharray = `${pathLength}`;
        verticalLine.style.strokeDashoffset = `${pathLength - drawLength}`;
      }

      // Animate diamond shape (starts at 30% scroll, finishes at 100%)
      const diamondShapes = document.querySelectorAll('.face') as NodeListOf<SVGPathElement>;
      if (diamondShapes.length > 0) {
        const diamondProgress = Math.max(0, (scrollPercentage - 0.5) / 0.9);

        diamondShapes.forEach(shape => {
          const pathLength = shape.getTotalLength();
          const drawLength = pathLength * diamondProgress;
          shape.style.strokeDasharray = `${pathLength}`;
          shape.style.strokeDashoffset = `${pathLength - drawLength}`;
        });
      }
    };

    // Initialize animations
    fillSvgPaths();

    // Add scroll event listener with debounce for performance
    let ticking = false;
    const scrollHandler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          fillSvgPaths();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return (
    <div id="about" className="relative h-[135vh] w-screen md:h-[165vh] bg-black"> {/* Changed to explicit height based on 3 screens */}


      <svg className='absolute top-1 -translate-y-1/2 right-3 w-[80%] max-w-2xl' width="414" height="1898" fill="none">
        <path className='face' fill="#fff" d="M123 1608c-3 7-2 20 1 19l1 1 3 4c1-1 0-4-1-4l-1-1v-1h-1c-1 2-2-1-2-5 0-9 4-16 11-19 3-2 4-1 2 1s-2 3 0 2l2-1h1c1 1 1 1 2-1l1-1 1 1h1l3 1 4 2 3 1 1 1 3 1 4 2 8 4c3 1 4 1 4-1 1-3 0-3-1-1v-2l1-2c2-1 4 1 2 3-1 1 0 1 2 2l2 2 1 1c2-1 10 1 10 2l1 2v3l1 2 1 1 2 3v3h1v1c-1 1-8-1-8-2-1-2-5-4-6-3v1l6 4c5 4 6 5 8 2 1-1 2-1 4 1l1 2-2-1h-1l-3 1v2h1c0-2 0-2 9 7 12 13 16 18 14 21v3c3 3 6 10 5 11l1 1c2 0 2 0 2-2l-5-12c-2-1-2-3 0-3 4-1 2-15-4-22-5-5-7-6-9-3s-2 3-2 1l-5-7c-5-5-9-14-7-15l-3-4c-4-3-5-4-9-4s-5-2-3-5c1-2 0-3-1-4-3-3-7-3-13-2h-8l3 1c1 0 2 1 2 3 2 4 1 5-2 2-2-3-3-3-6-4l-4-1-5-2c-5-1-6-2-2-2l2-1-5 1h-8c-2-1-9 6-11 9Zm47-3c2 2 2 4 0 6h-2l-1-3-1-2v-3l4 2Zm44 38 3 3 3 3v3l1 3 1 3c2 3 1 4-1 4s-3-1-4-3l-2-4c-1-1-1-2 1-2l-2-1c-3-1-3-1-3-5s1-6 3-4Zm-119 0-1 3c-1 1-1 4 1 5l-1 2 1 2 1 4v4c0 1 1 2 2 1l-1-2v-2c2-1 1-5-1-6v-2l-1-2v-2l2-3c-1-1 1-2 2-1v2c-1 1-1 1 0 0l1-2 1-2 2-2 3-3 3-1 3-1 2-1h1l3-1h5c2-1 2-1 0-1h-3c-2-2-5-1-9 1l-7 3c-4 0-8 4-9 7Zm7-4-3 3-1-1 4-2Z" />
        <path className='face' fill="#fff" d="m138 1609 2-1c3-3 2-3-1-1l-1 2Zm-41 42h2c2-3 3-1 2 5v7c1 2 1 1 2-6 0-10 0-11 1-10h1l-1-1-2 1c0 2 0 2-1 1-2 0-3 1-4 3Zm54-51 3 1c3 0 2 0-1-1h-2Zm-52 69v14l2 6 5 4c2 3 4 4 5 4v-1c-2-1-1-3 1-2l2-1h1v4c1 2 9 7 11 6l2 1 2-1 2-2h1l-4-1h-6c-1 0-4-2-6-5l-1-3h-3l-5 1-1-1-2-2-1-1v-2c-1-1-2-8-1-9v-3l-1 2c-1 5-3 4-2-1v-5l1-1 1-2c0-4-1-3-3 1Zm2 15 1 2v2c-1 0-2-4-1-5v1Z" />
        <path className='face' fill="#fff" d="m112 1690 3-1c1-2 1-2-1-2l-3 1 1 2Zm55-39-2 3c-1 2-2 6 0 6v-2c1-3 2-5 3-3l2-1c2-2 1-4-1-2v-1l4-2 2-1 2-3c2-3 2-3 0-3l-10 9Z" />
        <path className='face' fill="#fff" d="M180 1642c1 1 1 2-1 4l-4 4a2138 2138 0 0 0-7 10c2-3 2-3 1 0l-1 5c1 1 1 0 2-3 2-9 17-24 22-23h1l-14 1 1 2Zm-37 38c-1 3-3 6-4 5s-1 2-1 4c1 2 1 2 2 1v-1l-1-1 4-4 5-6 2-3c-1 0-1-1 2-2l1-1c-2-2-9 4-10 8Zm-10 15 3 3 2 1c1-1-1-4-5-6-2-1-2-1 0 2Zm12-8 4-3 4-6c-2 1-6 5-8 9Zm-6 7c1 2 1 2 3-2l2-2-3 1-2 3Zm20-17h4l3 5 2 2-2 1 2 1c2-1 5 9 3 13-1 5-8 13-12 14-2 0-2 0-10-7l-9-8 1 6 3 3 2 2-3-2-4-4-1-1c0 4 11 12 12 9h1l-1 3h2l4 1h3c7-5 9-8 12-12 4-6 3-11-3-20-3-6-3-7-2-9 3-5 4-5 8-1l6 4c3 1 3 0-1-2-5-2-4-3 2-1 10 4 15 2 23-9 4-6 5-10 1-14l-2-2 2 2 1 6c-1 6-9 16-15 18l-6-1c-4 0-5 0-5-3 0-2 0-2-1-1v2c2 2-4 0-7-3l-2-2-4 5c-2 3-4 4-5 3l-4 1c-1 1-1 1 2 1Zm-5 35c2 1 1 2-1 1l-2-1h3Z" />
        <path className='face' fill="#fff" d="m175 1659 3-2 2-3-3 2-2 3Zm10-10 6-1 2-1c-1-1-8 1-9 2h1Zm-5 8-3 5-1 3 2-2 2-4c1-2 1-2 2-1l2 1c2-1 1-2 0-2-2-1-2-1 0-2l2-1 1-2c2-2 3 0 2 2s-1 2 1 0c3-4 5-5 7-4v-1h-6c-7 3-8 4-11 8Zm-35 37c0 3 6 10 8 9l-1-1c-2-2-1-5 2-7l3-1h-3c-2 1-3 1-2-1 1-3 1-3 3-2h2c1-2-1-3-1-1 0 1-1 1-1-1 0-5-4-1-4 5l-1 5c-1 0-2-1-2-3l-1-3-2-1v2Zm14-14v2l1 1c2 0 3-1 1-3l-2-1v1Zm42-35 1 2-3-3 2 1Zm-20 20 3-1c5 0 15-9 13-11-1-1-1 0-3 2-2 3-3 4-7 6l-6 4Zm-19 25-3 5-1 2c1 1 1 0 3-1l3-10c-1-1-1-1-2 4Zm-15 27c0 2 12 10 14 8h-1l-4-3-4-3h-1c-1-1 0-1 1-1l-1-1-3-2c-1-1-2 0-1 2Zm48-36c0 1 0 2-2 3-2 0-3 1-3 3-1 3 0 3 1 1l2-2c1 1 3-1 3-4 1-2 0-3-1-3v2Zm-37 38c-1 1 2 5 6 6l4 1h1l-1-1-1-2h2l1 1c0-1-11-8-12-7v2Zm21-20 3-2 1-2-3 1-1 3Zm26-19h1c1-1 4 3 4 4s0 2 1 1c4-1 3-4-1-6-4-1-6-1-5 1Zm-13 14 2 1h1c0 1 2 1 3-1s-2-3-3-2l-2 1h-1v1Zm-14 17c1 2 2 5 4 6 2 2 3 3 4 1v-2l-3-1h-1l-1-2c-1-5-4-6-3-2Zm10-12c0 2 3 2 5 0 1-1 1-1-1-2-2-2-4 0-4 2Z" />
        <path className='face' fill="#fff" d="m199 1688-1 2c-2 1-1 2 1 2l9-8-3 1-4 2-2 1Zm-14 18 2-1 1-2-3 3Zm12-7v2c1 0 5-4 7-8 2-2 2-3 2-1 1 1 1 1 2-1 2-4 2-5 0-3l-11 11Zm-13 15c1 1 1 2 3 2l2-1c-1-2 2-7 4-9s3-3 2-4c-1 0-6 6-6 8 0 1-2 3-4 2l-1 2Zm20-11v1c-2 1-2 2 0 2v1h-2c-1-1-4 1-3 2h1c1-1 1-1 1 2 0 2 0 2 1 0l4-4v-3c-2 0-2 0-1-1l3-3-4 3Zm27-18 4 4 3 4 5 2v-1l-7-6c-5-5-6-6-5-3Zm-3 4h2l-1 2v6c0 4 1 3 2-2 1-4 0-8-2-8-1 0-2 1-1 2Zm-34 38-1 2v1h1l1 1c1 2 1 1 1-3l-1-3-1 2Zm13-12 3 2 2 1-1-1v-2c0-1-2-2-4-1v1Zm-9 15c3 4 5 4 5 1 0-2-1-4-2-2l-1 1h-2Zm30-26v7l1-3v-6l-1 2Zm-25 34 2 1c0-1-1-2-3-2-1 1 0 1 1 1Zm7-7 7-3 4-3 1-3c1-2 1-2-1 0l-2 2h-2l-8 6c-2 2-2 2 1 1Zm35-36 2 2c3 2 6 8 7 13l1 5v-3c2-1 1-8 0-10l-1-1v-2c-1-1 0-2 2 0l4 2h1l5 1h4l3-1c1 0 4-1 5-3l3-2c2 1 12-2 13-4h2l3-1 2-1 2 1v-1l4-2 6-2 3-1 3-1 12-5 5-2 5-1h1c2-1 5-1 12 1a388 388 0 0 0 20 9l11 3h2l-14-8c-9-5-26-10-29-9l-38 12-37 14c-2 1-12-1-19-3-5-2-5-2-5 0Zm-34 56 4 8 2 5-1-7-1-2h5l8 4v-1c-2 0-7-4-8-5l4-2 5-2h-2c-6 1-12 1-15-1l-4-2 3 5Zm24-15 2 2c1 1 2 1 1-1 0-2-2-4-3-3v2Zm-21 31-7 20-4 11a930 930 0 0 1-11 37c0 8 6 22 15 35 6 8 6 8 7 7l-1-2-2-4 1 1 4 2-3-3-7-7-4-6-2-5c0-2 0-2 0 0 2 3 13 14 15 14v1l2 1 4 1c1-1 0-2-2-2a65 65 0 0 1-23-26v-4l-1-1v-3l1-4 1-3 2-5c0-3 2-7 4-6v-1c-1-1 0-4 2-8l3-8 3-10-1 1c-1 2-1 2-1 0l1-6c0-4 2-7 2-4l1 2v3l-1 4 2-3c2-2 3-3 2-7-1-5-1-7 1-4l1 3 1 2 2 4 2 3c0 3 1 5 2 3l1 1h2v-1c-1 1-2 1-1-1l-4-9-6-12c-2-3-4-4-3-1Zm-7 28-1 5-1 1v-4c1-6 2-7 2-2Zm56-69 4-1 7-2h3l9-2 10-1h-10l-18 3c-5 1-5 2-5 3Zm-1 8v7c-1 2 5 7 9 8l5 2 3 7 6 16c1-1-1-10-3-11v-1l-1-5-2-5c1-1-1-2-5-4l-4-2-2-1c-1 0-2 0-1-1l-1-2-2-11-1-3-1 6Zm-29 38c0 9 1 22 3 22v-11c-2-12-1-19 1-18h2l-3-1h-3v8Zm9-10h6l2 1c1-2 12 0 16 2 8 4 11 7 10 9 0 2 0 2 1 0h3l3 1-12-9c-7-4-15-6-28-5-2 0-2 0-1 1Z" />
        <path className='face' fill="#fff" d="m255 1769 3 1c2 0 2 0 1-1l-1-1-2 1h-1Zm-3 8 12 6 3 1c1-1-6-6-9-6l-3-1-4-1c-2 0-2 1 1 1Zm-49 70 2 3 3 3 2 2c1-1 2 0 3 1l5 4 4 2c2 3 4 3 5 2 1-2 0-4-2-3l-5-3-7-5-7-5c-4-3-5-4-3-1Zm72-64c0 3 2 5 5 6h2v-3c2-3 1-5-3-5l-4 2Zm5-1c1 1 2 3 1 4-1 2-3 1-4-1-1-3 0-4 3-3Z" />
        <path className='lines' stroke="#fff" strokeWidth="3" d="m3 1693 206-205 202 202-205 205L3 1693ZM209 0v1487" />
      </svg>

      {/* Content sections */}
      <div className="h-[45vh] md:h-[60vh] md:pt-10 w-full grid place-content-center text-6xl md:text-7xl relative z-10 text-[#efb6a4]">
        <h1>About Me</h1>
      </div>

      <div className="h-[75vh]  md:h-[90vh]  relative z-10 text-white mx-10 ">
        <p className=' max-w-96 text-balance text-2xl ml-10 '><span className='font-serif italic'>Hi, Myself Ansif Muhammed.</span>  <br />I build websites, explore ideas, and enjoy turning tech into things that  <span className='font-serif italic'> actually work.</span> <br /> Right now, I’m diving deeper into backend and AI—  <span className='font-serif italic'>always learning, always creating.</span></p>
        <p className='font-myfont3 text-2xl absolute -bottom-10 md:bottom-5 left-1/2 md:-translate-x-1/2'>It’s not much, just everything I am.</p>
      </div>


      <div className="w-screen absolute -top-36 md:-top-1/5 lg:-top-1/2 left-0 rotate-180">
        <Image
          src='/images/orange-wave.svg'
          alt='orange-wave'
          layout="responsive"
          width={1200}
          height={100}
        />
      </div>




    </div>
  )
}

export default About