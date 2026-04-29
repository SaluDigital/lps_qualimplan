// ================================================
// QUALIMPLAN — Sections (Part 1): Header, Hero, Metrics, Pain
// ================================================
const { useState, useEffect, useRef } = React;

const WA_LINK = "https://api.whatsapp.com/send?phone=5511956188187&text=Ol%C3%A1,%20vim%20do%20Google%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20Implante%20Dent%C3%A1rio";

// ---- Reveal (scroll-triggered)
const Reveal = ({ children, as: As = "div", delay = 0, variant = "up", className = "", ...rest }) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          el.classList.add("is-visible");
          io.unobserve(el);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const cls = variant === "x" ? "reveal-x" : variant === "scale" ? "reveal-scale" : "reveal";
  return (
    <As ref={ref} className={`${cls} ${className}`} style={{ "--d": `${delay}ms` }} {...rest}>
      {children}
    </As>
  );
};

// ---- Count-up
const CountUp = ({ end, duration = 1800, suffix = "", prefix = "" }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setVal(end); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setVal(Math.round(end * eased));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [end, duration]);
  return <span ref={ref}>{prefix}{val}{suffix}</span>;
};

// ---- HEADER
const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="container header-inner">
        <a href="#" className="header-logo" aria-label="Qualimplan — Tratamentos Odontológicos">
          <img src="logo.png" alt="Qualimplan" />
        </a>
        <nav className="header-nav" aria-label="Navegação principal">
          <a href="#tecnologia">Tecnologia</a>
          <a href="#estrutura">Estrutura</a>
          <a href="#processo">Processo</a>
          <a href="#faq">Dúvidas</a>
        </nav>
        <span className="header-notice">Não atendemos convênios</span>
        <a href={WA_LINK} target="_blank" rel="noopener" className="btn btn-whatsapp">
          <Icon name="whatsapp" size={18} />
          Agendar avaliação
        </a>
      </div>
    </header>
  );
};

// ---- VIDEO PLAYER / PLACEHOLDER
const VideoPlaceholder = ({ label, src, className = "", style = {}, tall = false, showPlayBtn = true }) => {
  const [playing, setPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // Enable sound by default as requested
  const videoRef = useRef(null);

  const togglePlay = (e) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    
    // For hero video: first click unmutes
    if (tall && isMuted) {
      videoRef.current.muted = false;
      setIsMuted(false);
      if (!playing) videoRef.current.play();
      return;
    }

    const nextPlaying = !playing;
    if (nextPlaying) {
      // Ensure it's unmuted when playing manually
      if (!tall) {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
    setPlaying(nextPlaying);
  };

  const toggleMute = (e) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  // Autoplay for tall (hero) videos
  useEffect(() => {
    if (tall && src && videoRef.current) {
      const video = videoRef.current;
      video.muted = isMuted;
      video.play().catch(() => {
        // Fallback: if blocked, try muting to at least get the video playing
        video.muted = true;
        setIsMuted(true);
        video.play().catch(() => {});
        
        // As soon as the user interacts with the page, try to unmute
        const unmute = () => {
          video.muted = false;
          setIsMuted(false);
          // Try to play again in case it was paused
          video.play().catch(() => {});
        };
        
        window.addEventListener('click', unmute, { once: true });
        window.addEventListener('touchstart', unmute, { once: true });
      });
    }
  }, [tall, src]);

  return (
    <div 
      className={`${tall ? "hero-video" : "video2-player"} ${className} ${playing ? 'is-playing' : ''}`} 
      style={{
        ...style,
        cursor: src ? 'pointer' : 'default'
      }} 
      onClick={src ? togglePlay : null}
      data-video-slot
    >
      {src && (
        <video 
          ref={videoRef}
          src={src}
          className="video-element"
          playsInline
          loop
          muted={isMuted}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 2
          }}
        />
      )}

      {/* Sound control */}
      {src && (
        <div className="video-sound-toggle" onClick={toggleMute} style={{ 
          position: 'absolute', 
          bottom: '20px', 
          right: '20px', 
          zIndex: 10,
          background: 'rgba(0,0,0,0.5)',
          padding: '8px',
          borderRadius: '50%',
          color: '#fff',
          display: 'flex',
          backdropFilter: 'blur(4px)',
          opacity: playing ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: playing ? 'auto' : 'none'
        }}>
          <Icon name={isMuted ? "mute" : "volume"} size={18} />
        </div>
      )}

      {showPlayBtn && !playing && (
        <div style={{ zIndex: 3, position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button className="play-btn" aria-label="Reproduzir vídeo" onClick={(e) => { e.stopPropagation(); togglePlay(); }}>
            <Icon name="play" size={32} />
          </button>
        </div>
      )}
    </div>
  );
};

// ---- HERO
const Hero = () => (
  <section className="hero" id="hero">
    <div className="hero-bg-shape"></div>
    <div className="hero-bg-shape-2"></div>
    <div className="hero-grid-lines"></div>
    <div className="container hero-inner">
      <div className="hero-copy">
        <h1 className="display">
          <Reveal as="span" delay={80} style={{ display: "block" }}>Implante dentário</Reveal>
          <Reveal as="span" delay={180} style={{ display: "block" }}>no Capão Redondo</Reveal>
          <Reveal as="span" delay={280} style={{ display: "block" }}>
            com <em>tecnologia</em> <span className="accent-word">Straumann</span>.
          </Reveal>
        </h1>

        <Reveal delay={420}>
          <p className="hero-sub">
            Recupere seu sorriso com avaliação especializada, estrutura completa
            e planejamento individualizado para o seu caso.
          </p>
        </Reveal>

        <Reveal delay={520}>
          <p className="hero-support">
            Atendimento humanizado, equipe especializada e tecnologia reconhecida
            mundialmente para voltar a sorrir e mastigar com confiança.
          </p>
        </Reveal>

        <Reveal delay={620} className="hero-ctas">
          <a href={WA_LINK} target="_blank" rel="noopener" className="btn btn-whatsapp">
            <Icon name="whatsapp" size={18} />
            Agendar avaliação no WhatsApp
          </a>

        </Reveal>

        <Reveal delay={720}>
          <div className="hero-micro">
            <span className="hero-micro-dot"></span>
            Resposta da equipe em horário comercial.
          </div>
        </Reveal>
      </div>

      <Reveal delay={300} variant="scale" style={{ position: "relative" }}>
        <VideoPlaceholder label="Vídeo Principal" src="video1.mp4" tall showPlayBtn={false} />
        <div className="hero-badge-float">
          <div className="hero-badge-float-icon">
            <Icon name="sparkle" size={18} />
          </div>
          <div className="hero-badge-float-text">
            <strong>Tecnologia Straumann</strong>
            <span>Reconhecida mundialmente</span>
          </div>
        </div>
        <div className="hero-trust-float">
          <span className="hero-trust-float-check">
            <Icon name="check" size={12} style={{ strokeWidth: 2.5 }} />
          </span>
          Avaliação individualizada
        </div>
      </Reveal>
    </div>
  </section>
);

// ---- METRICS
const METRICS = [
  { num: 13, suffix: "+", unit: "anos", label: "Transformando vidas e trazendo sorrisos de volta", icon: "crown" },
  { num: 55, suffix: "k", unit: "", label: "Clientes atendidos com carinho e qualidade", icon: "users" },
  { num: 290, suffix: "k", unit: "", label: "Procedimentos realizados com excelência e cuidado", icon: "shield" },
  { num: 100, suffix: "k", unit: "", label: "Implantes realizados com tecnologia de ponta", icon: "tooth" },
];

const Metrics = () => (
  <section className="metrics" id="metricas">
    <div className="container">
      <div className="metrics-head">
        <div>

          <Reveal delay={80}>
            <h2 className="display metrics-title">
              Uma trajetória construída <em>atendimento por atendimento.</em>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={200}>
          <p className="metrics-note">
            Dados atualizados<br/>
            referentes à operação da<br/>
            Qualimplan · atendimentos realizados.
          </p>
        </Reveal>
      </div>

      <div className="metrics-grid">
        {METRICS.map((m, i) => (
          <Reveal key={i} delay={i * 100} className="metric-card">
            <Icon name={m.icon} size={28} className="metric-ico" />
            <div className="metric-num">
              <CountUp end={m.num} suffix={m.suffix} />
              {m.unit && <span className="unit">{m.unit}</span>}
            </div>
            <p className="metric-label">{m.label}</p>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// ---- PAIN / IDENTIFICATION
const PAIN_ITEMS = [
  { label: "Dificuldade para mastigar", icon: "tooth" },
  { label: "Vergonha ao sorrir", icon: "smile" },
  { label: "Desconforto com prótese móvel", icon: "info" },
  { label: "Insegurança ao falar", icon: "chat" },
  { label: "Perda de confiança no dia a dia", icon: "heart" },
  { label: "Evitar fotos e refeições em público", icon: "users" },
];

const Pain = () => (
  <section className="pain" id="identificacao">
    <div className="container pain-grid">
      <div className="pain-copy">

        <Reveal delay={80}>
          <h2 className="display pain-title">
            Mais do que estética: <em>é sobre voltar a viver com confiança.</em>
          </h2>
        </Reveal>
        <Reveal delay={180}>
          <p className="pain-text">
            Perder um ou mais dentes pode afetar mastigação, fala, segurança para sorrir,
            conforto e autoestima. Muitas pessoas passam a evitar fotos, refeições em público,
            conversas e momentos simples por insegurança ou desconforto.
          </p>
        </Reveal>
        <Reveal delay={260}>
          <p className="pain-text">
            Com a avaliação correta, é possível entender o caminho mais adequado para
            recuperar função, conforto e confiança — respeitando o seu tempo e o seu caso.
          </p>
        </Reveal>
      </div>

      <div className="pain-cards">
        {PAIN_ITEMS.map((p, i) => (
          <Reveal key={i} delay={i * 80} className="pain-card">
            <span className="pain-card-ico">
              <Icon name={p.icon} size={18} />
            </span>
            <span className="pain-card-label">{p.label}</span>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

Object.assign(window, { Reveal, CountUp, Header, Hero, Metrics, Pain, VideoPlaceholder, WA_LINK });
