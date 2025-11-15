'use client'

import React, { useEffect } from 'react'
import slides from '../components/slides.js'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'
import { Link001 } from '@/components/ui/skiper-ui/skiper40'

const Projects = () => {
  gsap.registerPlugin(ScrollTrigger)

  useEffect(() => {
    const lenis = new Lenis();

    const scrollUpdateHandler = () => ScrollTrigger.update();
    lenis.on("scroll", scrollUpdateHandler);

    const tickerHandler = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerHandler);
    gsap.ticker.lagSmoothing(0);

    const slideImages = document.querySelector(".slide-images")
    const titleElement = document.getElementById("title-text") as HTMLElement | null;
    const desElement = document.getElementById("des-text") as HTMLElement | null;
    const exploreLink = document.querySelector(".slide-link a") as HTMLAnchorElement;
    const gitLink = document.querySelector(".git-link a") as HTMLAnchorElement;


    const totalSlides = slides.length
    const stripsCount = 25
    let currentTitleIndex = 1
    let queuedTitleIndex: number | null = null;
    const titleChangeThreshold = 0.5
    let isAnimating = false

    const firstSlideImg = document.querySelector("#img-1 img")

    // Cache DOM elements for better performance
    const imgContainers: HTMLElement[] = [];
    const stripElements: HTMLElement[][] = [];
    const imageElements: HTMLImageElement[][] = [];

    for (let i = 1; i < totalSlides; i++) {
      const imgContainer = document.createElement("div");
      imgContainer.className = "img-container";
      imgContainer.id = `img-container-${i + 1}`;
      imgContainer.style.opacity = "0";
      imgContainer.style.display = "none";

      const strips: HTMLElement[] = [];
      const images: HTMLImageElement[] = [];

      for (let j = 0; j < stripsCount; j++) {
        const strip = document.createElement("div");
        strip.className = "strip";
        strip.style.position = "absolute";
        strip.style.top = "0";
        strip.style.left = "0";
        strip.style.width = "100%";
        strip.style.height = "100%";
        strip.style.overflow = "hidden";

        const img = document.createElement("img");
        img.src = slides[i].image;
        img.alt = slides[i].title;
        img.style.transform = "scale(1.25)";
        img.style.objectFit = "cover";

        const stripPositionFromBottom = stripsCount - j - 1;

        const stripLowerBound = (stripPositionFromBottom + 1) * (100 / stripsCount);
        const stripUpperBound = stripPositionFromBottom * (100 / stripsCount);

        strip.style.clipPath = `polygon(0% ${stripLowerBound}%, 100% ${stripLowerBound}%, 100% ${stripUpperBound - 0.1}%, 0% ${stripUpperBound - 0.1}%)`;

        strip.appendChild(img)
        imgContainer.appendChild(strip)

        strips.push(strip);
        images.push(img);
      }

      imgContainers.push(imgContainer);
      stripElements.push(strips);
      imageElements.push(images);

      if (slideImages) {
        console.log(`Appending container ${i} with image ${slides[i].image}`);
        slideImages.appendChild(imgContainer);
      } else {
        console.error("slideImages container not found!");
      }
    }

    const transitionCount = totalSlides - 1;
    const scrollDistancePerTransition = 1000;
    const initialScrollDelay = 300;
    const finalScrollDelay = 300;

    const totalScrollDistance =
      transitionCount * scrollDistancePerTransition +
      initialScrollDelay +
      finalScrollDelay;

    let currentScrollPosition = initialScrollDelay;

    type TransitionRange = {
      transition: number;
      startVh: number;
      endVh: number;
      startPercent: number;
      endPercent: number;
    };

    const transitionRanges: TransitionRange[] = [];

    for (let i = 0; i < transitionCount; i++) {
      const transitionStart = currentScrollPosition;
      const transitionEnd = transitionStart + scrollDistancePerTransition;

      transitionRanges.push({
        transition: i,
        startVh: transitionStart,
        endVh: transitionEnd,
        startPercent: transitionStart / totalScrollDistance,
        endPercent: transitionEnd / totalScrollDistance,
      });

      currentScrollPosition = transitionEnd;
    }

    function calculateImageProgress(scrollProgress: number): number {
      let imageProgress = 0;

      if (scrollProgress < transitionRanges[0].startPercent) {
        return 0;
      }

      if (
        scrollProgress >
        transitionRanges[transitionRanges.length - 1].endPercent
      ) {
        return transitionRanges.length;
      }

      for (let i = 0; i < transitionRanges.length; i++) {
        const range = transitionRanges[i];
        if (
          scrollProgress > range.startPercent &&
          scrollProgress < range.endPercent
        ) {
          const rangeSize = range.endPercent - range.startPercent;
          const normalizedProgress =
            (scrollProgress - range.startPercent) / rangeSize;
          imageProgress = i + normalizedProgress;
          break;
        } else if (scrollProgress > range.endPercent) {
          imageProgress = i + 1;
        }
      }
      return imageProgress;
    }

    function getScaleForImage(imageIndex: number, currentImageIndex: number, progress: number): number {
      if (imageIndex > currentImageIndex) return 1.25;
      if (imageIndex < currentImageIndex - 1) return 1;

      const totalProgress = imageIndex === currentImageIndex ? progress : 1 + progress;
      return 1.25 - (0.25 * totalProgress) / 2;
    }

    function animateTitleChange(index: number, direction: string): void {
      if (index === currentTitleIndex) return;

      if (index < 0 || index >= slides.length) return;

      if (isAnimating) {
        queuedTitleIndex = index;
        return;
      }

      isAnimating = true;
      const newTitle = slides[index].title;
      const newDes = slides[index].description
      const newUrl = slides[index].url;
      const newGitLink = slides[index].gitLink

      const outY = direction === "down" ? "-120%" : "120%";
      const inY = direction === "down" ? "120%" : "-120%";

      gsap.killTweensOf(titleElement);

      exploreLink.href = newUrl
      gitLink.href = newGitLink

      gsap.to([titleElement, desElement], {
        y: outY,
        duration: 0.5,
        ease: "power3.out",
        onComplete: () => {
          if (titleElement && desElement) {
            titleElement.textContent = newTitle;
            desElement.textContent = newDes;
          }
          gsap.set(titleElement, { y: inY });
          gsap.set(desElement, { y: inY });

          gsap.to([titleElement, desElement], {
            y: "0%",
            duration: 0.5,
            ease: "power3.out",
            onComplete: () => {
              currentTitleIndex = index;
              isAnimating = false;

              if (queuedTitleIndex !== null && queuedTitleIndex !== currentTitleIndex) {
                const nextIndex = queuedTitleIndex
                queuedTitleIndex = null;
                animateTitleChange(nextIndex, direction);
              }
            }
          })
        }
      })
    }

    function getTitleIndexForProgress(imageProgress: number): number {
      const imageIndex = Math.floor(imageProgress);
      const imageSpecificProgress = imageProgress - imageIndex;

      if (imageSpecificProgress > titleChangeThreshold) {
        return Math.min(imageIndex + 1, slides.length - 1);
      } else {
        return imageIndex;
      }
    }

    let lastImageProgress = 0;

    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: ".sticky-slider",
      start: "top top",
      end: `+=${totalScrollDistance}vh`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      invalidateOnRefresh: true,

      onUpdate: (self) => {
        const imageProgress = calculateImageProgress(self.progress);

        if (typeof imageProgress === "number") {
          const scrollDirection = imageProgress > lastImageProgress ? "down" : "up";
          const currentImageIndex = Math.floor(imageProgress);
          const imageSpecificProgress = imageProgress - currentImageIndex

          const correctTitleIndex = getTitleIndexForProgress(imageProgress);

          if (correctTitleIndex !== currentTitleIndex) {
            queuedTitleIndex = correctTitleIndex;
            if (!isAnimating) {
              animateTitleChange(correctTitleIndex, scrollDirection);
            }
          }

          if (scrollDirection === "down") {
            if (currentImageIndex > 0 && imgContainers[currentImageIndex - 1]) {
              const currentContainer = imgContainers[currentImageIndex - 1];
              currentContainer.style.display = "block";
              currentContainer.style.opacity = "1";
            }
            if (currentImageIndex < totalSlides - 1 && imgContainers[currentImageIndex]) {
              const nextContainer = imgContainers[currentImageIndex];
              nextContainer.style.display = "block";
            }
          } else {
            if (currentImageIndex < totalSlides - 2 && imgContainers[currentImageIndex + 1]) {
              const nextContainer = imgContainers[currentImageIndex + 1];
              nextContainer.style.display = "none";
              nextContainer.style.opacity = "0";
            }
            if (currentImageIndex > 0 && imgContainers[currentImageIndex - 1]) {
              const currentContainer = imgContainers[currentImageIndex - 1];
              currentContainer.style.display = "block";
              currentContainer.style.opacity = "1";
            }
            if (currentImageIndex > 1 && imgContainers[currentImageIndex - 2]) {
              const prevContainer = imgContainers[currentImageIndex - 2];
              prevContainer.style.display = "block";
            }
          }

          const firstSlideImgScale = getScaleForImage(0, currentImageIndex, imageSpecificProgress);

          if (firstSlideImg) {
            (firstSlideImg as HTMLElement).style.transform = `scale(${firstSlideImgScale})`;
          }

          for (let i = 1; i < totalSlides; i++) {
            const imgIndex = i + 1;
            const transitionIndex = imgIndex - 2;
            const containerIndex = i - 1;

            const imgContainer = imgContainers[containerIndex];
            if (!imgContainer) continue;

            imgContainer.style.opacity = "1";
            imgContainer.style.zIndex = `${totalSlides - i}`;

            const strips = stripElements[containerIndex];
            const images = imageElements[containerIndex];

            if (transitionIndex < currentImageIndex) {
              strips.forEach((strip, stripIndex) => {
                const stripPositionFromBottom = stripsCount - stripIndex - 1;
                const stripUpperBound = stripPositionFromBottom * (100 / stripsCount);
                const stripLowerBound = (stripPositionFromBottom + 1) * (100 / stripsCount);

                strip.style.clipPath = `polygon(
                  0% ${stripLowerBound}%,
                  100% ${stripLowerBound}%,
                  100% ${stripUpperBound - 0.1}%,
                  0% ${stripUpperBound - 0.1}%
                )`;
              })
            } else if (transitionIndex > currentImageIndex) {
              strips.forEach((strip, stripIndex) => {
                const stripPositionFromBottom = stripsCount - stripIndex - 1;
                const stripUpperBound = stripPositionFromBottom * (100 / stripsCount);
                const stripLowerBound = (stripPositionFromBottom + 1) * (100 / stripsCount);
                const stripDelay = (stripIndex / stripsCount) * 0.5;
                const adjustedProgress = Math.max(
                  0,
                  Math.min(1, (imageSpecificProgress - stripDelay) * 2)
                );
                const currentStripUpperBound =
                  stripLowerBound - (stripLowerBound - (stripUpperBound - 0.1)) * adjustedProgress;

                strip.style.clipPath = `polygon(
                  0% ${stripLowerBound}%,
                  100% ${stripLowerBound}%,
                  100% ${currentStripUpperBound}%,
                  0% ${currentStripUpperBound}%
                )`;
              });
            } else {
              strips.forEach((strip, stripIndex) => {
                const stripPositionFromBottom = stripsCount - stripIndex - 1;
                const stripLowerBound = (stripPositionFromBottom + 1) * (100 / stripsCount);
                const stripUpperBound = stripPositionFromBottom * (100 / stripsCount);
                const stripDelay = (stripIndex / stripsCount) * 0.5;
                const adjustedProgress = Math.max(
                  0,
                  Math.min(1, (imageSpecificProgress - stripDelay) * 2)
                );
                const currentStripUpperBound =
                  stripLowerBound - (stripLowerBound - (stripUpperBound - 0.1)) * adjustedProgress;

                strip.style.clipPath = `polygon(
                  0% ${stripLowerBound}%,
                  100% ${stripLowerBound}%,
                  100% ${currentStripUpperBound}%,
                  0% ${currentStripUpperBound}%
                )`;
              });
            }

            const imgScale = getScaleForImage(
              transitionIndex,
              currentImageIndex,
              imageSpecificProgress
            )

            images.forEach((img) => {
              img.style.transform = `scale(${imgScale})`
            })
          }
          lastImageProgress = imageProgress
        }
      }
    });

    return () => {
      lenis.off("scroll", scrollUpdateHandler);
      gsap.ticker.remove(tickerHandler);
      scrollTriggerInstance.kill();
      gsap.killTweensOf(titleElement);
      lenis.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [])

  return (
    <div className='text-white '>
      <section className='sticky-slider relative w-screen h-screen p-4 overflow-hidden'>
        <div className='slide-images absolute top-0 left-0 w-full h-full'>
          <div className="img absolute top-0 left-0 w-full h-full" id='img-1'>
            <img
              className='w-full h-full object-cover origin-center absolute top-0 left-0 '
              style={{ transition: 'transform 0.1s ease-out' }}
              src='/images/img-prj (1).webp'
              alt='image 1'
              width={1200}
              height={1200}
            />
          </div>
        </div>

        <div className="slide-info absolute top-1/2 left-0 -translate-y-1/2 w-screen px-5 py-3 flex gap-8 border-b border-gray-500 text-2xl md:text-3xl will-change-transform ">
          <div className="slide-title-prefix flex-1 text-[#f3d8a8] hidden md:block text-shadow-lg/20">
            <p>Projects </p>
          </div>

          <div className="slide-title relative flex-2 overflow-hidden text-[#f3d8a8] text-shadow-lg/50">
            <p id='title-text' className=''
              style={{ clipPath: 'polygon(0, 0, 100%, 0, 100%, 100%, 0%, 100%)' }}
            ></p>
          </div>

          <div className='flex gap-2 md:gap-4'>

            <div className="git-link flex order-1 md:order-none flex-1 ">
              <Link001 className='text-xl text-[#f3d8a8] text-shadow-lg/20 bg-[#a1875b] px-2 rounded-t-[6px]' href="#">Github</Link001>
            </div>

            <div className="slide-link flex justify-end order-1 md:order-none flex-1 ">
              <Link001 className='text-xl text-[#f3d8a8] text-shadow-lg/20 bg-[#a1875b] px-2 rounded-t-[6px]' href="#">Live</Link001>
            </div>
          </div>
        </div>

        <div className='absolute overflow-hidden rounded-xl top-2/3 left-1/2 -translate-x-1/2 p-3 w-7xl max-w-80 md:max-w-2xl '>

          <p id='des-text' className='text-base text-neutral-200 font-sans relative bg-[#a1875b] p-3 rounded-[2px] text-center '
            style={{ clipPath: 'polygon(0, 0, 100%, 0, 100%, 100%, 0%, 100%)' }}
          ></p>
        </div>
      </section>
    </div>
  )
}

export default Projects

