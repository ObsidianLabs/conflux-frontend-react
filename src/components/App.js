import React from 'react'

import { ContractCoin, ContractSponsorWhitelistControl } from '../lib/conflux'

import ConfluxNetwork from './ConfluxNetwork'
import ConfluxPortal from './ConfluxPortal'
import ConfluxContract from './ConfluxContract'

export default function App () {
  return (
    <div className="container-fluid p-3">
      <div className="row">
        <div className="col-md-6 mb-3">
          <ConfluxNetwork />
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
