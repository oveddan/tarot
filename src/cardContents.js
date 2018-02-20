import React from 'react'
import { concat, range, shuffle, mapValues, flatten } from 'lodash'
import { Cup, Sword, Coin, Wand, iconAspects } from './icons'

const goldenRatio = 1.61803398875
export const cardWidth = 100
export const cardHeight = cardWidth * goldenRatio

const blackAndWhite = ['white', '#313234', '#4C525F', '#E2DED4']
const yellowIsh = ['#DABA4D', '#D2B56E', '#BA9066', '#B97F43']
const turquoiseIsh = ['#63887B', '#627C77', '#607A75', '#5B707A']
const orangeIsh = ['#D5853D', '#DA5C35', '#7D4534', '#832E26']
const redIsh = ['#9A2E36', '#A23634', '#B23E2E', '#BF503C']
const yellowWhite = ['#FECE39', '#FDD885', '#FBE4AC', '#ECE9E4']

export const colorSchemes = {
  faceDown: blackAndWhite,
  ['The Fool']: yellowIsh,
  ['The Magician']: turquoiseIsh,
  ['The Papess']: orangeIsh,
  ['The Empress']: redIsh,
  ["The Emperor"]: yellowWhite,
  ["The Pope"]: yellowWhite,
  ["The Lovers"]: turquoiseIsh,
  ["The Chariot"]: turquoiseIsh,
  ["Strength"]: redIsh,
  ["The Hermit"]: yellowWhite,
  ["The Wheel"]: turquoiseIsh,
  ["Justice"]: redIsh,
  ["The Hanged Man"]: redIsh,
  ["Death"]: turquoiseIsh,
  ["Temperance"]: turquoiseIsh,
  ["The Devil"]: redIsh,
  ["The Tower"]: yellowIsh,
  ["The Star"]: yellowWhite,
  ["The Moon"]: yellowWhite,
  ["The Sun"]: yellowWhite,
  ["Judgement"]: redIsh,
  ["The World"]: turquoiseIsh,
  "wands": redIsh,
  "cups": yellowWhite,
  "swords": turquoiseIsh,
  "coins": orangeIsh,
}

const colors = mapValues(colorSchemes, colorSet => colorSet)

export const getColorScheme = (({ name, rank, suit }) => {
  if (suit === 'major')
    return colors[name]
  return colors[suit]
})

const BackgroundColors = ({ colorA, colorB }) => (
  <g clipPath='url(#round-corners)'>
    <rect width={cardWidth} height={cardHeight/2} fill={colorA}  />
    <rect width={cardWidth} y={cardHeight/2} height={cardHeight/2} fill={colorB} />
  </g>
)

const lineHeight = 14
const lineOffsetY = 5
const MajorContents = ({ name }) => {
  const colorScheme = getColorScheme({name, suit: 'major'})
  const parts = name.split(' ')
  const commonProps = {
    fontFamily:"Verdana",
    fontWeight:"bold",
    fontSize:'14px',
    textAnchor:'middle'
  }

  return (
    <g>
      <BackgroundColors colorA={colorScheme[0]} colorB={colorScheme[1]} />
      {parts.length === 1 && (
        <text {...commonProps} fill={colorScheme[3]} x={cardWidth/2} y={cardHeight/2 + lineOffsetY} >{parts[0]}</text>
      )}
      {parts.length === 2 && (
        <g>
          <text key='0' {...commonProps} fill={colorScheme[3]} x={cardWidth/2} y={cardHeight/4 + lineOffsetY} textAnchor='middle'>{parts[0]}</text>
          <text key='1' {...commonProps} fill={colorScheme[3]} x={cardWidth/2} y={cardHeight*3/4 + lineOffsetY} textAnchor='middle'>{parts[1]}</text>
        </g>
      )}
      {parts.length === 3 && (
        <g>
          <text key='0' {...commonProps} fill={colorScheme[3]} x={cardWidth/2} y={cardHeight/4 + lineOffsetY} textAnchor='middle'>{parts[0]}</text>
          <text key='1' {...commonProps} fill={colorScheme[3]} x={cardWidth/2} y={cardHeight/2 + lineOffsetY} >{parts[1]}</text>
          <text key='2' {...commonProps} fill={colorScheme[3]} x={cardWidth/2} y={cardHeight*3/4 + lineOffsetY} textAnchor='middle'>{parts[2]}</text>
        </g>
      )}
    </g>
  )
}

const Icon = ({ x, y, scale, suit }) => {
  const fill = getColorScheme({ suit })[3]
  const props = { x, y, scale, fill }

  switch(suit) {
    case 'cups':
      return <Cup {...props} />
    case 'swords':
      return <Sword {...props} />
    case 'coins':
      return <Coin {...props} />
    case 'wands':
      return <Wand {...props} />
    default:
      return null
  }

}

const iconW= 16.25


const halfW = cardWidth/2
const halfH = cardHeight/2

const iconGeometry = (rank, iconAspect) => {
  const iconH = iconW / iconAspect
  const halfIconW = iconW/2
  const halfIconH = iconH/2
  const centerIconX = halfW - halfIconW
  const centerIconY = halfH - halfIconH

  if (rank === 1)
    return [
      [centerIconX, centerIconY]
    ]
  if (rank === 2)
    return [
      [centerIconX, centerIconY],
      [centerIconX, centerIconY - halfH/2]
    ]
  if (rank === 3)
    return [
      [centerIconX + halfW/2, centerIconY + halfH/2],
      [centerIconX - halfW/2, centerIconY - halfH/2],
      [centerIconX, centerIconY]
    ]
  if (rank === 4)
    return [
      [centerIconX - halfW/2, centerIconY + halfH/2],
      [centerIconX - halfW/2, centerIconY - halfH/2],
      [centerIconX + halfW/2, centerIconY + halfH/2],
      [centerIconX + halfW/2, centerIconY - halfH/2]
    ]
  if (rank === 5 || rank === 9)
    return concat(
      range(5).map(i => (
        [5 + i * (cardWidth-10)/5, iconH/2 + i * (cardHeight-iconH)/5]
      )),
      rank === 9 ? range(5).map(i => (
        [5 + (4-i) * (cardWidth-10)/5, 5 + i * (cardHeight-10)/5]
      )) : []
    )
  if (rank >=6 && rank <= 8)
    return concat(
      flatten([-halfH/2, halfH/2].map((yOffset, j) => (
        range(3).map(i => [(i+1)*cardWidth/4-halfIconW, centerIconY + yOffset])
      ))),
      rank === 7 ? [[centerIconX, centerIconY]] : [],
      rank === 8 ? [
        [centerIconX - halfW/2, centerIconY],
        [centerIconX + halfW/2, centerIconY],
      ] : []
    )

  const rightXOffset = iconW*1.4
  const leftXOffset = - 2 *iconW
  const largeCenterX = halfW-iconW
  if (rank === 'page')
    return [[largeCenterX, halfH - iconH, 2]]
  if (rank === 'knight')
    return [
      [largeCenterX, halfH - iconH*2.5, 2],
      [largeCenterX, halfH + iconH*.6, 2]
    ]
  if (rank === 'queen')
    return [
      [largeCenterX + rightXOffset, halfH - iconH*2.5, 2],
      [largeCenterX, halfH - iconH, 2],
      [largeCenterX - rightXOffset, halfH + iconH*.6, 2]
    ]
  if (rank === 'king')
    return [
      [largeCenterX - rightXOffset, halfH - iconH*2.5, 2],
      [largeCenterX - rightXOffset, halfH + iconH*.6, 2],
      [largeCenterX + rightXOffset, halfH + iconH*.6, 2],
      [largeCenterX + rightXOffset, halfH - iconH*2.5, 2]
    ]

  return []
}

const Icons = ({ geometry, suit }) => (
  <g>
    {geometry.map(([x, y, scale=1], i) => <Icon key={i} x={x} y={y} scale={scale} suit={suit}/>)}
  </g>
)

const NonMajorContents = ({ rank, suit }) => {
  const colorScheme = getColorScheme({rank, suit})

  return (
    <g>
      <BackgroundColors colorA={colorScheme[0]} colorB={colorScheme[1]} />
      <Icons suit={suit} geometry={iconGeometry(rank, iconAspects[suit])} />
    </g>
  )
}

const FaceDownContents = () => {
  const colorScheme = colors.faceDown
  return (
    <g>
      <BackgroundColors colorA={colorScheme[0]} colorB={colorScheme[1]} />
      <circle cx={cardWidth/2} cy={cardHeight/4} r='10' fill={colorScheme[2]} />
      <circle cx={cardWidth/2} cy={cardHeight*3/4} r='10' fill={colors.faceDown[2]} />
    </g>
  )
}


const CardContents = ({tarot: { suit, name, rank }, revealed}) => {
  if (!revealed)
    return <FaceDownContents />

  if (suit === 'major')
    return <MajorContents name={name} />

  return <NonMajorContents rank={rank} suit={suit} />
}

export default CardContents
