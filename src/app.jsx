import React, { Component, cloneElement } from 'react'
import { render } from 'react-dom'
import {
  Router,
  Route,
  hashHistory,
  IndexRoute,
} from 'react-router'

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
        {cloneElement(children)}
      </div>
    )
  }
}

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Homepage} />
    <Route path="/playground" component={Playground} />
    <Route path="*" component={ComponentNotFound} />
  </Route>
)

render(
  <Router history={hashHistory} routes={routes} />,
  document.getElementById('app')
)