'use client';

import React, { useEffect } from 'react';
import gsap from 'gsap';

const Preload = () => {

    useEffect(() => {

        gsap.set(".loader-1", {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)"
        });
        gsap.set(".loader-2", {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)"
        });

        gsap.from(".loader-1", {
            width: 0,
            duration: 6,
            ease: "power4.inOut",
        });

        gsap.from(".loader-2", {
            width: 0,
            delay: 1.9,
            duration: 5,
            ease: "power4.inOut",
        });

        gsap.to(".loader", {
            background: "none",
            delay: 6,
            duration: 0.1,
        });

        gsap.to(".loader-1", {
            x: 100,
            clipPath: "polygon(0 0, 71% 0, 100% 100%, 0% 100%)",
            ease: "power4.inOut",
            duration: 1,
            delay: 6,
        });

        gsap.to(".loader-2", {
            rotate: 55,
            y: -10,
            clipPath: "polygon(12% 0, 100% 0%, 88% 100%, 0% 100%)",
            ease: "power4.inOut",
            duration: 1,
            delay: 6,
        });

        gsap.to(".loader", {
            scale: 50,
            duration: 0.5,
            delay: 7,
            ease: "power2.inOut",
        });

        gsap.to(".loader", {
            rotate: 45,
            y: 500,
            x: -2300,
            duration: 0.5,
            delay: 7,
            ease: "power2.inOut",
        });

        gsap.to(".loading-screen", {
            opacity: 0,
            duration: 0.5,
            delay: 7.5,
            ease: "power2.inOut",
        });

    }, []);

    return (
        <div className="relative">
            <div className="loading-screen fixed top-0 left-0 w-screen h-screen bg-black text-white pointer-events-none z-50">
                <div className="loader absolute top-1/2 left-1/2 w-[350px] h-[40px] -translate-x-1/2 -translate-y-1/2 transform flex ">
                    <div className="loader-1 bar h-[40px] relative bg-white -mr-0.5 w-[100px]" ></div>
                    <div className="loader-2 bar h-[40px] relative bg-white  w-[250px]" ></div>
                </div>

                {/* Counter numbers */}

            </div>
        </div>
    );
}



export default Preload;