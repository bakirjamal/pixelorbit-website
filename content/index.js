document.body.classList.add('is-loading');

(function(){
  const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Giant footer wordmark ---------- */
  const giant=$('#giant');
  const word='pixel|o|rbits'.split('|');
  let gi=0, html='<span class="wordmark">';
  word[0].split('').forEach(c=>html+=`<span class="ch" style="--i:${gi++}">${c}</span>`);
  html+=`<span class="ch o" style="--i:${gi++}"><svg><use href="#o-mark"/></svg></span>`;
  word[2].split('').forEach(c=>html+=`<span class="ch" style="--i:${gi++}">${c}</span>`);
  giant.innerHTML=html+'</span>';

  /* ---------- Orbit map ---------- */
  (function(){
    const svg=$('#orbitmap'), NS='http://www.w3.org/2000/svg', cx=650, cy=300;
    const el=(t,a)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);return e};
    // dot grid
    const g=el('g',{});
    for(let x=20;x<1300;x+=20)for(let y=20;y<560;y+=20){
      const d=Math.hypot(x-cx,(y-cy)*1.6); if(d<620 && Math.sin(x*.013)*Math.cos(y*.021)+Math.sin((x+y)*.006)>-.35) g.appendChild(el('rect',{x:x-2,y:y-2,width:4,height:4,class:'grid-dot'}));
    }
    svg.appendChild(g);
    [120,220,320].forEach(r=>svg.appendChild(el('ellipse',{cx,cy,rx:r*1.7,ry:r*.8,class:'ring'})));
    const places=[['London, UK',230,140],['New York, USA',110,250],['San Francisco, USA',60,380],['Berlin, Germany',360,90],['Paris, France',280,190],['Sydney, Australia',1180,470],['Melbourne, Australia',1080,510],['Delhi',700,230],['Mumbai',600,420],['Bengaluru',760,470],['Lucknow',820,260]];
    const arcs=el('g',{}); svg.appendChild(arcs);
    places.forEach((p,i)=>{
      const [n,x,y]=p, mx=(cx+x)/2, my=Math.min(cy,y)-Math.abs(cx-x)*.28-30;
      const path=el('path',{d:`M${cx} ${cy} Q${mx} ${my} ${x} ${y}`,class:'arc'});
      arcs.appendChild(path);
      const len=path.getTotalLength(); path.style.strokeDasharray=len; path.style.strokeDashoffset=len;
      path.style.transition=`stroke-dashoffset 1.6s cubic-bezier(.2,.7,.1,1) ${i*90}ms`;
      const c=el('rect',{x:x-5,y:y-5,width:10,height:10,class:'city'}); c.style.opacity=0; c.style.transition=`opacity .5s ${i*90+900}ms`;
      svg.appendChild(c);
      if(i<8){const t=el('text',{x:x+12,y:y+5}); t.textContent=n; t.style.opacity=0; t.style.transition=`opacity .6s ${i*90+1100}ms`; svg.appendChild(t)}
    });
    const ping=el('circle',{cx,cy,r:22,fill:'none',stroke:'#DCE87A','stroke-width':1.5,class:'ping'}); svg.appendChild(ping);
    svg.appendChild(el('rect',{x:cx-8,y:cy-8,width:16,height:16,fill:'#F2F0E7'}));
    const lab=el('text',{x:cx-10,y:cy+40,'text-anchor':'middle'}); lab.textContent='Bareilly'; lab.style.fontSize='18px'; lab.style.fontWeight='700'; svg.appendChild(lab);
    // orbiting pixel
    const orb=el('rect',{x:-6,y:-6,width:12,height:12,fill:'#DCE87A'}); svg.appendChild(orb);
    let a=0; (function loop(){a+=.006; orb.setAttribute('transform',`translate(${cx+Math.cos(a)*374},${cy+Math.sin(a)*176})`); requestAnimationFrame(loop)})();
    svg.addEventListener('reveal',()=>{ $$('path.arc',svg).forEach(p=>p.style.strokeDashoffset=0); $$('rect.city,text',svg).forEach(t=>t.style.opacity=1) });
  })();

  /* ---------- SVG path lengths for draw reveals ---------- */
  $$('.dr').forEach(svg=>$$('path,line,rect,circle,polyline,ellipse',svg).forEach(p=>{
    if(p.style.getPropertyValue('--len')) return;
    try{const l=Math.ceil(p.getTotalLength?p.getTotalLength():300); p.style.setProperty('--len',l||300)}catch(e){}
  }));

  /* ---------- Reveal observer ---------- */
  const targets=$$('.ln,.fu,.dr,.rule,.photo,.proc-line,.giant,.hl,.sec-head,.hero,#orbitmap,[data-count]');
  const io=new IntersectionObserver(es=>es.forEach(e=>{
    if(!e.isIntersecting) return;
    const t=e.target; t.classList.add('is-in');
    if(t.id==='orbitmap') t.dispatchEvent(new Event('reveal'));
    if(t.dataset.count) countUp(t);
    io.unobserve(t);
  }),{threshold:.15,rootMargin:'0px 0px -6% 0px'});
  function startReveals(){ targets.forEach(t=>{ if(!t.closest('.hero')) io.observe(t) }); }
  function countUp(el){
    const to=+el.dataset.count, from=to>1000?to-14:0, dur=1400, t0=performance.now();
    (function step(n){const p=Math.min((n-t0)/dur,1), e=1-Math.pow(1-p,3); el.textContent=Math.round(from+(to-from)*e); if(p<1) requestAnimationFrame(step)})(t0);
  }

  /* ---------- Loader ---------- */
  const loader=$('#loader'), count=$('#count'), bar=$('#bar');
  function finishLoad(){
    loader.classList.add('done'); document.body.classList.remove('is-loading');
    setTimeout(()=>{ $$('.hero .ln,.hero .fu,.hero .dr').forEach(e=>e.classList.add('is-in')); },250);
    setTimeout(()=>loader.remove(),1300);
    startReveals();
  }
  if(reduce){ loader.remove(); document.body.classList.remove('is-loading'); $$('.hero .ln,.hero .fu,.hero .dr').forEach(e=>e.classList.add('is-in')); startReveals(); }
  else{
    let v=0; const t0=performance.now(), D=1900;
    (function tick(n){
      const p=Math.min((n-t0)/D,1), e=p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2; v=Math.round(e*100);
      count.textContent=String(v).padStart(3,'0'); bar.style.width=v+'%';
      if(p<1) requestAnimationFrame(tick); else setTimeout(finishLoad,250);
    })(t0);
  }

  /* ---------- Smooth scroll (Lenis) ---------- */
  let lenis=null;
  try{ if(window.Lenis && !reduce){ lenis=new Lenis({duration:1.15,easing:t=>Math.min(1,1.001-Math.pow(2,-10*t)),smoothWheel:true}); (function raf(t){lenis.raf(t);requestAnimationFrame(raf)})(); } }catch(e){lenis=null}
  $$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
    const id=a.getAttribute('href'); if(id.length<2 && id!=='#top') return;
    const t=id==='#top'?document.body:$(id); if(!t) return; e.preventDefault();
    document.documentElement.classList.remove('menu-open');
    if(lenis) lenis.scrollTo(t,{offset:id==='#top'?0:-10}); else t.scrollIntoView({behavior:'smooth'});
  }));

  /* ---------- Header hide / show ---------- */
  const hdr=$('#hdr'), hero=$('#hero'); let lastY=0;
  function onScroll(){
    const y=window.scrollY, heroH=hero.offsetHeight*.55;
    hdr.classList.toggle('solid',y>20);
    hdr.classList.toggle('on-lime',y<heroH);
    if(y>lastY+4 && y>200) hdr.classList.add('hide'); else if(y<lastY-4) hdr.classList.remove('hide');
    lastY=y;
    // parallax
    const vh=innerHeight;
    const pi=$('.parallax-img'); if(pi){const r=pi.parentElement.getBoundingClientRect(); if(r.bottom>0&&r.top<vh&&$('#photo').classList.contains('is-in')) pi.style.transform=`translate3d(0,${((r.top+r.height/2-vh/2)*-.06).toFixed(1)}px,0)`;}
    $$('.parallax').forEach(p=>{const r=p.parentElement.getBoundingClientRect(); if(r.bottom<0||r.top>vh) return; const s=+p.dataset.speed||.05; const off=(r.top+r.height/2-vh/2)*-s; p.style.transform=(p.classList.contains('monitor')?'translateX(-50%) ':'')+`translate3d(0,${off.toFixed(1)}px,0)`;});
  }
  addEventListener('scroll',onScroll,{passive:true}); onScroll();

  /* ---------- Mobile menu ---------- */
  $('#burger').addEventListener('click',()=>document.documentElement.classList.toggle('menu-open'));

  /* ---------- Cursor ---------- */
  const cur=$('#cursor'); let mx=-100,my=-100,cx=-100,cy=-100;
  if(matchMedia('(hover:hover) and (pointer:fine)').matches){
    addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.classList.add('on')});
    document.addEventListener('mouseleave',()=>cur.classList.remove('on'));
    (function loop(){cx+=(mx-cx)*.18; cy+=(my-cy)*.18; cur.style.transform=`translate3d(${cx}px,${cy}px,0)`; requestAnimationFrame(loop)})();
    $$('[data-cursor="view"]').forEach(el=>{el.addEventListener('mouseenter',()=>cur.classList.add('view'));el.addEventListener('mouseleave',()=>cur.classList.remove('view'))});
    $$('a:not([data-cursor]),button,summary,.svc-row').forEach(el=>{el.addEventListener('mouseenter',()=>{if(!cur.classList.contains('view'))cur.classList.add('link')});el.addEventListener('mouseleave',()=>cur.classList.remove('link'))});
  }

  /* ---------- FAQ smooth open ---------- */
  $$('.faq details').forEach(d=>{
    const s=$('summary',d), a=$('.ans',d);
    s.addEventListener('click',e=>{
      e.preventDefault();
      if(d.open){ a.animate([{height:a.scrollHeight+'px'},{height:'0px'}],{duration:450,easing:'cubic-bezier(.2,.7,.1,1)'}).onfinish=()=>d.open=false; }
      else{ d.open=true; a.animate([{height:'0px',opacity:0},{height:a.scrollHeight+'px',opacity:1}],{duration:550,easing:'cubic-bezier(.2,.7,.1,1)'}); }
    });
  });

  /* ---------- Form (preview only) ---------- */
  $('#form').addEventListener('submit',e=>{
    e.preventDefault(); let ok=true;
    const n=$('#f-name'), m=$('#f-email');
    n.parentElement.classList.toggle('err',!n.value.trim()); if(!n.value.trim()) ok=false;
    const em=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m.value); m.parentElement.classList.toggle('err',!em); if(!em) ok=false;
    if(!ok) return;
    const t=$('#toast'); t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),4200);
  });
})();
