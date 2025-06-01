'use client';
import React from 'react'


const Footer = () => {

 


  return (
    <div className='bg-white -z-10 sticky bottom-0 grid md:grid-cols-[1fr_0.5fr] px-5 py-2'>

      {/* <div className=' border-b p-2 place-content-end'>
      </div> */}

      <div className=' place-content-end py-2'>
        <p className='font-myfont3 text-6xl md:text-7xl text-center'>This is just me, doing what I do.</p>
      </div>

      <div className=' place-content-end p-2 right-0'>
        <p className='md:text-end text-xs md:text-base text-neutral-500'>
          &copy; 2025 Ansif Muhammed N N. All rights reserved.
          <br />
          Handcrafted by me.
        </p>
      </div>

    </div>
  )
}

export default Footer