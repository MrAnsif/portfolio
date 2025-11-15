"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const images = [
  "https://picsum.photos/600/400?random=1",
  "https://picsum.photos/600/400?random=2",
  "https://picsum.photos/600/400?random=3",
  "https://picsum.photos/600/400?random=4",
  "https://picsum.photos/600/400?random=5",
  "https://picsum.photos/600/400?random=6",
  "https://picsum.photos/600/400?random=7",
  "https://picsum.photos/600/400?random=8",
  "https://picsum.photos/600/400?random=9",
];

const Skiper30 = () => {
  const gallery = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const [status, setStatus] = useState("")

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    setStatus("loading")

    const res = await fetch("/api/send-mail", {
      method: "POST",
      headers: { "Content-Type": "Application/Json" },
      body: JSON.stringify({ name, email, message })
    })

    const result = await res.json()

    if (result.success) {
      setStatus("success");
      e.target.reset();
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
        <div className="absolute left-1/2 top-[10%] grid -translate-x-1/2 content-start justify-items-center gap-6 text-center ">
          <span className="relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-white after:to-black after:content-['']">
            More Works
          </span>
        </div>
      </div>

      <div
        ref={gallery}
        className="relative box-border flex h-[175vh] gap-[2vw] overflow-hidden bg-white p-[2vw]"
      >
        <Column images={[images[0], images[1], images[2]]} y={y} />
        <Column images={[images[3], images[4], images[5]]} y={y2} />
        <Column images={[images[6], images[7], images[8]]} y={y3} />
        <Column images={[images[6], images[7], images[8]]} y={y4} />
      </div>
      <div className="grid grid-cols-2 h-screen overflow-hidden">

        <div className="bg-[#F2EDE6] h-full w-full flex items-center justify-center p-28">
          <h1 className="text-7xl lg:text-9xl uppercase font-black leading-none"> <span className="font-myfont2">Drop</span> a <span className="bg-[#b43a11] text-white">me</span>ssage</h1>
        </div>

        <div className="bg-[#F2EDE6] relative h-screen p-10">
          <h1 className="font-bold text-6xl">Get In Touch</h1>

          <div className="border-l-2 border-t-2 border-black bg-[#F2EDE6] p-12 w-[93%] h-3/4 bottom-0 right-0 absolute">
            <form action="submit" onSubmit={handleSubmit} className="grid text-xl">
              <label className="pb-2">Full Name</label>
              <input name="name" placeholder="Your name" required className="input border-b border-black mb-14 appearance-none focus:outline-none focus:ring-0" />
              <label className="pb-2">E-mail</label>
              <input name="email" placeholder="Your email" required className="input border-b border-black mb-14 appearance-none focus:outline-none focus:ring-0" />
              <label className="pb-2"> Message</label>
              <input name="message" placeholder="Message" required className="textarea border-b border-black mb-14 appearance-none focus:outline-none focus:ring-0" />
              <button type="submit" className="border bg-black text-white p-2">
                {status === "" && (
                  'Sent'
                )}
                {status === "loading" && (
                  'Senting...'
                )}
                {status === "success" && (
                  'Message sent successfully!'
                )}{status === "error" && (
                  'Failed to send message. Try again.'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* </div> */}
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
          <img
            src={`${src}`}
            alt="image"
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
