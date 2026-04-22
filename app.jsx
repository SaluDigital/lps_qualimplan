// ================================================
// QUALIMPLAN — App root
// ================================================
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
    <Tweaks />
  </>
);

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
