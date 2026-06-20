const hObs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('on'); hObs.unobserve(e.target); }
  });
},{threshold:.3});
document.querySelectorAll('.h-anim').forEach(h=>hObs.observe(h));

(()=>{
  const flow = document.querySelector('.exec-flow');
  if(!flow) return;
  const obs = new IntersectionObserver(e=>{
    if(!e[0].isIntersecting) return;
    obs.disconnect();
    const nodes = flow.querySelectorAll('.ef-node, .ef-latency');
    nodes.forEach((n,i)=>{
      n.style.opacity='0';
      setTimeout(()=>{
        n.style.transition='opacity .5s ease, background .5s ease';
        n.style.opacity='1';
        n.style.background='rgba(79,70,229,.12)';
        setTimeout(()=>n.style.background='', 500);
      }, i * 280);
    });
  },{threshold:.3});
  obs.observe(flow);
})();

(()=>{
  const arch = document.querySelector('.arch-diagram');
  if(!arch) return;
  const obs = new IntersectionObserver(e=>{
    if(!e[0].isIntersecting) return;
    obs.disconnect();
    const nodes = arch.querySelectorAll('.arch-node');
    nodes.forEach((n,i)=>{
      n.style.opacity='0'; n.style.transform='scale(.9)';
      setTimeout(()=>{
        n.style.transition='all .5s cubic-bezier(.22,.68,0,1.2)';
        n.style.opacity='1'; n.style.transform='none';
      }, i*150 + 200);
    });
    const core = arch.querySelector('.arch-core');
    if(core){ core.style.opacity='0'; core.style.transform='scale(.8)';
      setTimeout(()=>{ core.style.transition='all .6s cubic-bezier(.22,.68,0,1.3)'; core.style.opacity='1'; core.style.transform='none'; }, 500);
    }
  },{threshold:.2});
  obs.observe(arch);
})();

window.addEventListener('scroll',()=>
  document.getElementById('nav').classList.toggle('on',window.scrollY>24)
);

const rObs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('on'); rObs.unobserve(e.target); }
  });
},{threshold:.1, rootMargin:'0px 0px -52px 0px'});
document.querySelectorAll('.rv,.rvl,.rvr').forEach(el=>rObs.observe(el));

(()=>{
  const el = document.getElementById('typewr');
  if(!el) return;
  const words = ['Not Emotions.','Not Impulse.','Not Guesswork.','Not Fear.'];
  let wi=0, ci=0, del=false;
  const tick = ()=>{
    const w = words[wi];
    if(!del){ ci++; if(ci===w.length){ setTimeout(tick,2200); return; } }
    else { ci--; if(ci===0){ del=false; wi=(wi+1)%words.length; } }
    el.textContent = w.slice(0,ci);
    setTimeout(tick, del ? 45 : 90);
  };
  setTimeout(()=>{ del=false; tick(); },1400);
})();

const statConf = [
  {id:'sn1', val:5000, sfx:'+', fmt:v=>v.toLocaleString('en-IN')},
  {id:'sn2', val:50,   sfx:'+', fmt:v=>v},
  {id:'sn3', val:76,   sfx:'%', fmt:v=>v},
  {id:'sn4', val:.02,  sfx:'s', fmt:v=>v.toFixed(2), dec:true},
];
const statsEl = document.querySelector('.stats-row');
if(statsEl){
  const so = new IntersectionObserver(e=>{
    e.forEach(el=>{ if(!el.isIntersecting) return; so.unobserve(el.target);
      statConf.forEach(s=>{
        const el2=document.getElementById(s.id); if(!el2) return;
        const dur=1800, start=performance.now();
        const step=now=>{
          const p=Math.min((now-start)/dur,1), ease=1-Math.pow(1-p,4);
          const v = s.dec ? s.val*ease : Math.round(s.val*ease);
          el2.textContent = s.fmt(v)+s.sfx;
          if(p<1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    });
  },{threshold:.5});
  so.observe(statsEl);
}

const stratGrid = document.querySelector('.strat-grid');
if(stratGrid){
  const bo = new IntersectionObserver(e=>{
    e.forEach(el=>{ if(!el.isIntersecting) return; bo.unobserve(el.target);
      el.target.querySelectorAll('.sc-fill').forEach(b=>{
        setTimeout(()=> b.style.width = b.dataset.w+'%', 400);
      });
    });
  },{threshold:.2});
  bo.observe(stratGrid);
}

const gObs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(!e.isIntersecting) return; gObs.unobserve(e.target);
    [...e.target.children].forEach((c,i)=>{
      c.style.opacity='0'; c.style.transform='translateY(20px)';
      c.style.transition=`opacity .5s ${i*.07}s ease, transform .5s ${i*.07}s ease`;
      requestAnimationFrame(()=>requestAnimationFrame(()=>{
        c.style.opacity='1'; c.style.transform='none';
      }));
    });
  });
},{threshold:.12});
document.querySelectorAll('.feat-grid,.tgrid,.price-grid,.hc-metrics').forEach(g=>gObs.observe(g));

document.querySelectorAll('.feat-card,.sc-card,.tcard,.price-card').forEach(card=>{
  const dark = card.classList.contains('sc-card');
  card.addEventListener('mousemove',e=>{
    const r=card.getBoundingClientRect();
    const x=((e.clientX-r.left)/r.width)*100, y=((e.clientY-r.top)/r.height)*100;
    card.style.background = dark
      ? `radial-gradient(circle at ${x}% ${y}%, rgba(99,102,241,.1) 0%, var(--cd2) 60%)`
      : `radial-gradient(circle at ${x}% ${y}%, rgba(79,70,229,.04) 0%, var(--bg-w) 60%)`;
  });
  card.addEventListener('mouseleave',()=> card.style.background='');
});

const hc = document.querySelector('.hero-card');
if(hc){
  hc.addEventListener('mousemove',e=>{
    const r=hc.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
    hc.style.transform=`perspective(900px) rotateX(${-y*9}deg) rotateY(${x*9}deg) translateY(-10px) scale(1.01)`;
    hc.style.animation='none';
    hc.style.background=`radial-gradient(circle at ${(x+.5)*100}% ${(y+.5)*100}%, rgba(99,102,241,.1) 0%, var(--cd) 65%)`;
  });
  hc.addEventListener('mouseleave',()=>{
    hc.style.transform='';
    hc.style.animation='flt 6s ease-in-out infinite';
    hc.style.background='';
  });
}

document.querySelectorAll('.btn-big,.btn-cta,.btn-out').forEach(btn=>{
  btn.addEventListener('mousemove',e=>{
    const r=btn.getBoundingClientRect();
    const x=(e.clientX-r.left-r.width/2)*.25, y=(e.clientY-r.top-r.height/2)*.25;
    btn.style.transform=`translate(${x}px,${y}px) translateY(-1px)`;
  });
  btn.addEventListener('mouseleave',()=>{
    btn.style.transition='transform .4s cubic-bezier(.23,1,.32,1)';
    btn.style.transform='';
    setTimeout(()=>btn.style.transition='',400);
  });
});

const feedData = [
  {s:'NIFTY CE 24200',    t:'09:42:15',a:'SELL',  ac:'fa-s', p:'+₹820',   c:'#4ade80'},
  {s:'BANKNIFTY PE 52000',t:'10:15:32',a:'SELL',  ac:'fa-s', p:'+₹1,240', c:'#4ade80'},
  {s:'NIFTY Straddle',    t:'11:04:07',a:'SL HIT',ac:'fa-sl',p:'−₹320',   c:'#f87171'},
  {s:'BANKNIFTY CE 51500',t:'11:28:44',a:'SELL',  ac:'fa-s', p:'+₹680',   c:'#4ade80'},
  {s:'NIFTY Iron Condor', t:'12:10:02',a:'SELL',  ac:'fa-s', p:'+₹2,100', c:'#4ade80'},
  {s:'FINNIFTY PE 23800', t:'12:44:18',a:'SELL',  ac:'fa-s', p:'+₹960',   c:'#4ade80'},
];
let fi=0;
setInterval(()=>{
  const rows=document.querySelectorAll('.hfr');
  if(!rows.length) return;
  const n=feedData[fi%feedData.length]; fi++;
  const old=rows[0];
  old.style.transition='opacity .3s,transform .3s';
  old.style.opacity='0'; old.style.transform='translateX(-10px)';
  setTimeout(()=>{
    old.innerHTML=`<div><div class="hfr-s">${n.s}</div><div class="hfr-t">${n.t}</div></div><span class="hfa ${n.ac}">${n.a}</span><div class="hfr-p" style="color:${n.c}">${n.p}</div>`;
    old.style.opacity='0'; old.style.transform='translateX(10px)';
    requestAnimationFrame(()=>requestAnimationFrame(()=>{ old.style.opacity='1'; old.style.transform='none'; }));
    document.querySelector('.hero-card .hc-note')?.before(old);
  },320);
},3000);

let pv=4832, ev=342;
setInterval(()=>{
  pv += Math.floor((Math.random()-.3)*180); ev++;
  const el=document.getElementById('dpnl');
  if(el){ el.textContent=(pv>=0?'+₹':'-₹')+Math.abs(pv).toLocaleString('en-IN'); el.style.color=pv>=0?'var(--g)':'var(--r)'; }
  const ee=document.getElementById('dexec'); if(ee) ee.textContent=ev;
},4000);

const bst=document.querySelector('.bs-track');
if(bst){ bst.addEventListener('mouseenter',()=>bst.style.animationPlayState='paused'); bst.addEventListener('mouseleave',()=>bst.style.animationPlayState='running'); }

const indexBase = { nifty:24198.85, bnk:52148.20, sx:79408.50, gold:92840 };
const indexState = { ...indexBase };

function jitter(base, pct=0.0008){ return base * (1 + (Math.random()-0.5)*pct*2); }

function updateIndianIndices(){
  indexState.nifty  = jitter(indexState.nifty, .0006);
  indexState.bnk    = jitter(indexState.bnk,   .0007);
  indexState.sx     = jitter(indexState.sx,    .0005);
  indexState.gold   = jitter(indexState.gold,  .0004);

  const fmt = (n,dec=2) => n.toLocaleString('en-IN',{minimumFractionDigits:dec,maximumFractionDigits:dec});
  const chg = (cur,base) => { const d=cur-base; return {v:d, s:(d>=0?'+':'')+fmt(d), cls:d>=0?'up':'dn'}; };

  setTicker('fp-nifty',  fmt(indexState.nifty));
  setTicker('fp-bnk',    fmt(indexState.bnk));
  setTicker('fp-sx',     fmt(indexState.sx));

  const nc = chg(indexState.nifty,  indexBase.nifty);
  const bc = chg(indexState.bnk,    indexBase.bnk);

  setTickerChg('hms-nifty',   fmt(indexState.nifty),   nc.s, nc.cls);
  setTickerChg('hms-bnk',     fmt(indexState.bnk,0),   bc.s, bc.cls);
  setTickerChg('hms-gold',    '₹'+fmt(indexState.gold,0), chg(indexState.gold,indexBase.gold).s, chg(indexState.gold,indexBase.gold).cls);
}

function setTicker(id, val){
  const el=document.getElementById(id); if(el) el.textContent=val;
}
function setTickerChg(id, val, chg, cls){
  const vel=document.getElementById(id);
  const cel=document.getElementById(id+'-c');
  if(vel) vel.textContent=val;
  if(cel){ cel.textContent=chg; cel.className='hms-chg '+cls; }
}

setInterval(updateIndianIndices, 4000);

async function fetchCrypto(){
  try{
    const r = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true',{signal:AbortSignal.timeout(5000)});
    const d = await r.json();
    if(d.bitcoin){
      const btc=d.bitcoin.usd, btcChg=d.bitcoin.usd_24h_change||0;
      const eth=d.ethereum.usd, ethChg=d.ethereum.usd_24h_change||0;
      const fmt = n => n>=1000 ? '$'+(n/1000).toFixed(1)+'K' : '$'+n.toFixed(2);
      const chg = n => (n>=0?'+':'')+n.toFixed(2)+'%';

      ['fp-btc','hms-btc'].forEach(id=>setTicker(id,'$'+Math.round(btc).toLocaleString()));
      setTickerChg('hms-btc','$'+Math.round(btc).toLocaleString(), chg(btcChg), btcChg>=0?'up':'dn');
      setTicker('fp-eth','$'+Math.round(eth).toLocaleString());

      const cryptoPrices = {btc:btc, eth:eth};
      updateCryptoPanel(cryptoPrices, {btc:btcChg, eth:ethChg});
    }
  }catch(e){}
}

function updateCryptoPanel(prices, changes){
  const rows = document.querySelectorAll('#mkt-crypto [style*="border-radius:var(--ral)"]');
  const data = [
    {sym:'BTC / USDT', p:'$'+Math.round(prices.btc).toLocaleString(), c:changes.btc},
    {sym:'ETH / USDT', p:'$'+Math.round(prices.eth).toLocaleString(), c:changes.eth},
  ];
  rows.forEach((row,i)=>{
    if(!data[i]) return;
    const vals = row.querySelectorAll('div');
    if(vals[1]) vals[1].textContent = data[i].p;
    if(vals[2]){ vals[2].textContent=(data[i].c>=0?'▲ +':'▼ ')+Math.abs(data[i].c).toFixed(2)+'%'; vals[2].style.color=data[i].c>=0?'var(--g)':'var(--r)'; }
    if(vals[1]) vals[1].style.color=data[i].c>=0?'var(--g)':'var(--r)';
  });
}

fetchCrypto();
setInterval(fetchCrypto, 30000);

async function fetchForex(){
  try{
    const r = await fetch('https://open.er-api.com/v6/latest/USD',{signal:AbortSignal.timeout(5000)});
    const d = await r.json();
    if(d.rates){
      const eur = (1/d.rates.EUR).toFixed(4);
      const gbp = (1/d.rates.GBP).toFixed(4);
      const inr = d.rates.INR.toFixed(2);
      const jpy = d.rates.JPY.toFixed(2);

      setTicker('fp-eur', eur);
      setTickerChg('hms-btc','$'+Math.round(d.rates.INR||105000),'','');

      const frows = document.querySelectorAll('#mkt-forex [style*="font-weight:600;font-size:15px"], #mkt-forex .fm');
      updateForexPanel({eur,gbp,inr,jpy});
    }
  }catch(e){}
}

function updateForexPanel(rates){
  const forexBox = document.querySelector('#mkt-forex [style*="overflow:hidden"]');
  if(!forexBox) return;
  const rows = forexBox.querySelectorAll('[style*="border-bottom:1px solid var(--bl2)"], [style*="padding:10px 0"]');
  const rateMap = [
    {val:rates.eur, base:1.0800, sym:'EUR'},
    {val:rates.gbp, base:1.2600, sym:'GBP'},
  ];
  rows.forEach((row,i)=>{
    if(!rateMap[i]) return;
    const valEl = row.querySelector('[style*="font-weight:600;font-size:15px"]');
    const chgEl = row.querySelector('[style*="font-size:11px"]');
    if(valEl){ valEl.textContent = rateMap[i].val; const d=parseFloat(rateMap[i].val)-rateMap[i].base; valEl.style.color=d>=0?'var(--g)':'var(--r)'; }
    if(chgEl){ const d=parseFloat(rateMap[i].val)-rateMap[i].base; chgEl.textContent=(d>=0?'▲ +':'▼ ')+Math.abs(d).toFixed(4); chgEl.style.color=d>=0?'var(--g)':'var(--r)'; }
  });
}

fetchForex();
setInterval(fetchForex, 60000);

(()=>{
  const cv = document.getElementById('tradingCanvas');
  if(!cv) return;
  const ctx = cv.getContext('2d');
  let W, H;

  function resize(){ W = cv.width = cv.offsetWidth; H = cv.height = cv.offsetHeight; }
  resize(); window.addEventListener('resize', resize);

  const series = [
    { color:'rgba(99,102,241,', points:[], speed:.4, amp:80, freq:.008, phase:0 },
    { color:'rgba(59,130,246,', points:[], speed:.25, amp:60, freq:.012, phase:2.1 },
    { color:'rgba(124,58,237,', points:[], speed:.15, amp:40, freq:.006, phase:4.2 },
  ];

  let pts = [];
  for(let i=0;i<55;i++) pts.push({
    x:Math.random(), y:Math.random(),
    vx:(Math.random()-.5)*.2, vy:(Math.random()-.5)*.2,
    r:Math.random()*1.4+.3,
    c:['rgba(99,102,241,','rgba(59,130,246,','rgba(124,58,237,'][Math.floor(Math.random()*3)],
    a:Math.random()*.35+.1
  });

  let mouse={x:-999,y:-999};
  document.getElementById('hero')?.addEventListener('mousemove',e=>{
    const r=cv.getBoundingClientRect(); mouse.x=e.clientX-r.left; mouse.y=e.clientY-r.top;
  });

  let t=0;
  function draw(){
    ctx.clearRect(0,0,W,H);
    t += 0.3;

    series.forEach((s,si)=>{
      const pts2 = [];
      const numPts = Math.ceil(W/6)+1;
      for(let i=0;i<numPts;i++){
        const x = (i/(numPts-1))*W;
        const base = H * (.35 + si*.15);
        const y = base + Math.sin(i*s.freq + t*s.speed*0.04 + s.phase)*s.amp
                       + Math.sin(i*s.freq*2.3 + t*s.speed*0.07)*s.amp*.35
                       + Math.sin(i*s.freq*.7 + t*s.speed*0.02)*s.amp*.2;
        pts2.push({x,y});
      }
      const grad = ctx.createLinearGradient(0,0,W,0);
      grad.addColorStop(0,   s.color+'0)');
      grad.addColorStop(.3,  s.color+'.6)');
      grad.addColorStop(.7,  s.color+'.8)');
      grad.addColorStop(1,   s.color+'0)');

      ctx.beginPath();
      ctx.moveTo(pts2[0].x, pts2[0].y);
      for(let i=1;i<pts2.length;i++){
        const mx = (pts2[i-1].x+pts2[i].x)/2;
        const my = (pts2[i-1].y+pts2[i].y)/2;
        ctx.quadraticCurveTo(pts2[i-1].x, pts2[i-1].y, mx, my);
      }
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath();
      const fillGrad = ctx.createLinearGradient(0, 0, 0, H);
      fillGrad.addColorStop(0, s.color+'.04)');
      fillGrad.addColorStop(1, s.color+'0)');
      ctx.fillStyle = fillGrad;
      ctx.fill();
    });

    for(let i=0;i<pts.length;i++){
      const pi=pts[i]; const px=pi.x*W, py=pi.y*H;
      for(let j=i+1;j<pts.length;j++){
        const pj=pts[j]; const qx=pj.x*W, qy=pj.y*H;
        const d=Math.hypot(px-qx,py-qy);
        if(d<110){ ctx.beginPath(); ctx.strokeStyle=`rgba(99,102,241,${.08*(1-d/110)})`; ctx.lineWidth=.4; ctx.moveTo(px,py); ctx.lineTo(qx,qy); ctx.stroke(); }
      }
      const dx=px-mouse.x, dy=py-mouse.y, d=Math.hypot(dx,dy);
      if(d<90){ pi.vx+=dx/d*.04; pi.vy+=dy/d*.04; }
      pi.vx*=.98; pi.vy*=.98;
      pi.x+=pi.vx/W; pi.y+=pi.vy/H;
      if(pi.x<0||pi.x>1) pi.vx*=-1;
      if(pi.y<0||pi.y>1) pi.vy*=-1;
      ctx.beginPath(); ctx.arc(px,py,pi.r,0,Math.PI*2); ctx.fillStyle=pi.c+pi.a+')'; ctx.fill();
    }

    requestAnimationFrame(draw);
  }
  draw();
})();

(()=>{
  const acObs = new IntersectionObserver(entries=>{
    entries.forEach((e,i)=>{
      if(!e.isIntersecting) return; acObs.unobserve(e.target);
      const card = e.target;
      const idx = [...document.querySelectorAll('.ac-card')].indexOf(card);
      setTimeout(()=>{
        card.style.opacity='1';
        card.style.transform='none';
      }, idx * 90);
    });
  },{threshold:.15});

  document.querySelectorAll('.ac-card').forEach(c=>{
    c.style.opacity='0';
    c.style.transform='translateY(28px) scale(.97)';
    c.style.transition='opacity .55s ease, transform .55s cubic-bezier(.22,.68,0,1.1)';
    acObs.observe(c);
  });

  const counterObs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting) return; counterObs.unobserve(e.target);
      e.target.querySelectorAll('.ac-m').forEach(m=>{
        const txt=m.textContent;
        const match=txt.match(/(\d+)/);
        if(!match) return;
        const target=parseInt(match[1]);
        const prefix=txt.split(match[0])[0];
        const suffix=txt.split(match[0])[1]||'';
        let cur=0;
        const step=()=>{ cur=Math.min(cur+Math.ceil(target/24),target); m.innerHTML=m.innerHTML.replace(/\d+/,cur); if(cur<target)requestAnimationFrame(step); };
        requestAnimationFrame(step);
      });
    });
  },{threshold:.3});

  document.querySelectorAll('.ac-card').forEach(c=>counterObs.observe(c));
})();

function showMkt(m,btn){
  document.querySelectorAll('.mkt-tab').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.mkt-panel').forEach(p=>{p.classList.remove('active');p.style.opacity='0';});
  const panel=document.getElementById('mkt-'+m);
  panel.classList.add('active');
  requestAnimationFrame(()=>requestAnimationFrame(()=>{ panel.style.opacity='1'; panel.style.transition='opacity .35s ease'; }));
}

function tfaq(el){
  const item=el.closest('.faq-item'), open=item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i=>{ i.classList.remove('open'); i.querySelector('.faq-a').style.maxHeight='0'; });
  if(!open){ item.classList.add('open'); const a=item.querySelector('.faq-a'); a.style.maxHeight=a.scrollHeight+'px'; }
}

function wa(){ window.open('https://wa.me/917415660385?text=Hi%20TradeMetrix!%20I%27m%20interested%20in%20your%20algo%20trading%20software.','_blank'); }
function acEnroll(course){ window.open('https://wa.me/917415660385?text=Hi%20TradeMetrix!%20I%27d%20like%20to%20enroll%20in%20the%20'+encodeURIComponent(course)+' course.','_blank'); }

const ca_WA_NUM  = '917415660385';
const ca_WA_MSG  = encodeURIComponent('Namaste! TradeMetrix Chart Analyzer se aa raha hoon. Mujhe algo trading ka free demo chahiye.');
const ca_WA_LINK = `https://wa.me/${ca_WA_NUM}?text=${ca_WA_MSG}`;
document.getElementById('ca-limitWA').href = ca_WA_LINK;

const ca_TODAY = new Date().toDateString();
let ca_ud = JSON.parse(localStorage.getItem('tmx2_ud') || '{}');
if (ca_ud.date !== ca_TODAY) ca_ud = { date: ca_TODAY, count: 0, emailDone: false };
const ca_saveUD = () => localStorage.setItem('tmx2_ud', JSON.stringify(ca_ud));
const ca_getRem  = () => Math.max(0, 1 - ca_ud.count);

function ca_updateUsageUI() {
  const dot = document.getElementById('ca-ud1');
  const lbl = document.getElementById('ca-ulbl');
  if (ca_ud.count >= 1) {
    dot.style.background = 'rgba(255,255,255,.1)';
    dot.style.boxShadow = 'none';
    lbl.textContent = '0 FREE ANALYSES LEFT ca_TODAY';
  } else {
    dot.classList.add('on');
    lbl.textContent = '1 FREE ANALYSIS AVAILABLE';
  }
}
ca_updateUsageUI();

const ca_showM = id => document.getElementById(id).classList.add('show');
const ca_hideM = id => document.getElementById(id).classList.remove('show');

document.getElementById('ca-gsubmit').onclick = () => {
  const name  = document.getElementById('ca-gname').value.trim();
  const email = document.getElementById('ca-gemail').value.trim();
  if (!email.includes('@')) { document.getElementById('ca-gemail').style.borderColor='var(--r)'; return; }
  const leads = JSON.parse(localStorage.getItem('tmx2_leads') || '[]');
  leads.push({ name, email, ts: new Date().toISOString(), src:'chart-analyzer-v2' });
  localStorage.setItem('tmx2_leads', JSON.stringify(leads));
  console.log('LEAD:', { name, email });
  ca_ud.emailDone = true; ca_saveUD();
  ca_hideM('emailModal');
  ca_doAnalysis();
};
document.getElementById('ca-gskip').onclick  = () => { ca_hideM('emailModal'); ca_doAnalysis(); };
document.getElementById('ca-limitClose').onclick = () => ca_hideM('limitModal');

const ca_fi=document.getElementById('ca-fileInput'), ca_uz=document.getElementById('ca-uploadZone'),
      ca_pa=document.getElementById('ca-prev-area'), ca_pi=document.getElementById('ca-prev-img'),
      ca_fn=document.getElementById('ca-fname'), ca_rb=document.getElementById('ca-rmBtn'),
      ca_ab=document.getElementById('ca-analyzeBtn'), ca_ld=document.getElementById('ca-loading'),
      ca_lt=document.getElementById('ca-ltxt'), ca_rs=document.getElementById('ca-results');
let ca_curFile=null, ca_imgB64=null;

ca_uz.addEventListener('dragover',e=>{e.preventDefault();ca_uz.classList.add('drag')});
ca_uz.addEventListener('dragleave',()=>ca_uz.classList.remove('drag'));
ca_uz.addEventListener('drop',e=>{e.preventDefault();ca_uz.classList.remove('drag');const f=e.dataTransfer.files[0];if(f&&f.type.startsWith('image/'))ca_hFile(f)});
ca_fi.onchange=()=>{if(ca_fi.files[0])ca_hFile(ca_fi.files[0])};
ca_rb.onclick=reset;

function ca_hFile(file){
  ca_curFile=file;ca_fn.textContent=file.name;
  const r=new FileReader();
  r.onload=e=>{ca_pi.src=e.target.result;ca_imgB64=e.target.result.split(',')[1];ca_pa.style.display='block';ca_uz.style.display='none';ca_ab.disabled=false;};
  r.readAsDataURL(file);
}
function reset(){ca_curFile=null;ca_imgB64=null;ca_pa.style.display='none';ca_uz.style.display='block';ca_ab.disabled=true;ca_rs.style.display='none';ca_rs.innerHTML='';ca_fi.value='';}

ca_ab.onclick=()=>{
  if(!ca_imgB64)return;
  if(ca_getRem()===0){ca_showM('limitModal');return;}
  if(ca_ud.count===0&&!ca_ud.emailDone){ca_showM('emailModal');return;}
  ca_doAnalysis();
};

const ca_MSGS=['SCANNING CHART PATTERNS...','IDENTIFYING SUPPORT & RESISTANCE...','READING CANDLESTICK FORMATIONS...','DETECTING TREND STRUCTURE...','CALCULATING MOMENTUM SIGNALS...','GENERATING AI PREDICTION...'];

async function ca_doAnalysis(){
  ca_ud.count++;ca_saveUD();ca_updateUsageUI();
  ca_ab.disabled=true;ca_ld.style.display='block';ca_rs.style.display='none';ca_rs.innerHTML='';
  let mi=0;const iv=setInterval(()=>{mi=(mi+1)%ca_MSGS.length;ca_lt.textContent=ca_MSGS[mi];},1300);

  const SYS=`You are an expert technical analyst specializing in Indian and global trading markets. Analyze the uploaded trading chart image and respond ONLY with valid JSON (no markdown backticks, no extra text):
{"overview":"2-3 line summary of what you see","signal":"BULLISH or BEARISH or NEUTRAL","confidence":75,"trend":"trend structure and direction","patterns":["pattern1","pattern2","pattern3"],"support_levels":["level1","level2"],"resistance_levels":["level1","level2"],"prediction":"detailed short-term prediction and likely scenario","targets":["target1","target2"],"risk":"risk factors and what would invalidate this analysis","recommendation":"key things to watch (not financial advice)"}
Be specific about price levels if visible. Apply SMC concepts (order blocks, FVG, liquidity, BOS, CHOCH) if visible.`;

  try{
    const res=await fetch('/api/analyze',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({system:SYS,messages:[{role:'user',content:[{type:'image',source:{type:'base64',media_type:ca_curFile.type||'image/png',data:ca_imgB64}},{type:'text',text:'Analyze this trading chart.'}]}]})});
    const data=await res.json();clearInterval(iv);ca_ld.style.display='none';
    const raw=data.content.map(i=>i.text||'').join('');
    let a;
    try{a=JSON.parse(raw.replace(/```json|```/g,'').trim());}
    catch{a={overview:raw,signal:'NEUTRAL',confidence:60,trend:'See overview.',patterns:['See overview'],support_levels:['—'],resistance_levels:['—'],prediction:raw,targets:['—'],risk:'Always use stop loss.',recommendation:'See overview.'};}
    ca_renderResults(a);
  }catch(err){
    clearInterval(iv);ca_ld.style.display='none';
    ca_rs.style.display='block';
    ca_rs.innerHTML=`<div class="rcard" style="border-color:rgba(244,63,94,.2)"><div class="rlabel">Error</div><div class="rcontent">Analysis fail hui. Dobara try karo. (${err.message})</div></div>`;
    ca_ab.disabled=false;
  }
}

function ca_renderResults(a){
  const sc=a.signal==='BULLISH'?'sig-bull':a.signal==='BEARISH'?'sig-bear':'sig-neut';
  const si=a.signal==='BULLISH'?'▲ BULLISH':a.signal==='BEARISH'?'▼ BEARISH':'◆ NEUTRAL';
  const sC=(a.support_levels||[]).map(l=>`<span class="chip chip-s">${l}</span>`).join('');
  const rC=(a.resistance_levels||[]).map(l=>`<span class="chip chip-r">${l}</span>`).join('');
  const tC=(a.targets||[]).map(l=>`<span class="chip chip-t">${l}</span>`).join('');
  const pI=(a.patterns||[]).map(p=>`<li>${p}</li>`).join('');
  const rem=ca_getRem();
  const remBanner=rem===0?`<div style="background:rgba(245,158,11,.06);border:1px solid rgba(245,158,11,.18);border-radius:8px;padding:10px 14px;font-family:var(--fm);font-size:10px;color:var(--a);margin-bottom:14px;letter-spacing:.04em">⚡ FREE TRIAL USED — WhatsApp karo unlimited access ke liye</div>`:'';

  ca_rs.innerHTML=`
    <div class="r-head fu"><h2>AI <span class="gt">Analysis</span></h2><span class="r-ts">// ${new Date().toLocaleTimeString('en-IN')}</span></div>
    ${remBanner}
    <div class="sig-row fu">
      <div class="sig ${sc}"><span class="sdot"></span>${si}</div>
      <div class="sig sig-conf">CONFIDENCE: ${a.confidence}%</div>
    </div>
    <div class="grid1 fu">
      <div class="rcard">
        <div class="rlabel">Overview</div>
        <div class="rcontent">${a.overview}</div>
        <div class="conf-row"><div class="conf-track"><div class="conf-fill" id="cfill"></div></div><div class="conf-num">${a.confidence}%</div></div>
      </div>
    </div>
    <div class="grid2 fu">
      <div class="rcard"><div class="rlabel">Trend Structure</div><div class="rcontent">${a.trend}</div></div>
      <div class="rcard"><div class="rlabel">Chart Patterns</div><div class="rcontent"><ul>${pI}</ul></div></div>
    </div>
    <div class="grid2 fu">
      <div class="rcard">
        <div class="rlabel">Support & Resistance</div>
        <div class="rcontent">
          <div style="font-family:var(--fm);font-size:9px;color:var(--t3);margin-bottom:5px;letter-spacing:.1em">SUPPORT</div>
          <div class="chips">${sC}</div>
          <div style="font-family:var(--fm);font-size:9px;color:var(--t3);margin:10px 0 5px;letter-spacing:.1em">RESISTANCE</div>
          <div class="chips">${rC}</div>
        </div>
      </div>
      <div class="rcard">
        <div class="rlabel">Price Targets</div>
        <div class="rcontent">
          <div class="chips">${tC}</div>
          <div style="margin-top:12px">${a.recommendation}</div>
        </div>
      </div>
    </div>
    <div class="grid1 fu">
      <div class="rcard pred-card">
        <div class="rlabel">AI Prediction</div><div class="rcontent">${a.prediction}</div>
      </div>
    </div>
    <div class="grid1 fu">
      <div class="rcard risk-card">
        <div class="rlabel" style="color:var(--a)">Risk Factors</div><div class="rcontent" style="color:var(--t3)">${a.risk}</div>
      </div>
    </div>
    <div class="wa-cta fu">
      <div class="wa-body">
        <h4>Is analysis pe expert se baat karo</h4>
        <p>TradeMetrix algo trading software ka free demo lo — manual analysis band karo, automation shuru karo.</p>
      </div>
      <a class="wa-btn" href="${ca_WA_LINK}" target="_blank">💬 WhatsApp Karo</a>
    </div>
    <div style="margin-top:18px;text-align:center" class="fu">
      <button class="btn-analyze" id="reBtn" style="max-width:280px;margin:0 auto">↺ Analyze Another Chart</button>
    </div>`;

  ca_rs.style.display='block';ca_ab.disabled=false;
  setTimeout(()=>{const b=document.getElementById('ca-cfill');if(b)b.style.width=(a.confidence||70)+'%';},200);
  document.getElementById('ca-reBtn').onclick=()=>{reset();window.scrollTo({top:0,behavior:'smooth'});};
  ca_rs.scrollIntoView({behavior:'smooth',block:'start'});
  if(ca_getRem()===0)setTimeout(()=>ca_showM('limitModal'),6000);
}

const ca_fab=document.getElementById('ca-cfab'),ca_cw=document.getElementById('ca-cwin'),
      ca_cc=document.getElementById('ca-cclose'),ca_cm=document.getElementById('ca-cmsgs'),
      ca_ci=document.getElementById('ca-cinput'),ca_cs=document.getElementById('ca-csend'),
      ca_qr=document.getElementById('ca-qrs');
let ca_cOpen=false,ca_cHist=[],ca_cBusy=false;

const ca_BOT_SYS=`You are TradeBot, expert trading assistant for TradeMetrix — an algorithmic trading software company from India. No tips, no advisory, only education and software info.
Cover: Technical Analysis, SMC (order blocks, FVG, liquidity, BOS, CHOCH), Price Action, Algo trading, Risk management, NSE/BSE/Nifty/BankNifty/MCX, Forex, Crypto.
Rules: Answer in Hinglish (Hindi+English mix). Concise (3-5 lines). Use 📈📉⚡ occasionally. Add disclaimer for financial topics. Mention TradeMetrix algo software naturally when relevant. NEVER give specific stock buy/sell calls or tips. For software demo: say "WhatsApp karo +91 74156 60385".`;

const ca_tog=()=>{
  ca_cOpen=!ca_cOpen;ca_cw.classList.toggle('open',ca_cOpen);
  if(ca_cOpen&&ca_cHist.length===0)setTimeout(()=>ca_botMsg("Namaste! 👋 Main TradeBot hoon — TradeMetrix ka AI Trading Assistant.\n\nKoi bhi trading question poochho — SMC, Price Action, Algo Trading, Risk Management — sab free! 🚀"),300);
  if(ca_cOpen)setTimeout(()=>ca_ci.focus(),350);
};
ca_fab.onclick=ca_tog;ca_cc.onclick=ca_tog;
ca_qr.querySelectorAll('.qrb').forEach(b=>b.onclick=()=>ca_uMsg(b.textContent));
ca_ci.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();ca_sendC();}});
ca_cs.onclick=ca_sendC;
ca_ci.oninput=()=>{ca_ci.style.height='auto';ca_ci.style.height=Math.min(ca_ci.scrollHeight,90)+'px';};

function ca_sendC(){const t=ca_ci.value.trim();if(!t||ca_cBusy)return;ca_ci.value='';ca_ci.style.height='36px';ca_uMsg(t);}
function ca_uMsg(t){ca_addMsg('user',t);ca_cHist.push({role:'user',content:t});ca_qr.style.display='none';ca_getReply();}
function ca_botMsg(t){ca_cHist.push({role:'assistant',content:t});ca_addMsg('bot',t);}

function ca_addMsg(role,text){
  const d=document.createElement('div');d.className=`msg ${role}`;
  const av=document.createElement('div');av.className='mav';av.textContent=role==='bot'?'🤖':'👤';
  const b=document.createElement('div');b.className='mbub';b.textContent=text;
  d.appendChild(av);d.appendChild(b);ca_cm.appendChild(d);ca_cm.scrollTop=ca_cm.scrollHeight;
}
function ca_showDots(){const d=document.createElement('div');d.className='msg bot';d.id='td';const av=document.createElement('div');av.className='mav';av.textContent='🤖';const b=document.createElement('div');b.className='mbub';b.innerHTML='<div class="tdots"><span></span><span></span><span></span></div>';d.appendChild(av);d.appendChild(b);ca_cm.appendChild(d);ca_cm.scrollTop=ca_cm.scrollHeight;}
function ca_hideDots(){const t=document.getElementById('ca-td');if(t)t.remove();}

async function ca_getReply(){
  ca_cBusy=true;ca_cs.disabled=true;ca_showDots();
  try{
    const res=await fetch('/api/analyze',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({system:ca_BOT_SYS,messages:ca_cHist})});
    const d=await res.json();ca_hideDots();
    ca_botMsg(d.content?.map(i=>i.text||'').join('')||'Kuch problem aa gayi, dobara try karo!');
  }catch{ca_hideDots();ca_botMsg('Network issue! ⚠️ Thodi der baad try karo.');}
  ca_cBusy=false;ca_cs.disabled=false;ca_ci.focus();
}
