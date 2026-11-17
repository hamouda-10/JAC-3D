import React, { useEffect, useRef, useState } from 'react';
import { MARQUEE_GIFS } from '../data/portfolioData';
import { SafeImage } from './SafeImage';

const ROW_ONE = MARQUEE_GIFS.slice(0, 11);
const ROW_TWO = MARQUEE_GIFS.slice(11);

const ROW_ONE_TRIPLED = [...ROW_ONE, ...ROW_ONE, ...ROW_ONE];
const ROW_TWO_TRIPLED = [...ROW_TWO, ...ROW_TWO, ...ROW_TWO];

export function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let rafId = 0;

    const updateOffset = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const nextOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(nextOffset);
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateOffset);
    };

    updateOffset();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Motion and 3D showcase reel"
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden"
    >
      <div className="flex flex-col gap-3">
        {/* Row 1: Moves RIGHT on scroll */}
        <div
          className="flex gap-3 w-max"
          style={{
            transform: `translateX(${offset - 200}px)`,
            willChange: 'transform',
          }}
        >
          {ROW_ONE_TRIPLED.map((src, idx) => (
            <div
              key={`row1-${idx}`}
              className="w-[420px] h-[270px] shrink-0 rounded-2xl overflow-hidden bg-[#141416]"
            >
              <SafeImage
                src={src}
                alt={`3D & motion preview ${(idx % ROW_ONE.length) + 1}`}
                loading="lazy"
                fallbackLabel="Motion Preview"
                className="w-[420px] h-[270px] rounded-2xl object-cover block"
              />
            </div>
          ))}
        </div>

        {/* Row 2: Moves LEFT on scroll */}
        <div
          className="flex gap-3 w-max -ml-[600px]"
          style={{
            transform: `translateX(${-(offset - 200)}px)`,
            willChange: 'transform',
          }}
        >
          {ROW_TWO_TRIPLED.map((src, idx) => (
            <div
              key={`row2-${idx}`}
              className="w-[420px] h-[270px] shrink-0 rounded-2xl overflow-hidden bg-[#141416]"
            >
              <SafeImage
                src={src}
                alt={`3D & motion preview ${ROW_ONE.length + (idx % ROW_TWO.length) + 1}`}
                loading="lazy"
                fallbackLabel="Motion Preview"
                className="w-[420px] h-[270px] rounded-2xl object-cover block"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
