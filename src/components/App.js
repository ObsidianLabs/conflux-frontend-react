import React from 'react'
import logo from './logo.png'

import { ContractCoin, ContractSponsorWhitelistControl } from '../lib/conflux'

import ConfluxPortal from './ConfluxPortal'
import ConfluxContract from './ConfluxContract'

export default function App () {
  return (
    <div className="container-fluid p-3">
      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="card pt-3">
            <img src={logo} className="card-img-top w-75 m-auto" alt="Conflux" />
            <div className="card-body">
              <h5 className="card-title">Conflux Frontend</h5>
              <p className="card-text">This is a demo frontend project for Conflux.</p>
              <p className="card-text">Node URL: <code>{process.env.REACT_APP_CONFLUX_NODE_RPC}</code></p>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <ConfluxPortal />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <ConfluxContract {...ContractCoin} />
        </div>

        <div className="col-md-6 mb-3">
          <ConfluxContract {...ContractSponsorWhitelistControl} />
        </div>
      </div>
    </div>
  )
}
