import { useEffect, useState } from "react";

const versions = [
  { slug: "desktop", name: "KitsuneOS Desktop", label: "Desktop", desc: "The everyday KitsuneOS experience for laptops and desktops: expressive, adaptable, and designed to feel like your computer rather than ours." },
  { slug: "server", name: "KitsuneOS Server", label: "Server", desc: "A quiet, dependable KitsuneOS environment for self-hosting, infrastructure, homelabs, and services you can inspect and own." },
  { slug: "tv", name: "KitsuneOS TV", label: "TV", desc: "A remote-first living-room system for local media, streaming, games, music, and the wider Kitsune entertainment ecosystem." },
  { slug: "touch", name: "KitsuneOS Touch", label: "Touch", desc: "A touch-first edition for handheld and tablet computing, including the kind of open personal devices envisioned by Shirogane." },
  { slug: "wear", name: "KitsuneOS Wear", label: "Wear", desc: "A compact KitsuneOS experience for wearables, glanceable information, quick actions, and continuity with the rest of your devices." },
  { slug: "game", name: "KitsuneOS Game", label: "Game", desc: "A controller-first edition for console-like systems, emulation, game libraries, local play, and streaming." },
  { slug: "sim", name: "KitsuneOS Sim", label: "Sim", desc: "A simulation-focused edition for cockpits, dashboards, driving rigs, specialist control surfaces, and immersive computing." },
  { slug: "apple-silicon", name: "KitsuneOS Apple Silicon", label: "Apple Silicon", desc: "KitsuneOS adapted as a first-class experience for Apple Silicon hardware while remaining part of the same shared Core family." },
];

function ThemeToggle() {
  const [night, setNight] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("kitsune-theme");
    const nextNight = saved === "night";
    setNight(nextNight);
    document.documentElement.dataset.theme = nextNight ? "night" : "day";
  }, []);
  const toggle = () => {
    const next = !night;
    setNight(next);
    document.documentElement.dataset.theme = next ? "night" : "day";
    localStorage.setItem("kitsune-theme", next ? "night" : "day");
  };
  return <button className="theme-switch" type="button" role="switch" aria-checked={night} aria-label={night ? "Use day theme" : "Use night theme"} onClick={toggle} />;
}

function Nav() {
  return (
    <header className="site-header">
      <div className="shell nav">
        <a className="brand" href="/"><img className="brand-mark" src="/assets/kitsune-emblem.png" alt="" aria-hidden="true" /><span>Kitsune Innovation Labs</span></a>
        <nav className="nav-links" aria-label="Primary navigation">
          <a className="nav-link" href="/">Home</a>
          <a className="nav-link" href="/design/">Kitsunebi</a>
          <details className="nav-menu">
            <summary>Software</summary>
            <div className="nav-dropdown nav-dropdown-grouped">
              <div className="nav-group">
                <span className="nav-group-label">Systems</span>
                <details className="nav-submenu">
                  <summary><span>KitsuneOS</span><span className="nav-status">In development</span></summary>
                  <div className="nav-flyout">
                    <a href="/kitsuneos/"><span>KitsuneOS overview</span><span aria-hidden="true">→</span></a>
                    {versions.map((version) => <a key={version.slug} href={`/kitsuneos/${version.slug}/`}><span>{version.label}</span><span aria-hidden="true">→</span></a>)}
                  </div>
                </details>
                <div className="nav-disabled"><span>Kitsune Control</span><span className="nav-status">In development</span></div>
              </div>
              <div className="nav-group"><span className="nav-group-label">Intelligence</span><div className="nav-disabled"><span>Neko / TenkoAI</span><span className="nav-status">Research</span></div></div>
              <div className="nav-group"><span className="nav-group-label">Experiences</span><a href="/gametable/"><span>GameTable</span><span className="nav-status">In development</span></a><div className="nav-disabled"><span>Kitsune Music</span><span className="nav-status">Research</span></div><div className="nav-disabled"><span>Kitsune Stream</span><span className="nav-status">Future</span></div></div>
              <div className="nav-group"><span className="nav-group-label">Learning</span><div className="nav-disabled"><span>Kitsune Academy</span><span className="nav-status">Planned</span></div></div>
            </div>
          </details>
          <details className="nav-menu"><summary>Hardware</summary><div className="nav-dropdown"><div className="nav-disabled"><span>Shirogane</span><span className="nav-status">Division</span></div><div className="nav-disabled"><span>KitsuneBook</span><span className="nav-status">Future</span></div><div className="nav-disabled"><span>Kitsune Pocket</span><span className="nav-status">Future</span></div><div className="nav-disabled"><span>Kitsune Slate</span><span className="nav-status">Future</span></div><div className="nav-disabled"><span>Kitsune Loop</span><span className="nav-status">Future</span></div><div className="nav-disabled"><span>Kitsune Serve</span><span className="nav-status">Future</span></div></div></details>
          <a className="nav-link" href="/design/#/research">Research</a>
          <details className="nav-menu"><summary>Company</summary><div className="nav-dropdown"><a href="/charter/"><span>Charter</span><span aria-hidden="true">→</span></a><a href="https://github.com/Kitsune-Innovation-Labs"><span>GitHub</span><span aria-hidden="true">↗</span></a></div></details>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

function Blobs() { return <div className="page-blobs" aria-hidden="true"><div className="blob one" /><div className="blob two" /><div className="blob three" /><div className="blob four" /></div>; }
const versionArt = (slug) => `${import.meta.env.BASE_URL}assets/editions/${slug}.png`;
function VersionVisual({ type, label }) { return <div className="version-visual"><div className="visual-orb" aria-hidden="true" /><div className="version-art-frame"><img className="version-art" src={versionArt(type)} alt={`${label} illustration`} loading="lazy" decoding="async" /></div></div>; }

export default function App() {
  return (
    <>
      <Blobs />
      <Nav />
      <main>
        <section className="hero shell">
          <div className="hero-kicker"><span className="pill blue">KitsuneOS</span><span className="pill pink">Built on Core</span></div>
          <h1>One system.<br /><span>Many ways to make it yours.</span></h1>
          <p className="hero-copy">KitsuneOS is a family of operating system experiences for different kinds of computing — from desktops and servers to TVs, wearables, games, simulation rigs, and touch-first devices.</p>
          <div className="core-card"><div><span className="eyebrow">Shared foundation</span><h2>KitsuneOS Core</h2><p>Every KitsuneOS version is built on the same common foundation. Core keeps the architecture, packaging, system behaviour, and ecosystem coherent while each version is free to become exactly what its device needs.</p></div><a className="button secondary" href="/kitsuneos/core/">Explore Core →</a></div>
        </section>
        <section className="versions shell" id="versions">
          <div className="section-intro"><span className="section-label">The KitsuneOS family</span><h2>Different shapes.<br />The same fox underneath.</h2><p>Each version starts with KitsuneOS Core, then adapts its interface, interaction model, and defaults around the environment it is built for.</p></div>
          <div className="version-flow">{versions.map((version, index) => <article className={`version-row ${index % 2 ? "reverse" : ""}`} key={version.slug}><div className="version-copy"><span className="version-index">{String(index + 1).padStart(2, "0")}</span><span className="version-chip">{version.label}</span><h3>{version.name}</h3><p>{version.desc}</p><a className="button primary" href={`/kitsuneos/${version.slug}/`}>Explore {version.label} →</a></div><VersionVisual type={version.slug} label={version.label} /></article>)}</div>
        </section>
      </main>
      <footer className="footer"><div className="shell footer-row"><div><strong>Kitsune Innovation Labs</strong><span> · 知は務め</span></div><div className="footer-links"><a href="/gametable/">GameTable</a><a href="/">Home</a><a href="/design/">Kitsunebi</a><a href="/charter/">Charter</a><a href="https://github.com/Kitsune-Innovation-Labs">GitHub</a></div></div></footer>
    </>
  );
}
