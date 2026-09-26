"use client";
/* eslint-disable @next/next/no-html-link-for-pages -- The site uses direct route links for dependable static navigation. */

import {useEffect, useRef} from "react";

type Pixel = {
  x: number; y: number; tx: number; ty: number; dx: number; dy: number;
  size: number; color: string; depth: number;
};

const colors = ["#ff5965", "#4dde87", "#5d8cff"];
const clamp = (n: number) => Math.max(0, Math.min(1, n));
const smooth = (n: number) => {const t=clamp(n); return t*t*(3-2*t)};
const mix = (a: number,b: number,t: number) => a+(b-a)*t;

function createPixels(width: number,height: number,compact: boolean): Pixel[] {
  let seed = 20260926;
  const rand = () => {seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};
  const count = compact ? 82 : 175;
  const centerX = width*(compact ? .55 : .72);
  const centerY = height*(compact ? .56 : .50);
  const scale = Math.min(width*(compact ? .42 : .30),height*.50,330);
  return Array.from({length:count},(_,i) => {
    const color = colors[i%3];
    let tx: number,ty: number;
    if(i<48){
      const group=Math.floor(i/16);
      const cell=i%16;
      const step=compact?10:15;
      tx=centerX+(group-1)*step*4.4+(cell%4-1.5)*step;
      ty=centerY+(group-1)*step*2.4+(Math.floor(cell/4)-1.5)*step;
    }else{
      const angle=(i-48)/(count-48)*Math.PI*2;
      const radius=scale*(.70+rand()*.28);
      tx=centerX+Math.cos(angle)*radius;
      ty=centerY+Math.sin(angle)*radius*.54;
    }
    const angle=rand()*Math.PI*2;
    const distance=width*(.42+rand()*.47);
    return {
      x:rand()*width,y:rand()*height,tx,ty,
      dx:Math.cos(angle)*distance,dy:Math.sin(angle)*distance*.75,
      size:compact?3+rand()*3:3+rand()*5,
      color,depth:.35+rand()*.65
    };
  });
}

export function PixelJourney(){
  const sectionRef=useRef<HTMLElement>(null);
  const canvasRef=useRef<HTMLCanvasElement>(null);
  const heroRef=useRef<HTMLDivElement>(null);
  const chapterRef=useRef<HTMLDivElement>(null);

  useEffect(()=>{
    const section=sectionRef.current;
    const canvas=canvasRef.current;
    const ctx=canvas?.getContext("2d",{alpha:true});
    if(!section||!canvas||!ctx)return;
    const motion=window.matchMedia("(prefers-reduced-motion: reduce)");
    let pixels:Pixel[]=[];
    let width=0,height=0,frame=0;
    const resize=()=>{
      const box=canvas.getBoundingClientRect();
      width=box.width;height=box.height;
      const ratio=Math.min(window.devicePixelRatio||1,2);
      canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);
      ctx.setTransform(ratio,0,0,ratio,0,0);
      pixels=createPixels(width,height,width<700);
      schedule();
    };
    const draw=()=>{
      frame=0;
      const rect=section.getBoundingClientRect();
      const travel=Math.max(1,rect.height-window.innerHeight);
      const progress=motion.matches ? .40 : clamp(-rect.top/travel);
      section.style.setProperty("--journey-progress",String(progress));
      section.style.setProperty("--hero-opacity",String(1-smooth((progress-.13)/.25)));
      section.style.setProperty("--chapter-opacity",String(smooth((progress-.35)/.17)*(1-smooth((progress-.82)/.15))));
      section.style.setProperty("--scroll-opacity",String(1-smooth((progress-.06)/.16)));
      if(heroRef.current)heroRef.current.inert=progress>.42;
      if(chapterRef.current)chapterRef.current.inert=progress<.35||progress>.91;
      ctx.clearRect(0,0,width,height);
      const align=smooth(progress/.36);
      const scatter=smooth((progress-.54)/.40);
      for(const pixel of pixels){
        const x=mix(mix(pixel.x,pixel.tx,align),pixel.tx+pixel.dx,scatter);
        const y=mix(mix(pixel.y,pixel.ty,align),pixel.ty+pixel.dy,scatter);
        if(x< -20||x>width+20||y< -20||y>height+20)continue;
        const size=pixel.size*(1+.25*align);
        ctx.globalAlpha=pixel.depth*(1-scatter*.72);
        ctx.fillStyle=pixel.color;
        ctx.shadowColor=pixel.color;
        ctx.shadowBlur=align>0.5 ? 15 : 7;
        ctx.fillRect(x,y,size,size);
        // Two small faces make each pixel read as a shallow cube.
        ctx.shadowBlur=0;
        ctx.globalAlpha*=.65;
        ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+size*.35,y-size*.35);
        ctx.lineTo(x+size*1.35,y-size*.35);ctx.lineTo(x+size,y);ctx.closePath();ctx.fill();
        ctx.globalAlpha*=.55;
        ctx.beginPath();ctx.moveTo(x+size,y);ctx.lineTo(x+size*1.35,y-size*.35);
        ctx.lineTo(x+size*1.35,y+size*.65);ctx.lineTo(x+size,y+size);ctx.closePath();ctx.fill();
      }
      ctx.globalAlpha=1;ctx.shadowBlur=0;
    };
    const schedule=()=>{if(!frame)frame=requestAnimationFrame(draw)};
    resize();
    window.addEventListener("resize",resize);
    window.addEventListener("scroll",schedule,{passive:true});
    motion.addEventListener("change",schedule);
    return ()=>{window.removeEventListener("resize",resize);window.removeEventListener("scroll",schedule);motion.removeEventListener("change",schedule);if(frame)cancelAnimationFrame(frame)};
  },[]);

  return <section className="pixel-journey" ref={sectionRef} aria-label="Pixel Orbit introduction">
    <div className="pixel-stage">
      <canvas className="pixel-canvas" ref={canvasRef} aria-hidden="true"/>
      <div className="pixel-stage-glow" aria-hidden="true"/>
      <div className="shell pixel-hero-content">
        <div className="hero-copy" ref={heroRef}><div className="hero-orbit" aria-hidden="true"><span className="hero-orbit-ring"/><span className="hero-orbit-ring hero-orbit-ring-inner"/><span className="hero-orbit-core"/><span className="hero-orbit-dot hero-orbit-red"/><span className="hero-orbit-dot hero-orbit-green"/><span className="hero-orbit-dot hero-orbit-blue"/></div><p className="eyebrow"><span className="rgb-mark"/> INDEPENDENT DIGITAL STUDIO</p><h1>Ideas into<br/><em>interfaces.</em><br/>Interfaces into<br/>impact.</h1><p className="hero-lede">Pixel Orbit designs apps, websites and SaaS products with a clear point of view and a sharp eye for detail.</p><div className="button-row"><a className="button button-light" href="/work">Explore our work <span aria-hidden="true">↗</span></a><a className="text-link" href="/contact">Start a project <span aria-hidden="true">↗</span></a></div></div>
        <div className="pixel-chapter" ref={chapterRef} inert><p className="section-kicker">ONE CONNECTED SYSTEM</p><h2>Every pixel<br/><em>finds its place.</em></h2><p>Product thinking, expressive interfaces and thoughtful engineering move together—then open into the next idea.</p><a className="text-link" href="/work">See the work <span aria-hidden="true">↗</span></a></div>
        <div className="hero-index" aria-hidden="true">DESIGN <span>✳</span> BUILD <span>✳</span> EVOLVE</div>
        <div className="pixel-scroll-cue" aria-hidden="true">SCROLL TO CONNECT <span>↓</span></div>
      </div>
    </div>
  </section>;
}
