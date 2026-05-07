// ================================================
// QUALIMPLAN — Sections (Part 2): Straumann, Structure, Indication, Process
// ================================================

// ---- STRAUMANN
const STRAUMANN_PILLARS = [
  { title: "Mais confiança no planejamento.", text: "Tecnologia reconhecida na implantodontia aplicada a cada avaliação, sempre partindo das particularidades do seu caso." },
  { title: "Materiais e superfícies de alta performance.", text: "Componentes projetados para oferecer resistência, longevidade e previsibilidade clínica ao tratamento." },
  { title: "Soluções para diferentes necessidades.", text: "Um portfólio de opções que possibilita planejar o tratamento adequado para diferentes perfis e complexidades." },
  { title: "Atendimento com avaliação individualizada.", text: "A indicação do tratamento depende da avaliação clínica e da análise cuidadosa de cada caso por nossa equipe." },
];

const Straumann = () => (
  <section className="straumann dark-section" id="tecnologia">
    <div className="container straumann-inner">
      <div className="straumann-head">
        <div>
          <Reveal>
            <div className="straumann-badge">
              <div className="straumann-badge-logo">S</div>
              <div className="straumann-badge-text">
                <strong>Straumann Group</strong>
                <span>Technology Partner</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <h2 className="display straumann-title">
              O que a tecnologia Straumann<br/>representa <em>para o paciente.</em>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={260}>
          <p className="straumann-lead">
            Na prática, significa contar com um tratamento planejado com base em tecnologia
            reconhecida na implantodontia, buscando mais previsibilidade, resistência e
            segurança para cada caso.
          </p>
        </Reveal>
      </div>

      <div className="straumann-grid">
        {STRAUMANN_PILLARS.map((p, i) => (
          <Reveal key={i} delay={i * 120} className="straumann-card">
            <div>
              <h3 className="straumann-card-title">{p.title}</h3>
            </div>
            <p className="straumann-card-text">{p.text}</p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={200}>
        <div className="straumann-note">
          <span className="straumann-note-ico"><Icon name="info" size={20} /></span>
          <span><strong style={{color:"#fff"}}>Observação:</strong> A indicação do tratamento depende da avaliação clínica individual realizada pela equipe Qualimplan.</span>
        </div>
      </Reveal>
    </div>
  </section>
);

// ---- STRUCTURE
const GALLERY_IMAGES = [
  { src: "recepcao-3.webp",      alt: "Recepção Qualimplan" },
  { src: "avaliacao-3.webp",     alt: "Sala de Avaliação" },
  { src: "consultores-2-1.webp", alt: "Nossa Equipe" },
  { src: "consultorio-4.webp",   alt: "Consultório Qualimplan" },
  { src: "raiox-1.webp",        alt: "Sala de RX" },
  { src: "800.png",             alt: "Ambiente da clÃ­nica Qualimplan" },
  { src: "cafe.webp",            alt: "Espaço Café" },
  { src: "posoperatorio-1.webp", alt: "Espaço de pós-operatório" },
];

const StructureCarousel = () => {
  const [visibleCount, setVisibleCount] = useState(() =>
    typeof window !== "undefined" && window.innerWidth <= 600 ? 1 : 3
  );
  const [pos, setPos] = useState(0);
  const total = GALLERY_IMAGES.length;
  const maxPos = Math.max(0, total - visibleCount);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const media = window.matchMedia("(max-width: 600px)");
    const updateVisibleCount = (event) => {
      setVisibleCount(event.matches ? 1 : 3);
    };

    updateVisibleCount(media);

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", updateVisibleCount);
      return () => media.removeEventListener("change", updateVisibleCount);
    }

    media.addListener(updateVisibleCount);
    return () => media.removeListener(updateVisibleCount);
  }, []);

  useEffect(() => {
    setPos((current) => Math.min(current, maxPos));
  }, [maxPos]);

  const next = () => setPos(p => p >= maxPos ? 0 : p + 1);
  const prev = () => setPos(p => p <= 0 ? maxPos : p - 1);

  useEffect(() => {
    const t = setTimeout(next, 2500);
    return () => clearTimeout(t);
  }, [pos, maxPos]);

  return (
    <div className="structure-carousel">
      <div
        className="carousel-track"
        style={{ transform: `translateX(-${pos * (100 / visibleCount)}%)` }}
      >
        {GALLERY_IMAGES.map((img, i) => (
          <div key={i} className="carousel-slide">
            <img src={img.src} alt={img.alt} />
          </div>
        ))}
      </div>
      <button className="carousel-btn carousel-prev" type="button" onClick={prev} aria-label="Anterior">
        <Icon name="arrow" size={18} style={{ transform: "rotate(180deg)" }} />
      </button>
      <button className="carousel-btn carousel-next" type="button" onClick={next} aria-label="Próximo">
        <Icon name="arrow" size={18} />
      </button>
      <div className="carousel-dots">
        {Array.from({ length: maxPos + 1 }, (_, i) => (
          <button key={i} type="button" className={"carousel-dot" + (i === pos ? " active" : "")} onClick={() => setPos(i)} aria-label={"Posição " + (i + 1)} />
        ))}
      </div>
    </div>
  );
};

const STRUCTURE_ITEMS = [
  { title: "Cirurgiões-dentistas", sub: "Equipe multidisciplinar", icon: "users" },
  { title: "Salas de atendimento", sub: "Ambientes climatizados", icon: "door" },
  { title: "Salas de RX", sub: "Diagnóstico por imagem", icon: "xray" },
  { title: "Scanner intraoral", sub: "Alta precisão digital", icon: "scan" },
  { title: "Espaço Café", sub: "Conforto para você", icon: "smile" },
  { title: "Pós-operatório", sub: "Suporte e cuidado", icon: "heart" },
];

const Structure = () => (
  <section className="structure" id="estrutura">
    <div className="container">
      <div className="structure-head">
        <div>

          <Reveal delay={80}>
            <h2 className="display structure-title">
              Uma clínica pensada<br/>para <em>acolher e resolver.</em>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={200}>
          <p className="structure-lead">
            A Qualimplan foi idealizada para oferecer atendimento de excelência na região,
            com ambiente acolhedor, tecnologia de apoio ao diagnóstico e equipe preparada
            para diferentes especialidades odontológicas.
          </p>
        </Reveal>
      </div>

      <Reveal delay={100}>
        <StructureCarousel />
      </Reveal>

      <Reveal delay={100} className="structure-cta">
        <a href={WA_LINK} target="_blank" rel="noopener" className="btn btn-whatsapp">
          <Icon name="whatsapp" size={18} />
          Quero agendar minha avaliação
        </a>
      </Reveal>
    </div>
  </section>
);

// ---- INDICATION
const INDICATION_ITEMS = [
  "Ausência de um dente",
  "Ausência de vários dentes",
  "Uso de prótese móvel com interesse em alternativa fixa",
  "Busca por mais segurança na mastigação",
  "Busca por melhoria estética do sorriso",
];

const Indication = () => (
  <section className="indication" id="indicacao">
    <div className="container">
      <div className="indication-head">

        <Reveal delay={100}>
          <h2 className="display indication-title">
            Essa avaliação <em>faz sentido para você?</em>
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="indication-lead">
            Listamos abaixo os perfis mais comuns de pessoas que buscam a Qualimplan
            para entender o caminho ideal. Se você se reconhece em algum, vale conversar.
          </p>
        </Reveal>
      </div>

      <div className="indication-grid">
        {INDICATION_ITEMS.map((t, i) => (
          <Reveal key={i} delay={i * 80} className="indication-card">
            <span className="indication-check">
              <Icon name="check" size={14} style={{ strokeWidth: 2.2 }} />
            </span>
            <span className="indication-text">{t}</span>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// ---- PROCESS
const PROCESS_STEPS = [
  { title: "Agendamento da avaliação", text: "Você fala com nossa equipe pelo WhatsApp e reserva um horário que funcione para a sua rotina.", icon: "calendar" },
  { title: "Análise clínica do seu caso", text: "Avaliação individualizada com apoio de tecnologia de diagnóstico, considerando o seu histórico.", icon: "scan" },
  { title: "Planejamento do tratamento", text: "Proposta de caminho com transparência: o que é possível, quando é indicado e quais opções existem.", icon: "sparkle" },
  { title: "Orientação clara das etapas", text: "Cada passo é explicado com calma e acompanhamento, incluindo o período de pós-operatório.", icon: "heart" },
];

const Process = () => (
  <section className="process" id="processo">
    <div className="container">
      <div className="process-head">
        <div>

          <Reveal delay={80}>
            <h2 className="display process-title">
              Um caminho claro, <em>do primeiro contato ao pós-operatório.</em>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={200}>
          <p className="process-lead">
            Cada caso é único. Por isso, a avaliação profissional é essencial para
            indicar a melhor solução — e é assim que conduzimos cada atendimento.
          </p>
        </Reveal>
      </div>

      <div className="process-timeline">
        {PROCESS_STEPS.map((s, i) => (
          <Reveal key={i} delay={i * 140} className="process-step">
            <div className="process-dot">
              <Icon name={s.icon} size={20} />
            </div>
            <h3 className="process-step-title">{s.title}</h3>
            <p className="process-step-text">{s.text}</p>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

Object.assign(window, { Straumann, Structure, Indication, Process });
