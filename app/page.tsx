'use client';

import dynamic from "next/dynamic";
import Hero from "./sections/Hero";
import About from "./sections/About";
import { Skiper30 } from "@/components/ui/skiper-ui/skiper30";
import HorizontalBlinds from "./components/HorizontalBlinds";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
const Skills = dynamic(() => import('./sections/Skills'))
const Experience = dynamic(() => import('./sections/Experience'))
// const Projects = dynamic(()=>import('./sections/Projects'))
const Contact = dynamic(() => import('./sections/Contact'))



export default function Home() {
  return (
    <main>

      <section id="hero">
        <Hero />
      </section>

      <section id="about">
        <About />
      </section>

      <BackgroundBeamsWithCollision className="flex-col">

        <section id="skills">
          <Skills />
        </section>

        <section id="experience">
          <Experience />
        </section>

      </BackgroundBeamsWithCollision>

      <section id="projects">
        <HorizontalBlinds />
        {/* <Projects /> */}
        <Skiper30 />
      </section>

      <section id="contact">
        <Contact />
      </section>

    </main>
  )
}