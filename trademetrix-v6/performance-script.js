const INSTRUMENTS = ['NIFTY 50','BANKNIFTY','NIFTY 50','NIFTY 50','BANKNIFTY','NIFTY 50','BANKNIFTY','NIFTY OPTIONS','NIFTY 50','BANKNIFTY'];
const DIRECTIONS  = ['LONG','SHORT','LONG','SHORT','LONG','SHORT','LONG','SHORT','LONG','SHORT'];
const TYPES       = ['swing','scalp','scalp','swing','scalp','scalp','swing','swing','scalp','scalp'];
function rnd(mn,mx){ return Math.floor(Math.random()*(mx-mn+1))+mn; }
function fmtDate(daysAgo){
  const d = new Date(); d.setDate(d.getDate()-daysAgo);
  return d.toLocaleDateString('en-IN',{day:'2-digit',month:'short'});
}
const ALL_TRADES = Array.from({length:120},(_,i)=>{
  const win  = Math.random() < 0.684;
  const inst = INSTRUMENTS[i%INSTRUMENTS.length];
  const dir  = DIRECTIONS[i%DIRECTIONS.length];
  const type = TYPES[i%TYPES.length];
  const entry = inst==='NIFTY 50' ? rnd(24200,25400) : inst==='BANKNIFTY' ? rnd(54000,57000) : rnd(180,380);
  const pnl   = win ? rnd(800,8500) : -rnd(400,3200);
  const exit  = dir==='LONG' ? entry+(pnl>0?rnd(80,220):-rnd(40,120)) : entry-(pnl>0?rnd(80,220):-rnd(40,120));
  return { date:fmtDate(i), inst, dir, type, entry, exit:Math.abs(exit), result:win?'WIN':'LOSS', pnl, score:rnd(7,14) };
});
let filteredTrades = [...ALL_TRADES];
let currentPage = 0;
const PER_PAGE = 20;
function renderTable(){
  const tbody = document.getElementById('tradeTableBody');
  const start = currentPage * PER_PAGE;
  const slice = filteredTrades.slice(start, start+PER_PAGE);
  tbody.innerHTML = slice.map(t => `
    <tr>
      <td style="font-family:var(--mono);font-size:11px">${t.date}</td>
      <td class="td-instrument">${t.inst}</td>
      <td><span class="td-dir ${t.dir.toLowerCase()}">${t.dir}</span></td>
      <td><span class="td-type ${t.type}">${t.type.toUpperCase()}</span></td>
      <td style="font-family:var(--mono);font-size:12px">${t.entry.toLocaleString('en-IN')}</td>
      <td style="font-family:var(--mono);font-size:12px">${t.exit.toLocaleString('en-IN')}</td>
      <td class="td-result ${t.result==='WIN'?'win':'loss'}">${t.result==='WIN'?'✓ WIN':'✗ LOSS'}</td>
      <td class="td-pnl ${t.pnl>0?'pos':'neg'}">${t.pnl>0?'+':''} ₹${Math.abs(t.pnl).toLocaleString('en-IN')}</td>
      <td class="td-score"><span>${t.score}</span>/15</td>
    </tr>`).join('');
  document.getElementById('pgInfo').textContent = `Showing ${start+1}–${Math.min(start+PER_PAGE,filteredTrades.length)} of ${filteredTrades.length} trades`;
  document.getElementById('prevBtn').disabled = currentPage===0;
  document.getElementById('nextBtn').disabled = (currentPage+1)*PER_PAGE >= filteredTrades.length;
}
function filterTrades(type, btn){
  document.querySelectorAll('.tf-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  currentPage = 0;
  if(type==='all') filteredTrades=[...ALL_TRADES];
  else if(type==='long') filteredTrades=ALL_TRADES.filter(t=>t.dir==='LONG');
  else if(type==='short') filteredTrades=ALL_TRADES.filter(t=>t.dir==='SHORT');
  else if(type==='win') filteredTrades=ALL_TRADES.filter(t=>t.result==='WIN');
  else if(type==='loss') filteredTrades=ALL_TRADES.filter(t=>t.result==='LOSS');
  renderTable();
}
function prevPage(){ if(currentPage>0){currentPage--;renderTable();} }
function nextPage(){ if((currentPage+1)*PER_PAGE<filteredTrades.length){currentPage++;renderTable();} }
renderTable();
function setPeriod(p, btn){
  document.querySelectorAll('.period-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  const data={
    '1m':{pnl:'+₹2.84L',sub:'This month',chg:'↑ +18.4% vs last month',trades:417,wr:'68.4%'},
    '3m':{pnl:'+₹7.12L',sub:'Last 3 months',chg:'↑ +22.1% vs prev 3M',trades:1140,wr:'67.8%'},
    '6m':{pnl:'+₹13.6L',sub:'Last 6 months',chg:'↑ Consistent growth',trades:2210,wr:'66.9%'},
    '1y':{pnl:'+₹26.4L',sub:'Last 12 months',chg:'↑ Best yearly performance',trades:4380,wr:'67.2%'},
    'all':{pnl:'+₹34.8L',sub:'Since inception',chg:'↑ Mar 2024 to present',trades:5720,wr:'67.5%'},
  };
  const d=data[p];
  document.getElementById('kpiPnl').textContent=d.pnl;
  document.getElementById('kpiPnlSub').textContent=d.sub;
  document.getElementById('kpiPnlChg').textContent=d.chg;
  document.getElementById('kpiTrades').textContent=d.trades.toLocaleString('en-IN');
  document.getElementById('kpiWr').textContent=d.wr;
  drawEquityChart();
}
function drawEquityChart(){
  const canvas = document.getElementById('equityChart');
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth * devicePixelRatio || 600;
  canvas.height = 180 * devicePixelRatio;
  ctx.scale(devicePixelRatio, devicePixelRatio);
  const W = canvas.offsetWidth || 600, H = 180;
  ctx.clearRect(0,0,W,H);
  const pts = 60;
  let vals = [0];
  for(let i=1;i<pts;i++){
    const delta = (Math.random()-.38)*12000;
    vals.push(vals[i-1]+delta);
  }
  const mn=Math.min(...vals), mx=Math.max(...vals);
  const pad=20;
  const toY=(v)=>H-pad-((v-mn)/(mx-mn))*(H-2*pad);
  const toX=(i)=>pad+(i/(pts-1))*(W-2*pad);
  const grad=ctx.createLinearGradient(0,0,0,H);
  grad.addColorStop(0,'rgba(0,212,170,0.15)');
  grad.addColorStop(1,'rgba(0,212,170,0)');
  ctx.beginPath();
  ctx.moveTo(toX(0),toY(vals[0]));
  for(let i=1;i<pts;i++) ctx.lineTo(toX(i),toY(vals[i]));
  ctx.lineTo(toX(pts-1),H); ctx.lineTo(toX(0),H); ctx.closePath();
  ctx.fillStyle=grad; ctx.fill();
  ctx.beginPath();
  ctx.moveTo(toX(0),toY(vals[0]));
  for(let i=1;i<pts;i++) ctx.lineTo(toX(i),toY(vals[i]));
  ctx.strokeStyle='#00d4aa'; ctx.lineWidth=2; ctx.stroke();
  const zeroY=toY(0);
  ctx.beginPath(); ctx.moveTo(pad,zeroY); ctx.lineTo(W-pad,zeroY);
  ctx.strokeStyle='rgba(255,255,255,0.06)'; ctx.lineWidth=1; ctx.setLineDash([4,4]); ctx.stroke();
  ctx.setLineDash([]);
}
function drawDonut(){
  const canvas=document.getElementById('donutChart');
  const ctx=canvas.getContext('2d');
  const cx=80,cy=80,r=62,inner=44;
  ctx.clearRect(0,0,160,160);
  const slices=[{v:285,c:'#00d4aa'},{v:132,c:'#ff4d6a'}];
  const total=417; let start=-Math.PI/2;
  slices.forEach(s=>{
    const angle=(s.v/total)*Math.PI*2;
    ctx.beginPath(); ctx.moveTo(cx,cy);
    ctx.arc(cx,cy,r,start,start+angle);
    ctx.closePath(); ctx.fillStyle=s.c; ctx.fill();
    start+=angle;
  });
  ctx.beginPath(); ctx.arc(cx,cy,inner,0,Math.PI*2);
  ctx.fillStyle='#111220'; ctx.fill();
}
function drawMonthly(){
  const canvas=document.getElementById('monthlyChart');
  const ctx=canvas.getContext('2d');
  canvas.width=canvas.offsetWidth*devicePixelRatio||400;
  canvas.height=200*devicePixelRatio;
  ctx.scale(devicePixelRatio,devicePixelRatio);
  const W=canvas.offsetWidth||400,H=200;
  ctx.clearRect(0,0,W,H);
  const months=['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'];
  const vals=[42000,38000,-18000,65000,72000,48000,88000,56000,-22000,94000,78000,102000];
  const mx=Math.max(...vals.map(Math.abs));
  const bw=Math.floor((W-60)/(months.length))-4;
  const midY=H-40;
  ctx.font=`500 9px JetBrains Mono`;
  ctx.fillStyle='rgba(255,255,255,0.25)';
  months.forEach((m,i)=>{
    const x=30+i*(bw+4);
    const v=vals[i];
    const bh=Math.abs(v)/mx*(midY-20);
    ctx.fillStyle=v>0?'rgba(0,212,170,0.8)':'rgba(255,77,106,0.8)';
    if(v>0){ctx.fillRect(x,midY-bh,bw,bh);}
    else{ctx.fillRect(x,midY,bw,bh);}
    ctx.fillStyle='rgba(255,255,255,0.25)';
    ctx.fillText(m,x+bw/2-8,H-4);
  });
  ctx.beginPath(); ctx.moveTo(25,midY); ctx.lineTo(W-10,midY);
  ctx.strokeStyle='rgba(255,255,255,0.1)'; ctx.lineWidth=1; ctx.stroke();
}
function drawTypeChart(){
  const canvas=document.getElementById('typeChart');
  const ctx=canvas.getContext('2d');
  canvas.width=canvas.offsetWidth*devicePixelRatio||300;
  canvas.height=130*devicePixelRatio;
  ctx.scale(devicePixelRatio,devicePixelRatio);
  const W=canvas.offsetWidth||300,H=130;
  ctx.clearRect(0,0,W,H);
  const types=[{name:'Scalp Long',val:124,c:'rgba(0,212,170,0.8)'},{name:'Scalp Short',val:98,c:'rgba(255,77,106,0.8)'},{name:'Swing Long',val:112,c:'rgba(79,143,255,0.8)'},{name:'Swing Short',val:83,c:'rgba(168,85,247,0.8)'}];
  const mx=Math.max(...types.map(t=>t.val));
  const bh=22,gap=8,pad=14;
  ctx.font='500 9px JetBrains Mono';
  types.forEach((t,i)=>{
    const y=pad+i*(bh+gap);
    const bw=(t.val/mx)*(W-100);
    ctx.fillStyle=t.c; ctx.beginPath(); ctx.roundRect(80,y,bw,bh,3); ctx.fill();
    ctx.fillStyle='rgba(255,255,255,0.35)'; ctx.fillText(t.name,0,y+14);
    ctx.fillStyle=t.c; ctx.fillText(t.val,80+bw+6,y+14);
  });
}
setTimeout(()=>{drawEquityChart();drawDonut();drawMonthly();drawTypeChart();},100);
window.addEventListener('resize',()=>{drawEquityChart();drawMonthly();drawTypeChart();});