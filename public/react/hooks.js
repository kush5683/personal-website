(() => {
  const { useEffect, useState } = React;

  function useTheme() {
    const [theme, setTheme] = useState(() => {
      const saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark') return saved;
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    });
    useEffect(() => {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }, [theme]);
    const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
    return [theme, toggle];
  }

  function useHash() {
    const [hash, setHash] = useState(window.location.hash || "");
    useEffect(() => {
      const onHash = () => setHash(window.location.hash || "");
      window.addEventListener('hashchange', onHash);
      return () => window.removeEventListener('hashchange', onHash);
    }, []);
    return hash;
  }

  function useActiveSection(enabled = true) {
    const [activeId, setActiveId] = useState('top');
    useEffect(() => {
      if (!enabled) return;
      const ids = ['top', 'about', 'experience', 'projects', 'skills', 'contact'];
      const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveId(entry.target.id);
          });
        },
        { rootMargin: '0px 0px -60% 0px', threshold: 0.25 }
      );
      els.forEach((el) => obs.observe(el));
      return () => obs.disconnect();
    }, [enabled]);
    return activeId;
  }

  function useReveal(enabled = true, watchKey = null) {
    useEffect(() => {
      if (!enabled) return;
      const els = Array.from(document.querySelectorAll('[data-reveal]'));
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('visible');
              obs.unobserve(e.target);
            }
          });
        },
        { rootMargin: '0px 0px -10% 0px', threshold: 0.2 }
      );
      els.forEach((el) => obs.observe(el));
      return () => obs.disconnect();
    }, [enabled, watchKey]);
  }

  window.AppHooks = { useTheme, useHash, useActiveSection, useReveal };
})();
