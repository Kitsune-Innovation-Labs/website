// Shared scroll-parallax behaviour for the Kitsune Innovation Labs ambient blobs.
// Works with the established homepage/GameTable (.page-blob), Charter (.blob),
// and newer concept pages. Respects reduced motion.
const reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)");
const blobs=[...document.querySelectorAll(".page-blobs [data-depth]")];
let scrollTick=false;
function moveBlobs(){
  scrollTick=false;
  if(reduceMotion.matches){
    blobs.forEach(blob=>blob.style.removeProperty("--scroll-shift"));
    return;
  }
  const y=window.scrollY;
  blobs.forEach(blob=>{
    const depth=Number.parseFloat(blob.dataset.depth||"0");
    const shift=Math.max(-120,Math.min(120,-y*(Number.isFinite(depth)?depth:0)));
    blob.style.setProperty("--scroll-shift",`${shift}px`);
  });
}
function requestBlobMove(){
  if(!scrollTick){
    scrollTick=true;
    requestAnimationFrame(moveBlobs);
  }
}
if(blobs.length){
  window.addEventListener("scroll",requestBlobMove,{passive:true});
  reduceMotion.addEventListener?.("change",requestBlobMove);
  moveBlobs();
}
