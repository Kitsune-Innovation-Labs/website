/**
 * Reference token generator (dependency-free, Node 22+).
 * Usage: node kitsunebi/tools/build-tokens.mjs <output-directory>
 * Output is generated code, not the canonical token source.
 */
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { resolveToken } from "../../design/voice-lab/core.mjs";
const src=fileURLToPath(new URL("../../design/voice-lab/reference.tokens.json",import.meta.url));
const tokens=JSON.parse(await readFile(src,"utf8"));
const out=resolve(process.argv[2] || "./.kitsunebi-generated");
const roles=["page","card","subtle","text","muted","accent","focus","danger"];
const get=(theme,role)=>resolveToken(tokens,"semantic."+theme+"."+role);
const cssBlock=(selector,theme)=>[selector+" {",...roles.map(r=>"  --kb-"+r+": "+get(theme,r)+";"),"}"].join("\n");
const css=[ "/* Generated from DTCG 2025.10 source; do not edit */",
  cssBlock(':root, [data-kb-theme="day"]',"day"),
  cssBlock('[data-kb-theme="night"]',"night"),"" ].join("\n");
const qml=(theme)=>["// Generated from DTCG 2025.10 source; do not edit",
  "pragma Singleton","import QtQuick","QtObject {",
  ...roles.map(r=>'  readonly property color '+r+': "'+get(theme,r)+'"'),
  "}",""].join("\n");
await mkdir(out,{recursive:true});
await Promise.all([
  writeFile(resolve(out,"kitsunebi.css"),css),
  writeFile(resolve(out,"KitsunebiDay.qml"),qml("day")),
  writeFile(resolve(out,"KitsunebiNight.qml"),qml("night"))
]);
console.log("Generated CSS and QML reference roles in "+out);
