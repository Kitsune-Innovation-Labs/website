import { DEFAULT_PROFILE, VOICES, safeClone, validateProfile, resolveVoice } from "./core.mjs";
const $ = id => document.getElementById(id);
const fieldNames = ["theme","character","density","shape","motion","contrast","accent"];
let tokens, profile=safeClone(DEFAULT_PROFILE);
const signal={
  reduced:window.matchMedia("(prefers-reduced-motion: reduce)"),
  forced:window.matchMedia("(forced-colors: active)"),
  coarse:window.matchMedia("(pointer: coarse)")
};
const context=()=>({prefersReducedMotion:signal.reduced.matches,forcedColors:signal.forced.matches,coarsePointer:signal.coarse.matches});
const status=message=>{$("activity").textContent=message;};
function syncFields() {
  for(const f of ["theme","character","density","shape","accent"]) $(f).value=profile.appearance[f];
  for(const f of ["motion","contrast"]) $(f).value=profile.comfort[f];
  for(const [name,button] of Object.entries(VOICES)) {
    const el=document.querySelector('[data-preset="'+name+'"]');
    if (el) el.setAttribute("aria-pressed", String(profile.id===button.id));
  }
}
function render(){
  const output=resolveVoice(profile,tokens,context());
  for(const [name,value] of Object.entries(output.variables)) document.documentElement.style.setProperty(name,value);
  document.documentElement.dataset.character=profile.appearance.character;
  document.documentElement.dataset.motion=output.effective.comfort.motion;
  document.documentElement.style.colorScheme=profile.appearance.theme==="night"?"dark":"light";
  $("effective").textContent="Effective: "+output.effective.appearance.theme+" / "+output.effective.appearance.character+" / "+output.effective.appearance.density+" / motion "+output.effective.comfort.motion;
  $("contrast-details").replaceChildren();
  if(output.ratios){
    for(const [name,value] of Object.entries(output.ratios)){
      const badge=document.createElement("span");badge.className="ratio";
      badge.textContent=name.replace(/([A-Z])/g," $1")+": "+value.toFixed(2)+":1";
      $("contrast-details").append(badge);
    }
  } else {$("contrast-details").textContent="Contrast is managed by your system's forced-colours mode.";}
  $("diagnostics").replaceChildren();
  for(const msg of output.diagnostics){const li=document.createElement("li");li.textContent=msg;$("diagnostics").append(li);}
  syncFields();
}
function updateFromControl(key,value) {
  if (key==="motion"||key==="contrast") profile.comfort[key]=value;
  else profile.appearance[key]=value;
  profile.id="custom";profile.name="My voice";
  render();status("Voice changed locally. All sample actions still mean the same thing.");
}
async function start(){
  const result=await fetch("./reference.tokens.json",{cache:"no-store"});
  if (!result.ok) throw new Error("Could not load the reference tokens.");
  tokens=await result.json();
  for(const btn of document.querySelectorAll("[data-preset]")){
    btn.addEventListener("click",()=>{profile=safeClone(VOICES[btn.dataset.preset]);render();status("Applied "+profile.name+" preset.");});
  }
  for(const f of fieldNames) $(f).addEventListener("input",e=>updateFromControl(f,e.target.value));
  for(const m of Object.values(signal)) m.addEventListener?.("change",()=>{render();status("System preference changed; adaptations explained below.");});
  $("export").addEventListener("click",()=>{
    const data=new Blob([JSON.stringify(profile,null,2)+"\n"],{type:"application/json"});
    const url=URL.createObjectURL(data),a=document.createElement("a");
    a.href=url;a.download="kitsunebi-"+profile.id+".json";a.click();
    URL.revokeObjectURL(url);status("Voice JSON exported locally.");
  });
  $("import").addEventListener("click",()=>$("import-file").click());
  $("import-file").addEventListener("change",async e=>{
    const file=e.target.files?.[0];if(!file)return;
    try{
      if(file.size>16*1024) throw new Error("File exceeds the 16 KiB import limit.");
      const candidate=JSON.parse(await file.text()),valid=validateProfile(candidate);
      if(!valid.ok) throw new Error(valid.errors.join("; "));
      profile=safeClone(candidate);render();status("Imported "+profile.name+" locally. No data was uploaded.");
    } catch(err){status("Import rejected: "+err.message);}
    finally{e.target.value="";}
  });
  $("close-window").addEventListener("click",()=>{$("sample-window").hidden=true;$("closed-state").hidden=false;$("reopen").focus();status("Example window closed.");});
  $("reopen").addEventListener("click",()=>{$("sample-window").hidden=false;$("closed-state").hidden=true;$("close-window").focus();status("Example window reopened.");});
  $("save").addEventListener("click",()=>status("Example draft saved (simulation only)."));
  $("delete").addEventListener("click",()=>$("confirm-dialog").showModal());
  $("confirm-dialog").addEventListener("close",e=>{
    status(e.target.returnValue==="delete"?"Example draft deleted (simulation only).":"Delete cancelled.");
  });
  render();
}
start().catch(err=>{status("Lab could not initialise: "+err.message);console.error("Kitsunebi Lab:",err);});
