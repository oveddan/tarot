import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import tarotInterpretations from './tarotInterpretations'
import CardContents, { cardWidth, cardHeight } from './cardContents'

const getCenterX = x => x - cardWidth/2
const getCenterY = y => y - cardHeight/2

class Card extends Component {
  state = {
    lastLocations: [{x: 0, y: 0}],
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.x !== this.props.x || nextProps.y !== this.props.y) {
      this.setState({
        lastLocations: [
          ...this.state.lastLocations,
          {
            x: nextProps.x,
            y: nextProps.y,
          }
        ]
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
        {this.state.animate && (
          <animateTransform key={lastLocation.index} attributeName='transform'
            attributeType='XML'
            type='translate'
            from={`${getCenterX(lastLocation.x)} ${getCenterY(lastLocation.y)}`}
            to={`${centerX}, ${centerY}`}
            dur='1s'
            begin='0s'
          />
        )}
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

const xyAndRotationOfCard = (cardIndex, revealedCount) => {
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

const App = ({tarots, revealedCount}) => (
  <svg version="1.1" baseProfile="full" width={width} height={height} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <clipPath id="round-corners">
        <rect x="0" y="0" width={cardWidth} height={cardHeight} rx="5" ry="5" />
      </clipPath>
    </defs>

    <rect width='800' height='800' fill='#E2DED4' />
    {tarots.map((tarot, i) => (
      <Card key={i} {...xyAndRotationOfCard(i, revealedCount)} tarot={tarot} revealed={revealedCount > i} />
    ))}
  </svg>
)

class AppContainer extends Component {
  state = {
    tarots: [
      tarotInterpretations[0],
      tarotInterpretations[1],
      tarotInterpretations[2],
      tarotInterpretations[3],
      tarotInterpretations[4],
      tarotInterpretations[5],
      tarotInterpretations[6],
      tarotInterpretations[7],
      tarotInterpretations[8],
      tarotInterpretations[9]
    ],
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
      revealedCount: this.state.revealedCount + 1
    })
  }

  render() {
    return <App {...this.state} />
  }
}

export default AppContainer
