(async function buildResearchSite(){
  const {readFile,mkdir,writeFile} = await import("node:fs/promises");
  const {dirname,resolve,join} = await import("node:path");
  const {fileURLToPath}= await import("node:url");
  const root=fileURLToPath(new URL("../../",import.meta.url));
  const out=resolve(process.argv[2]||join(root,"design/research"));
  const sourceUrl="https://github.com/Kitsune-Innovation-Labs/website/blob/dev/";
  const site="/design/research/";
  const papers=[
    {id:"semantic-invariance",title:"Semantic Invariance and User-Authored Interface Dialects",subtitle:"Toward an Expressive, Testable Design Language",category:"paper",label:"Working Paper 01",tag:"Meaning & expression",path:"kitsunebi/research/paper-01-semantic-invariance.md",route:"papers/semantic-invariance/",number:"01",summary:"Can an interface change its expression while preserving understandable actions, states and meaning?",icon:"✦"},
    {id:"sanctuary",title:"Sanctuary Without Paternalism",subtitle:"Sensory Comfort, Accessibility, and Agency in Personal Computing",category:"paper",label:"Working Paper 02",tag:"Comfort & agency",path:"kitsunebi/research/paper-02-sanctuary.md",route:"papers/sanctuary/",number:"02",summary:"What if comfort could be personalised independently from appearance—without surrendering control?",icon:"☾"},
    {id:"coherent-pluralism",title:"Coherent Pluralism",subtitle:"Interoperability and Governance for a User-Authored Design Language",category:"paper",label:"Working Paper 03",tag:"Systems & governance",path:"kitsunebi/research/paper-03-coherent-pluralism.md",route:"papers/coherent-pluralism/",number:"03",summary:"One language can have many voices across web, desktop, TV and touch. How do we keep it interoperable?",icon:"✿"},
    {id:"methods",title:"Study Protocol and Ethics Checklist",subtitle:"Evidence before claims",category:"experiment",label:"Research methodology",tag:"Research methods",path:"kitsunebi/research/methods-and-ethics.md",route:"experiments/study-protocol/",summary:"Our proposed evaluation design, consent requirements, accessibility testing and publication safeguards.",icon:"⌕"},
    {id:"spec",title:"Kitsunebi Language Specification",subtitle:"Grammar, semantics and expression",category:"spec",label:"KLS 0.1 · Proposal",tag:"Design grammar",path:"kitsunebi/docs/language-specification.md",route:"specifications/language/",summary:"The emerging rules defining what may change, what must remain understandable, and how voices interoperate.",icon:"◇"},
    {id:"architecture",title:"Technical Architecture",subtitle:"Tokens, resolver and platform adapters",category:"spec",label:"Architecture v0.1",tag:"Engineering",path:"kitsunebi/docs/technical-architecture.md",route:"specifications/architecture/",summary:"How semantic roles, user preferences, safety gates and platform-specific renderers fit together.",icon:"⬡"},
    {id:"roadmap",title:"Research & Development Roadmap",subtitle:"From Hibana to Foxfire",category:"spec",label:"Research roadmap",tag:"Development",path:"kitsunebi/docs/roadmap.md",route:"specifications/roadmap/",summary:"Milestones, acceptance criteria, tests and risks for taking Kitsunebi from concept to real applications.",icon:"↗"},
    {id:"adr1",title:"Separate Semantic Grammar from Expressive Voice",subtitle:"Architecture Decision Record 0001",category:"spec",label:"ADR 0001 · Proposed",tag:"Design decisions",path:"kitsunebi/adr/0001-one-language-many-voices.md",route:"specifications/adr-0001/",summary:"Our first explicit architectural decision and the alternatives and costs behind it.",icon:"≋"}
  ];
  const escape=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");
  const slug=s=>s.toLowerCase().replace(/&amp;/g,"").replace(/[^a-z0-9 ]+/g," ").trim().replace(/\s+/g,"-")||"section";
  function inline(value){
    let s=escape(value);
    const code=[];
    s=s.replace(/`([^`]+)`/g,(_,part)=>{code.push("<code>"+part+"</code>");return "\u0001"+(code.length-1)+"\u0002";});
    s=s.replace(/\[([^\]]+)\]\(([^ )]+)\)/g,(_,label,url)=>{
      const raw=url.replaceAll("&amp;","&");
      if(!(raw.startsWith("https://")||raw.startsWith("http://")||raw.startsWith("#")||raw.startsWith("./")||raw.startsWith("../")))return label;
      const safe=escape(raw);return `<a href="${safe}"${raw.startsWith("http")?' target="_blank" rel="noopener noreferrer"':""}>${label}</a>`;
    });
    s=s.replace(/(?<![\w/])(https:\/\/[^\s<>"]+)/g,(full)=> {
      if(full.includes('href=')) return full; // text-only URL autolinking handled below when a whole content segment
      return full;
    });
    s=s.replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>").replace(/(?<!\*)\*([^*]+)\*(?!\*)/g,"<em>$1</em>");
    s=s.replace(/\u0001(\d+)\u0002/g,(_,i)=>code[Number(i)]);
    return s;
  }
  function renderMarkdown(markdown){
    const lines=markdown.replace(/\r\n?/g,"\n").split("\n");
    const html=[],headings=[];let i=0,firstTitle=false;const ids=new Set();
    const isBlock=x=>/^#{1,6}\s|^```|^\s*[-*]\s|^\s*\d+\.\s|^>\s?|^\s*\|.*\|\s*$|^---+\s*$/.test(x);
    const uniq=t=>{const base=slug(t);let id=base,n=2;while(ids.has(id))id=base+"-"+n++;ids.add(id);return id;};
    while(i<lines.length){
      let line=lines[i],trim=line.trim();
      if(!trim){i++;continue;}
      if(/^```/.test(trim)){
        const type=trim.slice(3).trim();const code=[];i++;
        while(i<lines.length&&!/^```/.test(lines[i].trim()))code.push(lines[i++]);
        if(i<lines.length)i++;
        html.push(`<pre><code${type?' data-language="'+escape(type)+'"':""}>${escape(code.join("\n"))}</code></pre>`);continue;
      }
      const hm=/^(#{1,6})\s+(.+)$/.exec(trim);
      if(hm){
        const level=hm[1].length,txt=hm[2].replace(/\s+#+\s*$/,"");
        i++;
        if(level===1&&!firstTitle){firstTitle=true;continue;}
        const actual=Math.min(4,Math.max(2,level));
        const id=uniq(txt);
        if(actual<=3)headings.push({id,title:txt,level:actual});
        html.push(`<h${actual} id="${id}">${inline(txt)} <a class="anchor" href="#${id}" aria-label="Link to ${escape(txt)}">#</a></h${actual}>`);continue;
      }
      if(/^---+\s*$/.test(trim)){html.push("<hr>");i++;continue;}
      if(/^\|.*\|\s*$/.test(trim) && i+1<lines.length && /^\s*\|?[\s:|\-]+\|?\s*$/.test(lines[i+1]) && lines[i+1].includes("---")){
        const cells=l=>l.trim().replace(/^\||\|$/g,"").split("|").map(x=>inline(x.trim()));
        const heads=cells(trim);i+=2;const rows=[];
        while(i<lines.length&&/^\|.*\|\s*$/.test(lines[i].trim()))rows.push(cells(lines[i++]));
        html.push('<div class="table-scroll"><table><thead><tr>'+heads.map(h=>`<th scope="col">${h}</th>`).join("")+'</tr></thead><tbody>'+
        rows.map(row=>'<tr>'+heads.map((_,n)=>`<td>${row[n]||""}</td>`).join("")+'</tr>').join("")+"</tbody></table></div>");continue;
      }
      if(/^>\s?/.test(trim)){const a=[];while(i<lines.length&&/^>\s?/.test(lines[i].trim()))a.push(lines[i++].trim().replace(/^>\s?/,""));html.push(`<blockquote><p>${inline(a.join(" "))}</p></blockquote>`);continue;}
      const lm=/^([-*]|\d+\.)\s+(.+)/.exec(trim);
      if(lm){
        const ordered=/\d/.test(lm[1][0]),arr=[];
        while(i<lines.length){
          const m=/^\s*([-*]|\d+\.)\s+(.+)/.exec(lines[i]);
          if(!m || ordered!==/\d/.test(m[1][0]))break;
          arr.push(m[2]);i++;
        }
        const tag=ordered?"ol":"ul";
        html.push(`<${tag}>`+arr.map(x=>`<li>${inline(x)}</li>`).join("")+`</${tag}>`);continue;
      }
      const para=[trim];i++;
      while(i<lines.length && lines[i].trim() && !isBlock(lines[i].trim()))para.push(lines[i++].trim());
      html.push(`<p>${inline(para.join(" "))}</p>`);
    }
    return {html:html.join("\n"),headings};
  }
  function shell({title,description,main,type="listing",extraHead="",script=true}){
    return `<!doctype html>
<html lang="en" data-theme="day"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="${escape(description)}"><meta name="color-scheme" content="light dark">
<title>${escape(title)} · Kitsunebi Research · Kitsune Innovation Labs</title>
<link rel="stylesheet" href="${site}library.css">
${extraHead}
${script?`<script src="${site}library.mjs" type="module"></script>`:""}
</head><body class="${type}">
<a class="skip-link" href="#main">Skip to main content</a>
<div class="ambient one" aria-hidden="true"></div><div class="ambient two" aria-hidden="true"></div>
<header class="site-header"><div class="site-header__inner">
<a href="/design/" class="brand"><span class="brand-mark" aria-hidden="true">✦</span><span>Kitsunebi <small>狐火</small></span></a>
<nav aria-label="Site navigation"><a href="/">Kitsune Labs</a><a href="/design/">Design Lab</a><a href="/design/voice-lab/">Voice Lab</a><a href="${site}" aria-current="${type==="listing"?"page":"false"}">Research</a></nav>
<button class="theme-toggle" type="button" data-theme-toggle aria-label="Switch between day and night themes" title="Toggle day/night">☾ <span>Theme</span></button>
</div></header>
${main}
<footer class="site-footer"><div class="container"><p><strong>Kitsunebi 狐火</strong> · Research by <a href="/">Kitsune Innovation Labs</a></p><p>Open exploration, careful claims, and a little foxfire. <a href="https://github.com/Kitsune-Innovation-Labs/website/tree/dev/kitsunebi">Explore the source ↗</a></p></div></footer>
</body></html>`;
  }
  const indexMain=`<main id="main" class="container">
<section class="hero"><div class="eyebrow"><span class="eyebrow-dot"></span> KITSUNE INNOVATION LABS · RESEARCH LIBRARY</div>
<h1>The thinking<br><em>behind the flame.</em></h1><p class="hero-lead">A living archive of the questions, ideas, experiments and design decisions shaping <strong>Kitsunebi</strong>—a language meant to be spoken in your own voice.</p>
<div class="hero-actions"><a class="primary-link" href="#papers">Explore the papers <span aria-hidden="true">↗</span></a><a class="subtle-link" href="/design/voice-lab/">Try the Voice Lab <span aria-hidden="true">↗</span></a></div>
<div class="research-status" role="note"><span class="status-mark" aria-hidden="true">✳</span><div><strong>A research library, not a finished body of evidence.</strong><p>These papers are conceptual working drafts, <em>not peer-reviewed results</em>. No participant research is claimed. Specifications and study proposals are clearly separated from findings.</p></div></div>
</section>
<section class="stat-row" aria-label="Research collection summary"><div><strong>03</strong><span>Working papers</span></div><div><strong>01</strong><span>Study protocol</span></div><div><strong>04</strong><span>Specifications & decisions</span></div></section>
<section id="papers" class="collection" aria-labelledby="papers-title"><div class="section-heading"><div><div class="eyebrow">01 / PUBLICATIONS</div><h2 id="papers-title">Papers & working drafts</h2><p>Ideas stated precisely enough to be challenged, tested and improved.</p></div></div>
<div class="paper-grid">${papers.filter(p=>p.category==="paper").map(p=>`<article class="paper-card" data-search="${escape([p.title,p.subtitle,p.tag,p.summary].join(" ").toLowerCase())}">
<div class="paper-card__top"><span class="serial">${p.number}</span><span class="manuscript">Working draft · 2026</span></div>
<div class="paper-icon" aria-hidden="true">${p.icon}</div><div class="eyebrow">${escape(p.label)} / ${escape(p.tag)}</div>
<h3><a href="${site+p.route}">${escape(p.title)}</a></h3><p class="subtitle">${escape(p.subtitle)}</p><p>${escape(p.summary)}</p>
<div class="paper-card__footer"><span>v0.1 · Not peer reviewed</span><a href="${site+p.route}" aria-label="Read ${escape(p.title)}">Read paper ↗</a></div>
</article>`).join("")}</div></section>
<section id="experiments" class="collection" aria-labelledby="experiments-title"><div class="section-heading"><div><div class="eyebrow">02 / METHODOLOGY</div><h2 id="experiments-title">Experiments & evidence</h2><p>How we plan to discover what works—and publish what doesn't.</p></div></div>
<div class="feature-grid">
<article class="feature-panel"><div class="feature-icon" aria-hidden="true">⌕</div><span class="eyebrow">RESEARCH PROTOCOL · DRAFT</span><h3><a href="${site}experiments/study-protocol/">Study methods & ethics</a></h3><p>Consent, inclusive participant recruitment, accessibility testing, research measures and transparent reporting.</p><a class="text-link" href="${site}experiments/study-protocol/">Read the study protocol ↗</a></article>
<article class="feature-panel experiment-panel"><div class="feature-icon" aria-hidden="true">✦</div><span class="eyebrow">INTERACTIVE PROTOTYPE</span><h3><a href="/design/voice-lab/">One Language, Infinite Voices</a></h3><p>Experiment with expression, comfort, density and motion. A working prototype—not empirical evidence.</p><a class="text-link" href="/design/voice-lab/">Open the Voice Lab ↗</a></article>
</div></section>
<section id="specifications" class="collection" aria-labelledby="specs-title"><div class="section-heading"><div><div class="eyebrow">03 / OPEN DESIGN</div><h2 id="specs-title">Specifications & decisions</h2><p>The technical and philosophical contracts that hold the language together.</p></div></div>
<div class="spec-grid">${papers.filter(p=>p.category==="spec").map(p=>`<a class="spec-link" href="${site+p.route}"><span class="spec-icon" aria-hidden="true">${p.icon}</span><span><small>${escape(p.label)}</small><strong>${escape(p.title)}</strong><span>${escape(p.summary)}</span></span><span aria-hidden="true" class="arrow">↗</span></a>`).join("")}</div>
</section><section class="endnote"><div class="eyebrow">OUR POSITION</div><h2>The person owns their expression.<br><em>The language protects the meaning.</em></h2><p>Our reference voice is playful, warm and unmistakably Kitsune. Your voice doesn't have to look like ours.</p><a class="subtle-link" href="/design/voice-lab/">Explore your voice ↗</a></section>
</main>`;
  await mkdir(out,{recursive:true});
  await writeFile(join(out,"index.html"),shell({title:"The thinking behind the flame",description:"Kitsunebi Research Library: working papers, study protocols, specifications, and design decisions.",main:indexMain}));
  for(const paper of papers){
    const md=await readFile(join(root,paper.path),"utf8");
    const {html,headings}=renderMarkdown(md);
    const toc=headings.filter(h=>h.level<=3).map(h=>`<li class="${h.level===3?"toc-sub":""}"><a href="#${h.id}">${escape(h.title)}</a></li>`).join("");
    const c=`Kitsune Innovation Labs. (2026). ${paper.title}${paper.subtitle && paper.category==="paper"?": "+paper.subtitle:""} (${paper.label}, Version 0.1) [Working draft]. ${sourceUrl+paper.path}`;
    const words=md.trim().split(/\s+/).length;
    const status=paper.category==="paper"?"Conceptual working draft · Not peer reviewed":paper.category==="experiment"?"Proposed study · Not conducted":"Engineering proposal · Under review";
    const scholarly=`<div class="article-hero"><div class="crumbs"><a href="${site}">Research Library</a><span aria-hidden="true">›</span><span>${escape(paper.label)}</span></div><div class="eyebrow">KITSUNEBI RESEARCH · ${escape(paper.tag.toUpperCase())}</div><h1>${escape(paper.title)}</h1><p class="article-subtitle">${escape(paper.subtitle)}</p>
      <p class="byline">Kitsune Innovation Labs <span aria-hidden="true">·</span> 22 October 2026 <span aria-hidden="true">·</span> v0.1</p>
      <div class="status-callout" role="note"><strong>${escape(status)}</strong><p>This page is generated from the versioned Markdown manuscript in GitHub. No peer review or participant findings are implied.</p></div>
      <div class="article-actions"><button type="button" data-print>Print / Save as PDF <span aria-hidden="true">↗</span></button><button type="button" data-citation-copy>Copy citation</button><a href="${sourceUrl+paper.path}" target="_blank" rel="noopener noreferrer">View source on GitHub ↗</a></div>
      <details class="citation"><summary>Show suggested citation</summary><p data-citation-text>${escape(c)}</p><p class="citation-notice">Citation describes a working draft. This manuscript has no DOI or peer-reviewed publication status.</p></details>
      </div>`;
    const body=`<main id="main" class="container reader-main" data-reader><div class="article-layout">
      <article class="article">${scholarly}<div class="paper-body">${html}</div>
      <div class="article-bottom"><p><strong>Keep questioning.</strong> This work is open to criticism, revision, empirical evaluation and participation.</p><a href="${site}">← Back to the Research Library</a></div></article>
      <aside class="toc" aria-label="On this page"><div class="toc-sticky"><div class="eyebrow">ON THIS PAGE</div><ol>${toc||"<li>No section headings</li>"}</ol>
      <div class="toc-meta"><span>${words.toLocaleString("en-NZ")} words</span><span>About ${Math.max(1,Math.ceil(words/220))} min read</span></div>
      <div class="toc-cross"><a href="/design/voice-lab/">✦ Try the Voice Lab ↗</a><a href="${site}">← All research</a></div></div></aside></div></main>`;
    const destination=join(out,paper.route,"index.html");await mkdir(dirname(destination),{recursive:true});
    await writeFile(destination,shell({title:paper.title,description:paper.subtitle+". "+paper.summary,main:body,type:"reader",extraHead:`<meta name="citation_author" content="Kitsune Innovation Labs"><meta name="citation_title" content="${escape(paper.title)}"><meta name="citation_date" content="2026/10/22">`}));
  }
  console.log(`Kitsunebi Research Library: generated ${papers.length+1} HTML pages at ${out} from canonical Markdown.`);
})().catch(error=>{console.error(error);process.exitCode=1;});
