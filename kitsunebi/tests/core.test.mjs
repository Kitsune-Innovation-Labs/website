import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { DEFAULT_PROFILE, VOICES, safeClone, validateProfile, isHex, contrastRatio, resolveToken, resolveVoice, readableTextFor } from "../../design/voice-lab/core.mjs";
const tokens=JSON.parse(await readFile(fileURLToPath(new URL("../../design/voice-lab/reference.tokens.json",import.meta.url)),"utf8"));
const ctxs=[{}, {prefersReducedMotion:true}, {forcedColors:true}, {coarsePointer:true}, {prefersReducedMotion:true,forcedColors:true,coarsePointer:true}];
test("all bundled profiles are valid, stable in meaning and safe across contexts",()=>{
 for(const [name,voice] of Object.entries(VOICES)) for(const context of ctxs){
   assert.equal(validateProfile(voice).ok,true,name);
   const original=JSON.stringify(voice);
   const outcome=resolveVoice(voice,tokens,context);
   assert.equal(outcome.effective.appearance.character,voice.appearance.character);
   assert.equal(outcome.effective.appearance.theme,voice.appearance.theme);
   assert.equal(outcome.environment.forcedColors,Boolean(context.forcedColors));
   assert.equal(JSON.stringify(voice),original,"resolver must not mutate profile");
   if(!context.forcedColors) Object.values(outcome.ratios).forEach(r=>assert.ok(r>=4.5, name+" contrast "+r));
 }
});
test("role aliases resolve from source of truth",()=>{
 assert.equal(resolveToken(tokens,"semantic.day.page"),"#FFFDF8");
 assert.equal(resolveToken(tokens,"semantic.night.card"),"#0F1833");
 assert.equal(resolveToken(tokens,"palette.foxfire"),"#79C8FF");
});
test("alias errors and cycles fail closed",()=>{
 assert.throws(()=>resolveToken(tokens,"missing.role"));
 const broken=structuredClone(tokens);
 broken.semantic.day.page.$value="{semantic.day.card}";
 broken.semantic.day.card.$value="{semantic.day.page}";
 assert.throws(()=>resolveToken(broken,"semantic.day.page"),/cycle/);
});
test("profiles do not permit code, extra attributes or malformed colours",()=>{
 const p=safeClone(DEFAULT_PROFILE);p.command="rm -rf /";
 assert.equal(validateProfile(p).ok,false);
 const q=safeClone(DEFAULT_PROFILE);q.appearance.accent="url(https://example.org/tracker)";
 assert.equal(validateProfile(q).ok,false);
 const r=safeClone(DEFAULT_PROFILE);r.appearance.accent="#aab";
 assert.equal(validateProfile(r).ok,false);
 const s=safeClone(DEFAULT_PROFILE);s.formatVersion="999";
 assert.equal(validateProfile(s).ok,false);
 assert.equal(isHex("#aabbcc"),true);
});
test("user expression dimensions remain independent of safety overrides",()=>{
 const p=safeClone(VOICES.playground);
 p.appearance.density="compact";p.comfort.motion="expressive";
 const output=resolveVoice(p,tokens,{prefersReducedMotion:true,coarsePointer:true});
 assert.equal(output.effective.comfort.motion,"off");
 assert.equal(output.effective.appearance.character,"playground");
 assert.equal(output.effective.appearance.density,"compact");
 assert.equal(output.variables["--kb-target-min"],"48px");
 assert.ok(output.diagnostics.length>=2);
});
test("user accent can vary without changing danger role",()=>{
 const p=safeClone(DEFAULT_PROFILE);
 for(const accent of ["#000000","#FFFFFF","#F7C8D5","#55B6F5","#E34411"]){
   p.appearance.accent=accent;
   const r=resolveVoice(p,tokens,{});
   assert.equal(r.variables["--kb-danger"],"#AD293D");
   assert.ok(contrastRatio(accent,readableTextFor(accent))>=4.5);
   assert.ok(contrastRatio(r.variables["--kb-danger"],r.variables["--kb-danger-text"])>=4.5);
 }
});
test("reference palette meets readable roles in day and night",()=>{
 for(const mode of ["day","night"]){
   const p=safeClone(DEFAULT_PROFILE);p.appearance.theme=mode;
   const r=resolveVoice(p,tokens,{});
   assert.ok(contrastRatio(r.variables["--kb-text"],r.variables["--kb-page"])>=4.5);
   assert.ok(contrastRatio(r.variables["--kb-muted"],r.variables["--kb-card"])>=4.5);
 }
});
