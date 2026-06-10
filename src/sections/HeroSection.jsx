import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import OutlinedButton from '../components/OutlinedButton';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const headlineRef = useRef(null);
  const subHeadlineRef = useRef(null);
  const bodyRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const image = imageRef.current;
    const content = contentRef.current;
    const headline = headlineRef.current;
    const subHeadline = subHeadlineRef.current;
    const body = bodyRef.current;
    const cta = ctaRef.current;
    const scrollInd = scrollIndicatorRef.current;

    if (!image || !content || !headline || !subHeadline || !body || !cta || !scrollInd) return;

    // Split headline into words
    const headlineWords = headline.innerText.split(' ');
    headline.innerHTML = headlineWords
      .map((word) => `<span class="inline-block overflow-hidden"><span class="word-inner inline-block">${word}</span></span>`)
      .join(' ');
    const wordInners = headline.querySelectorAll('.word-inner');

    // Set initial states for entrance animation
    gsap.set(image, { clipPath: 'inset(0 100% 0 0)' });
    gsap.set(content, { opacity: 0 });
    gsap.set(wordInners, { y: 30, opacity: 0 });
    gsap.set(subHeadline, { y: 20, opacity: 0 });
    gsap.set(body, { y: 20, opacity: 0 });
    gsap.set(cta, { y: 20, opacity: 0 });
    gsap.set(scrollInd, { opacity: 0 });

    // AUTO-PLAY entrance animation timeline
    const entranceTl = gsap.timeline({ delay: 0.2 });

    entranceTl
      .to(image, {
        clipPath: 'inset(0 0% 0 0)',
        duration: 0.9,
        ease: 'power3.out',
      })
      .to(
        content,
        {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
        },
        0.2
      )
      .to(
        wordInners,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
        },
        0.35
      )
      .to(
        subHeadline,
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
        },
        0.6
      )
      .to(
        [body, cta],
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
        },
        0.75
      )
      .to(
        scrollInd,
        {
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
        },
        1.0
      );

    // SCROLL-DRIVEN EXIT animation
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=140%',
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        onLeaveBack: () => {
          // Reset all elements to visible when scrolling back to top
          gsap.set(image, { x: 0, scale: 1, opacity: 1, clipPath: 'inset(0 0% 0 0)' });
          gsap.set(content, { x: 0, opacity: 1 });
          gsap.set(wordInners, { y: 0, opacity: 1 });
          gsap.set(subHeadline, { y: 0, opacity: 1 });
          gsap.set([body, cta], { y: 0, opacity: 1 });
          gsap.set(scrollInd, { opacity: 1 });
        },
      },
    });

    // EXIT phase (70% - 100%)
    scrollTl
      .fromTo(
        image,
        { x: 0, scale: 1, opacity: 1 },
        { x: '-15vw', scale: 1.05, opacity: 0, ease: 'power2.in' },
        0.7
      )
      .fromTo(
        content,
        { x: 0, opacity: 1 },
        { x: '10vw', opacity: 0, ease: 'power2.in' },
        0.7
      )
      .fromTo(
        scrollInd,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.7
      );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative w-screen h-screen overflow-hidden bg-[#111111] z-10"
    >
      {/* Left Image Panel */}
      <div
        ref={imageRef}
        className="absolute top-0 left-0 w-1/2 h-full"
      >
        <img
          src="/images/hero-left.jpg"
          alt="Editorial photography"
          className="w-full h-full object-cover grayscale"
        />
      </div>

      {/* Vertical Divider */}
      <div className="absolute top-0 left-1/2 w-px h-full bg-[rgba(234,232,225,0.15)]" />

      {/* Right Content Panel */}
      <div
        ref={contentRef}
        className="absolute top-0 right-0 w-1/2 h-full flex flex-col justify-center px-[8vw]"
      >
        <h1
          ref={headlineRef}
          className="font-display text-[clamp(2.5rem,5vw,4.5rem)] text-[#EAE8E1] leading-[1.1] tracking-[-0.02em] mb-4"
        >
          Visual Stories
        </h1>
        <p
          ref={subHeadlineRef}
          className="font-display italic text-[clamp(1.5rem,3vw,2.5rem)] text-[#EAE8E1]/80 mb-8"
        >
          in Black & White
        </p>
        <p
          ref={bodyRef}
          className="font-body text-[clamp(0.875rem,1.1vw,1rem)] text-[#EAE8E1]/60 leading-relaxed max-w-md mb-10"
        >
          I capture moments that exist between light and shadow. Each frame is a
          conversation — a story told without words.
        </p>
        <div ref={ctaRef}>
          <OutlinedButton href="#projects">View Selected Work</OutlinedButton>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-[8vh] left-1/2 -translate-x-1/2 scroll-bounce"
      >
        <svg
          width="16"
          height="24"
          viewBox="0 0 16 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 4V20M8 20L2 14M8 20L14 14"
            stroke="#EAE8E1"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
