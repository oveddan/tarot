import React, { Component } from 'react'
import { colorSchemes, getColorScheme } from './cardContents'
import { sample } from 'lodash'

const width = 800
const height = 700

const commonProps = {
  fontFamily:"Verdana",
  fontWeight:"bold",
  fontSize:'14px',
  textAnchor:'left'
}


const Background = ({currentTarot, yCenter, rotate}) => {
  const scheme = !currentTarot ? colorSchemes.faceDown : getColorScheme({...currentTarot})
  return (
    <g>
      <rect key={0} width='800' height={height} fill={scheme[0]} />
      <rect key={1} width='800' y={yCenter} height={height} fill={scheme[1]} />
      {currentTarot && (
        <g>
          <text {...commonProps} fill='white' x={(width-105)/2} textAnchor='middle' y={50}>{currentTarot.fortune_telling}</text>
          <text {...commonProps} fontSize="20px" textAnchor='middle' fill='white' x={(width-105)/2} y={height-20}>{currentTarot.keyword}</text>
          <text {...commonProps} fontSize="20px" textAnchor='middle' fill='white' x={(width-105)/2} y={20 + 10}>{currentTarot.keyword}</text>
          <text {...commonProps} fill='white' x="10" y={yCenter - 30+7}>{currentTarot.lightMeaning}</text>
          <text {...commonProps} fill='white' x="10" y={yCenter + 30}>{currentTarot.shadowMeaning}</text>
        </g>
      )}
    </g>
  )
}

const animationTime = 300

class BackgroundContainer extends Component {
  state = {
    oldYCenter: null
  }

  componentDidMount() {
    this.animate()
  }

  getYCenter(){
    const { oldYCenter } = this.state
    if (!oldYCenter) return this.props.yCenter

    const elapsed = Math.min(new Date().getTime() - this.state.changeTime, animationTime)

    const percentage = elapsed / animationTime

    return oldYCenter + ((this.props.yCenter - oldYCenter) * percentage)
  }

  animate() {
    this.setState({ currentYCenter: this.getYCenter() })

    window.requestAnimationFrame(() => this.animate())
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.yCenter !== this.props.yCenter)
      this.setState({oldYCenter : this.props.yCenter, changeTime: new Date().getTime()})
  }


  render() {
    return <Background {...this.props} yCenter={this.state.currentYCenter} />
  }
}

export default BackgroundContainer
