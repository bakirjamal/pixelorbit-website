import type {Metadata} from "next";
import {projects} from "../../lib/projects";
import {ProjectCard} from "../../components/project-card";
export const metadata:Metadata={title:"Work",description:"Explore selected Pixel Orbit app, website and SaaS design projects."};
export default function Work(){return <main><section className="page-hero shell"><p className="section-kicker">SELECTED WORK / 2026</p><h1>Every project has<br/><em>a story to tell.</em></h1><p>A selection of product interfaces, mobile experiences and website design from the supplied Pixel Orbit portfolio.</p></section><section className="work-list shell"><div className="project-grid">{projects.map(p=><ProjectCard project={p} key={p.slug}/>)}</div></section></main>}
