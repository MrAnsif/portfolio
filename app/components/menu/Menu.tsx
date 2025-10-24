'use client';

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Link as ScrollLink } from 'react-scroll';
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Image from 'next/image';

const menuLinks = [
  { path: 'hero', label: 'Home' },
  { path: 'about', label: 'About Me' },
  { path: 'skills', label: 'Skills' },
  { path: 'projects', label: 'Projects' },
  { path: 'contact', label: 'Contact' },
]

const social = [
  { path: 'https://www.linkedin.com/in/ansif1/', label: 'LinkedIn', logo: '/images/linkedin.webp' },
  { path: 'https://github.com/mransif', label: 'GitHub', logo: '/images/github.webp' },
  { path: 'mailto:ansifpta2003@gmail.com', label: 'Email', logo: '/images/mail.webp' }
]

const Menu = () => {
  const container = useRef(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const tl = useRef<gsap.core.Timeline | null>(null)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useGSAP(() => {
    gsap.set(".menu-link-item-holder", { y: 75 })

    tl.current = gsap.timeline({ paused: true })
      .to(".menu-overlay", {
        duration: 1.25,
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        ease: "power4.inOut",
      })
      .to(".menu-link-item-holder", {
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.inOut",
        delay: -0.75,
      })

  }, { scope: container })

  useEffect(() => {
    if (tl.current) {
      if (isMenuOpen) {
        tl.current.play()
      } else {
        tl.current.reverse()
      }
    }
  }, [isMenuOpen])



  return (
    <div className='menu-container ' ref={container}>

      <div className="menu-bar fixed top-0 left-0 w-screen px-8 py-7 flex justify-between items-center z-40 text-white backdrop-blur-lg bg-black/10 rounded-b-3xl">
        <div className="menu-logo" >
          <Link href="/" className=" cursor-pointer">
            <Image
              src="/images/name.webp"
              alt="Home"
              width={64}
              height={64}
              className=""
            />
          </Link>
        </div>
        <div className='flex gap-4 md:gap-5'>
          {social.map((e, i) => (
            <a href={e.path} target="_blank" rel="noopener noreferrer" key={i} className="cursor-pointer w-7 h-7 transition-transform duration-300 ease-out hover:-translate-y-1" >
              <Image
                src={e.logo}
                width={44}
                height={44}
                alt={e.label}
                className=''
              />
            </a>
          ))}
          <div className="menu-open pl-7 md:pl-14" onClick={toggleMenu}>
            <p className=" cursor-pointer">Menu</p>
          </div>
        </div>
      </div>


      {/* Added justify-between and items-start to menu-overlay */}
      <div className="menu-overlay [clip-path:polygon(0%_0%,100%_0,100%_0%,0%_0%)] fixed top-0 left-0 w-screen h-screen p-8 flex flex-col justify-between items-start z-40 bg-[#E85102]">
        {/* Adjusted menu-overlay-bar for full width and centering content */}
        <div className="menu-overlay-bar w-full flex justify-between items-center">
          <div className="menu-logo " onClick={toggleMenu}>
            <Link href="/" className=" cursor-pointer">
              <Image
                src="/images/name.webp"
                alt="Go to Home"
                width={64}
                height={64}
                className="brightness-0"
              />
            </Link>
          </div>
          <div className="menu-close " onClick={toggleMenu}>
            <p className='text-black font-bold cursor-pointer'>Close</p>
          </div>
        </div>

        <div className="flex flex-grow w-full h-full items-end ">
          <div className="menu-close-icon flex-grow-[2] items-start cursor-pointer hidden md:flex " >
            <p className='text-[100px] [-webkit-text-stroke:3px_#E85102] ' onClick={toggleMenu}>&#x2715;</p>
          </div>



          <div className="menu-copy flex-grow-[4] flex flex-col h-full justify-between md:pt-2 pt-24 items-start">
            <div className="menu-links">
              {
                menuLinks.map((link, index) => (
                  <div className="menu-link-item w-max [clip-path:polygon(0_0,100%_0,100%_100%,0%_100%)] " key={index}>
                    <div className="menu-link-item-holder relative " >
                      <ScrollLink
                        to={link.path}
                        smooth={true}
                        duration={500}
                        offset={-50}
                        className='text-black md:text-[80px] font-normal text-[60px] tracking-tight leading-[85%] cursor-pointer'
                        onClick={toggleMenu}
                      >
                        {link.label}
                      </ScrollLink>

                    </div>
                  </div>
                ))
              }
            </div>
            <div className="menu-info flex w-full items-end">
              <div className="menu-info-col flex-grow-[1] flex flex-col justify-end">
                <a href="https://github.com/mransif" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://www.linkedin.com/in/ansif1/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://www.instagram.com/anzi_f7/" target="_blank" rel="noopener noreferrer">Instagram</a>
              </div>
              <div className="menu-info-col flex-grow-[1] flex flex-col justify-end ">
                <p className='!lowercase'>ansifpta2003@gmail.com</p>
                {/* <p>+123 456 7890</p> */}
              </div>
            </div>
          </div>
          {/* Adjusted menu-preview to align items-end */}
          <div className="menu-preview flex-grow-[4] md:flex justify-end items-end hidden">
            <p>In Focus</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Menu