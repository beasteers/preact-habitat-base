import 'style/index.css';


const HelloWorld = ({ name='World', color='white', excited=true, ...props }) => {
  return (
    <PrettyBorder color={color} {...props}>
      <h1 style={{ color }}>{`Hello ${name}${excited ? '!' : ''}`}</h1>
    </PrettyBorder>
  )
}

// if you want to use me, go uncomment my render section at the bottom of index.js
export const GoodnightMoon = ({ name='Moon', color='white', ...props }) => {
  return (
    <PrettyBorder color={color} {...props}>
      <h1 style={{ color }}>{`Goodnight ${name}`}</h1>
    </PrettyBorder>
  )
}

export default HelloWorld;




////////////////////////////////////////
// Just something to make it pretty
////////////////////////////////////////


// derived from: https://codepen.io/Inderpreet23/pen/rLzbLk


import { useState } from 'react';
import styled, { keyframes } from 'styled-components'


const PrettyBorder = ({ children, color='white', delay=0, ...props }) => {
    const [ clicked, setClick ] = useState(false);
    const speed = clicked ? '1s' : '3s';
    return (
      <BorderBox thickness={props.thickness} onClick={() => setClick(!clicked)}>
        {/* Head */}
        <BorderTicks color={clicked ? 'red' : 'white'} delay={`${delay}s`} duration={speed} {...props} />
        {/* Trail */}
        {[0.1, 0.5, 0.8, 1].map(i => 
          <BorderTicks 
            delay={`${+delay + i}s`} color={color} opacity={1-i} duration={speed}
            length={`${20*(1-i)}%`} {...props} />)}
        <div class='content'>{children}</div>
      </BorderBox>
    )
}
  
const BorderTicks = (props) => {
    return (
        <BorderTicksDiv {...props}>
            <div class='top'></div>
            <div class='right delay'></div>
            <div class='bottom delay'></div>
            <div class='left'></div>
        </BorderTicksDiv>
    )
}

// animations
const hmove = (length) => keyframes` 0% { left: -${length}; } 100% { left: calc(100% + ${length}); } `;
const vmove = (length) => keyframes` 0% { top: -${length}; } 100% { top: calc(100% + ${length}); } `;

// the container

const BorderBox = styled.div.attrs(({ color='white', thickness='0.2rem' }) => ({ color, thickness }))`
    position: relative; overflow: hidden; cursor: pointer;
    padding: calc(${p=>p.thickness} + 0.25rem) calc(${p=>p.thickness} + 0.5rem);
    margin: 1rem;
`;

// The tick styles

const BorderTicksDiv = styled.div.attrs(({ 
        duration='3s', delay='0s', color='white', opacity=1, thickness='0.2rem', length='20%', reversed=false,
    }) => ({ duration, color, delay, opacity, thickness, length, reversed }))`
    position: absolute; z-index: -1;
    top: 0; bottom: 0; left: 0; right: 0;
    width: 100%; height: 100%;
    /* tick styles */
    > div {
        position: absolute; z-index: 1;
        opacity: ${p => p.opacity};
        background: ${p => p.color};
        transition: left ${p => p.duration} linear, top ${p => p.duration} linear;
        animation: ${p => p.duration} ease-in-out ${p => p.delay} infinite alternate${p=>p.reversed?'-reverse':''} both;
        &.delay { animation-delay: calc(${p => p.delay} + ${p => p.duration}/2); }
        
    }
    /* positioning */
    .top, .bottom { width: ${p => p.length}; height: ${p => p.thickness}; left: -${p=>p.length}; animation-name: ${p=>hmove(p.length)}; }
    .right, .left { height: ${p => p.length}; width: ${p => p.thickness}; top: -${p=>p.length}; animation-name: ${p=>vmove(p.length)}; }
    .top { top: 0rem; } .bottom { bottom: 0rem; } 
    .right { right: 0rem; } .left { left: 0rem; }
`;
