const root=document.documentElement;
let previous="day";try{const saved=localStorage.getItem("kitsunebi-research-theme");if(saved==="day"||saved==="night")previous=saved;}catch{}
root.dataset.theme=previous;
const toggle=document.querySelector("[data-theme-toggle]");
function syncToggle(){if(toggle){toggle.firstChild.nodeValue=root.dataset.theme==="night"?"☀ ":"☾ ";toggle.setAttribute("aria-label","Switch to "+(root.dataset.theme==="night"?"day":"night")+" theme");}}
syncToggle();
toggle?.addEventListener("click",()=>{root.dataset.theme=root.dataset.theme==="night"?"day":"night";try{localStorage.setItem("kitsunebi-research-theme",root.dataset.theme)}catch{}syncToggle();});
const notice=document.createElement("div");notice.className="notice-live";notice.setAttribute("role","status");notice.setAttribute("aria-live","polite");document.body.appendChild(notice);
const announce=text=>{notice.textContent=text;};
document.querySelector("[data-print]")?.addEventListener("click",()=>window.print());
document.querySelector("[data-citation-copy]")?.addEventListener("click",async()=>{
  const citation=document.querySelector("[data-citation-text]")?.textContent;
  if(!citation)return;
  try{await navigator.clipboard.writeText(citation);announce("Citation copied to clipboard.");}
  catch{const details=document.querySelector("details.citation");if(details)details.open=true;announce("Clipboard unavailable. Select the citation shown below to copy it.");}
});
const sections=[...document.querySelectorAll(".paper-body h2[id],.paper-body h3[id]")];
const links=new Map([...document.querySelectorAll(".toc a[href^='#']")].map(x=>[x.hash.slice(1),x]));
if(sections.length&&"IntersectionObserver" in window){
 const io=new IntersectionObserver(records=>{for(const entry of records){if(!entry.isIntersecting)continue;for(const item of links.values())item.removeAttribute("aria-current");links.get(entry.target.id)?.setAttribute("aria-current","true");}}, {rootMargin:"-18% 0px -70% 0px",threshold:0});
 for(const s of sections)io.observe(s);
}
