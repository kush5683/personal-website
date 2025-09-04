(() => {
  function YouTubeTallPrivacy() {
    return (
      <main>
        <section id="policy-hero" data-reveal>
          <div className="container hero">
            <div>
              <h1>YouTubeTall — Privacy Policy</h1>
              <p className="meta">Effective Date: August 31, 2023</p>
              <div className="hero-cta">
                <a className="btn" href="#projects"><i className="fa-solid fa-arrow-left"></i> Back to Projects</a>
                <a className="btn primary" href="https://github.com/kush5683/YouTubeTall" target="_blank" rel="noreferrer"><i className="fa-brands fa-github"></i> GitHub</a>
              </div>
            </div>
            <div className="hero-art" role="img" aria-label="Abstract background"></div>
          </div>
        </section>

        <section id="policy" data-reveal>
          <div className="container">
            <div className="card">
              <h2 className="section-title">Information We Collect</h2>
              <p>
                The YouTubeTall extension does <strong>not</strong> collect or store any personal information. It operates entirely on your local device to adjust how YouTube content is displayed.
              </p>
            </div>
            <div className="card">
              <h2 className="section-title">How We Use Information</h2>
              <p>
                Because no personal data is collected, there is no information to share or process. The extension stores settings only within your browser.
              </p>
            </div>
            <div className="card">
              <h2 className="section-title">Third‑Party Services</h2>
              <p>
                The extension does not send data to third‑party services. Any YouTube content you view remains subject to YouTube’s own privacy policy.
              </p>
            </div>
            <div className="card" id="contact">
              <h2 className="section-title">Contact</h2>
              <p>
                Questions? Reach out via <a href="https://www.linkedin.com/in/kush5683" target="_blank" rel="noreferrer">LinkedIn</a> or open an issue on the <a href="https://github.com/kush5683/YouTubeTall" target="_blank" rel="noreferrer">GitHub repo</a>.
              </p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  window.Pages = window.Pages || {};
  window.Pages.YouTubeTallPrivacy = YouTubeTallPrivacy;
})();

