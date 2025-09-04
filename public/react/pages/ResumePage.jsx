(() => {
  const { EXPERIENCE, PROJECTS, SKILLS } = window.AppData;

  function ResumePage() {
    return (
      <main className="resume">
        <div className="container">
          <div className="resume-actions hide-print">
            <button className="btn" onClick={() => window.print()}><i className="fa-regular fa-file-pdf"/> Print / PDF</button>
          </div>

          <header className="resume-header card">
            <div>
              <h1 style={{ margin: 0 }}>Kush Shah</h1>
              <div className="meta">Cloud Security Engineer · Greater Los Angeles Area</div>
            </div>
            <div className="nav-links social">
              <a href="mailto:kush5683@gmail.com" aria-label="Email"><i className="fa-regular fa-envelope"/></a>
              <a href="https://github.com/kush5683" target="_blank" rel="noreferrer" aria-label="GitHub"><i className="fa-brands fa-github"/></a>
              <a href="https://www.linkedin.com/in/kush5683" target="_blank" rel="noreferrer" aria-label="LinkedIn"><i className="fa-brands fa-linkedin"/></a>
            </div>
          </header>

          <section className="card">
            <h3 style={{ marginTop: 0 }}>Summary</h3>
            <p className="meta">
              Cloud security engineer with experience hardening infrastructure, building dashboards, and improving policy. I enjoy building clean web experiences and working across the stack.
            </p>
          </section>

          <section className="card">
            <h3 style={{ marginTop: 0 }}>Experience</h3>
            {EXPERIENCE.map((e, i) => (
              <div className="resume-item" key={i}>
                <div className="resume-item-head">
                  <strong>{e.role}</strong> · {e.org}
                </div>
                <div className="meta">{e.where} · {e.when}</div>
                <ul>
                  {e.points.map((p, j) => <li key={j}>{p}</li>)}
                </ul>
              </div>
            ))}
          </section>

          <section className="card">
            <h3 style={{ marginTop: 0 }}>Projects</h3>
            <div className="grid">
              {PROJECTS.slice(0, 3).map((p, i) => (
                <div className="card half" key={i}>
                  <strong>{p.title}</strong>
                  <div className="meta">{p.desc}</div>
                  <div style={{ margin: '6px 0' }}>
                    {p.tags.map((t, j) => <span className="tag" key={j}>{t}</span>)}
                  </div>
                  <div className="hero-cta">
                    {p.links.map((l, j) => (
                      <a key={j} className="btn" href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="card">
            <h3 style={{ marginTop: 0 }}>Skills</h3>
            {Object.entries(SKILLS).map(([g, items]) => (
              <div className="resume-item" key={g}>
                <div className="resume-item-head"><strong>{g}</strong></div>
                <div style={{ marginTop: 6 }}>
                  {items.map((s, i) => <span className="tag" key={i}>{s}</span>)}
                </div>
              </div>
            ))}
          </section>

          <section className="card">
            <h3 style={{ marginTop: 0 }}>Education & Certifications</h3>
            <div className="resume-item">
              <div className="resume-item-head"><strong>Northeastern University</strong> — 2024 – Ongoing</div>
              <div className="meta">Master of Science, Cybersecurity</div>
            </div>
            <div className="resume-item">
              <div className="resume-item-head"><strong>Worcester Polytechnic Institute</strong> — 2019 – 2023</div>
              <div className="meta">Bachelor of Science, Computer Science · Cybersecurity concentration · Minor in Economics</div>
            </div>
            <div className="resume-item">
              <div className="resume-item-head"><strong>GIAC Security Essentials (GSEC)</strong></div>
              <div className="meta">Issued Jan 13, 2024</div>
            </div>
          </section>
        </div>
      </main>
    );
  }

  window.Pages = window.Pages || {};
  window.Pages.ResumePage = ResumePage;
})();

