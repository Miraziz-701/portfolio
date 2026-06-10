import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectPortraitSection() {
  const sectionRef = useRef(null);
  const leftImageRef = useRef(null);
  const rightTopRef = useRef(null);
  const rightMidRef = useRef(null);
  const rightBotRef = useRef(null);
  const textBlockRef = useRef(null);
  const labelTitleRef = useRef(null);
  const dividerRef = useRef(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const leftImage = leftImageRef.current;
    const rightTop = rightTopRef.current;
    const rightMid = rightMidRef.current;
    const rightBot = rightBotRef.current;
    const textBlock = textBlockRef.current;
    const labelTitle = labelTitleRef.current;
    const divider = dividerRef.current;

    if (!leftImage || !rightTop || !rightMid || !rightBot || !textBlock || !labelTitle || !divider) return;

    // Set initial states
    gsap.set(leftImage, { clipPath: 'inset(0 100% 0 0)' });
    gsap.set(rightTop, { y: '-10vh', opacity: 0, scale: 0.95 });
    gsap.set(rightMid, { x: '10vw', opacity: 0 });
    gsap.set(rightBot, { y: '10vh', opacity: 0 });
    gsap.set(textBlock, { y: -20, opacity: 0 });
    gsap.set(labelTitle, { y: 20, opacity: 0 });
    gsap.set(divider, { scaleX: 0, transformOrigin: 'left' });

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
      .to(leftImage, { clipPath: 'inset(0 0% 0 0)', ease: 'none' }, 0)
      .to(rightTop, { y: 0, opacity: 1, scale: 1, ease: 'none' }, 0.05)
      .to(rightMid, { x: 0, opacity: 1, ease: 'none' }, 0.1)
      .to(rightBot, { y: 0, opacity: 1, ease: 'none' }, 0.12)
      .to(textBlock, { y: 0, opacity: 1, ease: 'none' }, 0.15)
      .to(labelTitle, { y: 0, opacity: 1, ease: 'none' }, 0.2)
      .to(divider, { scaleX: 1, ease: 'none' }, 0.2);

    // EXIT (70% - 100%)
    scrollTl
      .fromTo(
        leftImage,
        { x: 0, opacity: 1 },
        { x: '-30vw', opacity: 0, ease: 'power2.in' },
        0.7
      )
      .fromTo(
        rightTop,
        { y: 0, opacity: 1 },
        { y: '-20vh', opacity: 0, ease: 'power2.in' },
        0.72
      )
      .fromTo(
        rightMid,
        { x: 0, opacity: 1 },
        { x: '20vw', opacity: 0, ease: 'power2.in' },
        0.74
      )
      .fromTo(
        rightBot,
        { y: 0, opacity: 1 },
        { y: '20vh', opacity: 0, ease: 'power2.in' },
        0.76
      )
      .fromTo(
        [textBlock, labelTitle],
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      )
      .fromTo(
        divider,
        { scaleX: 1 },
        { scaleX: 0, transformOrigin: 'left', ease: 'power2.in' },
        0.85
      );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative w-screen h-screen overflow-hidden bg-[#EAE8E1] z-[13]"
    >
      {/* Left Large Image Panel */}
      <div
        ref={leftImageRef}
        className="absolute top-0 left-0 w-[45vw] h-full"
      >
        <img
          src="/images/portrait-1.jpg"
          alt="Portrait series"
          className="w-full h-full object-cover grayscale"
        />
      </div>

      {/* Right Top Image */}
      <div
        ref={rightTopRef}
        className="absolute top-[8vh] left-[48vw] w-[20vw] h-[28vh]"
      >
        <img
          src="/images/portrait-2.jpg"
          alt="Portrait 2"
          className="w-full h-full object-cover grayscale"
        />
      </div>

      {/* Right Middle Image */}
      <div
        ref={rightMidRef}
        className="absolute top-[40vh] left-[48vw] w-[20vw] h-[28vh]"
      >
        <img
          src="/images/portrait-3.jpg"
          alt="Portrait 3"
          className="w-full h-full object-cover grayscale"
        />
      </div>

      {/* Right Bottom Image */}
      <div
        ref={rightBotRef}
        className="absolute top-[40vh] left-[71vw] w-[22vw] h-[28vh]"
      >
        <img
          src="/images/portrait-4.jpg"
          alt="Portrait 4"
          className="w-full h-full object-cover grayscale"
        />
      </div>

      {/* Text Block */}
      <div
        ref={textBlockRef}
        className="absolute top-[10vh] left-[71vw] w-[22vw]"
      >
        <p className="font-body text-[clamp(0.8rem,1vw,0.95rem)] text-[#111111]/80 leading-relaxed">
          A collection of intimate portraits that strip away artifice. Each
          subject is photographed in natural light, revealing vulnerability and
          strength in equal measure.
        </p>
      </div>

      {/* Label + Title */}
      <div
        ref={labelTitleRef}
        className="absolute bottom-[10vh] left-[48vw]"
      >
        <span className="label-text text-[#6E6E6E] block mb-2">
          PROJECT 02
        </span>
        <h2 className="font-display italic text-[clamp(1.5rem,2.5vw,2.5rem)] text-[#111111] leading-[1.2]">
          The Portrait Series
        </h2>
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="inline-flex items-center gap-2 font-body text-sm text-[#111111] hover:text-[#C4A574] transition-colors duration-200 mt-4 group"
        >
          Explore the Series
          <span className="group-hover:translate-x-1 transition-transform duration-200">
            →
          </span>
        </a>
      </div>

      {/* Horizontal Divider */}
      <div
        ref={dividerRef}
        className="absolute bottom-[4vh] left-0 right-0 h-px divider-light"
      />
    </section>
  );
}
