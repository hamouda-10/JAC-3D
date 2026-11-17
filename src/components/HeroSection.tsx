import React from 'react';
import { FadeIn } from './FadeIn';
import { Magnet } from './Magnet';
import { ContactButton } from './ContactButton';
import { SafeImage } from './SafeImage';
import { HERO_PORTRAIT_URL } from '../data/portfolioData';

interface HeroSectionProps {
  onOpenContact: () => void;
}

const NAV_LINKS = [
  { label: 'About', href: '#about', isContact: false },
  { label: 'Price', href: '#services', isContact: false },
  { label: 'Projects', href: '#projects', isContact: false },
  { label: 'Contact', href: '#contact', isContact: true },
];

export function HeroSection({ onOpenContact }: HeroSectionProps) {
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    isContact: boolean
  ) => {
    e.preventDefault();
    if (isContact) {
      onOpenContact();
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      className="h-screen min-h-[640px] flex flex-col justify-between relative bg-[#0C0C0C]"
      style={{ overflowX: 'clip' }}
    >
      {/* Top Navbar */}
      <FadeIn delay={0} y={-20} as="header" className="relative z-20">
        <nav
          aria-label="Primary navigation"
          className="flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href, link.isContact)}
              className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] whitespace-nowrap shrink-0 hover:opacity-70 transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D7E2EA] rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </FadeIn>

      {/* Massive Hero Heading */}
      <div className="overflow-hidden px-4 sm:px-6 md:px-10 relative z-0 flex-1 flex flex-col justify-start">
        <FadeIn delay={0.15} y={40}>
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] mt-6 sm:mt-4 md:-mt-5 select-none">
            Hi, i&rsquo;m jack
          </h1>
        </FadeIn>
      </div>

      {/* Centered Magnetic 3D Portrait */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-none">
        <FadeIn delay={0.6} y={30}>
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
            className="pointer-events-auto"
          >
            <SafeImage
              src={HERO_PORTRAIT_URL}
              alt="3D portrait of Jack"
              fallbackLabel="Jack · 3D Creator"
              fallbackClassName="w-full aspect-[4/5] rounded-3xl"
              className="w-full h-auto object-contain block select-none drop-shadow-[0_24px_60px_rgba(0,0,0,0.65)]"
            />
          </Magnet>
        </FadeIn>
      </div>

      {/* Bottom Bar */}
      <div className="flex justify-between items-end px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 relative z-20">
        <FadeIn delay={0.35} y={20}>
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            a 3d creator driven by crafting striking and unforgettable projects
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton onClick={onOpenContact} />
        </FadeIn>
      </div>
    </section>
  );
}
