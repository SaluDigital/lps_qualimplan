// ================================================
// QUALIMPLAN — Sections (Part 3): Benefits, Social, Video2, FAQ, Final, Footer, WAFloat, Tweaks
// ================================================
const { useState, useEffect, useRef } = React;

// ---- BENEFITS
const BENEFITS = [
  { title: "Mais segurança para sorrir", text: "Em muitos casos, o implante está associado a maior estabilidade ao sorrir e a uma autoestima mais fortalecida no dia a dia.", icon: "smile" },
  { title: "Melhora da mastigação", text: "Pode ajudar a recuperar conforto ao mastigar alimentos variados, sempre dependendo da avaliação individual do seu caso.", icon: "tooth" },
  { title: "Mais estabilidade no dia a dia", text: "Uma solução fixa que pode devolver praticidade e conforto, reduzindo limitações do uso de prótese móvel.", icon: "shield" },
  { title: "Preservação óssea", text: "O implante é uma alternativa que, em muitos casos, está associada à preservação da estrutura óssea da região." , icon: "crown" },
];

const Benefits = () => (
  <section className="benefits" id="beneficios">
    <div className="container">
      <div className="benefits-head">
        <div>

          <Reveal delay={80}>
            <h2 className="display benefits-title">
              O que o implante pode<br/><em>devolver para você.</em>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={180}>
          <p style={{color:"var(--qp-text-soft)",fontSize:"15px",lineHeight:1.6,margin:0,maxWidth:"420px"}}>
            Cada benefício abaixo depende da avaliação individual — nosso compromisso é
            falar de forma clara sobre o que é possível no seu caso.
          </p>
        </Reveal>
      </div>

      <div className="benefits-grid">
        {BENEFITS.map((b, i) => (
          <Reveal key={i} delay={i * 120} className="benefit-card">
            <span className="benefit-ico"><Icon name={b.icon} size={24} /></span>
            <h3 className="benefit-card-title">{b.title}</h3>
            <p className="benefit-card-text">{b.text}</p>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// ---- SOCIAL PROOF (Google Reviews Slider)
const GOOGLE_REVIEWS = [
  { name: "VanderLEI SOARes", text: "Sou cliente a alguns anos, sempre bem atendido, colaboradores de forma geral super profissionais e atenciosos! Super recomendo!", stars: 5, time: "1 mês atrás" },
  { name: "Sue Ellen Lima", text: "Fui muito bem atendida na Qualimplan! Desde a recepção até o atendimento odontológico, todos foram muito atenciosos e profissionais. O ambiente é limpo, organizado e acolhedor. Recomendo demais!", stars: 5, time: "1 mês atrás" },
  { name: "Ana Carolina Santos", text: "Atendimento excelente! Equipe muito atenciosa e cuidadosa. Me senti muito segura durante todo o procedimento. A clínica é linda e muito bem equipada. Super recomendo a Qualimplan!", stars: 5, time: "2 meses atrás" },
  { name: "Roberto Nascimento", text: "Clínica muito boa, atendimento nota 10. Fiz meu implante lá e o resultado ficou perfeito. Os profissionais são muito competentes e o ambiente é muito agradável. Recomendo!", stars: 5, time: "2 meses atrás" },
  { name: "Marcia Oliveira", text: "Maravilhosa a clínica! Fui super bem atendida, desde a recepção até o dentista. Ambiente muito limpo e agradável. Profissionais muito capacitados. Estou muito satisfeita com o resultado!", stars: 5, time: "3 meses atrás" },
  { name: "Paulo Henrique Costa", text: "Excelente atendimento! A equipe é muito profissional e atenciosa. O ambiente é muito agradável e moderno. Fiz meu tratamento completo lá e estou muito satisfeito. Recomendo a todos!", stars: 5, time: "3 meses atrás" },
];

const Social = () => {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);
  const totalSlides = GOOGLE_REVIEWS.length;
  const visibleCount = typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 3;
  const maxIndex = Math.max(0, totalSlides - visibleCount);

  const goTo = (idx) => setCurrent(Math.max(0, Math.min(idx, maxIndex)));
  const next = () => setCurrent(prev => prev >= maxIndex ? 0 : prev + 1);
  const prev = () => setCurrent(prev => prev <= 0 ? maxIndex : prev - 1);

  // Auto-slide
  useEffect(() => {
    timerRef.current = setInterval(next, 5000);
    return () => clearInterval(timerRef.current);
  }, [maxIndex]);

  // Pause on hover
  const pauseAuto = () => clearInterval(timerRef.current);
  const resumeAuto = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 5000);
  };

  return (
    <section className="social dark-section" id="confianca">
      <div className="container social-inner">
        <div className="social-head">
          <div>
            <Reveal delay={80}>
              <h2 className="display social-title">
                Quem escolhe a Qualimplan<br/><em>encontra mais do que tratamento.</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img src="https://www.google.com/favicon.ico" alt="Google" style={{ width: 20, height: 20 }} />
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>
                <strong style={{ color: '#fff' }}>4,9</strong> · 983 avaliações no Google
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={140}>
          <div
            className="reviews-slider"
            onMouseEnter={pauseAuto}
            onMouseLeave={resumeAuto}
            style={{ position: 'relative' }}
          >
            {/* Arrow buttons */}
            <button
              className="slider-arrow slider-arrow-left"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Anterior"
            >
              <Icon name="arrow" size={18} style={{ transform: 'rotate(180deg)' }} />
            </button>
            <button
              className="slider-arrow slider-arrow-right"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Próximo"
            >
              <Icon name="arrow" size={18} />
            </button>

            <div style={{ overflow: 'hidden', borderRadius: 'var(--r-lg)' }}>
              <div
                className="reviews-track"
                style={{
                  display: 'flex',
                  gap: '20px',
                  transition: 'transform 0.5s cubic-bezier(.2,.7,.2,1)',
                  transform: `translateX(calc(-${current} * (calc(100% / ${visibleCount}) + 20px * ${(visibleCount - 1) / visibleCount})))`,
                }}
              >
                {GOOGLE_REVIEWS.map((t, i) => (
                  <div
                    key={i}
                    className="testimonial"
                    style={{
                      flex: `0 0 calc(${100 / visibleCount}% - ${20 * (visibleCount - 1) / visibleCount}px)`,
                      minWidth: 0,
                    }}
                  >
                    <div className="testimonial-quote-mark">"</div>
                    <p className="testimonial-text">{t.text}</p>
                    <div className="testimonial-foot">
                      <div className="testimonial-avatar">
                        {t.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
                      </div>
                      <div className="testimonial-meta" style={{ flex: 1 }}>
                        <strong>{t.name}</strong>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <img src="https://www.google.com/favicon.ico" alt="" style={{ width: 12, height: 12 }} />
                          {t.time}
                        </span>
                      </div>
                      <div className="testimonial-stars" aria-label={`${t.stars} estrelas`}>
                        {[...Array(t.stars)].map((_, k) => (
                          <Icon key={k} name="star" size={12} style={{ fill: '#FBBC04', color: '#FBBC04' }} />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots */}
            <div className="slider-dots" style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '28px' }}>
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Slide ${i + 1}`}
                  style={{
                    width: current === i ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '999px',
                    background: current === i ? 'var(--qp-accent)' : 'rgba(255,255,255,0.2)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="social-stats">
            {[
              { n: "Estrutura", l: "Completa e própria" },
              { n: "Acolhimento", l: "Equipe preparada" },
              { n: "Próximo", l: "De você, no Capão Redondo" },
              { n: "Sem convênio", l: "Atendimento particular" },
            ].map((s, i) => (
              <div key={i} className="social-stat">
                <div className="social-stat-num"><em style={{fontFamily:"var(--f-display)"}}>{s.n}</em></div>
                <div className="social-stat-label">{s.l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};


// ---- VIDEO 2
const Video2 = () => (
  <section className="video2" id="experiencia">
    <div className="container video2-grid">
      <Reveal variant="scale">
        <VideoPlaceholder label="Vídeo 02 · Experiência Qualimplan" src="pacientes.mp4" />
      </Reveal>
      <div>

        <Reveal delay={80}>
          <h2 className="display video2-title">
            A Qualimplan <em>por dentro:</em> estrutura, pessoas e cuidado.
          </h2>
        </Reveal>
        <Reveal delay={180}>
          <p className="video2-text">
            Um olhar pelos bastidores da clínica: o ambiente, a equipe, a forma como
            recebemos cada paciente e o que significa, na prática, passar por uma
            avaliação com a Qualimplan.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div className="video2-highlights">
            {[
              "Ambiente acolhedor e climatizado",
              "Equipe multidisciplinar com mais de 20 dentistas",
              "Apoio de tecnologia no diagnóstico",
              "Pós-operatório com suporte humano",
            ].map((h, i) => (
              <div key={i} className="video2-highlight">
                <span className="video2-highlight-dot"></span>
                {h}
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={320}>
          <a href={WA_LINK} target="_blank" rel="noopener" className="btn btn-primary">
            <Icon name="whatsapp" size={18} />
            Falar com a equipe
          </a>
        </Reveal>
      </div>
    </div>
  </section>
);

// ---- FAQ
const FAQ_ITEMS = [
  { q: "Implante dentário dói?", a: "Durante o procedimento, utilizamos recursos de anestesia adequados para proporcionar conforto. Algum nível de sensibilidade no pós-operatório é comum e costuma ser controlado com orientação da equipe. Cada caso, no entanto, é individual e depende da sua avaliação clínica." },
  { q: "Quem usa dentadura ou prótese móvel pode fazer implante?", a: "Em muitos casos, sim — pacientes que utilizam prótese móvel buscam avaliação para entender se o implante é uma opção viável. A indicação depende da análise clínica e das condições específicas do seu caso." },
  { q: "Perdi meus dentes há muito tempo. Ainda posso avaliar implante?", a: "Sim, é possível avaliar. O tempo sem os dentes pode influenciar o planejamento, mas não necessariamente impede o tratamento. O caminho adequado é passar pela avaliação individualizada com nossa equipe." },
  { q: "Tenho pouco osso. Ainda assim posso passar por avaliação?", a: "Sim. Situações de menor quantidade óssea têm diferentes caminhos possíveis e exigem planejamento ainda mais criterioso. A avaliação é justamente o espaço para entender as alternativas para o seu caso." },
  { q: "Quantos implantes são necessários?", a: "Depende diretamente do seu caso: quantidade de dentes, condições clínicas e objetivos do tratamento. A definição é feita com base no planejamento individual realizado pela equipe." },
  { q: "A tecnologia Straumann faz diferença?", a: "Trabalhamos com Straumann por se tratar de uma tecnologia reconhecida mundialmente na implantodontia, associada a previsibilidade, resistência e opções adequadas a diferentes necessidades clínicas." },
  { q: "Como saber se implante é ideal para mim?", a: "Somente a avaliação clínica individual responde com clareza. Ela permite analisar o seu contexto e conversar sobre caminhos, prazos e o que é viável no seu caso específico." },
  { q: "A clínica atende convênios?", a: "A Qualimplan não realiza atendimento por convênios. Nosso atendimento é particular, com planejamento individualizado e transparência sobre cada etapa do tratamento." },
];

const FAQ = () => {
  const [open, setOpen] = useState(0);
  return (
    <section className="faq" id="faq">
      <div className="container">
        <div className="faq-head">

          <Reveal delay={100}>
            <h2 className="display faq-title">
              Dúvidas comuns, <em>respondidas com clareza.</em>
            </h2>
          </Reveal>
          <Reveal delay={180}>
            <p className="faq-lead">
              Reunimos as perguntas que a nossa equipe mais recebe. Se ficou com alguma dúvida,
              fale com a gente pelo WhatsApp.
            </p>
          </Reveal>
        </div>

        <div className="faq-list">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={i} delay={i * 40} className={`faq-item ${isOpen ? "open" : ""}`}>
                <button className="faq-q" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen}>
                  <span>{item.q}</span>
                  <span className="faq-plus">
                    <Icon name="plus" size={16} />
                  </span>
                </button>
                <div className="faq-a" style={{ maxHeight: isOpen ? "400px" : "0px" }}>
                  <div className="faq-a-inner">{item.a}</div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ---- FINAL CTA
const FinalCTA = () => (
  <section className="final dark-section" id="agendar">
    <div className="container final-inner">
      <div>

        <Reveal delay={80}>
          <h2 className="display final-title">
            Agende sua avaliação e entenda qual a <em>melhor solução para o seu caso.</em>
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="final-text">
            Se você perdeu um ou mais dentes e quer voltar a sorrir com mais segurança,
            fale com a equipe da Qualimplan no Capão Redondo e agende sua avaliação
            individualizada.
          </p>
        </Reveal>
        <Reveal delay={280} className="final-ctas">
          <a href={WA_LINK} target="_blank" rel="noopener" className="btn btn-accent">
            <Icon name="whatsapp" size={18} />
            Agendar avaliação no WhatsApp
          </a>

        </Reveal>
        <Reveal delay={360}>
          <div className="final-micro">Atendimento particular · Não atendemos convênios.</div>
        </Reveal>
      </div>

      <Reveal delay={200} variant="scale">
        <div className="final-card">
          {[
            { ico: "pin", t: "Capão Redondo, São Paulo", s: "Estr. de Itapecerica, 3746 — estrutura completa, perto de você." },
            { ico: "clock", t: "Horário de atendimento", s: "Segunda a sexta · 08h às 20h · Sábados · 08h às 18h." },
            { ico: "shield", t: "Avaliação individualizada", s: "A indicação do tratamento depende da análise clínica do seu caso." },
            { ico: "info", t: "Não atendemos convênios", s: "Atendimento particular, com transparência sobre cada etapa." },
          ].map((r, i) => (
            <div key={i} className="final-card-row">
              <span className="final-card-row-ico"><Icon name={r.ico} size={18} /></span>
              <div className="final-card-row-text">
                <strong>{r.t}</strong>
                <span>{r.s}</span>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);

// ---- FOOTER
const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-top">
        <div>
          <div className="footer-logo">
            <img src="logo.png" alt="Qualimplan" />
          </div>
          <p className="footer-brand-text">
            Tratamentos odontológicos com estrutura completa e tecnologia Straumann,
            no Capão Redondo — São Paulo.
          </p>
        </div>
        <div>
          <h4>Clínica</h4>
          <ul>
            <li>Estr. de Itapecerica, 3746</li>
            <li>Capão Redondo · São Paulo · SP</li>
            <li><a href={WA_LINK} target="_blank" rel="noopener">WhatsApp: (11) 95618-8187</a></li>
          </ul>
        </div>
        <div>
          <h4>Atendimento</h4>
          <ul>
            <li>Segunda a sexta · 08h–20h</li>
            <li>Sábados · 08h–18h</li>
            <li>Não atendemos convênios</li>
          </ul>
        </div>
        <div>
          <h4>Navegação</h4>
          <ul>
            <li><a href="#tecnologia">Tecnologia Straumann</a></li>
            <li><a href="#estrutura">Estrutura da clínica</a></li>
            <li><a href="#processo">Como funciona</a></li>
            <li><a href="#faq">Perguntas frequentes</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Qualimplan · Tratamentos Odontológicos</span>
        <span>Capão Redondo · São Paulo</span>
      </div>
    </div>
  </footer>
);

// ---- WHATSAPP FLOAT
const WAFloat = () => (
  <a href={WA_LINK} target="_blank" rel="noopener" className="wa-float" aria-label="Falar no WhatsApp">
    <span className="wa-float-ico"><Icon name="whatsapp" size={18} /></span>
    Falar no WhatsApp
  </a>
);

// ---- TWEAKS PANEL
const PRIMARY_SWATCHES = [
  { name: "Teal", deep: "#0A6B6D", mid: "#0E8F8E", darker: "#064E51", soft: "#EAF6F5", tint: "#D5ECEB", teal: "#7CD3CF" },
  { name: "Deep Forest", deep: "#0B5C44", mid: "#0F7E5E", darker: "#064030", soft: "#E8F4EF", tint: "#CFE7DC", teal: "#7FD0B0" },
  { name: "Ocean", deep: "#0A5E82", mid: "#0E88B4", darker: "#054058", soft: "#E8F3F9", tint: "#CFE5F1", teal: "#7FC6E6" },
];
const ACCENT_SWATCHES = [
  { name: "Orange", deep: "#D9730D", mid: "#F08A1C", soft: "#FEF2E3" },
  { name: "Coral", deep: "#C94A3D", mid: "#E56A5A", soft: "#FCE9E6" },
  { name: "Amber", deep: "#B97A0A", mid: "#DCA026", soft: "#FBF1DE" },
];

const Tweaks = () => {
  const [open, setOpen] = useState(false);
  const [primary, setPrimary] = useState(0);
  const [accent, setAccent] = useState(0);
  const [density, setDensity] = useState("comfortable");
  const [cards, setCards] = useState("shadow");

  useEffect(() => {
    const onMsg = (e) => {
      if (e.data?.type === "__activate_edit_mode") setOpen(true);
      if (e.data?.type === "__deactivate_edit_mode") setOpen(false);
    };
    window.addEventListener("message", onMsg);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", onMsg);
  }, []);

  useEffect(() => {
    const p = PRIMARY_SWATCHES[primary];
    const a = ACCENT_SWATCHES[accent];
    const r = document.documentElement;
    r.style.setProperty("--qp-primary", p.mid);
    r.style.setProperty("--qp-primary-deep", p.deep);
    r.style.setProperty("--qp-primary-darker", p.darker);
    r.style.setProperty("--qp-primary-soft", p.soft);
    r.style.setProperty("--qp-primary-tint", p.tint);
    r.style.setProperty("--qp-accent", a.mid);
    r.style.setProperty("--qp-accent-deep", a.deep);
    r.style.setProperty("--qp-accent-soft", a.soft);
  }, [primary, accent]);

  useEffect(() => {
    document.body.classList.toggle("density-compact", density === "compact");
  }, [density]);

  useEffect(() => {
    document.body.classList.toggle("cards-flat", cards === "flat");
  }, [cards]);

  return (
    <div className={`tweaks-panel ${open ? "open" : ""}`} role="dialog" aria-label="Tweaks">
      <div className="tweaks-head">
        <strong>Tweaks</strong>
        <span>Qualimplan · v1</span>
      </div>

      <div className="tweak-row">
        <label>Cor primária</label>
        <div className="tweak-swatches">
          {PRIMARY_SWATCHES.map((s, i) => (
            <button key={i} className={`tweak-sw ${primary === i ? "active" : ""}`}
              style={{ background: s.mid }} onClick={() => setPrimary(i)} aria-label={s.name} />
          ))}
        </div>
      </div>
      <div className="tweak-row">
        <label>Cor de acento</label>
        <div className="tweak-swatches">
          {ACCENT_SWATCHES.map((s, i) => (
            <button key={i} className={`tweak-sw ${accent === i ? "active" : ""}`}
              style={{ background: s.mid }} onClick={() => setAccent(i)} aria-label={s.name} />
          ))}
        </div>
      </div>
      <div className="tweak-row">
        <label>Densidade</label>
        <div className="tweak-toggle">
          <button className={density === "comfortable" ? "active" : ""} onClick={() => setDensity("comfortable")}>Confortável</button>
          <button className={density === "compact" ? "active" : ""} onClick={() => setDensity("compact")}>Compacto</button>
        </div>
      </div>
      <div className="tweak-row">
        <label>Cards</label>
        <div className="tweak-toggle">
          <button className={cards === "shadow" ? "active" : ""} onClick={() => setCards("shadow")}>Com sombra</button>
          <button className={cards === "flat" ? "active" : ""} onClick={() => setCards("flat")}>Flat</button>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { Benefits, Social, Video2, FAQ, FinalCTA, Footer, WAFloat, Tweaks });
