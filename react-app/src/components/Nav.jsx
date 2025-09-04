export default function Nav({ activeId, route, theme, onToggleTheme }) {
  const isStandalone = !!route && route.startsWith('#/');
  const isActive = (href) => (!isStandalone && href === `#${activeId}`) || (route === href);
  return (
    <div className="nav">
      <div className="container nav-inner">
        <a className="brand" href="#top" aria-label="Home">
          <i className="fa-solid fa-code" />
          <span>Kush Shah</span>
        </a>
        <div className="spacer" />
        <div className="nav-links">
          <a className={isActive('#top') ? 'active' : ''} href="#top">About</a>
          <a className={isActive('#experience') ? 'active' : ''} href="#experience">Experience</a>
          <a className={isActive('#projects') ? 'active' : ''} href="#projects">Projects</a>
          <a className={isActive('#skills') ? 'active' : ''} href="#skills">Skills</a>
          <a className={isActive('#/resume') ? 'active' : ''} href="#/resume">Resume</a>
          <a className={isActive('#contact') ? 'active' : ''} href="#contact">Contact</a>
        </div>
        <div className="spacer" />
        <div className="nav-links social">
          <button className="btn theme-toggle" onClick={onToggleTheme} aria-label="Toggle theme">
            <i className="icon fa-regular fa-moon" style={{ display: theme === 'light' ? 'inline-block' : 'none' }} />
            <i className="icon fa-regular fa-sun" style={{ display: theme === 'dark' ? 'inline-block' : 'none' }} />
          </button>
          <a href="https://github.com/kush5683" target="_blank" rel="noreferrer" aria-label="GitHub">
            <i className="fa-brands fa-github" />
          </a>
          <a href="https://www.linkedin.com/in/kush5683" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <i className="fa-brands fa-linkedin" />
          </a>
        </div>
      </div>
    </div>
  );
}

