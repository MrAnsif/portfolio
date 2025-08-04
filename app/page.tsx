'use client';

import dynamic from "next/dynamic";
import Hero from "./sections/Hero";
import About from "./sections/About";
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
      </section>

      <section id="contact">
        <Contact />
      </section>

    </main>
  )
}