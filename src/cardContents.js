import React from 'react'

const goldenRatio = 1.61803398875
export const cardWidth = 100
export const cardHeight = cardWidth * goldenRatio


const BackgroundColors = ({ colorA, colorB }) => (
  <g clipPath='url(#round-corners)'>
    <rect width={cardWidth} height={cardHeight/2} fill={colorA} opacity='.9' />
    <rect width={cardWidth} y={cardHeight/2} height={cardHeight/2} fill={colorB} opacity='.9'/>
  </g>
)

const MajorContents = ({ name }) => {
  return (
    <g>
      <circle cx={cardWidth/2} cy={cardHeight/4} r='10' fill='#4C525F' />
      <circle cx={cardWidth/2} cy={cardHeight*3/4} r='10' fill='#4C525F'/>
    </g>
  )
}

const NonMajorContents = ({ rank, suit }) => (
  <g>
    <BackgroundColors colorA='white' colorB='#313234' />
  </g>
)

const FaceDownContents = () => (
  <g>
    <NonMajorContents />
    <circle cx={cardWidth/2} cy={cardHeight/4} r='10' fill='#4C525F' />
    <circle cx={cardWidth/2} cy={cardHeight*3/4} r='10' fill='#4C525F'/>
  </g>
)


const CardContents = ({tarot: { suit, name, rank }, revealed}) => {
  if (!revealed)
    return <FaceDownContents />

  if (suit === 'major')
    return <MajorContents name={name} />

  return <NonMajorContents rank={rank} suit={suit} />
}

export default CardContents
