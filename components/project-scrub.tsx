"use client";

import {useRef, useState, type CSSProperties, type PointerEvent, type ReactNode} from "react";

export function ProjectScrub({name,category,summary,children}:{name:string;category:string;summary:string;children:ReactNode}){
  const [reveal,setReveal]=useState(0);
  const active=useRef<{pointerId:number;startX:number;startReveal:number;dragged:boolean}|null>(null);
  const surface=useRef<HTMLButtonElement>(null);

  const down=(event:PointerEvent<HTMLButtonElement>)=>{
    if(event.button!==0 && event.pointerType==="mouse")return;
    active.current={pointerId:event.pointerId,startX:event.clientX,startReveal:reveal,dragged:false};
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const move=(event:PointerEvent<HTMLButtonElement>)=>{
    const gesture=active.current;
    if(!gesture||gesture.pointerId!==event.pointerId||!surface.current)return;
    const delta=event.clientX-gesture.startX;
    if(Math.abs(delta)>5)gesture.dragged=true;
    if(gesture.dragged){
      const width=surface.current.getBoundingClientRect().width;
      setReveal(Math.max(0,Math.min(100,gesture.startReveal+delta/width*100)));
    }
  };
  const up=(event:PointerEvent<HTMLButtonElement>)=>{
    const gesture=active.current;
    if(!gesture||gesture.pointerId!==event.pointerId)return;
    if(!gesture.dragged)setReveal(value=>value>50?0:100);
    active.current=null;
    if(event.currentTarget.hasPointerCapture(event.pointerId))event.currentTarget.releasePointerCapture(event.pointerId);
  };
  const style={"--scrub-reveal":`${reveal}%`} as CSSProperties;

  return <button ref={surface} className={`project-scrub ${reveal>3?"has-reveal":""}`} style={style} type="button"
    aria-label={`${reveal>50?"Hide":"Reveal"} the story of ${name}. Drag horizontally or press to toggle.`}
    aria-pressed={reveal>50} onPointerDown={down} onPointerMove={move} onPointerUp={up}
    onPointerCancel={()=>{active.current=null}} onClick={event=>{if(event.detail===0)setReveal(value=>value>50?0:100)}}>
    {children}
    <span className="scrub-overlay"><span className="scrub-kicker">{category}</span><strong>{name}<span>.</span></strong><span className="scrub-summary">{summary}</span><span className="scrub-footer">Explore the full case study below ↗</span></span>
    <span className="scrub-handle" aria-hidden="true"><i>↔</i></span>
    <span className="scrub-hint" aria-hidden="true">DRAG RIGHT TO REVEAL <span>→</span></span>
  </button>;
}
