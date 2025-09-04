import { useEffect } from 'react';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import ResumePage from './pages/ResumePage.jsx';
import YouTubeTallPrivacy from './pages/YouTubeTallPrivacy.jsx';
import { useTheme, useHash, useActiveSection, useReveal } from './hooks.js';

export default function App() {
  const hash = useHash();
  const isResume = hash.startsWith('#/resume') || hash === '#resume';
  const isYTPrivacy = hash.startsWith('#/privacy/youtubetall');
  const isStandalone = hash.startsWith('#/');
  const [theme, toggleTheme] = useTheme();
  const activeId = useActiveSection(!isStandalone);
  useReveal(true, hash);

  useEffect(() => {
    if (isStandalone) {
      requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'auto' }));
    } else if (hash && hash.startsWith('#') && hash.length > 1) {
      const id = hash.slice(1);
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

