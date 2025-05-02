'use client';

import React, { useEffect } from 'react'
import './page.css'
import { CubesData } from '../components/CubesData.js'
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis'



const page = () => {

  useEffect(() => {
    const lenis = new Lenis()
    gsap.registerPlugin(ScrollTrigger);

    lenis.on("scroll", ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    const stickySection = document.querySelector(".sticky-1") as HTMLElement;
    const logo = document.querySelector(".logo") as HTMLElement;
    const cubesContainer = document.querySelector(".cubes") as HTMLElement;
    const header1 = document.querySelector(".header-1") as HTMLElement;
    const header2 = document.querySelector(".header-2") as HTMLElement;

    const stickyHeight = window.innerHeight * 4

    const cubesFaces = document.querySelectorAll('.cube > div')
    let imageCounter = 1

    cubesFaces.forEach((face) => {
      const img = document.createElement("img")
      img.src = `/images/img (${imageCounter}).jpg`
      img.alt = `cube image ${imageCounter}`
      face.appendChild(img)
      imageCounter++
      console.log(face)
    })

    const interpolate = (start: number, end: number, progress: number) => {
      return start + (end - start) * progress

    }

    ScrollTrigger.create({
      trigger: stickySection,
      start: "top top",
      end: `+=${stickyHeight}px`,
      scrub: 1,
      pin: true,
      pinSpacing: true,
      onUpdate: (self) => {
        const initialProgress = Math.min(self.progress * 20, 1)
        logo.style.filter = `blur(${interpolate(0, 20, initialProgress)}px)`
        const logoOpacityProgress = self.progress >= 0.02 ? Math.min((self.progress - 0.02) * 100, 1) : 0
        logo.style.opacity = `${1 - logoOpacityProgress}`

        const cubesOpacityProgress = self.progress > 0.01 ? Math.min((self.progress - 0.01) * 100, 1) : 0
        cubesContainer.style.opacity = `${cubesOpacityProgress}`

        const header1Progress = Math.min(self.progress * 2.5, 1)
        header1.style.transform = `translate(-50%, -50%) scale(${interpolate(1, 1.5, header1Progress)})`

        header1.style.filter = `blur(${interpolate(0, 20, header1Progress)}px)`
        header1.style.opacity = `${1 - header1Progress}`;


        const header2StartProgress = (self.progress - 0.4) * 10;
        const header2Progress = Math.max(0, Math.min(header2StartProgress, 1));

        const header2Scale = interpolate(0.75, 1, header2Progress);
        const header2Blur = interpolate(10, 0, header2Progress);

        header2.style.transform = `translate(-50%, -50%) scale(${header2Scale})`;
        header2.style.filter = `blur(${header2Blur}px)`;
        header2.style.opacity = `${ header2Progress}`;

        
        const firstPhaseProgress = Math.min(self.progress * 2, 1)
        const secondPhaseProgress = self.progress >= 0.5 ? (self.progress - 0.5) * 2 : 0
        Object.entries(CubesData).forEach(([cubeclass, data]) => {
          const cube = document.querySelector(`.${cubeclass}`) as HTMLElement
          const { initial, final } = data

          const currentTop = interpolate(
            initial.top,
            final.top,
            firstPhaseProgress
          )

          const currentLeft = interpolate(
            initial.left,
            final.left,
            firstPhaseProgress
          );

          const currentRotateX = interpolate(
            initial.rotateX,
            final.rotateX,
            firstPhaseProgress
          )

          const currentRotateY = interpolate(
            initial.rotateY,
            final.rotateY,
            firstPhaseProgress
          )

          const currentRotateZ = interpolate(
            initial.rotateZ,
            final.rotateZ,
            firstPhaseProgress
          )

          const currentZ = interpolate(
            initial.Z,
            final.Z,
            firstPhaseProgress
          )

          let additionalRotation = 0

          if (cubeclass === "cube-2") {
            additionalRotation = interpolate(0, 180, secondPhaseProgress);
          } else if (cubeclass === "cube-4") {
            additionalRotation = interpolate(0, -180, secondPhaseProgress);
          }

          cube.style.top = `${currentTop}%`;
          cube.style.left = `${currentLeft}%`;
          cube.style.transform = `
              translate3d(-50%, -50%, ${currentZ}px)
              rotateX(${currentRotateX}deg)
              rotateY(${currentRotateY + additionalRotation}deg)
              rotateZ(${currentRotateZ}deg)
            `;
        })
      }
    })

  }, [])

  return (
    <div className='w-screen h-[600vh]'>

      <section className='sticky-1 relative w-screen h-screen overflow-hidden bg-[#190001] text-white'>
        <div className="logo absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-[24px] ">
          <div className=' w-80'>
            <img src="/images/logo-nobg.png" alt="" />
          </div>
        </div>

        <div className="cubes absolute top-0 left-0 w-screen h-screen" style={{ transformStyle: 'preserve-3d', perspective: '10000px' }}>
          <div className="cube cube-1 absolute w-[150px] h-[150px] top-[-55%] left-[37.5%]" style={{ transformStyle: 'preserve-3d', transform: 'translate3d(-50%, -50%, -30000px) rotateX(360deg) rotateY(-360deg) rotateZ(-48deg)' }}>
            <div className="front absolute w-full h-full bg-amber-500/50 transform" style={{ transform: 'translateZ(75px)' }}></div>
            <div className="back absolute w-full h-full bg-amber-600/50 transform" style={{ transform: 'rotateY(180deg) translateZ(75px)' }}></div>
            <div className="right absolute w-full h-full bg-amber-700/50 transform" style={{ transform: 'rotateY(90deg) translateZ(75px)' }}></div>
            <div className="left absolute w-full h-full bg-amber-800/50 transform" style={{ transform: 'rotateY(-90deg) translateZ(75px)' }}></div>
            <div className="top absolute w-full h-full bg-amber-900/50 transform" style={{ transform: 'rotateX(90deg) translateZ(75px)' }}></div>
            <div className="bottom absolute w-full h-full bg-amber-400/50 transform" style={{ transform: 'rotateX(-90deg) translateZ(75px)' }}></div>
          </div>

          <div className="cube cube-2 absolute w-[150px] h-[150px] top-[-35%] left-[32.5%]" style={{ transformStyle: 'preserve-3d', transform: 'translate3d(-50%, -50%, -30000px) rotateX(-180deg) rotateY(180deg) rotateZ(90deg)' }}>
            <div className="front absolute w-full h-full bg-amber-500/50 transform" style={{ transform: 'translateZ(75px)' }}></div>
            <div className="back absolute w-full h-full bg-amber-600/50 transform" style={{ transform: 'rotateY(180deg) translateZ(75px)' }}></div>
            <div className="right absolute w-full h-full bg-amber-700/50 transform" style={{ transform: 'rotateY(90deg) translateZ(75px)' }}></div>
            <div className="left absolute w-full h-full bg-amber-800/50 transform" style={{ transform: 'rotateY(-90deg) translateZ(75px)' }}></div>
            <div className="top absolute w-full h-full bg-amber-900/50 transform" style={{ transform: 'rotateX(90deg) translateZ(75px)' }}></div>
            <div className="bottom absolute w-full h-full bg-amber-400/50 transform" style={{ transform: 'rotateX(-90deg) translateZ(75px)' }}></div>
          </div>

          <div className="cube cube-3 absolute w-[150px] h-[150px] top-[65%] left-[50%]" style={{ transformStyle: 'preserve-3d', transform: 'translate3d(-50%, -50%, -30000px) rotateX(-90deg) rotateY(90deg) rotateZ(-180deg)' }}>
            <div className="front absolute w-full h-full bg-amber-500/50 transform" style={{ transform: 'translateZ(75px)' }}></div>
            <div className="back absolute w-full h-full bg-amber-600/50 transform" style={{ transform: 'rotateY(180deg) translateZ(75px)' }}></div>
            <div className="right absolute w-full h-full bg-amber-700/50 transform" style={{ transform: 'rotateY(90deg) translateZ(75px)' }}></div>
            <div className="left absolute w-full h-full bg-amber-800/50 transform" style={{ transform: 'rotateY(-90deg) translateZ(75px)' }}></div>
            <div className="top absolute w-full h-full bg-amber-900/50 transform" style={{ transform: 'rotateX(90deg) translateZ(75px)' }}></div>
            <div className="bottom absolute w-full h-full bg-amber-400/50 transform" style={{ transform: 'rotateX(-90deg) translateZ(75px)' }}></div>
          </div>

          <div className="cube cube-4 absolute w-[150px] h-[150px] top-[-35%] left-[50%]" style={{ transformStyle: 'preserve-3d', transform: 'translate3d(-50%, -50%, -30000px) rotateX(-90deg) rotateY(90deg) rotateZ(-180deg)' }}>
            <div className="front absolute w-full h-full bg-amber-500/50 transform" style={{ transform: 'translateZ(75px)' }}></div>
            <div className="back absolute w-full h-full bg-amber-600/50 transform" style={{ transform: 'rotateY(180deg) translateZ(75px)' }}></div>
            <div className="right absolute w-full h-full bg-amber-700/50 transform" style={{ transform: 'rotateY(90deg) translateZ(75px)' }}></div>
            <div className="left absolute w-full h-full bg-amber-800/50 transform" style={{ transform: 'rotateY(-90deg) translateZ(75px)' }}></div>
            <div className="top absolute w-full h-full bg-amber-900/50 transform" style={{ transform: 'rotateX(90deg) translateZ(75px)' }}></div>
            <div className="bottom absolute w-full h-full bg-amber-400/50 transform" style={{ transform: 'rotateX(-90deg) translateZ(75px)' }}></div>
          </div>

          <div className="cube cube-5 absolute w-[150px] h-[150px] top-[-55%] left-[62.5%]" style={{ transformStyle: 'preserve-3d', transform: 'translate3d(-50%, -50%, -30000px) rotateX(180deg) rotateY(180deg) rotateZ(-135deg)' }}>
            <div className="front absolute w-full h-full bg-amber-500/50 transform" style={{ transform: 'translateZ(75px)' }}></div>
            <div className="back absolute w-full h-full bg-amber-600/50 transform" style={{ transform: 'rotateY(180deg) translateZ(75px)' }}></div>
            <div className="right absolute w-full h-full bg-amber-700/50 transform" style={{ transform: 'rotateY(90deg) translateZ(75px)' }}></div>
            <div className="left absolute w-full h-full bg-amber-800/50 transform" style={{ transform: 'rotateY(-90deg) translateZ(75px)' }}></div>
            <div className="top absolute w-full h-full bg-amber-900/50 transform" style={{ transform: 'rotateX(90deg) translateZ(75px)' }}></div>
            <div className="bottom absolute w-full h-full bg-amber-400/50 transform" style={{ transform: 'rotateX(-90deg) translateZ(75px)' }}></div>
          </div>

          <div className="cube cube-6 absolute w-[150px] h-[150px] top-[-35%] left-[67.5%]" style={{ transformStyle: 'preserve-3d', transform: 'translate3d(-50%, -50%, -30000px) rotateX(-90deg) rotateY(-180deg) rotateZ(-180deg)' }}>
            <div className="front absolute w-full h-full bg-amber-500/50 transform" style={{ transform: 'translateZ(75px)' }}></div>
            <div className="back absolute w-full h-full bg-amber-600/50 transform" style={{ transform: 'rotateY(180deg) translateZ(75px)' }}></div>
            <div className="right absolute w-full h-full bg-amber-700/50 transform" style={{ transform: 'rotateY(90deg) translateZ(75px)' }}></div>
            <div className="left absolute w-full h-full bg-amber-800/50 transform" style={{ transform: 'rotateY(-90deg) translateZ(75px)' }}></div>
            <div className="top absolute w-full h-full bg-amber-900/50 transform" style={{ transform: 'rotateX(90deg) translateZ(75px)' }}></div>
            <div className="bottom absolute w-full h-full bg-amber-400/50 transform" style={{ transform: 'rotateX(-90deg) translateZ(75px)' }}></div>
          </div>
        </div>

        <div className="header-1 absolute top-1/2 left-1/2 -translate-1/2">
          <h1 className='font-extrabold text-5xl leading-1'>Hello world</h1>
        </div>

        <div className="header-2  absolute top-3/4 left-1/2 -translate-1/2">
          <p>how are you</p>
        </div>

      </section>


      <section className='about relative w-screen h-screen overflow-hidden flex justify-center items-center text-center bg-[#a44a26] text-black'>
        <p>Hello, i am a placeholder text</p>
      </section>

    </div>
  )
}

export default page