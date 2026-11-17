import React, { useRef } from 'react';
import { motion, MotionValue, useScroll, useTransform } from 'motion/react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

interface CharacterProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

function Character({ char, progress, range }: CharacterProps) {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block" aria-hidden="true">
      <span className="invisible">{char}</span>
      <motion.span style={{ opacity }} className="absolute left-0 top-0">
        {char}
      </motion.span>
    </span>
  );
}

export function AnimatedText({ text, className = '', style }: AnimatedTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');
  const totalChars = text.length;
  let charIndex = 0;

  return (
    <p ref={containerRef} aria-label={text} className={className} style={style}>
      {words.map((word, wordIdx) => {
        const wordStartIndex = charIndex;
        charIndex += word.length + 1;

        return (
          <React.Fragment key={wordIdx}>
            <span className="inline-block whitespace-nowrap">
              {word.split('').map((char, cIdx) => {
                const idx = wordStartIndex + cIdx;
                const start = idx / totalChars;
                const end = Math.min(1, (idx + 1) / totalChars);
                return (
                  <Character
                    key={`${wordIdx}-${cIdx}`}
                    char={char}
                    progress={scrollYProgress}
                    range={[start, end]}
                  />
                );
              })}
            </span>
            {wordIdx < words.length - 1 ? ' ' : ''}
          </React.Fragment>
        );
      })}
    </p>
  );
}
