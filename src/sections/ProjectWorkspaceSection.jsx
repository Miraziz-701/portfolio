import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectWorkspaceSection() {
  const sectionRef = useRef(null);
  const topLeftRef = useRef(null);
  const topRightRef = useRef(null);
  const bottomRightRef = useRef(null);
  const textBlockRef = useRef(null);
  const dividerRef = useRef(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const topLeft = topLeftRef.current;
    const topRight = topRightRef.current;
    const bottomRight = bottomRightRef.current;
    const textBlock = textBlockRef.current;
    const divider = dividerRef.current;

    if (!topLeft || !topRight || !bottomRight || !textBlock || !divider) return;

    // Set initial states
    gsap.set(topLeft, { y: '-15vh', opacity: 0 });
    gsap.set(topRight, { y: '-15vh', opacity: 0 });
    gsap.set(bottomRight, { clipPath: 'inset(100% 0 0 0)' });
    gsap.set(textBlock.children, { y: 30, opacity: 0 });
    gsap.set(divider, { scaleX: 0, transformOrigin: 'center' });

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=140%',
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
      },
    });

    // ENTRANCE (0% - 30%)
    scrollTl
      .to(topLeft, { y: 0, opacity: 1, ease: 'none' }, 0)
      .to(topRight, { y: 0, opacity: 1, ease: 'none' }, 0.05)
      .to(bottomRight, { clipPath: 'inset(0% 0 0 0)', ease: 'none' }, 0.08)
      .to(textBlock.children, { y: 0, opacity: 1, stagger: 0.03, ease: 'none' }, 0.15)
      .to(divider, { scaleX: 1, ease: 'none' }, 0.2);

    // EXIT (70% - 100%)
    scrollTl
      .fromTo(
        [topLeft, topRight],
        { y: 0, opacity: 1 },
        { y: '-20vh', opacity: 0, ease: 'power2.in' },
        0.7
      )
      .fromTo(
        bottomRight,
        { y: 0, opacity: 1 },
        { y: '20vh', opacity: 0, ease: 'power2.in' },
        0.72
      )
      .fromTo(
        textBlock,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative w-screen h-screen overflow-hidden bg-[#EAE8E1] z-[14]"
    >
      {/* Top Left Image */}
      <div
        ref={topLeftRef}
        className="absolute top-[10vh] left-[5vw] w-[42vw] h-[35vh]"
      >
        <img
          src="/images/workspace-1.jpg"
          alt="Workspace"
          className="w-full h-full object-cover grayscale"
        />
      </div>

      {/* Top Right Image */}
      <div
        ref={topRightRef}
        className="absolute top-[10vh] left-[53vw] w-[42vw] h-[35vh]"
      >
        <img
          src="/images/workspace-2.jpg"
          alt="Workspace detail"
          className="w-full h-full object-cover grayscale"
        />
      </div>

      {/* Bottom Right Image */}
      <div
        ref={bottomRightRef}
        className="absolute top-[55vh] left-[53vw] w-[42vw] h-[38vh]"
      >
        <img
          src="/images/workspace-3.jpg"
          alt="Studio workspace"
          className="w-full h-full object-cover grayscale"
        />
      </div>

      {/* Text Block - Bottom Left */}
      <div
        ref={textBlockRef}
        className="absolute top-[55vh] left-[5vw] w-[40vw]"
      >
        <span className="label-text text-[#6E6E6E] block mb-3">
          PROJECT 03
        </span>
        <h2 className="font-display italic text-[clamp(2rem,3.5vw,3rem)] text-[#111111] leading-[1.2] mb-5">
          The Workspace
        </h2>
        <p className="font-body text-[clamp(0.875rem,1.1vw,1rem)] text-[#111111]/80 leading-relaxed max-w-md mb-6">
          Environments shape creativity. This series documents the studios,
          desks, and corners where ideas are born — finding poetry in the tools
          and spaces of makers.
        </p>
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="inline-flex items-center gap-2 font-body text-sm text-[#111111] hover:text-[#C4A574] transition-colors duration-200 group"
        >
          See More
          <span className="group-hover:translate-x-1 transition-transform duration-200">
            →
          </span>
        </a>
      </div>

      {/* Horizontal Divider */}
      <div
        ref={dividerRef}
        className="absolute bottom-[3vh] left-[5vw] right-[5vw] h-px divider-light"
      />
    </section>
  );
}
