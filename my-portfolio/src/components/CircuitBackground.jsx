import React from 'react';
import './CircuitBackground.css';

const routes = [
  'M 2 140 H 250 V 250 H 410', 'M 1180 58 H 960 V 170 H 790',
  'M 40 620 H 210 V 500 H 390', 'M 1030 660 H 1220 V 520 H 1390',
  'M 460 82 V 215 H 610 V 330', 'M 700 720 V 570 H 860 V 440',
  'M 20 390 H 120 V 470 H 265', 'M 1280 320 H 1130 V 410 H 1010'
];
const signalRoutes = [routes[0], routes[1], routes[3], routes[5]];
const nodes = [[250,140],[250,250],[960,58],[960,170],[210,620],[210,500],[1220,660],[1220,520],[610,215],[860,570]];

export default function CircuitBackground() {
  return <svg className="circuitBackground" style={{ zIndex: 0 }} viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden="true">
    <g className="circuitRoutes">{routes.map((d, index) => <path d={d} key={index} className={index < 4 ? 'primaryRoute' : ''} />)}</g>
    <g className="circuitSignals">{signalRoutes.map((d, index) => <React.Fragment key={index}><path d={d} className={`signalTrail signal${index}`} /><path d={d} className={`signalHead signal${index}`} /></React.Fragment>)}</g>
    <g className="circuitNodes">{nodes.map(([cx, cy], index) => <circle cx={cx} cy={cy} r="2.2" key={index} className={index < 5 ? 'activeNode' : ''} />)}</g>
  </svg>;
}
