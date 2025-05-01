'use client'
import React, { useEffect } from 'react'
import './page.css'
import { CubesData } from '../components/CubesData.js'
import { gsap, ScrollTrigger } from 'gsap/all'
import Lenis from '@studio-freight/lenis'



const page = () => {

  useEffect(() => {
    const lenis = new Lenis()

    lenis.on("scroll", ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    const stickySection = document.querySelector(".sticky-1");
    const logo = document.querySelector(".logo");
    const cubescontainen = document.querySelector(".cubes");
    const headen1 = document.querySelector(".header-1");
    const headen2 = document.querySelector(".header-2");

    const stickyHeight = window.innerHeight * 4
    
    const cubesFaces = document.querySelectorAll('.cube > div')

    let imageCounter = 1

    cubesFaces.forEach((face) => {
      const img = document.createElement("img")
      img.src = `/images/img${imageCounter}.jpg`
      img.alt = `cube image ${imageCounter}`
      face.appendChild(img)
      imageCounter++
    })


  }, [])

  return (
    <div className='w-screen h-[600vh]'>

      <section className='sticky-1 relative w-screen h-screen overflow-hidden bg-[#190001] text-white'>
        <div className="logo absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-[24px] ">
          <div className="col flex flex-col justify-end gap-3">
            <div className="block block-1 w-[35px] h-[35px] bg-amber-100 "></div>
            <div className="block block-2 w-[35px] h-[35px] bg-amber-100 "></div>
          </div>
          <div className="col flex flex-col justify-end gap-3">
            <div className="block block-3 w-[35px] h-[35px] bg-amber-100"></div>
            <div className="block block-4 w-[35px] h-[35px] bg-amber-100"></div>
          </div>
          <div className="col flex flex-col justify-end gap-3">
            <div className="block block-5 w-[35px] h-[35px] bg-amber-100"></div>
            <div className="block block-6 w-[35px] h-[35px] bg-amber-100"></div>
          </div>
        </div>

        <div className="cubes [transform-style:preserve-3d;perspective:10000px] absolute top-0 left-0 w-screen h-screen ">
          <div className="cube cube-1 [transform-style:preserve-3d] absolute w-[150px] h-[150px] top-[-55%] left-[37.5%] translate-3d-[-50%, -50%, -30000px] rotate-x-[360deg] rotate-y-[-360deg] rotate-z-[-48deg] ">
            <div className="front translate-z-[75px]"></div>
            <div className="back -translate-z-[75px] rotate-y-180"></div>
            <div className="right translate-x-[75px] rotate-90"></div>
            <div className="left -translate-x-[75px] -rotate-90"></div>
            <div className="top -translate-y-[75px] rotate-90"></div>
            <div className="bottom translate-y-[75px] -rotate-90"></div>
          </div>
          <div className="cube cube-2 [transform-style:preserve-3d] absolute w-[150px] h-[150px] top-[-35%] left-[32.5%] translate-3d-[-50%, -50%, -30000px] rotate-x-[-180deg] rotate-y-[180deg] rotate-z-[90deg] ">
            <div className="front translate-z-[75px]"></div>
            <div className="back -translate-z-[75px] rotate-y-180"></div>
            <div className="right translate-x-[75px] rotate-90"></div>
            <div className="left -translate-x-[75px] -rotate-90"></div>
            <div className="top -translate-y-[75px] rotate-90"></div>
            <div className="bottom translate-y-[75px] -rotate-90"></div>
          </div>
          <div className="cube cube-3 [transform-style:preserve-3d] absolute w-[150px] h-[150px] top-[65%] left-[50%] translate-3d-[-50%, -50%, -30000px] rotate-x-[-90deg] rotate-y-[90deg] rotate-z-[-180deg] ">
            <div className="front translate-z-[75px]"></div>
            <div className="back -translate-z-[75px] rotate-y-180"></div>
            <div className="right translate-x-[75px] rotate-90"></div>
            <div className="left -translate-x-[75px] -rotate-90"></div>
            <div className="top -translate-y-[75px] rotate-90"></div>
            <div className="bottom translate-y-[75px] -rotate-90"></div>
          </div>
          <div className="cube cube-4 [transform-style:preserve-3d] absolute w-[150px] h-[150px] top-[-35%] left-[50%] translate-3d-[-50%, -50%, -30000px] rotate-x-[-90deg] rotate-y-[90deg] rotate-z-[-180deg]  ">
            <div className="front translate-z-[75px]"></div>
            <div className="back -translate-z-[75px] rotate-y-180"></div>
            <div className="right translate-x-[75px] rotate-90"></div>
            <div className="left -translate-x-[75px] -rotate-90"></div>
            <div className="top -translate-y-[75px] rotate-90"></div>
            <div className="bottom translate-y-[75px] -rotate-90"></div>
          </div>
          <div className="cube cube-5 [transform-style:preserve-3d] absolute w-[150px] h-[150px] top-[-55%] left-[62.5%] translate-3d-[-50%, -50%, -30000px] rotate-x-[180deg] rotate-y-[180deg] rotate-z-[-135deg] ">
            <div className="front translate-z-[75px]"></div>
            <div className="back -translate-z-[75px] rotate-y-180"></div>
            <div className="right translate-x-[75px] rotate-90"></div>
            <div className="left -translate-x-[75px] -rotate-90"></div>
            <div className="top -translate-y-[75px] rotate-90"></div>
            <div className="bottom translate-y-[75px] -rotate-90"></div>
          </div>
          <div className="cube cube-6 [transform-style:preserve-3d] absolute w-[150px] h-[150px] top-[-35%] left-[67.5%] translate-3d-[-50%, -50%, -30000px] rotate-x-[-90deg] rotate-y-[-180deg] rotate-z-[-180deg] ">
            <div className="front translate-z-[75px]"></div>
            <div className="back -translate-z-[75px] rotate-y-180"></div>
            <div className="right translate-x-[75px] rotate-90"></div>
            <div className="left -translate-x-[75px] -rotate-90"></div>
            <div className="top -translate-y-[75px] rotate-90"></div>
            <div className="bottom translate-y-[75px] -rotate-90"></div>
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