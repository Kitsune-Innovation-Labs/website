/* Kitsunebi shared wayfinding — additive to the existing compiled Design Lab.
 * One navigation contract on Design Lab, Voice Studio and Research Library.
 */
(() => {
  if (document.querySelector(".kb-chrome")) return;
  const path = window.location.pathname;
  const active = path.startsWith("/design/research/") ? "research"
    : path.startsWith("/design/voice-lab/") ? "studio" : "design";
  const links = [
    {key:"design",text:"Design Lab",href:"/design/"},
    {key:"studio",text:"Voice Studio",href:"/design/voice-lab/"},
    {key:"research",text:"Research Library",href:"/design/research/"}
  ];
  const header=document.createElement("div");
  header.className="kb-chrome";
  const inner=document.createElement("div");inner.className="kb-chrome-inner";
  const brand=document.createElement("a");brand.className="kb-chrome-brand";
  brand.href="/design/";brand.setAttribute("aria-label","Kitsunebi home — Design Lab");
  const mark=document.createElement("span");mark.className="kb-chrome-spark";mark.textContent="✦";mark.setAttribute("aria-hidden","true");
  const brandText=document.createElement("span");brandText.textContent="Kitsunebi";
  const japanese=document.createElement("small");japanese.textContent="狐火";brandText.append(" ",japanese);
  brand.append(mark,brandText);
  const nav=document.createElement("nav");nav.className="kb-chrome-links";nav.setAttribute("aria-label","Kitsunebi sections");
  for(const link of links){
    const a=document.createElement("a");a.href=link.href;a.textContent=link.text;
    if(link.key===active)a.setAttribute("aria-current","page");
    nav.append(a);
  }
  const parent=document.createElement("a");parent.className="kb-chrome-parent";
  parent.href="/";parent.textContent="Kitsune Labs ↗";parent.setAttribute("aria-label","Kitsune Innovation Labs home");
  inner.append(brand,nav,parent);header.append(inner);
  document.body.prepend(header);
  document.body.classList.add("kb-nav-ready");
})();
