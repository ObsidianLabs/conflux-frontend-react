// 用于和Conflux Portal进行交互的一个代码 
class ConfluxPortal {
  // constructor会在创建Conflux Portal的实例时候检查浏览器环境是否有Conflux Portal
  constructor (conflux) {
    if (typeof conflux === 'undefined') {
      throw new Error('No Conflux detected')
    }
    if (!conflux.isConfluxPortal) {
      console.debug('Unknown Conflux.')
    }
    this.conflux = conflux
  }
  // enable方法是点击前端conect to Conflux Portal按钮时调用的方法
  // 它会去调用Conflux Portal的一个enable方法 得到用户授权 
  async enable () {
    this.accounts = await this.conflux.enable()
  }

  getAccount () {
    if (!this.accounts) {
      throw new Error('Please enable Conflux Portal first')
    }
    return this.accounts[0]
  }

  // 当用户构造一个交易时 比如说普通的转账交易或者合约交易的时候
  // 会通过sendTransaction方法将交易推给Conflux Portal 由Conflux Portal进行交易签名的确认签名和推送
  async sendTransaction (params) {
    return new Promise((resolve, reject) => {
      this.conflux.sendAsync({
        method: 'cfx_sendTransaction',
        params: [params],
        from: params.from,
        gasPrice: '0x09184e72a000', // customizable by user during ConfluxPortal confirmation.
        gas: '0x2710',  // customizable by user during ConfluxPortal confirmation.
        value: '0x00',
      }, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }
}

export default new ConfluxPortal(window.conflux)
