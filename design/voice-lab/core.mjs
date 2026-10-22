/**
 * Kitsunebi Voice Lab v0.1 — pure experimental resolver.
 * Browser/Node compatible. No network calls, DOM access, telemetry or user data storage.
 * Contract reference: kitsunebi/docs/language-specification.md
 */
export const DEFAULT_PROFILE = Object.freeze({
  formatVersion: "0.1", id: "reference", name: "Kitsune Reference",
  appearance: { theme: "day", character: "reference", density: "comfortable", shape: "soft", accent: "#79C8FF" },
  comfort: { motion: "essential", contrast: "standard" }
});

export const VOICES = {
  reference: DEFAULT_PROFILE,
  sanctuary: {
    formatVersion: "0.1", id: "sanctuary", name: "Sanctuary",
    appearance: { theme: "night", character: "sanctuary", density: "spacious", shape: "soft", accent: "#79C8FF" },
    comfort: { motion: "off", contrast: "enhanced" }
  },
  playground: {
    formatVersion: "0.1", id: "playground", name: "Playground",
    appearance: { theme: "day", character: "playground", density: "comfortable", shape: "round", accent: "#EF724A" },
    comfort: { motion: "expressive", contrast: "standard" }
  },
  workshop: {
    formatVersion: "0.1", id: "workshop", name: "Workshop",
    appearance: { theme: "day", character: "workshop", density: "compact", shape: "crisp", accent: "#55B6F5" },
    comfort: { motion: "essential", contrast: "enhanced" }
  }
};

export const safeClone = value => JSON.parse(JSON.stringify(value));
const choices = {
  theme: ["day","night"], character: ["reference","sanctuary","playground","workshop"],
  density: ["spacious","comfortable","compact"], shape: ["soft","crisp","round"],
  motion: ["off","essential","expressive"], contrast: ["standard","enhanced"]
};
const exactKeys = (obj,keys) => Object.keys(obj).every(k => keys.includes(k));
const isRecord = obj => obj !== null && typeof obj === "object" && !Array.isArray(obj);
export const isHex = hex => typeof hex === "string" && /^#[\da-f]{6}$/i.test(hex);

export function validateProfile(p) {
  const errors = [];
  if (!isRecord(p)) return { ok:false, errors:["Profile must be a JSON object"] };
  if (!exactKeys(p,["formatVersion","id","name","appearance","comfort"])) errors.push("Unsupported top-level field");
  if (p.formatVersion !== "0.1") errors.push("Unsupported formatVersion (expected 0.1)");
  if (typeof p.id !== "string" || !/^[a-z0-9][a-z0-9-]{1,47}$/.test(p.id)) errors.push("Invalid profile id");
  if (typeof p.name !== "string" || p.name.trim().length < 1 || p.name.length > 80) errors.push("Invalid profile name");
  if (!isRecord(p.appearance)) errors.push("Missing appearance object");
  else {
    if (!exactKeys(p.appearance,["theme","character","density","shape","accent"])) errors.push("Unsupported appearance field");
    for (const field of ["theme","character","density","shape"]) if (!choices[field].includes(p.appearance[field])) errors.push("Invalid appearance." + field);
    if (!isHex(p.appearance.accent)) errors.push("Invalid appearance.accent");
  }
  if (!isRecord(p.comfort)) errors.push("Missing comfort object");
  else {
    if (!exactKeys(p.comfort,["motion","contrast"])) errors.push("Unsupported comfort field");
    for (const field of ["motion","contrast"]) if (!choices[field].includes(p.comfort[field])) errors.push("Invalid comfort." + field);
  }
  return { ok:errors.length === 0, errors };
}

export function hexToRgb(hex) {
  if (!isHex(hex)) throw new Error("Expected #RRGGBB hex colour");
  return [1,3,5].map(i => parseInt(hex.slice(i,i+2),16));
}
function luminance(hex) {
  const linear = hexToRgb(hex).map(v => { const x=v/255; return x <= .04045 ? x/12.92 : ((x+.055)/1.055)**2.4; });
  return linear[0]*.2126 + linear[1]*.7152 + linear[2]*.0722;
}
export function contrastRatio(a,b) {
  const x=luminance(a), y=luminance(b);
  return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);
}
export function readableTextFor(bg) {
  return contrastRatio(bg,"#000000") >= contrastRatio(bg,"#FFFFFF") ? "#000000" : "#FFFFFF";
}

export function tokenAt(tokens,path) {
  const parts=path.split(".");
  let node=tokens;
  for (const part of parts) { if (!node || !Object.prototype.hasOwnProperty.call(node,part)) throw new Error("Unknown token: "+path); node=node[part]; }
  return node;
}
export function resolveToken(tokens,path,seen=new Set()) {
  if (seen.has(path)) throw new Error("Token alias cycle at " + path);
  const node=tokenAt(tokens,path);
  if (!isRecord(node) || !("$value" in node)) throw new Error("Not a token: " + path);
  const value=node.$value;
  if (typeof value === "string") {
    const ref=/^\{([^{}]+)\}$/.exec(value);
    if (!ref) throw new Error("Unsupported string token value at " + path);
    const next=new Set(seen); next.add(path);
    return resolveToken(tokens,ref[1],next);
  }
  if (node.$type === "color" || (isRecord(value) && value.colorSpace)) {
    if (!isRecord(value) || value.colorSpace !== "srgb" || !Array.isArray(value.components) || value.components.length !== 3) throw new Error("Unsupported colour token at "+path);
    if (value.components.some(x => typeof x !== "number" || !Number.isFinite(x) || x<0 || x>1)) throw new Error("Invalid colour channels");
    const derived="#" + value.components.map(v=>Math.round(v*255).toString(16).padStart(2,"0")).join("").toUpperCase();
    if (value.hex && value.hex.toUpperCase() !== derived) throw new Error("Colour hex and channels disagree at "+path);
    return derived;
  }
  return value;
}

export function resolveVoice(profile,tokens,context={}) {
  const validity=validateProfile(profile);
  if (!validity.ok) throw new Error(validity.errors.join("; "));
  const environment={prefersReducedMotion:!!context.prefersReducedMotion, forcedColors:!!context.forcedColors, coarsePointer:!!context.coarsePointer};
  const effective=safeClone(profile), diagnostics=[];
  const a=effective.appearance, c=effective.comfort;
  if (environment.prefersReducedMotion && c.motion !== "off") {
    c.motion="off";
    diagnostics.push("Your system requests reduced motion; decorative animation is disabled.");
  }
  if (environment.forcedColors) {
    diagnostics.push("Your system manages contrast and colour; the visual palette is deferred to system colours.");
  }
  if (environment.coarsePointer && a.density === "compact") {
    diagnostics.push("Larger touch targets are kept even with compact density.");
  }
  const theme=a.theme;
  const t=k=>resolveToken(tokens,"semantic."+theme+"."+k);
  const dark=theme==="night";
  const foreground=c.contrast==="enhanced" ? (dark?"#FFFFFF":"#000000") : t("text");
  const muted=c.contrast==="enhanced" ? foreground : t("muted");
  const card=t("card"), page=t("page"), subtle=t("subtle");
  const accent=a.accent;
  const actionText=readableTextFor(accent);
  const danger=t("danger"), dangerText=readableTextFor(danger);
  const ratios={
    pageText:contrastRatio(page,foreground),
    cardText:contrastRatio(card,foreground),
    pageMuted:contrastRatio(page,muted),
    buttonText:contrastRatio(accent,actionText),
    dangerText:contrastRatio(danger,dangerText)
  };
  // Prevent a broken token set from generating illegible essential roles.
  if (Math.min(ratios.pageText,ratios.cardText,ratios.pageMuted,ratios.buttonText)<4.5) {
    throw new Error("Accessibility gate: reference token contrast below 4.5:1");
  }
  const space=a.density==="spacious"?24:a.density==="compact"?10:16;
  const radius=a.shape==="crisp"?8:a.shape==="round"?32:24;
  const decorative=c.motion==="expressive" && a.character!=="sanctuary";
  let vars={
    "--kb-page":page, "--kb-card":card, "--kb-subtle":subtle,
    "--kb-text":foreground, "--kb-muted":muted, "--kb-accent":accent,
    "--kb-accent-text":actionText, "--kb-focus":t("focus"), "--kb-danger":danger, "--kb-danger-text":dangerText,
    "--kb-space":space+"px", "--kb-radius":radius+"px", "--kb-target-min":environment.coarsePointer?"48px":"42px",
    "--kb-motion": c.motion==="off"?"0ms":c.motion==="essential"?"110ms":"240ms",
    "--kb-ornament":a.character==="workshop"?"0":a.character==="sanctuary"?"0.14":a.character==="playground"?"1":"0.65"
  };
  if (environment.forcedColors) {
    vars={...vars,"--kb-page":"Canvas","--kb-card":"Canvas","--kb-subtle":"Canvas",
      "--kb-text":"CanvasText","--kb-muted":"CanvasText",
      "--kb-accent":"Highlight","--kb-accent-text":"HighlightText","--kb-focus":"Highlight","--kb-danger":"CanvasText","--kb-danger-text":"Canvas"};
  }
  return {effective,environment,variables:vars,ratios:environment.forcedColors?null:ratios,diagnostics,decorative};
}
