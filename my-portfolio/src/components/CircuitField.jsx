import React from 'react';
import './CircuitField.css';
const paths = { hero: ['M 610 48 H 760 V 132 H 920','M 690 410 H 820 V 330 H 980','M 820 560 H 980 V 510 H 1120'] };
export default function CircuitField({variant}) { const set=paths[variant]||[]; return <svg className="circuitField" viewBox="0 0 1240 720" preserveAspectRatio="none" aria-hidden="true"><g>{set.map((d,i)=><path d={d} className="route" key={i}/>)}{set.slice(0,2).map((d,i)=><path d={d} className={`signal signal${i}`} key={`s${i}`}/>)}</g></svg>; }
