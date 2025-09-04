// Entry orchestrator: wires hooks, components and pages defined in other files
(() => {
  const { useEffect } = React;
  const { useTheme, useHash, useActiveSection, useReveal } = window.AppHooks;
  const { Nav, Footer } = window.AppComponents || {};
  const { Home, ResumePage, YouTubeTallPrivacy } = window.Pages || {};

  function App() {
    const hash = useHash();
    const isResume = hash.startsWith('#/resume') || hash === '#resume';
    const isYTPrivacy = hash.startsWith('#/privacy/youtubetall');
    const isStandalone = hash.startsWith('#/');
    const [theme, toggleTheme] = useTheme();
    const activeId = useActiveSection(!isStandalone);
    useReveal(true, hash);

    // Scroll management: reset to top for standalone routes; scroll to anchors for sections
    useEffect(() => {
      if (isStandalone) {
        // Standalone routes (#/resume, #/privacy/...) should start at the top
        requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'auto' }));
      } else if (hash && hash.startsWith('#') && hash.length > 1) {
        const id = hash.slice(1);
        // Defer until sections are mounted
        requestAnimationFrame(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      }
    }, [hash, isStandalone]);

    if (isResume) {
      return (
        <>
          <Nav activeId={activeId} route={hash} theme={theme} onToggleTheme={toggleTheme} />
          <ResumePage />
          <Footer />
        </>
      );
    }
    if (isYTPrivacy) {
      return (
        <>
          <Nav activeId={activeId} route={hash} theme={theme} onToggleTheme={toggleTheme} />
          <YouTubeTallPrivacy />
          <Footer />
        </>
      );
    }

    return (
      <>
        <Nav activeId={activeId} route={hash} theme={theme} onToggleTheme={toggleTheme} />
        <Home />
        <Footer />
      </>
    );
  }

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App />);
})();
