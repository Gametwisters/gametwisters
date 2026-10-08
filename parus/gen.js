const cx=450, cy=640;
const poly=(n,r,rot=0)=>Array.from({length:n},(_,i)=>{const a=rot+i*2*Math.PI/n;return `${(cx+r*Math.cos(a)).toFixed(1)},${(cy+r*Math.sin(a)).toFixed(1)}`}).join(' ');
// bracelet links
function links(dir){let s='';for(let i=0;i<8;i++){const y0=dir<0? cy-300-i*78 : cy+300+i*78-70; const t=i*4; const w=230-t*2; const x0=cx-w/2;
 const h=70;
 s+=`<rect x="${x0}" y="${y0}" width="${w}" height="${h}" rx="6" fill="url(#brush)" stroke="#8a8f96" stroke-width="1.5"/>`;
 s+=`<rect x="${cx-48+t/3}" y="${y0+4}" width="${96-t/1.5}" height="${h-8}" rx="10" fill="url(#polish)" stroke="#7b8088"/>`;
 s+=`<line x1="${x0+6}" y1="${y0+h-1}" x2="${x0+w-6}" y2="${y0+h-1}" stroke="#5f646b" stroke-width="2"/>`;}
 return s;}
let idx='';
for(let i=0;i<12;i++){const a=i*Math.PI/6-Math.PI/2;const deg=i*30;
 if(i===6) continue; // date
 if(i===0){idx+=`<g transform="rotate(0 ${cx} ${cy})"><rect x="${cx-13}" y="${cy-168}" width="9" height="42" rx="2" fill="url(#idx)" stroke="#9aa0a6" stroke-width=".8"/><rect x="${cx+4}" y="${cy-168}" width="9" height="42" rx="2" fill="url(#idx)" stroke="#9aa0a6" stroke-width=".8"/></g>`;continue;}
 idx+=`<g transform="rotate(${deg} ${cx} ${cy})"><rect x="${cx-5.5}" y="${cy-168}" width="11" height="36" rx="2" fill="url(#idx)" stroke="#9aa0a6" stroke-width=".8"/><rect x="${cx-2}" y="${cy-164}" width="4" height="26" rx="1" fill="#e9f5e3" opacity=".9"/></g>`;}
let mins='';
for(let i=0;i<60;i++){if(i%5===0)continue;const a=i*Math.PI/30;mins+=`<line x1="${cx+180*Math.sin(a)}" y1="${cy-180*Math.cos(a)}" x2="${cx+187*Math.sin(a)}" y2="${cy-187*Math.cos(a)}" stroke="#d9e6d6" stroke-width="1.4" opacity=".75"/>`;}
let knurl='';for(let i=0;i<9;i++){knurl+=`<line x1="${708}" y1="${cy-26+i*6.5}" x2="${730}" y2="${cy-26+i*6.5}" stroke="#7d828a" stroke-width="1.6"/>`;}
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1300" viewBox="0 0 900 1300">
<defs>
 <linearGradient id="brush" x1="0" x2="1"><stop offset="0" stop-color="#9ea3aa"/><stop offset=".2" stop-color="#d9dde1"/><stop offset=".5" stop-color="#f3f5f7"/><stop offset=".8" stop-color="#cfd3d8"/><stop offset="1" stop-color="#959aa1"/></linearGradient>
 <linearGradient id="polish" x1="0" x2="1"><stop offset="0" stop-color="#6d727a"/><stop offset=".3" stop-color="#ffffff"/><stop offset=".55" stop-color="#b8bdc4"/><stop offset=".75" stop-color="#fbfcfd"/><stop offset="1" stop-color="#70757d"/></linearGradient>
 <linearGradient id="bezel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".35" stop-color="#b9bec5"/><stop offset=".6" stop-color="#f5f7f9"/><stop offset="1" stop-color="#7f848c"/></linearGradient>
 <linearGradient id="caseG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e8ebee"/><stop offset=".5" stop-color="#c3c8ce"/><stop offset="1" stop-color="#9097a0"/></linearGradient>
 <linearGradient id="idx" x1="0" x2="1"><stop offset="0" stop-color="#8d939a"/><stop offset=".5" stop-color="#ffffff"/><stop offset="1" stop-color="#a7adb4"/></linearGradient>
 <radialGradient id="dial" cx=".5" cy=".42" r=".62"><stop offset="0" stop-color="#2f8a55"/><stop offset=".55" stop-color="#145c34"/><stop offset="1" stop-color="#05200f"/></radialGradient>
 <pattern id="clous" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45 ${cx} ${cy})">
   <rect width="14" height="14" fill="none"/>
   <path d="M0 0 L7 7 L0 14 Z" fill="#ffffff" opacity=".07"/>
   <path d="M14 0 L7 7 L14 14 Z" fill="#000000" opacity=".12"/>
   <path d="M0 0 L7 7 L14 0 Z" fill="#ffffff" opacity=".03"/>
   <rect width="14" height="14" fill="none" stroke="#000" stroke-opacity=".18" stroke-width=".8"/>
 </pattern>
 <radialGradient id="vign" cx=".5" cy=".5" r=".5"><stop offset=".7" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></radialGradient>
 <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset=".4" stop-color="#fff" stop-opacity="0"/></linearGradient>
 <filter id="sh" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-opacity=".45"/></filter>
 <filter id="big" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="14" stdDeviation="16" flood-opacity=".25"/></filter>
 <clipPath id="dc"><circle cx="${cx}" cy="${cy}" r="192"/></clipPath>
</defs>
<rect width="900" height="1300" fill="#f6f6f4"/>
<g filter="url(#big)">
 ${links(-1)}${links(1)}
 <!-- integrated lugs -->
 <path d="M${cx-150} ${cy-235} L${cx+150} ${cy-235} L${cx+116} ${cy-300} L${cx-116} ${cy-300} Z" fill="url(#brush)" stroke="#8a8f96"/>
 <path d="M${cx-150} ${cy+235} L${cx+150} ${cy+235} L${cx+116} ${cy+300} L${cx-116} ${cy+300} Z" fill="url(#brush)" stroke="#8a8f96"/>
 <!-- crown guard + crown -->
 <path d="M${cx+228} ${cy-48} q30 4 32 48 q-2 44 -32 48 Z" fill="url(#caseG)" stroke="#858a92"/>
 <rect x="706" y="${cy-30}" width="26" height="60" rx="6" fill="url(#polish)" stroke="#6f747c"/>${knurl}
 <!-- case: soft tonneau -->
 <path d="M${cx-185} ${cy-250} C${cx-60} ${cy-268} ${cx+60} ${cy-268} ${cx+185} ${cy-250} C${cx+250} ${cy-170} ${cx+250} ${cy+170} ${cx+185} ${cy+250} C${cx+60} ${cy+268} ${cx-60} ${cy+268} ${cx-185} ${cy+250} C${cx-250} ${cy+170} ${cx-250} ${cy-170} ${cx-185} ${cy-250} Z" fill="url(#caseG)" stroke="#80868e" stroke-width="2"/>
 <!-- 12-sided bezel -->
 <polygon points="${poly(12,232,Math.PI/12)}" fill="url(#bezel)" stroke="#7a7f87" stroke-width="2"/>
 <polygon points="${poly(12,214,Math.PI/12)}" fill="url(#polish)" opacity=".55"/>
 ${Array.from({length:12},(_,i)=>{const a=Math.PI/12+i*Math.PI/6;return `<circle cx="${cx+222*Math.cos(a)}" cy="${cy+222*Math.sin(a)}" r="4.2" fill="url(#idx)" stroke="#6f747c" stroke-width=".8"/>`}).join('')}
 <circle cx="${cx}" cy="${cy}" r="200" fill="#5b6067"/>
 <circle cx="${cx}" cy="${cy}" r="197" fill="url(#polish)"/>
</g>
<!-- dial -->
<g clip-path="url(#dc)">
 <circle cx="${cx}" cy="${cy}" r="192" fill="url(#dial)"/>
 <circle cx="${cx}" cy="${cy}" r="192" fill="url(#clous)"/>
 <circle cx="${cx}" cy="${cy}" r="192" fill="url(#vign)"/>
 <circle cx="${cx}" cy="${cy}" r="176" fill="none" stroke="#cfe0cb" stroke-opacity=".35" stroke-width="1"/>
</g>
${mins}
<g filter="url(#sh)">${idx}</g>
<!-- brand: parus bird mark -->
<g transform="translate(${cx} ${cy-118})" fill="#eef3ec">
 <path d="M-14 4 C-12 -8 2 -12 10 -6 C14 -4 16 -2 20 -2 L13 2 C12 10 2 14 -6 12 L-16 18 L-12 9 C-15 8 -15 6 -14 4 Z"/>
 <circle cx="7" cy="-5" r="1.4" fill="#145c34"/>
</g>
<text x="${cx}" y="${cy-70}" text-anchor="middle" font-family="Didot, 'Bodoni 72', 'Times New Roman', serif" font-size="32" letter-spacing="9" fill="#f4f7f2">PARUS</text>
<text x="${cx}" y="${cy-52}" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="10.5" letter-spacing="4.5" fill="#cfdccb">AUTOMATIC</text>
<text x="${cx}" y="${cy+112}" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="9.5" letter-spacing="3" fill="#cfdccb" opacity=".85">100M · SAPPHIRE</text>
<!-- date at 6 -->
<rect x="${cx-17}" y="${cy+128}" width="34" height="26" rx="3" fill="url(#idx)" stroke="#8d939a"/>
<rect x="${cx-14}" y="${cy+131}" width="28" height="20" rx="2" fill="#fbfbf7"/>
<text x="${cx}" y="${cy+147}" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-weight="700" font-size="15" fill="#1b1b1b">8</text>
<!-- hands -->
<g filter="url(#sh)">
 <g transform="rotate(-62 ${cx} ${cy})">
  <path d="M${cx-9} ${cy+14} L${cx-7} ${cy-80} L${cx} ${cy-108} L${cx+7} ${cy-80} L${cx+9} ${cy+14} Z" fill="url(#idx)" stroke="#8d939a"/>
  <path d="M${cx-3} ${cy-20} L${cx-3} ${cy-80} L${cx} ${cy-96} L${cx+3} ${cy-80} L${cx+3} ${cy-20} Z" fill="#e8f6e0"/>
 </g>
 <g transform="rotate(60 ${cx} ${cy})">
  <path d="M${cx-7} ${cy+18} L${cx-6} ${cy-130} L${cx} ${cy-160} L${cx+6} ${cy-130} L${cx+7} ${cy+18} Z" fill="url(#idx)" stroke="#8d939a"/>
  <path d="M${cx-2.4} ${cy-30} L${cx-2.4} ${cy-130} L${cx} ${cy-148} L${cx+2.4} ${cy-130} L${cx+2.4} ${cy-30} Z" fill="#e8f6e0"/>
 </g>
 <g transform="rotate(135 ${cx} ${cy})">
  <rect x="${cx-1.2}" y="${cy-172}" width="2.4" height="214" fill="#e6e9ec"/>
  <circle cx="${cx}" cy="${cy+40}" r="7" fill="#e6e9ec"/>
  <circle cx="${cx}" cy="${cy-122}" r="5.5" fill="none" stroke="#e6e9ec" stroke-width="2.4"/>
 </g>
 <circle cx="${cx}" cy="${cy}" r="8" fill="url(#polish)" stroke="#7b8088"/>
 <circle cx="${cx}" cy="${cy}" r="2.5" fill="#5b6067"/>
</g>
<circle cx="${cx}" cy="${cy}" r="196" fill="url(#glass)"/>
</svg>`;
require('fs').writeFileSync('parus-watch.svg',svg);
require('fs').writeFileSync('parus-watch.html',`<html><body style="margin:0;background:#f6f6f4;overflow:hidden">${svg}</body></html>`);
