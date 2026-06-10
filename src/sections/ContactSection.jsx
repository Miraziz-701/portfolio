import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const subTextRef = useRef(null);
  const contactInfoRef = useRef(null);
  const socialsRef = useRef(null);
  const formRef = useRef(null);
  const footerRef = useRef(null);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const headline = headlineRef.current;
    const subText = subTextRef.current;
    const contactInfo = contactInfoRef.current;
    const socials = socialsRef.current;
    const form = formRef.current;
    const footer = footerRef.current;

    if (!headline || !subText || !contactInfo || !socials || !form || !footer) return;

    // Flowing section animations — scroll-linked but not pinned
    const elements = [headline, subText, contactInfo, socials, form, footer];

    elements.forEach((el, i) => {
      gsap.fromTo(
        el,
        { y: 30 + i * 5, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'top 55%',
            scrub: 0.5,
          },
        }
      );
    });
  }, { scope: sectionRef });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-screen bg-[#111111] z-[16]"
    >
      {/* Main Content Area */}
      <div className="pt-[15vh] pb-[10vh] px-[8vw]">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-8">
          {/* Left Column - Info */}
          <div className="lg:w-[45%]">
            <h2
              ref={headlineRef}
              className="font-display text-[clamp(2rem,4vw,3.5rem)] text-[#EAE8E1] leading-[1.2] tracking-[-0.02em] mb-6"
            >
              Let's create something meaningful.
            </h2>
            <p
              ref={subTextRef}
              className="font-body text-[clamp(0.875rem,1.1vw,1rem)] text-[#EAE8E1]/60 leading-relaxed max-w-md mb-12"
            >
              I'm always interested in new projects, collaborations, and
              conversations about photography.
            </p>

            {/* Contact Info */}
            <div ref={contactInfoRef} className="space-y-4 mb-10">
              <a
                href="mailto:hello@jonathandoe.com"
                className="block font-body text-[#EAE8E1] hover:text-[#C4A574] transition-colors duration-200"
              >
                hello@jonathandoe.com
              </a>
              <a
                href="tel:+15552345678"
                className="block font-body text-[#EAE8E1]/70 hover:text-[#C4A574] transition-colors duration-200"
              >
                +1 (555) 234-5678
              </a>
              <p className="font-body text-[#EAE8E1]/70">
                New York, NY
              </p>
            </div>

            {/* Social Links */}
            <div ref={socialsRef} className="flex gap-8">
              {['Instagram', 'LinkedIn', 'Behance'].map((social) => (
                <a
                  key={social}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="font-body text-sm text-[#EAE8E1]/70 hover:text-[#C4A574] transition-colors duration-200"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:w-[50%] lg:pl-[5%]">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="label-text text-[#EAE8E1]/50 block mb-3"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-transparent border-b border-[#EAE8E1]/20 py-3 font-body text-[#EAE8E1] placeholder:text-[#EAE8E1]/30 focus:outline-none focus:border-[#C4A574] transition-colors duration-200"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="label-text text-[#EAE8E1]/50 block mb-3"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-transparent border-b border-[#EAE8E1]/20 py-3 font-body text-[#EAE8E1] placeholder:text-[#EAE8E1]/30 focus:outline-none focus:border-[#C4A574] transition-colors duration-200"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="label-text text-[#EAE8E1]/50 block mb-3"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={4}
                  className="w-full bg-transparent border-b border-[#EAE8E1]/20 py-3 font-body text-[#EAE8E1] placeholder:text-[#EAE8E1]/30 focus:outline-none focus:border-[#C4A574] transition-colors duration-200 resize-none"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>
              <button
                type="submit"
                className="mt-4 px-8 py-3 border border-[#EAE8E1]/40 font-body text-sm tracking-[0.04em] text-[#EAE8E1] hover:bg-[#EAE8E1] hover:text-[#111111] transition-all duration-250"
              >
                {submitted ? 'Message Sent!' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Bar */}
      <div
        ref={footerRef}
        className="border-t border-[rgba(234,232,225,0.15)] px-[8vw] py-[4vh] flex flex-col sm:flex-row justify-between items-center gap-4"
      >
        <p className="font-body text-xs text-[#EAE8E1]/50">
          © 2024 Jonathan Doe. All rights reserved.
        </p>
        <button
          onClick={handleBackToTop}
          className="font-body text-xs text-[#EAE8E1]/50 hover:text-[#C4A574] transition-colors duration-200 border-b border-transparent hover:border-[#C4A574] pb-0.5"
        >
          Back to top
        </button>
      </div>
    </section>
  );
}
