import pkg from '/opt/node22/lib/node_modules/playwright/index.js'; const { chromium } = pkg;
const dir='/tmp/claude-0/-home-claude/0092c12a-32ed-5d45-a9d8-93b4c57fa9f8/scratchpad';
const names=['overzicht','boekt','waakt','ziet','loont','vindt','coacht','schrijft','promoot'];
const b=await chromium.launch();
for(const name of names){
  const p=await (await b.newContext({viewport:{width:1440,height:960},deviceScaleFactor:2})).newPage();
  await p.goto('file://'+dir+'/built/'+name+'.html',{waitUntil:'networkidle'});
  await p.waitForTimeout(300);
  await p.screenshot({path:dir+'/built/pub/'+name+'.jpg',type:'jpeg',quality:84});
  await p.context().close();
}
await b.close(); console.log('rendered',names.length,'jpgs @2x');
