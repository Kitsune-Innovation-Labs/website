import assert from "node:assert/strict";
import {test} from "node:test";
import {readFile} from "node:fs/promises";
const read=path=>readFile(new URL("../../"+path,import.meta.url),"utf8");
test("KIL primary navigation is shared across homepage, design, studio and paper pages",async()=>{
 const [home,design,studio,generator,shared]=await Promise.all([
   read("index.html"),read("design/index.html"),read("design/voice-lab/index.html"),
   read("kitsunebi/tools/build-research.mjs"),read("assets/kil-site-header.mjs")]);
 for(const [name,markup] of [["home",home],["design",design],["studio",studio],["research builder",generator]]){
   assert.match(markup,/\/assets\/kil-site-header\.mjs/,name);
   assert.match(markup,/\/assets\/kil-site-header\.css/,name);
 }
 assert.match(shared,/\/design\/research\//);
 assert.match(shared,/\bKitsunebi\b/);
 assert.match(shared,/\bCompany\b/);
 assert.match(shared,/\bHardware\b/);
 assert.match(shared,/\bSoftware\b/);
 assert.match(shared,/kitsune-theme/);
 assert.doesNotMatch(home,/<header class="site-header">/);
 assert.match(home,/data-kil-header/);
});
test("Research uses one shared theme setting; nested nav follows global header",async()=>{
 const [research,subnav]=await Promise.all([read("design/research/library.mjs"),read("design/kb-navigation.mjs")]);
 assert.doesNotMatch(research,/kitsunebi-research-theme/);
 assert.match(subnav,/\.kil-header-host/);
 assert.match(subnav,/global\.after\(nav\)/);
});
