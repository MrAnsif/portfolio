'use client';

import dynamic from "next/dynamic";
import Hero from "./sections/Hero";
import About from "./sections/About";
import { Skiper30 } from "@/components/ui/skiper-ui/skiper30";
const Skills = dynamic(()=>import('./sections/Skills'))
const Projects = dynamic(()=>import('./sections/Projects'))
const Contact = dynamic(()=>import('./sections/Contact'))



export default function Home() {
  return (
    <main>

      <section id="hero">
        <Hero />
      </section>
      
      <section id="about">
        <About />
      </section>

      <section id="skills">
        <Skills />
      </section>

      <section id="projects">
        <Projects />
        <Skiper30/>
      </section>

      <section id="contact">
        <Contact />
      </section>

    </main>
  )
}