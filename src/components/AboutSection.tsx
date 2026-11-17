import React from 'react';
import { FadeIn } from './FadeIn';
import { AnimatedText } from './AnimatedText';
import { ContactButton } from './ContactButton';
import { SafeImage } from './SafeImage';
import { ABOUT_DECORATIONS } from '../data/portfolioData';

interface AboutSectionProps {
  onOpenContact: () => void;
}

const ABOUT_BIO =
  "With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!";

export function AboutSection({ onOpenContact }: AboutSectionProps) {
  return (
    <section
      id="about"
      className="min-h-screen relative flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 bg-[#0C0C0C]"
      style={{ overflowX: 'clip' }}
    >
      {/* Top-left Moon icon */}
      <div className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[120px] sm:w-[160px] md:w-[210px] pointer-events-none select-none z-0">
        <FadeIn delay={0.1} x={-80} y={0} duration={0.9}>
          <SafeImage
            src={ABOUT_DECORATIONS.moon}
            alt="Decorative 3D moon sculpture"
            className="w-full h-auto object-contain"
          />
        </FadeIn>
      </div>

      {/* Bottom-left 3D object */}
      <div className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[100px] sm:w-[140px] md:w-[180px] pointer-events-none select-none z-0">
        <FadeIn delay={0.25} x={-80} y={0} duration={0.9}>
          <SafeImage
            src={ABOUT_DECORATIONS.objectBottomLeft}
            alt="Decorative 3D geometric object"
            className="w-full h-auto object-contain"
          />
        </FadeIn>
      </div>

      {/* Top-right Lego icon */}
      <div className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[120px] sm:w-[160px] md:w-[210px] pointer-events-none select-none z-0">
        <FadeIn delay={0.15} x={80} y={0} duration={0.9}>
          <SafeImage
            src={ABOUT_DECORATIONS.legoTopRight}
            alt="Decorative 3D block sculpture"
            className="w-full h-auto object-contain"
          />
        </FadeIn>
      </div>

      {/* Bottom-right 3D group */}
      <div className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[130px] sm:w-[170px] md:w-[220px] pointer-events-none select-none z-0">
        <FadeIn delay={0.3} x={80} y={0} duration={0.9}>
          <SafeImage
            src={ABOUT_DECORATIONS.groupBottomRight}
            alt="Decorative 3D composition"
            className="w-full h-auto object-contain"
          />
        </FadeIn>
      </div>

      {/* Centered Content */}
      <div className="relative z-10 flex flex-col items-center text-center gap-16 sm:gap-20 md:gap-24">
        <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
          <FadeIn delay={0} y={40}>
            <h2
              className="hero-heading font-black uppercase leading-none tracking-tight text-center"
              style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
            >
              About me
            </h2>
          </FadeIn>

          <AnimatedText
            text={ABOUT_BIO}
            className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px]"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
          />
        </div>

        <FadeIn delay={0.2} y={20}>
          <ContactButton onClick={onOpenContact} />
        </FadeIn>
      </div>
    </section>
  );
}
