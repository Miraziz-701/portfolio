import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectConceptualSection() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const labelRef = useRef(null);
  const titleRef = useRef(null);
  const bodyRef = useRef(null);
  const ctaRef = useRef(null);
  const textBlockRef = useRef(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const image = imageRef.current;
    const label = labelRef.current;
    const title = titleRef.current;
    const body = bodyRef.current;
    const cta = ctaRef.current;
    const textBlock = textBlockRef.current;

    if (!image || !label || !title || !body || !cta || !textBlock) return;

    // Split title into characters for dramatic effect
    const titleChars = title.innerText.split('');
    title.innerHTML = titleChars
      .map((char) =>
        char === ' '
          ? ' '
          : `<span class="inline-block overflow-hidden"><span class="char-inner inline-block">${char}</span></span>`
      )
      .join('');
    const charInners = title.querySelectorAll('.char-inner');

    // Set initial states
    gsap.set(image, { clipPath: 'inset(100% 0 0 0)', scale: 1.15 });
    gsap.set(label, { y: -15, opacity: 0 });
    gsap.set(charInners, { y: 60, opacity: 0 });
    gsap.set(body, { y: 30, opacity: 0 });
    gsap.set(cta, { y: 30, opacity: 0 });

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
      .to(image, { clipPath: 'inset(0% 0 0 0)', scale: 1, ease: 'none' }, 0)
      .to(label, { y: 0, opacity: 1, ease: 'none' }, 0.1)
      .to(charInners, { y: 0, opacity: 1, stagger: 0.005, ease: 'none' }, 0.15)
      .to(body, { y: 0, opacity: 1, ease: 'none' }, 0.2)
      .to(cta, { y: 0, opacity: 1, ease: 'none' }, 0.25);

    // EXIT (70% - 100%)
    scrollTl
      .fromTo(
        image,
        { y: 0, scale: 1, opacity: 1 },
        { y: '-10vh', scale: 1.1, opacity: 0, ease: 'power2.in' },
        0.7
      )
      .fromTo(
        textBlock,
        { y: 0, opacity: 1 },
        { y: -30, opacity: 0, ease: 'power2.in' },
        0.75
      );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-screen h-screen overflow-hidden bg-[#111111] z-[12]"
    >
      {/* Full-screen Image */}
      <div ref={imageRef} className="absolute inset-0">
        <img
          src="/images/project1-conceptual.jpg"
          alt="Conceptual photography"
          className="w-full h-full object-cover grayscale"
        />
        {/* Bottom gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 40%, transparent 60%)',
          }}
        />
      </div>

      {/* Text Content */}
      <div
        ref={textBlockRef}
        className="absolute bottom-[12vh] left-[8vw] z-10"
      >
        <span
          ref={labelRef}
          className="label-text text-[#EAE8E1]/60 block mb-4"
        >
          PROJECT 01
        </span>
        <h2
          ref={titleRef}
          className="font-display italic text-[clamp(3rem,6vw,5rem)] text-[#EAE8E1] leading-[1] tracking-[-0.02em] mb-6"
          style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
        >
          Conceptual
        </h2>
        <p
          ref={bodyRef}
          className="font-body text-[clamp(0.875rem,1.1vw,1rem)] text-[#EAE8E1]/70 leading-relaxed max-w-md mb-6"
        >
          A study of form, shadow, and negative space. This series challenges
          perception by isolating subjects from their context, creating new
          narratives through abstraction.
        </p>
        <a
          ref={ctaRef}
          href="#"
          onClick={(e) => e.preventDefault()}
          className="inline-flex items-center gap-2 font-body text-sm text-[#EAE8E1] hover:text-[#C4A574] transition-colors duration-200 group"
        >
          View Project
          <span className="group-hover:translate-x-1 transition-transform duration-200">
            →
          </span>
        </a>
      </div>
    </section>
  );
}
