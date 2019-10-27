import React, { Component } from 'react'

import {Store } from 'orsys-reactive-store'

const s  = Store({
  name: 'hamza'
});



export default class App extends Component {
  render () {
    return (
      <div>
        <ExampleComponent text='Modern React component module' />
      </div>
    )
  }
}
