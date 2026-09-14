"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  title: string;
  description: string;
  image: string;
  gitLink: string;
  url: string;
};

const projects: Project[] = [
  {
    title: "AOT",
    description: "AOT is a full-stack MERN project that lets patients book appointments, doctors manage schedules, and admins oversee operations. It features JWT authentication, Razorpay payments, Cloudinary image storage, and an AI chatbot powered by the Gemini API.",
    image: "/images/img-prj (1).webp",
    url: "https://aot-blue.vercel.app/",
    gitLink: "https://github.com/MrAnsif/AOT"
  },
  {
    title: "local insights",
    description: "Users can search for any city, neighborhood, or country and instantly get a richly structured place profile generated and validated from multiple sources. The app surfaces featured destinations, supports infinite exploration, and produces human-readable place summaries using AI while keeping visual polish with theming and smooth animations.",
    image: "/images/img-prj (2).webp",
    url: "https://localinsights.vercel.app",
    gitLink: "https://github.com/MrAnsif/travel-guide-platform"
  },
  {
    title: "Avishkar",
    description: "Avishkar is the official website for our college’s annual technical fest, built to capture the energy, creativity, and innovation of the event in a visually engaging digital experience. Designed and developed using React.js, it combines smooth modern animations, responsive design, and an intuitive layout to deliver a seamless experience across all devices.",
    image: "/images/img-prj (3).webp",
    url: "https://www.avishkar.live/",
    gitLink: "https://github.com/MrAnsif/genshin"
  },
];

const BLIND_COUNT = 30;

const HorizontalBlinds = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement>(null);
  const scrollPromptRef = useRef<HTMLDivElement>(null);

  const textRefs = useRef<(HTMLElement | null)[]>([]);
  const progressRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!stageRef.current || !layersRef.current) return;

    const stage = stageRef.current;

    const layers = Array.from(
      layersRef.current.querySelectorAll<SVGSVGElement>(".project-layer"),
    );

    const ctx = gsap.context(() => {
      /*
       * =====================================================
       * LENIS
       * =====================================================
       */

      const isTouch = window.matchMedia("(pointer: coarse)").matches;

      const lenis = new Lenis({
        lerp: 0.15,
        smoothWheel: true,
        syncTouch: !isTouch,
      });

      const onLenisScroll = () => {
        ScrollTrigger.update();
      };

      lenis.on("scroll", onLenisScroll);

      const ticker = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(ticker);

      /*
       * =====================================================
       * CREATE HORIZONTAL BLINDS
       * =====================================================
       */

      const createBlinds = (svg: SVGSVGElement) => {
        const group = svg.querySelector<SVGGElement>(".blinds");

        if (!group) return [];

        group.innerHTML = "";

        const width = window.innerWidth;
        const height = window.innerHeight;

        /*
         * Same aspect-ratio based SVG sizing as
         * the original Horizontal Blinds demo.
         */

        const viewBoxHeight = (height / width) * 100;

        const blindHeight = viewBoxHeight / BLIND_COUNT;

        const blinds: {
          top: SVGRectElement;
          bottom: SVGRectElement;
          y: number;
          h: number;
        }[] = [];

        let currentY = 0;

        for (let i = 0; i < BLIND_COUNT; i++) {
          const centerY = viewBoxHeight - (currentY + blindHeight / 2);

          const top = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "rect",
          );

          const bottom = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "rect",
          );

          [top, bottom].forEach((rect) => {
            rect.setAttribute("x", "0");
            rect.setAttribute("width", "100");
            rect.setAttribute("height", "0");
            rect.setAttribute("fill", "white");
            rect.setAttribute("shape-rendering", "crispEdges");
          });

          top.setAttribute("y", String(centerY));

          bottom.setAttribute("y", String(centerY));

          group.appendChild(top);
          group.appendChild(bottom);

          blinds.push({
            top,
            bottom,
            y: centerY,
            h: blindHeight / 2,
          });

          currentY += blindHeight;
        }

        return blinds;
      };

      /*
       * =====================================================
       * UPDATE SVG LAYOUT
       * =====================================================
       */

      let blindsSets: ReturnType<typeof createBlinds>[] = [];

      const updateLayout = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        const viewBoxHeight = (height / width) * 100;

        blindsSets = [];

        layers.forEach((svg) => {
          svg.setAttribute("viewBox", `0 0 100 ${viewBoxHeight}`);

          const maskRect =
            svg.querySelector<SVGRectElement>(".mask-background");

          if (maskRect) {
            maskRect.setAttribute("width", "100");
            maskRect.setAttribute("height", String(viewBoxHeight));
          }

          const image = svg.querySelector<SVGImageElement>(".project-image");

          if (image) {
            image.setAttribute("width", "100");
            image.setAttribute("height", String(viewBoxHeight));
          }

          blindsSets.push(createBlinds(svg));
        });

        buildTimeline();
      };

      /*
       * =====================================================
       * BLINDS OPEN ANIMATION
       * =====================================================
       */

      const openBlinds = (blinds: ReturnType<typeof createBlinds>) => {
        return gsap.timeline().to(
          blinds.flatMap((blind) => [blind.top, blind.bottom]),
          {
            attr: {
              y: (index: number) => {
                const blind = blinds[Math.floor(index / 2)];

                return index % 2 === 0 ? blind.y - blind.h : blind.y;
              },

              height: (index: number) => {
                const blind = blinds[Math.floor(index / 2)];

                return blind.h + 0.01;
              },
            },

            ease: "power3.out",

            stagger: {
              each: 0.02,
              from: "start",
            },
          },
        );
      };

      /*
       * =====================================================
       * LARGE PROJECT TITLE ENTER
       * =====================================================
       */

      const textIn = (element: HTMLElement) => {
        return gsap.to(element, {
          clipPath: "inset(0% 0% 0% 0%)",

          y: 0,

          duration: 1.5,

          ease: "expo.out",
        });
      };

      /*
       * =====================================================
       * LARGE PROJECT TITLE EXIT
       * =====================================================
       */

      const textOut = (element: HTMLElement) => {
        return gsap.to(element, {
          clipPath: "inset(0% 0% 100% 0%)",

          y: -30,

          duration: 1.2,

          ease: "power2.inOut",
        });
      };

      /*
       * =====================================================
       * MASTER SCROLL TIMELINE
       * =====================================================
       */

      let master: gsap.core.Timeline | null = null;

      const buildTimeline = () => {
        if (master) {
          master.kill();
        }

        master = gsap.timeline({
          scrollTrigger: {
            trigger: stage,

            start: "top top",

            end: "bottom bottom",

            scrub: 2.5,

            anticipatePin: 1,

            invalidateOnRefresh: true,
          },
        });

        if (scrollPromptRef.current) {
          master!.to(
            scrollPromptRef.current,
            {
              opacity: 0,
              y: -25,
              duration: 0.4,
              ease: "power1.out",
            },
            0,
          );
        }

        blindsSets.forEach((blinds, index) => {
          master!.add(openBlinds(blinds));

          const text = textRefs.current[index];

          if (text) {
            master!.add(textIn(text), "-=0.3");

            master!.add(textOut(text), "+=0.8");
          }
        });
      };

      /*
       * =====================================================
       * PROGRESS BAR
       * =====================================================
       */

      const progressTrigger = ScrollTrigger.create({
        trigger: stage,

        start: "top top",

        end: "bottom bottom",

        scrub: 0.3,

        onUpdate: (self) => {
          const progress = self.progress;

          const total = progressRefs.current.length;

          progressRefs.current.forEach((fill, index) => {
            if (!fill) return;

            let value = (progress - index / total) * total;

            value = Math.max(0, Math.min(1, value));

            fill.style.width = `${value * 100}%`;
          });
        },
      });

      /*
       * =====================================================
       * INITIALIZE
       * =====================================================
       */

      updateLayout();

      const resizeHandler = () => {
        updateLayout();
        ScrollTrigger.refresh();
      };

      let resizeTimer: ReturnType<typeof setTimeout> | undefined;

      const handleResize = () => {
        if (resizeTimer) {
          clearTimeout(resizeTimer);
        }

        resizeTimer = setTimeout(resizeHandler, 250);
      };

      window.addEventListener("resize", handleResize);

      /*
       * =====================================================
       * CLEANUP
       * =====================================================
       */

      return () => {
        if (resizeTimer) {
          clearTimeout(resizeTimer);
        }

        window.removeEventListener("resize", handleResize);

        progressTrigger.kill();

        master?.kill();

        lenis.off("scroll", onLenisScroll);

        gsap.ticker.remove(ticker);

        lenis.destroy();

        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }, stage);

    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-gradient-to-b from-[#200400] to-black text-white">
      {/* =================================================
          HORIZONTAL BLINDS PROJECT SECTION
      ================================================= */}

      <section ref={stageRef} className="relative h-[500vh]">
        <div
          ref={layersRef}
          className="sticky top-0 h-screen w-full overflow-hidden"
        >
          {/* =============================================
              PROJECT IMAGE LAYERS
          ============================================= */}

          {projects.map((project, index) => (
            <svg
              key={project.title}
              className="project-layer absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <mask id={`project-mask-${index}`} maskUnits="userSpaceOnUse">
                  <rect
                    className="mask-background"
                    x="0"
                    y="0"
                    width="100"
                    height="100"
                    fill="black"
                  />

                  <g className="blinds" />
                </mask>
              </defs>

              <image
                className="project-image"
                href={project.image}
                x="0"
                y="0"
                width="100"
                height="100"
                preserveAspectRatio="xMidYMid slice"
                mask={`url(#project-mask-${index})`}
                style={{
                  filter: "brightness(0.7)",
                }}
              />
            </svg>
          ))}

          {/* =============================================
              DARK OVERLAY
          ============================================= */}

          <div className="pointer-events-none absolute inset-0 z-[5] bg-black/20" />

          {/* =============================================
              INITIAL SCROLL PROMPT
          ============================================= */}

          <div
            ref={scrollPromptRef}
            className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4"
          >
            <p className="text-xl md:text-3xl font-light tracking-[0.35em] uppercase text-white/80 animate-pulse font-sans">
              Scroll Down To Explore
            </p>
            <span className="mt-4 text-2xl text-white/50 animate-bounce font-sans">↓</span>
          </div>

          {/* =============================================
              PROJECT INFORMATION
          ============================================= */}

          <div className="pointer-events-none absolute inset-0 z-10">
            {projects.map((project, index) => (
              <article
                key={project.title}
                ref={(element) => {
                  textRefs.current[index] = element;
                }}
                className="absolute inset-x-0 top-0 w-full translate-y-10 px-[3vw] uppercase [clip-path:inset(100%_0_0_0)]"
              >
                {/* ---------------------------------
                      LARGE PROJECT NAME
                  --------------------------------- */}

                <h2 className="mt-[12vh] max-w-[95vw] whitespace-pre-wrap break-words text-[clamp(4.8rem,10vw,15rem)] font-light leading-[0.78] tracking-[-0.055em] text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
                  {project.title}
                </h2>

                {/* ---------------------------------
                      DESCRIPTION
                  --------------------------------- */}

                <div className="mt-[7vw] max-w-xl">
                  <p className="font-sans text-[clamp(1rem,1.1vw,1.25rem)] normal-case leading-[1.7] tracking-normal text-white/80">
                    {project.description}
                  </p>
                </div>

                {/* ---------------------------------
                      LINKS
                  --------------------------------- */}

                <div className="pointer-events-auto mt-8 flex gap-8 font-sans text-sm uppercase tracking-[0.2em]">
                  <a
                    href={project.gitLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b border-white/50 pb-2 transition-opacity duration-300 hover:border-white hover:opacity-60"
                  >
                    GitHub ↗
                  </a>

                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b border-white/50 pb-2 transition-opacity duration-300 hover:border-white hover:opacity-60"
                  >
                    Live ↗
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* =============================================
              BOTTOM PROGRESS BAR
          ============================================= */}

          <div className="absolute bottom-0 left-0 z-20 flex w-full gap-4 px-[3vw] pb-8">
            {projects.map((project, index) => (
              <div
                key={`${project.title}-progress`}
                className="relative h-[2px] flex-1 overflow-hidden bg-white/25"
              >
                <div
                  ref={(element) => {
                    progressRefs.current[index] = element;
                  }}
                  className="absolute left-0 top-0 h-full w-0 bg-white"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default HorizontalBlinds;
