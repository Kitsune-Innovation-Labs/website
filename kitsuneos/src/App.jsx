import { motion } from "framer-motion";
import SpotlightCard from "./components/SpotlightCard.jsx";
import RotatingText from "./components/RotatingText.jsx";
import MagneticButton from "./components/MagneticButton.jsx";
import SparkleCursor from "./components/SparkleCursor.jsx";
import Meteors from "./components/Meteors.jsx";
import TwinklingStars from "./components/TwinklingStars.jsx";
import TiltCard from "./components/TiltCard.jsx";
import ShinyText from "./components/ShinyText.jsx";

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// Safe animation: starts visible, only animates when JS+motion works.
const safeVariants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <div className="nav-brand">
          <img src="/kitsune-mark.png" alt="Kitsune OS mark" />
          <span>Kitsune OS</span>
        </div>
        <div className="nav-links">
          <a href="#editions">Editions</a>
          <a href="#story">Story</a>
          <a href="#terminal">Terminal</a>
          <span className="nav-badge">btw 🦊</span>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <div className="container">
      <div className="hero">
        <motion.div
          className="hero-mark-wrap"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div className="hero-glow" />
          <img className="hero-mark" src="/kitsune-mark.png" alt="K4 Moonlit Kitsune" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Kitsune <ShinyText>OS</ShinyText>
        </motion.h1>

        <motion.p
          className="hero-tagline"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
        >
          <RotatingText
            texts={["the fox's own distro, btw", "beautiful but geeky", "dark canvas, pastel voice", "made from the culture", "btw, do you want the chaos?"]}
            rotationInterval={2800}
          />
        </motion.p>

        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          A desktop Linux built on Arch — beautiful but geeky. Dark canvas, pastel
          voice, and a system that's entirely yours, because you built it that way.
          Made <em>from</em> the culture, not for it.
        </motion.p>

        <motion.div
          className="hero-cta"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.7 }}
        >
          <MagneticButton>
            <a className="btn btn-primary" href="#editions">
              Choose your flavour
            </a>
          </MagneticButton>
          <MagneticButton strength={0.25}>
            <a className="btn btn-ghost" href="#story">
              The story
            </a>
          </MagneticButton>
        </motion.div>
      </div>
    </div>
  );
}

const editions = [
  {
    key: "desktop",
    name: "KitsuneOS Desktop",
    short: "Desktop",
    desc: "The everyday KitsuneOS experience for laptops and desktops: expressive, adaptable, and designed to feel like your computer rather than ours.",
    href: "/kitsuneos/desktop/",
    visual: "desktop",
  },
  {
    key: "server",
    name: "KitsuneOS Server",
    short: "Server",
    desc: "A quiet, dependable KitsuneOS environment for self-hosting, infrastructure, homelabs, and services you can inspect and own.",
    href: "/kitsuneos/server/",
    visual: "server",
  },
  {
    key: "tv",
    name: "KitsuneOS TV",
    short: "TV",
    desc: "A remote-first living-room system for local media, streaming, games, music, and the wider Kitsune entertainment ecosystem.",
    href: "/kitsuneos/tv/",
    visual: "tv",
  },
  {
    key: "touch",
    name: "KitsuneOS Touch",
    short: "Touch",
    desc: "A touch-first edition for handheld and tablet computing, including the kind of open personal devices envisioned by Shirogane.",
    href: "/kitsuneos/touch/",
    visual: "touch",
  },
  {
    key: "wear",
    name: "KitsuneOS Wear",
    short: "Wear",
    desc: "A compact KitsuneOS experience for wearables, glanceable information, quick actions, and continuity with the rest of your devices.",
    href: "/kitsuneos/wear/",
    visual: "wear",
  },
  {
    key: "game",
    name: "KitsuneOS Game",
    short: "Game",
    desc: "A controller-first edition for console-like systems, emulation, game libraries, local play, and streaming.",
    href: "/kitsuneos/game/",
    visual: "game",
  },
  {
    key: "sim",
    name: "KitsuneOS Sim",
    short: "Sim",
    desc: "A simulation-focused edition for cockpits, dashboards, driving rigs, specialist control surfaces, and immersive computing.",
    href: "/kitsuneos/sim/",
    visual: "sim",
  },
  {
    key: "apple-silicon",
    name: "KitsuneOS Apple Silicon",
    short: "Apple Silicon",
    desc: "KitsuneOS adapted as a first-class experience for Apple Silicon hardware, building on the open Linux enablement work around the platform.",
    href: "/kitsuneos/apple-silicon/",
    visual: "apple",
  },
];

function EditionVisual({ type, label }) {
  return (
    <div className={`edition-visual edition-visual-${type}`} aria-hidden="true">
      <div className="edition-visual-window">
        <div className="visual-bar"><span /><span /><span /></div>
        <div className="visual-canvas">
          <div className="visual-block visual-block-a" />
          <div className="visual-lines">
            <span /><span /><span />
          </div>
          <div className="visual-block visual-block-b" />
          <div className="visual-lines visual-lines-short">
            <span /><span />
          </div>
        </div>
      </div>
      <span className="edition-visual-label">{label}</span>
    </div>
  );
}

function Editions() {
  return (
    <section id="editions" className="versions-section">
      <div className="container">
        <motion.div
          className="section-head versions-head"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.span className="section-eyebrow" variants={fadeUp}>
            One foundation
          </motion.span>
          <motion.h2 variants={fadeUp}>KitsuneOS, shaped for where you use it.</motion.h2>
          <motion.p variants={fadeUp}>
            Every version is built on <strong>KitsuneOS Core</strong> — a shared base that keeps
            the architecture, tooling, and system behaviour coherent while each experience is
            tuned for its own kind of device.
          </motion.p>
          <motion.div className="core-callout" variants={fadeUp}>
            <div>
              <span className="core-kicker">Shared foundation</span>
              <h3>KitsuneOS Core</h3>
              <p>One common system underneath every KitsuneOS experience.</p>
            </div>
            <a className="btn btn-ghost" href="/kitsuneos/core/">Explore Core</a>
          </motion.div>
        </motion.div>

        <div className="version-flow">
          {editions.map((ed, index) => (
            <motion.article
              key={ed.key}
              className={`version-row ${index % 2 ? "version-row-reverse" : ""}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <div className="version-copy">
                <span className="version-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="version-chip">{ed.short}</span>
                <h3>{ed.name}</h3>
                <p>{ed.desc}</p>
                <div className="version-actions">
                  <a className="btn btn-primary" href={ed.href}>Explore {ed.short}</a>
                </div>
              </div>
              <EditionVisual type={ed.visual} label={ed.short} />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

const dims = [
  { icon: "🏡", title: "Sanctuary", desc: "The machine is the first place that was yours. It stays a refuge." },
  { icon: "🛠️", title: "Self-authorship", desc: "Transition is a DIY project — and so is Linux. Both are rebuilding the self." },
  { icon: "🎨", title: "Aesthetic fusion", desc: "Dark as the canvas, pastel as the voice, animal as the signature." },
  { icon: "⚙️", title: "Infrastructure sovereignty", desc: "Why rent a server when you can run one? Don't accept the given system." },
  { icon: "😂", title: "Memetic sociality", desc: "The joke is the doorway. Own the memes, don't chase them." },
];

function Story() {
  return (
    <section id="story">
      <div className="container">
        <div className="section-head">
          <span className="section-eyebrow">Made from the culture</span>
          <h2>The sanctuary in the machine</h2>
          <p>
            Kitsune OS is built on research into the community it serves — the
            transfeminine programmers, femboys, furries, therians, and homelabbers
            who share one grammar: online refuge, self-authored identity, and
            playful-technical mastery.
          </p>
        </div>

        <div className="dim-grid">
          {dims.map((d) => (
            <div key={d.title} className="dim-card">
              <div className="dim-icon">{d.icon}</div>
              <h4>{d.title}</h4>
              <p>{d.desc}</p>
            </div>
          ))}
        </div>

        <p className="story-quote">
          “The fox is not decoration — it is <strong>identity infrastructure</strong>.
          The sanctuary in the machine was never the escape. It was the construction site.”
        </p>
      </div>
    </section>
  );
}

function Terminal() {
  return (
    <section id="terminal">
      <div className="container">
        <div className="section-head">
          <span className="section-eyebrow">Terminal-native</span>
          <h2>She survives the terminal</h2>
          <p>
            A logo for this culture has to be drawable in ASCII — because the
            terminal is home. This is the K4 Moonlit Kitsune in your neofetch.
          </p>
        </div>

        <div className="terminal-wrap">
          <div className="terminal-bar">
            <span className="tbtn" />
            <span className="tbtn" />
            <span className="tbtn" />
            <span className="terminal-title">fox@kitsune — fastfetch</span>
          </div>
          <div className="terminal-body">
            <img className="terminal-ascii" src="/kitsune-ascii-v2.png" alt="K4 Moonlit Kitsune in ASCII art" />
            <div className="terminal-info">
              <div>
                <span className="info-label">user</span> <span className="info-accent">fox@kitsune</span>
              </div>
              <div>
                <span className="info-label">os</span> <span className="info-value">Kitsune OS <span className="info-accent">btw</span></span>
              </div>
              <div>
                <span className="info-label">edition</span> <span className="info-lav">HyprKitsune</span>
              </div>
              <div>
                <span className="info-label">kernel</span> <span className="info-value">Arch, rolling</span>
              </div>
              <div>
                <span className="info-label">shell</span> <span className="info-mint">starship</span>
              </div>
              <div>
                <span className="info-label">theme</span> <span className="info-value">cozy-arcane</span>
              </div>
              <div>
                <span className="info-label">tails</span> <span className="info-value">4 and growing <span className="info-cursor" /></span>
              </div>
              <div style={{ marginTop: 10 }}>
                <span className="info-label">$ </span>fastfetch <span className="terminal-cursor" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <img className="f-logo" src="/kitsune-mark.png" alt="Kitsune OS mark" />
      <div className="f-name">Kitsune OS</div>
      <div className="f-sub">os.kitsunelabs.nz</div>
      <div className="f-org">Kitsune Innovation Labs · Arch under the hood, fox in the den</div>
      <div className="f-wink">the fox's own distro, btw 🦊</div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <div className="bg-canvas" />
      <Meteors />
      <TwinklingStars />
      <SparkleCursor />
      <Nav />
      <main>
        <Hero />
        <Editions />
        <Story />
        <Terminal />
      </main>
      <Footer />
    </>
  );
}
