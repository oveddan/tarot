import React, { Component } from 'react'
import { colorSchemes, getColorScheme } from './cardContents'

const height = 700

const Background = ({currentTarot, yCenter}) => {
  const scheme = !currentTarot ? colorSchemes.faceDown : getColorScheme({...currentTarot})
  return (
    <g >
      <rect key={0} width='800' height={height} fill={scheme[0]} />
      <rect key={1} width='800' y={yCenter} height={height} fill={scheme[1]} />
    </g>
  )
}

const animationTime = 500

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
