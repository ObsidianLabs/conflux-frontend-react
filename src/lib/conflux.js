// 使用js conflux SDK
import { Conflux } from 'js-conflux-sdk'

import abiCoin from './abi/Coin.json'
import abiSponsorWhitelistControl from './abi/SponsorWhitelistControl.json'

// 根据PRC环境变量创建了一个SDK实例
const conflux = new Conflux({
  url: process.env.REACT_APP_CONFLUX_NODE_RPC,
  defaultGasPrice: 100, // The default gas price of your following transactions
  defaultGas: 1000000, // The default gas of your following transactions
  logger: console,
  networkId: 1
})

// 根据SDK实例去创建对应的合约的实例
//  这样视图中才可以把合约的相关信息展示出来并且构造相关的合约交易
export const ContractCoin = {
  name: 'Coin',
  abi: abiCoin,
  contract: conflux.Contract({
    abi: abiCoin,
    address: process.env.REACT_APP_CONFLUX_COIN_ADDRESS,
  }),
}

export const ContractSponsorWhitelistControl = {
  name: 'SponsorWhitelistControl',
  abi: abiSponsorWhitelistControl,
  contract: conflux.Contract({
    abi: abiSponsorWhitelistControl,
    address: '0x0888000000000000000000000000000000000001',
  }),
}

export default conflux