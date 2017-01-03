import React, { Component, cloneElement } from 'react'
import { render } from 'react-dom'
import {
  Homepage,
} from 'component/container'
import {
  Playground,
  ComponentNotFound,
} from 'component/public'

import 'static/less/app'

class App extends Component {
  render() {
    const { children } = this.props
    return (
      <div className={`rt-app-container`}>
        App
      </div>
    )
  }
}

render(
  <App />,
  document.getElementById('app')
)