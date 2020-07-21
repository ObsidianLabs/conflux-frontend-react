import React, { PureComponent } from 'react'
import logo from './logo.png'

export default class ConfluxNetwork extends PureComponent {
  render() {
    return (
      <div className="card pt-3">
        <img src={logo} className="card-img-top w-75 m-auto" alt="Conflux" />
        <div className="card-body">
          <h5 className="card-title">Conflux Frontend</h5>
          <p className="card-text">This is a demo frontend project for Conflux.</p>
          <p className="card-text">Node URL: <code>{process.env.REACT_APP_CONFLUX_NODE_RPC}</code></p>
        </div>
      </div>
    )
  }
}
