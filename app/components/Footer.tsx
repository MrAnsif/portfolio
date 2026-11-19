'use client';
import React from 'react'


const Footer = () => {

 


  return (
    <footer className='bg-white -z-10 sticky bottom-0 grid md:grid-cols-[1fr_0.5fr] px-5 py-4'>

      {/* <div className=' border-b p-2 place-content-end'>
      </div> */}

      <div className='place-content-end py-2'>
        <p className='font-myfont3 text-6xl md:text-7xl text-center'>This is just me, doing what I do.</p>
        <div className='flex justify-center gap-6 mt-4 text-sm text-neutral-600 font-medium'>
          <a
            href="https://github.com/mransif/"
            target="_blank"
            rel="noopener noreferrer me"
            aria-label="Ansif Muhammed on GitHub"
            className="hover:text-black transition-colors underline-offset-4 hover:underline"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/ansif1/"
            target="_blank"
            rel="noopener noreferrer me"
            aria-label="Ansif Muhammed on LinkedIn"
            className="hover:text-black transition-colors underline-offset-4 hover:underline"
          >
            LinkedIn
          </a>
          <a
            href="mailto:ansifpta2003@gmail.com"
            aria-label="Email Ansif Muhammed"
            className="hover:text-black transition-colors underline-offset-4 hover:underline"
          >
            Email
          </a>
        </div>
      </div>

      <div className='place-content-end p-2 right-0'>
        <p className='md:text-end text-xs md:text-base text-neutral-500'>
          &copy; 2025 Ansif Muhammed. All rights reserved.
          <br />
          Handcrafted by me.
        </p>
      </div>

    </footer>
  )
}

export default Footer