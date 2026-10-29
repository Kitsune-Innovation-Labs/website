// One shared KIL header implementation for the homepage and Kitsunebi.
 // The canonical menu hierarchy is derived from the KIL homepage and stays in one place.
const MARKUP="<header id=\"kil-site-header\" class=\"kil-site-header\"><div class=\"shell nav kil-header-inner\"><a class=\"brand\" href=\"/\"><img class=\"brand-mark\" src=\"/assets/kitsune-emblem.png\" alt=\"\" aria-hidden=\"true\"><span>Kitsune Innovation Labs</span></a><nav id=\"kil-main-navigation\" class=\"nav-links kil-main-nav\" aria-label=\"Primary navigation\"><a class=\"nav-link\" href=\"/\" data-kil-section=\"home\">Home</a><a class=\"nav-link\" href=\"/design/\" data-kil-section=\"kitsunebi\">Kitsunebi</a><details class=\"nav-menu\"><summary>Software</summary><div class=\"nav-dropdown nav-dropdown-grouped\"><div class=\"nav-group\"><span class=\"nav-group-label\">Systems</span><details class=\"nav-submenu\"><summary><span>KitsuneOS</span><span class=\"nav-status\">In development</span></summary><div class=\"nav-flyout\"><a href=\"/kitsuneos/\"><span>KitsuneOS overview</span><span aria-hidden=\"true\">→</span></a><a href=\"/kitsuneos/desktop/\"><span>Desktop</span><span aria-hidden=\"true\">→</span></a><a href=\"/kitsuneos/server/\"><span>Server</span><span aria-hidden=\"true\">→</span></a><a href=\"/kitsuneos/tv/\"><span>TV</span><span aria-hidden=\"true\">→</span></a><a href=\"/kitsuneos/touch/\"><span>Touch</span><span aria-hidden=\"true\">→</span></a><a href=\"/kitsuneos/wear/\"><span>Wear</span><span aria-hidden=\"true\">→</span></a><a href=\"/kitsuneos/game/\"><span>Game</span><span aria-hidden=\"true\">→</span></a><a href=\"/kitsuneos/sim/\"><span>Sim</span><span aria-hidden=\"true\">→</span></a><a href=\"/kitsuneos/apple-silicon/\"><span>Apple Silicon</span><span aria-hidden=\"true\">→</span></a></div></details><div class=\"nav-disabled\"><span>Kitsune Control</span><span class=\"nav-status\">In development</span></div></div><div class=\"nav-group\"><span class=\"nav-group-label\">Intelligence</span><a href=\"/companions/\" data-kil-section=\"companions\"><span>Companions</span><span class=\"nav-status\">Concept</span></a><div class=\"nav-disabled\"><span>Neko / TenkoAI</span><span class=\"nav-status\">Research</span></div></div><div class=\"nav-group\"><span class=\"nav-group-label\">Experiences</span><a href=\"/life/\" data-kil-section=\"life\"><span>Kitsune Life</span><span class=\"nav-status\">Concept</span></a><a href=\"/gametable/\" data-kil-section=\"gametable\"><span>GameTable</span><span class=\"nav-status\">In development</span></a><div class=\"nav-disabled\"><span>Kitsune Music</span><span class=\"nav-status\">Research</span></div><div class=\"nav-disabled\"><span>Kitsune Stream</span><span class=\"nav-status\">Future</span></div></div><div class=\"nav-group\"><span class=\"nav-group-label\">Learning</span><div class=\"nav-disabled\"><span>Kitsune Academy</span><span class=\"nav-status\">Planned</span></div></div></div></details><details class=\"nav-menu\"><summary>Hardware</summary><div class=\"nav-dropdown\"><div class=\"nav-disabled\"><span>Shirogane</span><span class=\"nav-status\">Division</span></div><div class=\"nav-disabled\"><span>KitsuneBook</span><span class=\"nav-status\">Future</span></div><div class=\"nav-disabled\"><span>Kitsune Pocket</span><span class=\"nav-status\">Future</span></div><div class=\"nav-disabled\"><span>Kitsune Slate</span><span class=\"nav-status\">Future</span></div><div class=\"nav-disabled\"><span>Kitsune Loop</span><span class=\"nav-status\">Future</span></div><div class=\"nav-disabled\"><span>Kitsune Serve</span><span class=\"nav-status\">Future</span></div></div></details><a class=\"nav-link\" href=\"/design/research/\" data-kil-section=\"research\">Research</a><details class=\"nav-menu\"><summary>Company</summary><div class=\"nav-dropdown\"><a href=\"/charter/\" data-kil-section=\"charter\"><span>Charter</span><span aria-hidden=\"true\">→</span></a><a href=\"https://github.com/Kitsune-Innovation-Labs\"><span>GitHub</span><span aria-hidden=\"true\">↗</span></a></div></details></nav><div class=\"kil-header-actions\"><button id=\"kil-menu-toggle\" class=\"kil-mobile-menu\" type=\"button\" aria-expanded=\"false\" aria-controls=\"kil-main-navigation\" aria-label=\"Open site navigation\"><span aria-hidden=\"true\">☰</span></button><button class=\"theme-switch\" id=\"themeToggle\" type=\"button\" role=\"switch\" aria-checked=\"false\" aria-label=\"Use night theme\"></button></div></div></header>";
const root=document.documentElement;
const mounted=document.querySelector("[data-kil-header]") || document.body;
if(!document.getElementById("kil-site-header")){
  const host=document.createElement("div");host.className="kil-header-host";host.innerHTML=MARKUP;
  if(mounted===document.body)mounted.prepend(host);
  else mounted.replaceWith(host);
}
const header=document.getElementById("kil-site-header");
const current=location.pathname.startsWith("/life/")?"life":location.pathname.startsWith("/companions/")?"companions":location.pathname.startsWith("/gametable/")?"gametable":location.pathname.startsWith("/charter/")?"charter":location.pathname.startsWith("/design/research/")?"research":location.pathname.startsWith("/design/")?"kitsunebi":location.pathname==="/"?"home":"";
header.querySelectorAll("[data-kil-section]").forEach(a=>{
  if(a.dataset.kilSection===current)a.setAttribute("aria-current","page");
  else a.removeAttribute("aria-current");
});
const themeButton=header.querySelector("#themeToggle");
const nav=header.querySelector("#kil-main-navigation");
const menuButton=header.querySelector("#kil-menu-toggle");
let theme="day";
try{theme=localStorage.getItem("kitsune-theme")==="night"?"night":"day";}catch{}
root.dataset.theme=theme;
function syncThemeButton(){
  const night=root.dataset.theme==="night";
  themeButton.setAttribute("aria-checked",String(night));
  themeButton.setAttribute("aria-label",night?"Use day theme":"Use night theme");
}
syncThemeButton();
themeButton.addEventListener("click",()=>{
  const value=root.dataset.theme==="night"?"day":"night";
  root.dataset.theme=value;
  try{localStorage.setItem("kitsune-theme",value);}catch{}
  syncThemeButton();
});
new MutationObserver(syncThemeButton).observe(root,{attributes:true,attributeFilter:["data-theme"]});
function closeNavigation(){
  nav.classList.remove("kil-is-open");
  menuButton.setAttribute("aria-expanded","false");
  menuButton.setAttribute("aria-label","Open site navigation");
  header.querySelectorAll("details[open]").forEach(d=>d.removeAttribute("open"));
}
menuButton.addEventListener("click",()=>{
  const open=!nav.classList.contains("kil-is-open");
  if(!open){closeNavigation();return;}
  nav.classList.add("kil-is-open");
  menuButton.setAttribute("aria-expanded","true");
  menuButton.setAttribute("aria-label","Close site navigation");
});
document.addEventListener("click",event=>{
  if(!header.contains(event.target))closeNavigation();
  header.querySelectorAll(".nav-menu[open]").forEach(menu=>{
    if(!menu.contains(event.target))menu.removeAttribute("open");
  });
});
header.addEventListener("keydown",event=>{
  if(event.key==="Escape"){
    const active=header.contains(document.activeElement);
    closeNavigation();
    if(active&&matchMedia("(max-width: 1000px)").matches)menuButton.focus();
  }
});
header.querySelectorAll(".nav-menu").forEach(menu=>{
  menu.addEventListener("toggle",()=>{
    if(menu.open)header.querySelectorAll(".nav-menu[open]").forEach(other=>{if(other!==menu)other.removeAttribute("open");});
  });
});
nav.addEventListener("click",event=>{
  if(event.target.closest("a"))closeNavigation();
});
const desktop=matchMedia("(min-width: 1001px)");
desktop.addEventListener?.("change",()=>{if(desktop.matches)closeNavigation();});
