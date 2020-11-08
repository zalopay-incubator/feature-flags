import React, { Component } from 'react'
import FeatureFlagContext from './FeatureFlagContext'
import { getFeatures } from '../utils'

class FeatureFlagProvider extends Component {
  constructor() {
    super()
    this.state = { features: {} }
  }

  async componentDidMount() {
    const features = await getFeatures()
    this.setState({ features })
  }

  render() {
    return (
      <FeatureFlagContext.Provider value={this.state.features}>
        {this.props.children}
      </FeatureFlagContext.Provider>
    )
  }
}

export default FeatureFlagProvider