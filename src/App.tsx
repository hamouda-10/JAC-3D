import { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { MarqueeSection } from './components/MarqueeSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactModal } from './components/ContactModal';
import { ProjectModal } from './components/ProjectModal';
import { ProjectItem } from './data/portfolioData';

export default function App() {
  const [contactOpen, setContactOpen] = useState(false);
  const [contactSubject, setContactSubject] = useState('');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const handleOpenContact = (subject = '') => {
    setContactSubject(subject);
    setContactOpen(true);
  };

  return (
    <main
      className="min-h-screen bg-[#0C0C0C] text-[#D7E2EA]"
      style={{ overflowX: 'clip' }}
    >
      <HeroSection onOpenContact={() => handleOpenContact()} />
      <MarqueeSection />
      <AboutSection onOpenContact={() => handleOpenContact()} />
      <ServicesSection />
      <ProjectsSection onSelectProject={(project) => setSelectedProject(project)} />

      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
        defaultSubject={contactSubject}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquire={(projectName) =>
          handleOpenContact(`Interested in a project similar to ${projectName}.`)
        }
      />
    </main>
  );
}
