"use client"

import FlipLink from '@/components/ui/text-effect-flipper'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Github, Linkedin, Mail } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect } from 'react'

const Contact = () => {

  useEffect(() => {

    const scrollTriggerSettings = {
      trigger: ".main",
      start: "top 25%",
      toggleActions: "play reverse play reverse",
    }

    const leftXValues = [-800, -900, -400]
    const rightXValues = [800, 900, 400]
    const leftRotationValues = [-30, -20, -35]
    const rightRotationValues = [30, 20, 35]
    const yValues = [100, -150, -400]

    gsap.utils.toArray<HTMLElement>(".row").forEach((row, index) => {
      const cardLeft = row.querySelector<HTMLElement>(".card-left")
      const cardRight = row.querySelector<HTMLElement>(".card-right")

      gsap.to(cardLeft, {
        x: leftXValues[index],
        scrollTrigger: {
          trigger: ".main",
          start: "top center",
          end: "150% bottom",
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress
            if (cardLeft && cardRight) {
              cardLeft.style.transform = `
                  translateX(${progress * leftXValues[index]}px)
                  translateY(${progress * yValues[index]}px)
                  rotate(${progress * leftRotationValues[index]}deg)
                `

              cardRight.style.transform = `
                  translateX(${progress * rightXValues[index]}px)
                  translateY(${progress * yValues[index]}px)
                  rotate(${progress * rightRotationValues[index]}deg)
                `
            }
          }
        }
      })
    })

    gsap.to(".logo", {
      scale: 1,
      duration: 0.5,
      ease: "power1.out",
      scrollTrigger: scrollTriggerSettings,
    })

    gsap.to(".line p", {
      y: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "power1.out",
      scrollTrigger: scrollTriggerSettings,
    })

    gsap.to("button", {
      y: 0,
      opacity: 1,
      delay: 0.25,
      duration: 0.5,
      ease: "power1.out",
      scrollTrigger: scrollTriggerSettings,
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }

  }, [])


  // const generateRows = () => {
  //   const rows = []
  //   for (let i = 1; i <= 3; i++) {

  //     rows.push(
  //       <div className='row relative w-screen mx-2 flex justify-center gap-4 pointer-events-none' key={i}>
  //         <div className='card card-left relative w-[50%] h-[240px] md:w-[40%] md:h-[360px]  rounded-2xl overflow-hidden transform'>
  //           <Image
  //             className='w-full h-full object-cover'
  //             src={`/images/contact-img (${2 * i - 1}).webp`}
  //             alt='img odd'
  //             width={420}
  //             height={420}
  //           />
  //         </div>
  //         <div className='card card-right relative w-[50%] h-[240px] md:w-[40%] md:h-[360px]  rounded-2xl overflow-hidden transform'>
  //           <Image
  //             className='w-full h-full object-cover'
  //             src={`/images/contact-img (${2 * i}).webp`}
  //             alt='img even'
  //             width={420}
  //             height={420}
  //           />
  //         </div>
  //       </div>
  //     )
  //   }
  //   return rows
  // }

  const Icons = {
    linkedin: (props: any) => (
      <svg
        width="86"
        height="86"
        viewBox="0 0 86 86"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="86"
          height="86"
          rx="14"
          fill="#D9D9D9"
          className="fill-[#D9D9D9] transition-all duration-500 ease-in-out group-hover:fill-orange-600"
        />
        <path
          fill-rule="evenodd"
          className="fill-black transition-all duration-500 ease-in-out group-hover:fill-white"
          clip-rule="evenodd"
          d="M27.7128 69.5277V33.4109H15.7096V69.5276H27.7128V69.5277ZM21.7125 28.4816C25.8969 28.4816 28.5035 25.7059 28.5035 22.2401C28.4244 18.6973 25.8969 16 21.7909 16C17.6843 16.0001 15 18.6974 15 22.2402C15 25.706 17.6052 28.4817 21.6334 28.4817L21.7125 28.4816ZM34.3561 69.5277C34.3561 69.5277 34.5136 36.7996 34.3561 33.411H46.3612V38.6487H46.2815C47.86 36.184 50.7038 32.5629 57.179 32.5629C65.0788 32.5629 71 37.7249 71 48.8186V69.5278H58.9969V50.2063C58.9969 45.3514 57.2601 42.0385 52.915 42.0385C49.5995 42.0385 47.6236 44.2719 46.7559 46.4309C46.4384 47.1993 46.3612 48.2786 46.3612 49.3581V69.5277H34.3561Z"
          fill="black"
        />
      </svg>
    ),
    github: (props: any) => (
      <svg
        width="86"
        height="86"
        viewBox="0 0 86 86"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="86"
          height="86"
          className="fill-[#D9D9D9] transition-all duration-500 ease-in-out group-hover:fill-orange-600"
          rx="14"
        />
        <path
          fill-rule="evenodd"
          className="fill-black transition-all duration-500 ease-in-out group-hover:fill-white"
          clip-rule="evenodd"
          d="M43.2908 13C60.0205 13 73.5817 26.9033 73.5817 44.057C73.5817 57.7757 64.9124 69.4135 52.8839 73.524C51.3482 73.8299 50.803 72.86 50.803 72.0331C50.803 71.0093 50.8393 67.6653 50.8393 63.5094C50.8393 60.6136 49.87 58.7236 48.7826 57.7603C55.5283 56.9909 62.6164 54.3645 62.6164 42.4359C62.6164 39.0434 61.4411 36.2749 59.4964 34.1C59.8114 33.3155 60.8504 30.1566 59.1996 25.8795C59.1996 25.8795 56.6612 25.0473 50.8787 29.0639C48.4584 28.3763 45.8655 28.0303 43.2908 28.0182C40.7161 28.0303 38.1262 28.3763 35.709 29.0639C29.9205 25.0473 27.376 25.8795 27.376 25.8795C25.7312 30.1566 26.7702 33.3155 27.0822 34.1C25.1466 36.2749 23.9623 39.0434 23.9623 42.4359C23.9623 54.3342 31.0352 57.0009 37.7628 57.7855C36.8964 58.5609 36.1119 59.9289 35.8393 61.9371C34.1127 62.7308 29.7266 64.1043 27.0246 59.3577C27.0246 59.3577 25.4223 56.3736 22.3811 56.1556C22.3811 56.1556 19.4277 56.1163 22.1751 58.0428C22.1751 58.0428 24.1591 58.997 25.5374 62.5864C25.5374 62.5864 27.3155 68.1295 35.7424 66.2515C35.7575 68.8474 35.7848 71.294 35.7848 72.0331C35.7848 72.854 35.2274 73.8147 33.7159 73.5269C21.6783 69.4225 13 57.7787 13 44.057C13 26.9033 26.5642 13 43.2908 13Z"
        />
      </svg>
    ),
  }

  return (

    <div className='bg-black md:py-10 rounded-b-[100px] text-center'>
      <section className='main relative w-screen h-[40dvh] md:h-[50dvh] flex justify-center items-center flex-col'>
        <div className="text-white absolute top-0 left-1/2 -translate-x-1/2 md:text-6xl text-4xl py-4 font-bold w-full ">
          <h1>Contact Me</h1>
        </div>
        <div className="">
          <section className="grid place-content-center gap-2 px-8 py-24 text-black">
            <div className="group flex items-center justify-center ">
              <Icons.linkedin />
              <FlipLink href="https://www.linkedin.com/in/ansif1/">Linkedin</FlipLink>
            </div>
            <div className="group flex items-center justify-center">
              <FlipLink href="https://github.com/mransif/">Github</FlipLink>
              <Icons.github fill="red" />
            </div>
          </section>
        </div>


        {/* 
        <div className="main-content absolute top-1/2 left-1/2 -translate-1/2 flex flex-col items-center">

          <div className="copy mx-4 flex flex-col justify-center items-center text-2xl text-white">
            <div className="line relative mx-1 w-max h-[28px]"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}>
              <p className='relative translate-y-[30px]'>Let’s Build Something Cool.</p>
            </div>
            <div className="line">
              <p className='relative translate-y-[30px]'>I use AI to work smarter and faster.</p>
            </div>
            <div className="line">
              <p className='relative translate-y-[30px]'>Let’s get in touch.</p>
            </div>
          </div>

          <div className="btn flex space-x-4 items-center justify-center">
            <a
              href="https://github.com/mransif"
              target="_blank"
              rel="noopener noreferrer"
              className="translate-y-[30px]"
            >
              <button className="p-2 text-white border border-white hover:bg-neutral-800  rounded-2xl">
                <Github />
              </button>
            </a>
            <a
              href="https://www.linkedin.com/in/ansif1"
              target="_blank"
              rel="noopener noreferrer"
              className="translate-y-[30px]"
            >
              <button className="p-2 text-white border border-white hover:bg-blue-950  rounded-2xl">
                <Linkedin />
              </button>
            </a>
            <a
              href="mailto:ansifpta2003@gmail.com"
              className="translate-y-[30px]"
            >
              <button className="p-2 text-white border border-white hover:bg-red-950  rounded-2xl">
                <Mail />
              </button>
            </a>
          </div>

        </div>
        {generateRows()} */}
      </section>
    </div>
  )
}

export default Contact