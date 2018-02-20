import React from 'react'

// SVG from https://thenounproject.com/search/?q=cup&i=17342
const cupFullSize = 65
const targetSize = 16.25

export const Cup = ({x, y, scale=1, fill}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <g transform={`scale(${targetSize/cupFullSize})`}>
      <path fill={fill} d="M39.5109 86.0103c30.5132,2.51672 22.3379,13.4683 -6.58436,13.4683 -28.9235,0 -44.4339,-9.97171 -8.73098,-13.4683l2.07259 -37.3008c-15.286,-4.54584 -26.2681,-16.2952 -26.2681,-43.8158 18.3972,-7.15773 47.6461,-5.86177 65,0 0,27.5206 -12.2758,39.27 -27.5617,43.8158l2.07259 37.3008z"/>
    </g>
  </g>
)

const swordFullSize = 100
export const Sword = ({ x, y, scale=1, fill}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <g transform={`scale(${targetSize/swordFullSize})`}>
      <polygon fill={fill} points="36.328,63.672 41.64,70.627 90.811,23.947 99.895,0.105 76.053,9.189 29.375,58.359 "/>
      <path fill={fill} d="M42.741,88.611l4.795-4.793L33.956,66.045L16.183,52.463l-4.794,4.797l11.463,11.463L9.373,82.201  c-2.4-0.109-4.836,0.727-6.67,2.561c-3.461,3.459-3.465,9.072-0.001,12.535c3.464,3.465,9.079,3.465,12.541,0.002  c1.834-1.834,2.665-4.27,2.556-6.67l13.48-13.48L42.741,88.611z"/>
    </g>
  </g>
)

const coinsFullSize = 46
export const Coin = ({ x, y, scale=1, fill}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <g transform={`scale(${targetSize/coinsFullSize})`}>
      <path fill={fill} d="M23,0 C10.317,0 0,10.318 0,23 C0,35.682 10.317,46 23,46 C35.683,46 46,35.682 46,23 C46,10.318 35.683,0 23,0 L23,0 Z M27,30.746 C27,32.54 25.54,34 23.745,34 L22.255,34 C20.46,34 19,32.54 19,30.746 L19,14.254 C19,12.46 20.46,11 22.255,11 L23.745,11 C25.54,11 27,12.46 27,14.254 L27,30.746 L27,30.746 Z" />
    </g>
  </g>
)

// wand from: https://thenounproject.com/search/?q=wand&i=193126
const wandsFullSize = 76.68
export const Wand = ({ x, y, scale=1, fill}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <g transform={`scale(${targetSize/wandsFullSize})`}>
     <path fill={fill} d="M75.857,32.697l8.015-15.729l-15.729,8.015L55.66,12.5l2.762,17.435l-15.728,8.014l11.331,1.795L12.246,81.523   c-0.781,0.781-0.781,2.047,0,2.828l4.243,4.242c0.781,0.781,2.047,0.781,2.829,0l41.779-41.779l1.794,11.332l8.015-15.729   l17.436,2.762L75.857,32.697z"/>
    </g>
  </g>
)

export const iconAspects = {
  cups: 16.25/24.87,
  swords: 1,
  coins: 1,
  wands: 1
}
