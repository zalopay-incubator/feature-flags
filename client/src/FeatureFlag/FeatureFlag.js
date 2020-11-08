import React from 'react'
import FeatureFlagContext from './FeatureFlagContext'

export const showFeature = (features, name) => {
  if (features[name] && features[name].isEnabled) {
    return true
  }
  return false
}

const FeatureFlag = ({ name, children, defaultChildren }) => (
  <FeatureFlagContext.Consumer>
    {features => {
      if (features[name] && features[name].isEnabled) {
        return children
      }
      return defaultChildren
    }}
  </FeatureFlagContext.Consumer>
)

FeatureFlag.defaultProps = {
  defaultChildren: null
}
export default FeatureFlag
