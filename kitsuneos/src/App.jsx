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
    key: "kitsune",
    chip: "Kitsune Edition",
    name: "The head start",
    de: "KDE Plasma",
    desc: "The cozy-arcane flavour. Beautiful by default, dotfiles open, theming documented — a warm den you can make your own at your own pace.",
    features: [
      "Pastel-dark 'cozy arcane' theme out of the box",
      "Dotfiles in the open, theming docs included",
      "The 'make it yours' journey — a head start, not a wall",
    ],
  },
  {
    key: "hypr",
    chip: "HyprKitsune Edition",
    name: "The chaos",
    de: "Hyprland",
    desc: "The rice-culture-native flagship. Tiling, flashy, fully yours — for the people who read the wiki twice and rebuilt the kernel for fun.",
    features: [
      "Pristine Hyprland rice, engineered to be posted",
      "Terminal-first soul, keybind-everything philosophy",
      "The 'btw' flex — you built this machine",
    ],
  },
];

function Editions() {
  return (
    <section id="editions">
      <div className="container">
        <motion.div
          className="section-head"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.span className="section-eyebrow" variants={fadeUp}>
            Two flavours
          </motion.span>
          <motion.h2 variants={fadeUp}>Kitsune Edition, or do you want the chaos?</motion.h2>
          <motion.p variants={fadeUp}>
            Same fox, two hearts. Pick the calm den, or pick the flex. Either way,
            the system is yours — that's the whole point.
          </motion.p>
        </motion.div>

        <motion.div
          className="editions-grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {editions.map((ed) => (
            <motion.div key={ed.key} variants={fadeUp}>
              <TiltCard>
                <SpotlightCard
                  className={`edition-card ${ed.key}`}
                  spotlightColor={
                    ed.key === "kitsune"
                      ? "rgba(244, 200, 168, 0.16)"
                      : "rgba(196, 168, 214, 0.18)"
                  }
                >
                  <div className="glow-top" />
                  <span className={`edition-chip ${ed.key}`}>{ed.chip}</span>
                  <h3>{ed.name}</h3>
                  <div className="de">{ed.de}</div>
                  <p>{ed.desc}</p>
                  <ul className="edition-features">
                    {ed.features.map((f) => (
                      <li key={f}>
                        <span className="dot" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="edition-question"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          The installer asks: <span>“Kitsune Edition, or do you want the chaos?”</span>
        </motion.p>
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
