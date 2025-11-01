'use client';

import React, { useEffect } from 'react'
import './Hero.css'
import { CubesDatalg } from '../components/CubesData.js'
import { CubesDataSm } from '../components/CubesDataSm';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis'
import Image from 'next/image';
import { Link001 } from "../../components/ui/skiper-ui/skiper40";

const Hero = () => {

  useEffect(() => {

    const getCubesData = () => {
      return window.innerWidth <= 768 ? CubesDataSm : CubesDatalg;
    };
    const cubesData = getCubesData();

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

    const stickyHeight = window.innerHeight * 2

    const cubesFaces = document.querySelectorAll('.cube > div')
    let imageCounter = 1

    cubesFaces.forEach((face) => {
      const img = document.createElement("img")
      img.src = `/images/img (${imageCounter}).svg`
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
        header2.style.opacity = `${header2Progress}`;


        const firstPhaseProgress = Math.min(self.progress * 2, 1)
        const secondPhaseProgress = self.progress >= 0.5 ? (self.progress - 0.5) * 2 : 0
        Object.entries(cubesData).forEach(([cubeclass, data]) => {
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
    <div className=' relative w-screen h-[300vh]  bg-[linear-gradient(0deg,_#ffffff_67%,_#000000_67%)] md:bg-[linear-gradient(0deg,_#ffffff_60%,_#000000_60%)] lg:bg-[linear-gradient(0deg,_#ffffff_54%,_#000000_54%)]'>

      <section className='sticky-1 relative w-screen h-screen overflow-hidden  z-10'>
        <div className="logo absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4 md:-translate-y-1/2 flex gap-[24px] ">
          <div className=' w-[50vh] md:w-80'>
            <img src="/images/logo-nobg.webp" alt="" />
          </div>
        </div>

        <div className="cubes absolute top-0 left-0 w-screen h-screen  " style={{ transformStyle: 'preserve-3d', perspective: '10000px' }}>
          <div className="cube cube-1 absolute w-[150px] h-[150px] top-[-55%] left-[37.5%]" style={{ transformStyle: 'preserve-3d', transform: 'translate3d(-50%, -50%, -30000px) rotateX(360deg) rotateY(-360deg) rotateZ(-48deg)' }}>
            <div className="front absolute w-full h-full bg-amber-50 transform" style={{ transform: 'translateZ(75px)' }}></div>
            <div className="back absolute w-full h-full bg-amber-50 transform" style={{ transform: 'rotateY(180deg) translateZ(75px)' }}></div>
            <div className="right absolute w-full h-full bg-amber-50 transform" style={{ transform: 'rotateY(90deg) translateZ(75px)' }}></div>
            <div className="left absolute w-full h-full bg-amber-50 transform" style={{ transform: 'rotateY(-90deg) translateZ(75px)' }}></div>
            <div className="top absolute w-full h-full bg-amber-50 transform" style={{ transform: 'rotateX(90deg) translateZ(75px)' }}></div>
            <div className="bottom absolute w-full h-full bg-amber-50 transform" style={{ transform: 'rotateX(-90deg) translateZ(75px)' }}></div>
          </div>

          <div className="cube cube-2 absolute w-[150px] h-[150px] top-[-35%] left-[32.5%]" style={{ transformStyle: 'preserve-3d', transform: 'translate3d(-50%, -50%, -30000px) rotateX(-180deg) rotateY(180deg) rotateZ(90deg)' }}>
            <div className="front absolute w-full h-full bg-amber-50 transform" style={{ transform: 'translateZ(75px)' }}></div>
            <div className="back absolute w-full h-full bg-amber-50 transform" style={{ transform: 'rotateY(180deg) translateZ(75px)' }}></div>
            <div className="right absolute w-full h-full bg-amber-50 transform" style={{ transform: 'rotateY(90deg) translateZ(75px)' }}></div>
            <div className="left absolute w-full h-full bg-amber-50 transform" style={{ transform: 'rotateY(-90deg) translateZ(75px)' }}></div>
            <div className="top absolute w-full h-full bg-amber-50 transform" style={{ transform: 'rotateX(90deg) translateZ(75px)' }}></div>
            <div className="bottom absolute w-full h-full bg-amber-50 transform" style={{ transform: 'rotateX(-90deg) translateZ(75px)' }}></div>
          </div>

          <div className="cube cube-3 absolute w-[150px] h-[150px] top-[65%] left-[50%]" style={{ transformStyle: 'preserve-3d', transform: 'translate3d(-50%, -50%, -30000px) rotateX(-90deg) rotateY(90deg) rotateZ(-180deg)' }}>
            <div className="front absolute w-full h-full bg-amber-50 transform" style={{ transform: 'translateZ(75px)' }}></div>
            <div className="back absolute w-full h-full bg-amber-50 transform" style={{ transform: 'rotateY(180deg) translateZ(75px)' }}></div>
            <div className="right absolute w-full h-full bg-amber-50 transform" style={{ transform: 'rotateY(90deg) translateZ(75px)' }}></div>
            <div className="left absolute w-full h-full bg-amber-50 transform" style={{ transform: 'rotateY(-90deg) translateZ(75px)' }}></div>
            <div className="top absolute w-full h-full bg-amber-50 transform" style={{ transform: 'rotateX(90deg) translateZ(75px)' }}></div>
            <div className="bottom absolute w-full h-full bg-amber-50 transform" style={{ transform: 'rotateX(-90deg) translateZ(75px)' }}></div>
          </div>

          <div className="cube cube-4 absolute w-[150px] h-[150px] top-[-35%] left-[50%]" style={{ transformStyle: 'preserve-3d', transform: 'translate3d(-50%, -50%, -30000px) rotateX(-90deg) rotateY(90deg) rotateZ(-180deg)' }}>
            <div className="front absolute w-full h-full bg-amber-50 transform" style={{ transform: 'translateZ(75px)' }}></div>
            <div className="back absolute w-full h-full bg-amber-50 transform" style={{ transform: 'rotateY(180deg) translateZ(75px)' }}></div>
            <div className="right absolute w-full h-full bg-amber-50 transform" style={{ transform: 'rotateY(90deg) translateZ(75px)' }}></div>
            <div className="left absolute w-full h-full bg-amber-50 transform" style={{ transform: 'rotateY(-90deg) translateZ(75px)' }}></div>
            <div className="top absolute w-full h-full bg-amber-50 transform" style={{ transform: 'rotateX(90deg) translateZ(75px)' }}></div>
            <div className="bottom absolute w-full h-full bg-amber-50 transform" style={{ transform: 'rotateX(-90deg) translateZ(75px)' }}></div>
          </div>

          <div className="cube cube-5 absolute w-[150px] h-[150px] top-[-55%] left-[62.5%]" style={{ transformStyle: 'preserve-3d', transform: 'translate3d(-50%, -50%, -30000px) rotateX(180deg) rotateY(180deg) rotateZ(-135deg)' }}>
            <div className="front absolute w-full h-full bg-amber-50 transform" style={{ transform: 'translateZ(75px)' }}></div>
            <div className="back absolute w-full h-full bg-amber-50 transform" style={{ transform: 'rotateY(180deg) translateZ(75px)' }}></div>
            <div className="right absolute w-full h-full bg-amber-50 transform" style={{ transform: 'rotateY(90deg) translateZ(75px)' }}></div>
            <div className="left absolute w-full h-full bg-amber-50 transform" style={{ transform: 'rotateY(-90deg) translateZ(75px)' }}></div>
            <div className="top absolute w-full h-full bg-amber-50 transform" style={{ transform: 'rotateX(90deg) translateZ(75px)' }}></div>
            <div className="bottom absolute w-full h-full bg-amber-50 transform" style={{ transform: 'rotateX(-90deg) translateZ(75px)' }}></div>
          </div>

          <div className="cube cube-6 absolute w-[150px] h-[150px] top-[-35%] left-[67.5%]" style={{ transformStyle: 'preserve-3d', transform: 'translate3d(-50%, -50%, -30000px) rotateX(-90deg) rotateY(-180deg) rotateZ(-180deg)' }}>
            <div className="front absolute w-full h-full bg-amber-50 transform" style={{ transform: 'translateZ(75px)' }}></div>
            <div className="back absolute w-full h-full bg-amber-50 transform" style={{ transform: 'rotateY(180deg) translateZ(75px)' }}></div>
            <div className="right absolute w-full h-full bg-amber-50 transform" style={{ transform: 'rotateY(90deg) translateZ(75px)' }}></div>
            <div className="left absolute w-full h-full bg-amber-50 transform" style={{ transform: 'rotateY(-90deg) translateZ(75px)' }}></div>
            <div className="top absolute w-full h-full bg-amber-50 transform" style={{ transform: 'rotateX(90deg) translateZ(75px)' }}></div>
            <div className="bottom absolute w-full h-full bg-amber-50 transform" style={{ transform: 'rotateX(-90deg) translateZ(75px)' }}></div>
          </div>
        </div>

        <div className="header-1 absolute top-4/6 left-1/2 w-full px-4">
          <div className="max-w-5xl mx-auto relative">
            <div className="flex flex-col items-start">
              <div className="self-start">
                <span className="block text-sm md:text-base lg:text-lg font-medium text-gray-300">
                  Hey, this is
                </span>
              </div>

              <div className="w-full -mt-1 md:-mt-2 ">
                <span className="block text-8xl md:text-[12rem] lg:text-[15rem] font-extrabold tracking-tight font-myfont1 italic text-transparent bg-gradient-to-b from-gray-100 to-gray-300/80 bg-clip-text animate-gradient-shift leading-none">
                  Ansif
                </span>
              </div>

              <div className="self-end mt-2 md:-mt-6">
                <span className="block text-xl md:text-2xl lg:text-3xl font-medium text-[#EFB6A4]">
                  a software developer
                </span>
              </div>
            <Link001 className='mt-7' href="/files/Ansif_resume.pdf">My Resume</Link001>
            </div>
             
          </div>
          <div className='flex items-center justify-end flex-col '>
            <p className='text-[10px] !font-light tracking-wide pt-16 text-[#e4bfb4] '>- scroll carefully, its smooth -</p>
          </div>
        </div>
        <div className="header-2 absolute top-1/2 left-1/2 text-center p-2 text-black bg-white/5 rounded-2xl backdrop-blur-sm">
          <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight">
            welcome to my corner<br className="hidden sm:block" /> of the internet.
          </h1>

        </div>

      </section>

      <div className="w-screen h-[500dvh] absolute top-[60dvh] lg:top-[40dvh] left-0">
        <Image
          src='/images/orange-wave.svg'
          alt='orange-wave'
          layout="responsive"
          width={100}
          height={100}
        />
      </div>


    </div>
  )
}




export default Hero