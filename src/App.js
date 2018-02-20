import React, { Component } from 'react';
import { range, sampleSize } from 'lodash'
import logo from './logo.svg';
import './App.css';
import tarotInterpretations from './tarotInterpretations'
import CardContents, { cardWidth, cardHeight } from './cardContents'
import Background from './background'

const getCenterX = x => x - cardWidth/2
const getCenterY = y => y - cardHeight/2

class Card extends Component {
  state = {
    lastLocation: {x: 0, y: 0},
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.x !== this.props.x || nextProps.y !== this.props.y) {
      this.setState({
        lastLocation: {
          x: this.props.x,
          y: this.props.y
        }
      })
    }
  }

  render () {
    const { x, y, rotation = 0, tarot, revealed } = this.props
    const { lastLocation } = this.state
    const centerX = getCenterX(x)
    const centerY = getCenterY(y)

    return (
      <g transform={`translate(${centerX}, ${centerY})`}>
        <g transform={rotation !== 0 ? `rotate(${rotation} ${cardWidth/2} ${cardHeight/2})` : ''}>
          <CardContents tarot={tarot} revealed={revealed} />
        </g>
      </g>
    )
  }
}

const width = 800
const height = 700

const cardYOffset = cardHeight + 10
const cardXOffset = 140

const cardZeroCenterX = width/2 - 50
const cardZeroCenterY = height/2

const startRightColumnX = width - cardWidth/2 - 10
const startRightColumnY = height - cardHeight/2 - 10

export const xyAndRotationOfCard = (cardIndex, revealedCount) => {
  switch(cardIndex) {
    case 0:
      return {
        x: cardZeroCenterX,
        y: cardZeroCenterY,
      }
    case 1:
      const yOffsetToShowFirst = revealedCount === 1 ? cardHeight*3/4 : 0
      return {
        x: cardZeroCenterX,
        y: cardZeroCenterY + yOffsetToShowFirst,
        rotation: 90
      }
    case 2:
      return {
        x: cardZeroCenterX,
        y: cardZeroCenterY + cardYOffset
      }
    case 3:
      return {
        x: cardZeroCenterX - cardXOffset,
        y: cardZeroCenterY
      }
    case 4:
      return {
        x: cardZeroCenterX,
        y: cardZeroCenterY - cardYOffset
      }
    case 5:
      return {
        x: cardZeroCenterX + cardXOffset,
        y: cardZeroCenterY
      }
    case 6:
      return {
        x: startRightColumnX,
        y: startRightColumnY
      }
    case 7:
      return {
        x: startRightColumnX,
        y: startRightColumnY - cardYOffset
      }
    case 8:
      return {
        x: startRightColumnX,
        y: startRightColumnY - 2*cardYOffset
      }
    case 9:
      return {
        x: startRightColumnX,
        y: startRightColumnY - 3*cardYOffset
      }
    default:
      break
  }
}

const yCenter = revealedCount => {
  if (revealedCount === 0) return height
  return xyAndRotationOfCard(revealedCount - 1).y
}

const App = ({tarotIds, revealedCount}) => (
  <svg version="1.1" baseProfile="full" width={width} height={height} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <clipPath id="round-corners">
        <rect x="0" y="0" width={cardWidth} height={cardHeight} rx="5" ry="5" />
      </clipPath>
    </defs>

    <Background yCenter={yCenter(revealedCount)} currentTarot={revealedCount===0 ? null : tarotInterpretations[tarotIds[revealedCount-1]]} />
    {tarotIds.map((tarotId, i) => (
      <Card key={i} {...xyAndRotationOfCard(i, revealedCount)} tarot={tarotInterpretations[tarotId]} revealed={revealedCount > i} />
    ))}
  </svg>
)

class AppContainer extends Component {
  state = {
    tarotIds: sampleSize(range(tarotInterpretations.length), 10),
    revealedCount: 0
  }

  componentDidMount() {
    document.addEventListener('keypress', e => {
      if (e.key === ' ') {
        e.preventDefault()
        this.revealNextCard()
      }
    })
  }

  revealNextCard(){
    this.setState({
      revealedCount: Math.min(10, this.state.revealedCount + 1)
    })
  }

  render() {
    return <App {...this.state} />
  }
}

export default AppContainer
