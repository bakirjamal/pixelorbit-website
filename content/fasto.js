
(function(){
  const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  /* reveals */
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-in');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  $$('.ln,.fu,.hl,.reveal').forEach(t=>io.observe(t));
  /* smooth scroll */
  let lenis=null;
  try{ if(window.Lenis&&!reduce){ lenis=new Lenis({duration:1.15,easing:t=>Math.min(1,1.001-Math.pow(2,-10*t))}); (function raf(t){lenis.raf(t);requestAnimationFrame(raf)})(); } }catch(e){}
  /* header + parallax + gallery track */
  const hdr=$('#hdr'), track=$('#track'), gal=$('#gallery'), cov=$('.px'); let lastY=0;
  function onScroll(){
    const y=scrollY, vh=innerHeight;
    hdr.classList.toggle('solid',y>20);
    if(y>lastY+4&&y>200) hdr.classList.add('hide'); else if(y<lastY-4) hdr.classList.remove('hide');
    lastY=y;
    if(cov){const r=cov.parentElement.getBoundingClientRect(); cov.style.transform=`translate3d(0,${((r.top)*-.08).toFixed(1)}px,0)`;}
    const g=gal.getBoundingClientRect();
    if(g.top<vh&&g.bottom>0){const p=(vh-g.top)/(vh+g.height); const max=track.scrollWidth-innerWidth+80; track.style.transform=`translate3d(${(-p*max*1.1).toFixed(1)}px,0,0)`;}
  }
  addEventListener('scroll',onScroll,{passive:true}); onScroll();
  /* cursor */
  const cur=$('#cursor'); let mx=-100,my=-100,cx=-100,cy=-100;
  if(matchMedia('(hover:hover) and (pointer:fine)').matches){
    addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.classList.add('on')});
    document.addEventListener('mouseleave',()=>cur.classList.remove('on'));
    (function loop(){cx+=(mx-cx)*.18;cy+=(my-cy)*.18;cur.style.transform=`translate3d(${cx}px,${cy}px,0)`;requestAnimationFrame(loop)})();
    $$('[data-cursor="view"]').forEach(el=>{el.addEventListener('mouseenter',()=>cur.classList.add('view'));el.addEventListener('mouseleave',()=>cur.classList.remove('view'))});
    $$('a:not([data-cursor]),button').forEach(el=>{el.addEventListener('mouseenter',()=>{if(!cur.classList.contains('view'))cur.classList.add('link')});el.addEventListener('mouseleave',()=>cur.classList.remove('link'))});
  }
})();
