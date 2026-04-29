// ================================================
// QUALIMPLAN — App root
// ================================================
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return React.createElement('div', {
        style: { padding: '40px', fontFamily: 'monospace', color: '#c00', background: '#fff9f9', minHeight: '100vh' }
      },
        React.createElement('h2', null, 'Erro ao renderizar a página'),
        React.createElement('pre', { style: { whiteSpace: 'pre-wrap', fontSize: '13px' } },
          String(this.state.error)
        )
      );
    }
    return this.props.children;
  }
}

const InsurancePopup = () => {
  const [open, setOpen] = React.useState(true);

  React.useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  if (!open) return null;

  return (
    <div className="insurance-popup" role="presentation">
      <div className="insurance-popup-backdrop" onClick={() => setOpen(false)} />
      <div
        className="insurance-popup-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="insurance-popup-title"
      >
        <button
          className="insurance-popup-close"
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Fechar aviso"
        >
          <Icon name="plus" size={18} />
        </button>

        <div className="insurance-popup-icon">
          <Icon name="info" size={28} />
        </div>

        <p className="insurance-popup-kicker">Aviso importante</p>
        <h2 id="insurance-popup-title" className="insurance-popup-title">
          Não atendemos convênios
        </h2>
        <p className="insurance-popup-text">
          A Qualimplan realiza atendimentos particulares, com avaliação individualizada e transparência sobre cada etapa do tratamento.
        </p>

        <div className="insurance-popup-actions">
          <a href={WA_LINK} target="_blank" rel="noopener" className="btn btn-whatsapp">
            <Icon name="whatsapp" size={18} />
            Agendar avaliação
          </a>
          <button className="insurance-popup-secondary" type="button" onClick={() => setOpen(false)}>
            Entendi
          </button>
        </div>
      </div>
    </div>
  );
};

const App = () => (
  <>
    <Header />
    <main>
      <Hero />
      <Metrics />
      <Pain />
      <Straumann />
      <Structure />
      <Indication />
      <Process />
      <Benefits />
      <Social />
      <Video2 />
      <FAQ />
      <FinalCTA />
    </main>
    <Footer />
    <WAFloat />
    <InsurancePopup />
    <Tweaks />
  </>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  React.createElement(ErrorBoundary, null, React.createElement(App, null))
);
