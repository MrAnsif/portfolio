"use client"

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


  const generateRows = () => {
    const rows = []
    for (let i = 1; i <= 3; i++) {

      rows.push(
        <div className='row relative w-screen mx-2 flex justify-center gap-4 pointer-events-none' key={i}>
          <div className='card card-left relative w-[50%] h-[240px] md:w-[40%] md:h-[360px]  rounded-2xl overflow-hidden transform'>
            <Image
              className='w-full h-full object-cover'
              src={`/images/contact-img (${2 * i - 1}).webp`}
              alt='img odd'
              width={420}
              height={420}
            />
          </div>
          <div className='card card-right relative w-[50%] h-[240px] md:w-[40%] md:h-[360px]  rounded-2xl overflow-hidden transform'>
            <Image
              className='w-full h-full object-cover'
              src={`/images/contact-img (${2 * i}).webp`}
              alt='img even'
              width={420}
              height={420}
            />
          </div>
        </div>
      )
    }
    return rows
  }

  return (

    <div className='bg-black md:py-10 rounded-b-[100px] text-center'>
      <section className='main relative w-screen h-[40dvh] md:h-[50dvh] flex justify-center items-center flex-col'>
        <div className="text-white absolute top-0 left-1/2 -translate-x-1/2 md:text-6xl text-4xl py-4 font-bold w-full ">
          <h1>Contact Me</h1>
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