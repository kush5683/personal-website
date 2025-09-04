(() => {
  function Footer() {
    const year = new Date().getFullYear();
    return (
      <footer>
        <div className="container">© {year} Kush Shah · Built with React</div>
      </footer>
    );
  }

  window.AppComponents = window.AppComponents || {};
  window.AppComponents.Footer = Footer;
})();

