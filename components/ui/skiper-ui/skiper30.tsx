"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const images = [
  "/images/toGit/toGit (4).webp",
  "/images/toGit/toGit (7).webp",
  "/images/toGit/toGit (5).webp",
  "/images/toGit/toGit (8).webp",
  "/images/toGit/toGit (10).webp",
  "/images/toGit/toGit (9).webp",
  "/images/toGit/toGit (1).webp",
  "/images/toGit/toGit (2).webp",
  "/images/toGit/toGit (6).webp",
  "/images/toGit/toGit (3).webp",
];

const Skiper30 = () => {
  const gallery = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const [status, setStatus] = useState("")

  const formRef = useRef<HTMLFormElement | null>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = formRef.current!;
    const formData = new FormData(form);

    setStatus("loading")

    const res = await fetch("/api/send-mail", {
      method: "POST",
      headers: { "Content-Type": "Application/Json" },
      body: JSON.stringify(Object.fromEntries(formData))
    })

    const result = await res.json()

    if (result.success) {
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
    }
  }

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });

  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  useEffect(() => {

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resize);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <main className="w-full bg-[#ffffff] text-black relative">
      <div className="font-geist flex h-screen items-center justify-center gap-2">
        {/* <div className="absolute left-1/2 top-[10%] grid -translate-x-1/2 content-start justify-items-center gap-6 text-center ">
          <span className="relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-white after:to-black after:content-['']">
            More Works
          </span>
        </div> */}
        Explore more of my work on GitHub.
      </div>

      <div
        ref={gallery}
        className="relative box-border flex h-[175vh] gap-[2vw] overflow-hidden bg-white p-[2vw]"
      >
        <Column images={[images[0], images[1], images[2]]} y={y} />
        <Column images={[images[3], images[4], images[5]]} y={y2} />
        <Column images={[images[9], images[2], images[9]]} y={y3} />
        <Column images={[images[6], images[7], images[8]]} y={y4} />
      </div>
      <div className="md:grid md:grid-cols-2 min-h-screen overflow-hidden bg-[linear-gradient(0deg,#000,#F2EDE6_72%)]">

        <div className=" h-full w-full hidden md:flex md:items-center justify-center p-10 lg:p-28">
          <h1 className="text-5xl sm:text-6xl lg:text-9xl uppercase font-black leading-none text-left">
            <span className="font-myfont2">Drop</span> a <span className="bg-[#b43a11] text-white">me</span>ssage
          </h1>
        </div>

        <div className=" relative min-h-screen p-6 sm:p-10 " >

          <h1 className="font-black text-6xl my-6">
            Get <span className="md:font-myfont4 font-myfont2">In</span> Touch
          </h1>

          <div className="
      border-l-2 border-t-2
      border-black 
      p-6 sm:p-10 md:p-12 
      w-full md:w-[93%] 
      relative md:absolute 
      md:bottom-0 md:right-0 
      md:h-3/4
    ">
            <form ref={formRef} onSubmit={handleSubmit} className="grid text-lg sm:text-xl">

              <label className="pb-2">Full Name</label>
              <input
                name="name"
                placeholder="Your name"
                required
                className="border-b border-black mb-10 appearance-none focus:outline-none"
              />

              <label className="pb-2">E-mail</label>
              <input
                name="email"
                placeholder="Your email"
                required
                className="border-b border-black mb-10 appearance-none focus:outline-none"
              />

              <label className="pb-2">Message</label>
              <textarea
                name="message"
                placeholder="Message"
                required
                className="border-b border-black mb-10 appearance-none focus:outline-none resize-none h-24"
              />

              <button
                type="submit"
                className=" bg-[#b43a11] hover:bg-[#98310f] text-white p-2"
                disabled={status === 'loading'}
              >
                {status === "" && 'Send'}
                {status === "loading" && 'Sending...'}
                {status === "success" && 'Message sent successfully!'}
                {status === "error" && 'Failed to send message. Try again.'}
              </button>
            </form>
          </div>
        </div>

      </div>
    </main>
  );
};

type ColumnProps = {
  images: string[];
  y: MotionValue<number>;
};

const Column = ({ images, y }: ColumnProps) => {
  return (
    <motion.div
      className="relative -top-[45%] flex h-full w-1/4 min-w-[250px] flex-col gap-[2vw] first:top-[-45%] [&:nth-child(2)]:top-[-95%] [&:nth-child(3)]:top-[-45%] [&:nth-child(4)]:top-[-75%]"
      style={{ y }}
    >
      {images.map((src, i) => (
        <div key={i} className="relative h-full w-full overflow-hidden">
          <Image
            src={`${src}`}
            alt="image"
            width={1080}
            height={1080}
            className="pointer-events-none object-cover"
          />
        </div>
      ))}
    </motion.div>
  );
};

export { Skiper30 };

/**
 * Skiper 30 Parallax_002 — React + framer motion + lenis
 * Inspired by and adapted from https://www.siena.film/films/my-project-x
 * We respect the original creators. This is an inspired rebuild with our own taste and does not claim any ownership.
 * These animations aren’t associated with the siena.film . They’re independent recreations meant to study interaction design
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 * - No attribution required with Skiper UI Pro.
 *
 * Feedback and contributions are welcome.
 *
 * Author: @gurvinder-singh02
 * Website: https://gxuri.in
 * Twitter: https://x.com/Gur__vi
 */
