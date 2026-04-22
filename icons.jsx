// ================================================
// QUALIMPLAN — Icons (SVG stroke icons, 24x24)
// ================================================
const Icon = ({ name, size = 20, className = "", style = {} }) => {
  const paths = {
    arrow: <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>,
    whatsapp: <path d="M17.5 14.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-1 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.6-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.4zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.3c1.4.8 3.1 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z" strokeLinejoin="round"/>,
    play: <path d="M8 5v14l11-7z" fill="currentColor" strokeLinejoin="round"/>,
    check: <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round"/>,
    chat: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round"/>,
    shield: <path d="M12 2l8 3v7c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V5l8-3z" strokeLinecap="round" strokeLinejoin="round"/>,
    calendar: <g strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></g>,
    sparkle: <path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" strokeLinejoin="round"/>,
    smile: <g strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></g>,
    tooth: <path d="M12 2c-2 0-3 1-4 1S6 2 5 3c-1 1-1 3-1 4.5C4 10 5 13 6 15c.5 1 1 3 1.5 5 .2.7 1 1 1.5.5.5-1 1-3 1.5-4 .3-.6.7-1 1.5-1s1.2.4 1.5 1c.5 1 1 3 1.5 4 .5.5 1.3.2 1.5-.5.5-2 1-4 1.5-5 1-2 2-5 2-7.5C20 6 20 4 19 3c-1-1-2 0-3 0s-2-1-4-1z" strokeLinejoin="round"/>,
    clock: <g strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></g>,
    pin: <g strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-7 8-13a8 8 0 1 0-16 0c0 6 8 13 8 13z"/><circle cx="12" cy="9" r="3"/></g>,
    scan: <g strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2M7 12h10"/></g>,
    xray: <g strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 12h16M12 4v16"/></g>,
    lab: <g strokeLinecap="round" strokeLinejoin="round"><path d="M9 3v6L4 20a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-5-11V3M8 3h8"/></g>,
    users: <g strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3"/><path d="M3 20c0-3 3-5 6-5s6 2 6 5M17 10a3 3 0 1 0 0-6M21 20c0-2-1-3.5-3-4.5"/></g>,
    door: <g strokeLinecap="round" strokeLinejoin="round"><path d="M6 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17M3 21h18M15 12h0"/></g>,
    heart: <path d="M12 21s-8-4.5-8-11a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6.5-8 11-8 11z" strokeLinecap="round" strokeLinejoin="round"/>,
    plus: <path d="M12 5v14M5 12h14" strokeLinecap="round"/>,
    info: <g strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v4h1"/></g>,
    star: <path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" strokeLinejoin="round"/>,
    crown: <path d="M3 7l3 3 4-5 2 4 2-4 4 5 3-3-1 11H4L3 7z" strokeLinejoin="round"/>,
    menu: <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round"/>,
    volume: <path d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" strokeLinecap="round" strokeLinejoin="round"/>,
    mute: <path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" strokeLinecap="round" strokeLinejoin="round"/>,
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {paths[name] || null}
    </svg>
  );
};

window.Icon = Icon;
