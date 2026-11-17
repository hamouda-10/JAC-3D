import React, { useRef } from 'react';
import { motion, MotionValue, useScroll, useTransform } from 'motion/react';
import { FadeIn } from './FadeIn';
import { LiveProjectButton } from './LiveProjectButton';
import { SafeImage } from './SafeImage';
import { PROJECTS, ProjectItem } from '../data/portfolioData';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

interface StickyProjectCardProps {
  project: ProjectItem;
  index: number;
  totalCards: number;
  progress: MotionValue<number>;
  onSelect: (project: ProjectItem) => void;
}

function StickyProjectCard({
  project,
  index,
  totalCards,
  progress,
  onSelect,
}: StickyProjectCardProps) {
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const startRange = index * (1 / totalCards);
  const scale = useTransform(progress, [startRange, 1], [1, targetScale]);

  return (
    <div className="h-[85vh] flex items-start justify-center sticky top-24 md:top-32">
      <motion.article
        style={{
          scale,
          top: `${index * 28}px`,
        }}
        className="relative w-full max-w-6xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 origin-top shadow-[0_24px_80px_rgba(0,0,0,0.7)]"
      >
        {/* Top Row: Number, Category, Name, Live Project Button */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 sm:pb-6">
          <div className="flex items-center gap-4 sm:gap-8">
            <span
              className="font-black leading-none text-[#D7E2EA] tabular-nums"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 100px)' }}
            >
              {project.number}
            </span>

            <div className="flex flex-col gap-0.5 sm:gap-1">
              <span className="text-xs sm:text-sm uppercase tracking-widest text-[#D7E2EA]/60 font-light">
                {project.category}
              </span>
              <h3
                className="font-medium uppercase text-[#D7E2EA] leading-tight"
                style={{ fontSize: 'clamp(1.1rem, 2.5vw, 2.2rem)' }}
              >
                {project.name}
              </h3>
            </div>
          </div>

          <LiveProjectButton onClick={() => onSelect(project)} />
        </div>

        {/* Bottom Row: 2-Column Image Grid (40% Left stacked 2 / 60% Right tall 1) */}
        <div className="flex flex-col md:flex-row items-stretch gap-3 sm:gap-4">
          <div className="w-full md:w-[40%] flex flex-col gap-3 sm:gap-4">
            <div
              className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-[#141416]"
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
            >
              <SafeImage
                src={project.col1Images[0]}
                alt={`${project.name} showcase render 1`}
                loading="lazy"
                fallbackLabel={`${project.name} · 01`}
                className="w-full h-full object-cover block"
              />
            </div>

            <div
              className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-[#141416]"
              style={{ height: 'clamp(160px, 22vw, 340px)' }}
            >
              <SafeImage
                src={project.col1Images[1]}
                alt={`${project.name} showcase render 2`}
                loading="lazy"
                fallbackLabel={`${project.name} · 02`}
                className="w-full h-full object-cover block"
              />
            </div>
          </div>

          <div className="w-full md:w-[60%] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-[#141416] min-h-[220px]">
            <SafeImage
              src={project.col2Image}
              alt={`${project.name} primary showcase render`}
              loading="lazy"
              fallbackLabel={`${project.name} · Hero`}
              className="w-full h-full object-cover block"
            />
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="projects"
      className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-10 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-24 sm:pb-32"
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading font-black uppercase text-center leading-none tracking-tight mb-12 sm:mb-16 md:mb-24"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Project
        </h2>
      </FadeIn>

      <div ref={containerRef} className="relative">
        {PROJECTS.map((project, index) => (
          <StickyProjectCard
            key={project.number}
            project={project}
            index={index}
            totalCards={PROJECTS.length}
            progress={scrollYProgress}
            onSelect={onSelectProject}
          />
        ))}
      </div>
    </section>
  );
}
