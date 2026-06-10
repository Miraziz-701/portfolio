import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import OutlinedButton from '../components/OutlinedButton';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  'Editorial Photography',
  'Portrait & Lifestyle',
  'Brand Visual Identity',
  'Art Direction',
  'Post-Production & Retouching',
];

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const labelRef = useRef(null);
  const headlineRef = useRef(null);
  const skillsListRef = useRef(null);
  const bodyRef = useRef(null);
  const ctaRef = useRef(null);
  const textBlockRef = useRef(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const image = imageRef.current;
    const label = labelRef.current;
    const headline = headlineRef.current;
    const skillsList = skillsListRef.current;
    const body = bodyRef.current;
    const cta = ctaRef.current;
    const textBlock = textBlockRef.current;

    if (!image || !label || !headline || !skillsList || !body || !cta || !textBlock) return;

    // Split headline into words
    const headlineWords = headline.innerText.split(' ');
    headline.innerHTML = headlineWords
      .map((word) => `<span class="inline-block overflow-hidden"><span class="word-inner inline-block">${word}</span></span>`)
      .join(' ');
    const wordInners = headline.querySelectorAll('.word-inner');

    const skillItems = skillsList.querySelectorAll('li');

    // Set initial states
    gsap.set(image, { clipPath: 'inset(0 0 100% 0)' });
    gsap.set(label, { y: -20, opacity: 0 });
    gsap.set(wordInners, { y: 40, opacity: 0 });
    gsap.set(skillItems, { x: -30, opacity: 0 });
    gsap.set(body, { y: 20, opacity: 0 });
    gsap.set(cta, { y: 20, opacity: 0 });

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
      .to(label, { y: 0, opacity: 1, ease: 'none' }, 0.05)
      .to(wordInners, { y: 0, opacity: 1, stagger: 0.02, ease: 'none' }, 0.1)
      .to(skillItems, { x: 0, opacity: 1, stagger: 0.02, ease: 'none' }, 0.15)
      .to(body, { y: 0, opacity: 1, ease: 'none' }, 0.22)
      .to(cta, { y: 0, opacity: 1, ease: 'none' }, 0.25);

    // EXIT (70% - 100%)
    scrollTl
      .fromTo(
        textBlock,
        { x: 0, opacity: 1 },
        { x: '-15vw', opacity: 0, ease: 'power2.in' },
        0.7
      )
      .fromTo(
        image,
        { x: 0, scale: 1, opacity: 1 },
        { x: '15vw', scale: 1.05, opacity: 0, ease: 'power2.in' },
        0.7
      );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative w-screen h-screen overflow-hidden bg-[#EAE8E1] z-[15]"
    >
      {/* Left Content Area */}
      <div
        ref={textBlockRef}
        className="absolute top-[18vh] left-[8vw] w-[42vw]"
      >
        <span
          ref={labelRef}
          className="label-text text-[#6E6E6E] block mb-5"
        >
          EXPERTISE
        </span>
        <h2
          ref={headlineRef}
          className="font-display text-[clamp(2rem,3.5vw,3rem)] text-[#111111] leading-[1.2] tracking-[-0.02em] mb-10"
        >
          Skills & Services
        </h2>

        {/* Skills List */}
        <ul ref={skillsListRef} className="space-y-0 mb-10">
          {skills.map((skill, index) => (
            <li
              key={index}
              className="font-body text-[clamp(0.875rem,1.1vw,1rem)] text-[#111111]/80 py-3 border-b border-[rgba(17,17,17,0.1)]"
            >
              {skill}
            </li>
          ))}
        </ul>

        <p
          ref={bodyRef}
          className="font-body text-[clamp(0.875rem,1.1vw,1rem)] text-[#6E6E6E] leading-relaxed max-w-md mb-8"
        >
          From concept to final image, I offer a complete creative service.
          Whether you need a single portrait or a full campaign, I bring the
          same attention to detail and artistic vision to every project.
        </p>

        <div ref={ctaRef}>
          <OutlinedButton variant="dark" onClick={() => alert('CV download coming soon!')}>
            Download CV
          </OutlinedButton>
        </div>
      </div>

      {/* Right Image */}
      <div
        ref={imageRef}
        className="absolute top-[12vh] right-[8vw] w-[37vw] h-[76vh]"
      >
        <img
          src="/images/skills-portrait.jpg"
          alt="Skills portrait"
          className="w-full h-full object-cover grayscale"
        />
      </div>

      {/* Bottom Divider */}
      <div className="absolute bottom-[6vh] left-[8vw] right-[8vw] h-px divider-light" />
    </section>
  );
}
