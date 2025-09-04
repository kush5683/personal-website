export default function ResumePage() {
  return (
    <main className="resume">
      <div className="container">
        <div className="resume-actions hide-print">
          <a className="btn" href="#top"><i className="fa-solid fa-arrow-left"/> Back</a>
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
            Cloud security engineer with experience hardening infrastructure, building dashboards, and improving policy. I enjoy
            building clean web experiences and working across the stack.
          </p>
        </section>

        <section className="card">
          <h3 style={{ marginTop: 0 }}>Experience</h3>
          {/* Compact version; details are on the main page */}
          <ul>
            <li>Inland Empire Health Plan — Information Security Engineer (2022—Present)</li>
            <li>Inland Empire Health Plan — Information Security Intern (Summer 2022)</li>
            <li>Health New England — Assistant Information Security Analyst (Summer 2021)</li>
          </ul>
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

