// Real-internet test of the phone link (PeerJS public broker). Run by .github/workflows/net-test.yml
const {chromium}=require('playwright');
const X=process.env.QX||'';console.log('mode:',X||'default');
(async()=>{const b=await chromium.launch();const errs=[];
  const host=await (await b.newContext()).newPage();host.on('pageerror',e=>errs.push('host: '+e.message));
  await host.goto('http://localhost:8000/?preview&room=QZXW'+X);
  await host.waitForFunction(()=>NET.ok,null,{timeout:30000});console.log('host link open');
  const phones=[];
  for(let i=0;i<4;i++){const ctx=await b.newContext();const p=await ctx.newPage();p.on('pageerror',e=>errs.push('phone: '+e.message));
    await p.goto('http://localhost:8000/play.html?r=QZXW'+X);await p.fill('#nm','Tester '+(i+1));await p.click('#go');phones.push(p)}
  await host.waitForFunction(()=>S.order.length===4,null,{timeout:45000});console.log('4 phones joined');
  await host.evaluate(()=>{startGame();return 0});
  await phones[0].waitForFunction(()=>V&&V.s==='role',null,{timeout:15000});console.log('role screen reached the phone');
  for(const p of phones){await p.evaluate(()=>{send({t:'seen'})})}
  await host.waitForFunction(()=>S.phase==='choosing',null,{timeout:15000});console.log('all roles seen');
  await host.evaluate(()=>{startMission();askMission();return 0});
  await phones[1].waitForFunction(()=>V&&V.s==='q',null,{timeout:15000});
  for(const p of phones){await p.locator('[data-cb=ans]').first().click()}
  await host.waitForFunction(()=>S.phase==='mresult',null,{timeout:20000});console.log('answers arrived, pot',await host.evaluate(()=>S.pot));
  await phones[2].reload();await phones[2].waitForFunction(()=>V&&V.s,null,{timeout:20000});console.log('reloaded phone got its screen back:',await phones[2].evaluate(()=>V.s));
  console.log('errors',errs);console.log(errs.length?'NET TEST FAILED':'NET TEST PASSED');await b.close();process.exit(errs.length?1:0)})().catch(e=>{console.log('NET TEST FAILED',e.message);process.exit(1)});
