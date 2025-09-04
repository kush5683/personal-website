import { useMemo, useState } from 'react';
import { EXPERIENCE, PROJECTS, SKILLS } from '../data.js';
import { useReveal } from '../hooks.js';

function Hero() {
  return (
    <section id="top" data-reveal>
      <div className="container hero">
        <div>
          <h1>Cloud Security Engineer & Developer</h1>
          <p>
            I secure infrastructure and build clean, reliable software. Currently at
            Inland Empire Health Plan. Pursuing an MS in Cybersecurity at Northeastern.
          </p>
          <div className="hero-cta">
            <a className="btn primary" href="#contact"><i className="fa-regular fa-paper-plane"/> Get in touch</a>
            <a className="btn" href="../resume.html" target="_blank" rel="noreferrer"><i className="fa-regular fa-file-lines"/> View resume</a>
          </div>
        </div>
        <div className="hero-art" role="img" aria-label="Abstract background" data-reveal />
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" data-reveal>
      <div className="container">
        <h2 className="section-title">About</h2>
        <p>
          Currently working as a cloud security engineer at
          {' '}<a href="https://www.iehp.org/" target="_blank" rel="noreferrer">Inland Empire Health Plan</a>.
          {' '}I am also currently pursuing a Master's in CyberSecurity from
          {' '}<a href="https://www.northeastern.edu/" target="_blank" rel="noreferrer">Northeastern University</a>.
          {' '}Recently finished my bachelor's of Computer Science at
          {' '}<a href="https://www.wpi.edu/" target="_blank" rel="noreferrer">Worcester Polytechnic Institute</a>.
          {' '}My interests include web development, data science, and cybersecurity. Please checkout my
          {' '}<a href="https://github.com/kush5683" target="_blank" rel="noreferrer">GitHub</a>
          {' '}to see what I've worked on and feel free to message me on
          {' '}<a href="https://www.linkedin.com/in/kush5683" target="_blank" rel="noreferrer">LinkedIn</a>.
        </p>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" data-reveal>
      <div className="container">
        <h2 className="section-title">Experience</h2>
        <div className="grid">
          {EXPERIENCE.map((e, i) => (
            <div className="card half" key={i} data-reveal>
              <h3>{e.role} · {e.org}</h3>
              <div className="meta">{e.where} · {e.when}</div>
              <ul>
                {e.points.map((p, j) => <li key={j}>{p}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectsSection({ filters, setFilters, toggleTag, clearFilters, hoverTag, setHoverTag }) {
  const filtered = useMemo(() => {
    if (!filters.length) return PROJECTS;
    return PROJECTS.filter((p) => filters.every((f) => p.tags.includes(f)));
  }, [filters]);

  if (typeof useReveal === 'function') {
    useReveal(true, `projects:${filters.slice().sort().join('|')}`);
  }

  const cleanTitle = (title) => {
    if (!title) return '';
    let t = title.replace(/^CS\s*\d{4}\s*[—\-:]+\s*/i, '');
    t = t.replace(/\s*\([A-Z]\d{2}\)\s*$/, '');
    return t.trim();
  };

  return (
    <section id="projects" data-reveal>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Projects</h2>
          {filters.length > 0 && (
            <button className="btn clear-filters" onClick={() => setFilters([])}>Clear filters</button>
          )}
        </div>
        <div className="grid">
          {filtered.map((p, i) => (
            <div className="card third" key={i} data-reveal>
              <h3>{cleanTitle(p.title)}</h3>
              <p className="meta">{p.desc}</p>
              <div style={{ marginBottom: 8 }}>
                {p.tags.map((t, j) => (
                  <button
                    key={j}
                    type="button"
                    className={`tag clickable ${filters.includes(t) ? 'active' : ''} ${hoverTag === t ? 'match' : ''}`}
                    onClick={() => toggleTag(t)}
                    onMouseEnter={() => setHoverTag(t)}
                    onMouseLeave={() => setHoverTag(null)}
                    aria-pressed={filters.includes(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="hero-cta">
                {p.links.map((l, j) => (
                  <a
                    key={j}
                    className="btn"
                    href={l.href}
                    target={l.href.startsWith('#/') ? undefined : '_blank'}
                    rel={l.href.startsWith('#/') ? undefined : 'noreferrer'}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillsSection({ filters, toggleTag, hoverTag, setHoverTag }) {
  return (
    <section id="skills" data-reveal>
      <div className="container">
        <h2 className="section-title">Skills</h2>
        <div className="grid">
          {Object.entries(SKILLS).map(([group, items]) => (
            <div className="card half" key={group} data-reveal>
              <h3>{group}</h3>
              <div style={{ marginTop: 6 }}>
                {items.map((s, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`tag clickable ${filters.includes(s) ? 'active' : ''} ${hoverTag === s ? 'match' : ''}`}
                    onClick={() => toggleTag(s)}
                    onMouseEnter={() => setHoverTag(s)}
                    onMouseLeave={() => setHoverTag(null)}
                    aria-pressed={filters.includes(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" data-reveal>
      <div className="container">
        <h2 className="section-title">Contact</h2>
        <p>
          Open to interesting security and engineering opportunities. Best way to reach me is via
          {' '}<a href="https://www.linkedin.com/in/kush5683" target="_blank" rel="noreferrer">LinkedIn</a>.
        </p>
        <div className="hero-cta" style={{ marginTop: 10 }}>
          <a className="btn primary" href="https://www.linkedin.com/in/kush5683" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-linkedin"/> Connect on LinkedIn
          </a>
          <a className="btn" href="https://github.com/kush5683" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-github"/> View GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [filters, setFilters] = useState([]);
  const [hoverTag, setHoverTag] = useState(null);
  const toggleTag = (tag) => setFilters((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  return (
    <>
      <Hero />
      <About />
      <ExperienceSection />
      <ProjectsSection filters={filters} setFilters={setFilters} toggleTag={toggleTag} clearFilters={() => setFilters([])} hoverTag={hoverTag} setHoverTag={setHoverTag} />
      <SkillsSection filters={filters} toggleTag={toggleTag} hoverTag={hoverTag} setHoverTag={setHoverTag} />
      <ContactSection />
    </>
  );
}

