import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const labelRef = useRef(null);
  const headlineRef = useRef(null);
  const bodyRef = useRef(null);
  const secondaryRef = useRef(null);
  const captionRef = useRef(null);
  const dividerRef = useRef(null);
  const textBlockRef = useRef(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const image = imageRef.current;
    const label = labelRef.current;
    const headline = headlineRef.current;
    const body = bodyRef.current;
    const secondary = secondaryRef.current;
    const caption = captionRef.current;
    const divider = dividerRef.current;
    const textBlock = textBlockRef.current;

    if (!image || !label || !headline || !body || !secondary || !caption || !divider || !textBlock) return;

    // Split headline into words
    const headlineWords = headline.innerText.split(' ');
    headline.innerHTML = headlineWords
      .map((word) => `<span class="inline-block overflow-hidden"><span class="word-inner inline-block">${word}</span></span>`)
      .join(' ');
    const wordInners = headline.querySelectorAll('.word-inner');

    // Set initial states
    gsap.set(image, { clipPath: 'inset(0 0 100% 0)' });
    gsap.set(label, { y: -20, opacity: 0 });
    gsap.set(wordInners, { y: 40, opacity: 0 });
    gsap.set(body, { y: 30, opacity: 0 });
    gsap.set(secondary, { y: 30, opacity: 0 });
    gsap.set(caption, { y: 20, opacity: 0 });
    gsap.set(divider, { scaleX: 0, transformOrigin: 'right' });

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
      .to(image, { clipPath: 'inset(0 0 0% 0)', ease: 'none' }, 0)
      .to(label, { y: 0, opacity: 1, ease: 'none' }, 0)
      .to(wordInners, { y: 0, opacity: 1, stagger: 0.02, ease: 'none' }, 0.05)
      .to(body, { y: 0, opacity: 1, ease: 'none' }, 0.15)
      .to(secondary, { y: 0, opacity: 1, ease: 'none' }, 0.2)
      .to(caption, { y: 0, opacity: 1, ease: 'none' }, 0.25)
      .to(divider, { scaleX: 1, ease: 'none' }, 0.2);

    // EXIT (70% - 100%)
    scrollTl
      .fromTo(
        textBlock,
        { x: 0, opacity: 1 },
        { x: '-20vw', opacity: 0, ease: 'power2.in' },
        0.7
      )
      .fromTo(
        image,
        { x: 0, scale: 1, opacity: 1 },
        { x: '20vw', scale: 1.08, opacity: 0, ease: 'power2.in' },
        0.7
      )
      .fromTo(
        divider,
        { scaleX: 1 },
        { scaleX: 0, transformOrigin: 'right', ease: 'power2.in' },
        0.8
      );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-screen h-screen overflow-hidden bg-[#EAE8E1] z-[11]"
    >
      {/* Left Content Area */}
      <div
        ref={textBlockRef}
        className="absolute top-[20vh] left-[8vw] w-[38vw]"
      >
        <span
          ref={labelRef}
          className="label-text text-[#6E6E6E] block mb-6"
        >
          ABOUT
        </span>
        <h2
          ref={headlineRef}
          className="font-display text-[clamp(1.75rem,3vw,2.75rem)] text-[#111111] leading-[1.2] tracking-[-0.02em] mb-8"
        >
          Jonathan — Photographer & Visual Storyteller
        </h2>
        <p
          ref={bodyRef}
          className="font-body text-[clamp(0.875rem,1.1vw,1rem)] text-[#111111]/80 leading-relaxed mb-6"
        >
          Based in New York, I specialize in editorial and conceptual
          photography. My work explores the tension between structure and
          emotion, finding beauty in the mundane and drama in the ordinary. With
          over a decade of experience, I've collaborated with publications
          including Vogue, Kinfolk, and Cereal Magazine.
        </p>
        <p
          ref={secondaryRef}
          className="font-body text-[clamp(0.875rem,1.1vw,1rem)] text-[#6E6E6E] leading-relaxed italic"
        >
          My approach is intentional and minimal — every element in the frame
          serves a purpose.
        </p>
      </div>

      {/* Right Image */}
      <div
        ref={imageRef}
        className="absolute top-[15vh] right-[8vw] w-[40vw] h-[70vh]"
      >
        <img
          src="/images/about-portrait.jpg"
          alt="Jonathan portrait"
          className="w-full h-full object-cover grayscale"
        />
      </div>

      {/* Caption */}
      <span
        ref={captionRef}
        className="label-text text-[#6E6E6E] absolute bottom-[10vh] left-[8vw]"
      >
        ABOUT THE ARTIST
      </span>

      {/* Horizontal Divider */}
      <div
        ref={dividerRef}
        className="absolute bottom-[8vh] left-[8vw] right-[8vw] h-px divider-light"
      />
    </section>
  );
}
