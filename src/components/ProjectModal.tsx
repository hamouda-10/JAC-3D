import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, X } from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';
import { SafeImage } from './SafeImage';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onInquire: (projectName: string) => void;
}

export function ProjectModal({ project, onClose, onInquire }: ProjectModalProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  const gallery = project
    ? [project.col2Image, project.col1Images[0], project.col1Images[1]]
    : [];

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl rounded-[36px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-5 sm:p-8 text-[#D7E2EA] my-auto"
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D7E2EA]/60 mb-1">
                  <span>{project.number}</span>
                  <span aria-hidden="true">·</span>
                  <span>{project.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{project.year}</span>
                </div>
                <h3
                  id="project-modal-title"
                  className="font-black uppercase text-2xl sm:text-4xl tracking-tight text-[#D7E2EA]"
                >
                  {project.name}
                </h3>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close project preview"
                className="w-11 h-11 rounded-full border border-[#D7E2EA]/35 flex items-center justify-center text-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Active High-Resolution Preview */}
            <div className="w-full aspect-[16/10] rounded-[28px] overflow-hidden bg-[#141416] mb-4">
              <SafeImage
                src={gallery[activeIndex]}
                alt={`${project.name} render view ${activeIndex + 1}`}
                fallbackLabel={project.name}
                className="w-full h-full object-cover block"
              />
            </div>

            {/* Thumbnail Switcher */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {gallery.map((imgUrl, idx) => (
                <button
                  key={imgUrl}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`h-20 sm:h-24 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                    activeIndex === idx
                      ? 'border-[#D7E2EA] opacity-100'
                      : 'border-transparent opacity-50 hover:opacity-80'
                  }`}
                >
                  <SafeImage
                    src={imgUrl}
                    alt={`${project.name} thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover block"
                  />
                </button>
              ))}
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-2 border-t border-[#D7E2EA]/15">
              <div className="flex flex-col gap-2 max-w-xl">
                <p className="text-sm sm:text-base font-light text-[#D7E2EA]/80 leading-relaxed">
                  {project.summary}
                </p>
                <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-[#D7E2EA]/50">
                  {project.deliverables.map((item, idx) => (
                    <React.Fragment key={item}>
                      <span>{item}</span>
                      {idx < project.deliverables.length - 1 && (
                        <span aria-hidden="true">/</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  const projectName = project.name;
                  onClose();
                  onInquire(projectName);
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#D7E2EA] px-7 py-3 text-xs sm:text-sm font-medium uppercase tracking-widest text-[#D7E2EA] hover:bg-[#D7E2EA] hover:text-[#0C0C0C] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Request Similar Work</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
