/* Local Kitsunebi wayfinding nested below the shared KIL primary header. */
import "/assets/kil-site-header.mjs";
(() => {
  if (document.querySelector(".kb-chrome")) return;
  const path=window.location.pathname;
  const active=path.startsWith("/design/research/")?"research":path.startsWith("/design/voice-lab/")?"studio":"design";
  const nav=document.createElement("nav");nav.className="kb-chrome";nav.setAttribute("aria-label","Kitsunebi sections");
  const inner=document.createElement("div");inner.className="kb-chrome-inner";
  const brand=document.createElement("span");brand.className="kb-chrome-brand";brand.textContent="Kitsunebi 狐火";
  const links=document.createElement("div");links.className="kb-chrome-links";
  const routes=[
    {key:"design",name:"Design Lab",url:"/design/"},
    {key:"studio",name:"Voice Studio",url:"/design/voice-lab/"},
    {key:"research",name:"Research Library",url:"/design/research/"}
  ];
  for(const route of routes){
    const a=document.createElement("a");a.href=route.url;a.textContent=route.name;
    if(active===route.key)a.setAttribute("aria-current","page");
    links.append(a);
  }
  inner.append(brand,links);nav.append(inner);
  const global=document.querySelector(".kil-header-host");
  if(global)global.after(nav);else document.body.prepend(nav);
  document.body.classList.add("kb-nav-ready");
})();
