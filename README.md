# Conflux 前端
[注意：New Feature分支变更如下：
1.因conflux CIP37地址的增加， Master 分支的Js-Conflux-SDK版本老旧 出现Conflux Portal账户获取后报错 依赖源改为https://github.com/Conflux-Chain/js-conflux-sdk.git
2.新的js-conflux-sdk已经不包含util类 将drip转换成cfx部分需要用到Drip类]

完整 Conflux 教程可前往 [Conflux DApp 开发教程](https://github.com/ObsidianLabs/conflux-dapp-tutorial)

## 前端项目

### 预备

#### 下载项目并安装依赖

- 下载前端项目：`git clone https://github.com/ObsidianLabs/conflux-frontend-react`
- 使用 `npm install` 或者 `yarn` 进行项目依赖安装

#### Conflux Portal 的安装及配置

Conflux Portal 是由 Conflux 提供的浏览器插件，目前提供了 Chrome 及 Firefox 的支持，用户可以使用 Conflux Portal 进行私钥的管理以及交易签名。

前往 [Conflux Portal GitHub](https://github.com/Conflux-Chain/conflux-portal/releases/latest) 下载安装。项目的源代码在 [GitHub](https://github.com/Conflux-Chain/conflux-portal ) 中可以找到。

在这里需要将 Conflux Studio 中生成的地址导入到 Conflux Portal 中。完成插件安装后，在 Conflux Portal 的页面中选择 *Import*，将 Conflux Studio 中的私钥（在[创建钱包](#创建钱包)章节中介绍了如何将私钥导出）粘贴到输入框中，点击 *Import* 按钮完成私钥导入。

<p align="center">
  <img src="./screenshots/conflux_portal.png" width="400px">
</p>

### 运行前端项目

在运行项目之前，需要修改一些默认的环境变量。

在[前面的教程](#编译及部署合约)中部署合约后会生成一个 `contractCreated`，这个值便是部署在网络中智能合约的地址。打开项目根目录并找到 `.env` 文件，这个文件提供了项目的[环境变量](#前端项目解析)，将 `REACT_APP_CONFLUX_COIN_ADDRESS` 的值修改为 `contractCreated` 中的值。

使用 `yarn start` 启动前端项目，开发服务器运行起来后会在浏览器中打开前端页面（如果没有打开，请在浏览器中访问 http://localhost:3000）。

项目运行起来后，页面将显示四个卡片信息，分别为
- 左上角 Conflux 网络信息模块
- 右上角 Conflux Portal 模块
- 左下角 Coin 合约模块
- 右下角 SponsorWhitelistControl 合约模块

<p align="center">
  <img src="./screenshots/frontend.png" width="800px">
</p>

#### 连接 Conflux Portal

点击右上角组件中的 *Connect to Conflux Portal* 按钮，Conflux Portal 页面将被打开，输入密码和选择账户后完成连接。连接成功后，将会在按钮下看到当前连接的账户地址以及账户中的余额。

<p align="center">
  <img src="./screenshots/frontend_portal.png" width="600px">
</p>

#### 运行 Coin 合约代币增发和代币转账操作

左下角的组件为 Coin 合约组件，可以通过这个组件调用代币增发和代币转账功能。

- 代币增发：选择 *mint* 方法并填入增发地址（*receiver*）和增发的数量（*amount*），点击 *Push Transaction*，在弹出的 *ConfluxPortal Notification* 窗口中点击 *Confirm* 按钮来确认交易。

- 代币转账：选择 *send* 方法并填入收款人地址（*receiver*）和转账的数量（*amount*），点击 *Push Transaction*，在弹出的 *ConfluxPortal Notification* 窗口中点击 *Confirm* 按钮来确认交易。

<p align="center">
  <img src="./screenshots/frontend_mint.png" width="600px">
</p>

#### 查看 Coin 合约中的余额

选择 *balanceOf* 方法并在 *tokenOwner* 输入框中填入查询的地址，点击 *Query Data* 按钮可以查询到账户的余额。 

<p align="center">
  <img src="./screenshots/frontend_balanceof.png" width="600px">
</p>

#### 查看 Sent 事件

选择 *Sent* 事件并点击 *Query Data* 可以查询到转账操作所触发的转账事件的记录。

<p align="center">
  <img src="./screenshots/frontend_sent.png" width="600px">
</p>

### 前端项目解析

项目使用 [React](https://reactjs.org) 进行开发。主要由三大部分组成：视图组件、js-conflux-sdk 以及 Conflux Portal。

项目根目录下的 `.env` 环境变量，在这里定义了两个环境变量，分别为
- `REACT_APP_CONFLUX_NODE_RPC`：Conflux 的网络节点地址，目前默认为 Oceanus 网络的地址
- `REACT_APP_CONFLUX_COIN_ADDRESS`：已部署的 Coin 智能合约地址

#### 视图组件

视图组件在项目的 `src/components` 中，其中 `App.js` 为页面的主入口，负责页面的排列及合约信息的读取。

<p align="center">
  <img src="./screenshots/frontend_components.png" width="400px">
</p>

##### ConfluxNetwork.js

负责渲染 Conflux 网络信息，`Node URL` 的值为 `.env` 环境变量文件下的 `REACT_APP_CONFLUX_NODE_RPC` 设置的值（默认为 Oceanus 网络）。

##### ConfluxPortal.js

负责渲染 Conflux Portal 的连接信息，并提供了连接 Conflux Portal 的交互按钮。

- `connectConfluxPortal` 调用 Conflux Portal 的 `enable` 方法启用 conflux （conflux portal 实例由浏览器插件注入到 windows.portal 中），完成 `enable` 后调用 `getAccount` 方法获取到 Portal 中的账户。
- `refreshBalance` 调用 Conflux SDK 的 `getBalance` 方法来更新账户余额信息
- `renderPortalButton` 根据当前不同的状态，渲染连接 Portal 的按钮

##### ConfluxContract.js

负责渲染 Conflux 合约信息，本项目中提供了 Coin 和 SponsorWhitelistControl 两个合约。

`ConfluxContract.js` 由三个组件组成，分别为

- `ConfluxContract` 负责根据传入的合约 abi 来渲染合约的信息，包括合约地址、合约方法和事件，合约提交的交互逻辑及显示执行后的结果
- `ContractMethods` 负责渲染合约 abi 中的方法和事件的表单及相对应的按钮
- `ConfluxForm` 负责根据方法或事件的 abi 来渲染输入表单

#### lib

lib 在项目的 `src/lib` 中，这里的文件主要是为视图提供包括连接网络、构造交易、获取账户、读取合约等服务。

<p align="center">
  <img src="./screenshots/frontend_lib.png" width="400px">
</p>

##### conflux.js

`conflux.js` 是 `js-conflux-sdk` 的封装。[`js-conflux-sdk`](https://github.com/Conflux-Chain/js-conflux-sdk) 是由 Conflux 提供的 JavaScript SDK，本前端项目使用 SDK 来连接 Conflux 网络，和合约进行交互以及构造合约中的实例。

##### conflux-portal.js

`conflux-portal.js` 是 Conflux Portal 的封装，本前端项目通过调用浏览器插件来完成交易的签名。调用 Conflux Portal 提供的 `enable` 方法可以启动项目和 Conflux Portal 的连接（需要提前检查浏览器是否正确安装插件，在 constructor 中通过检查 `window.conflux` 是否为空来判断）。`conflux-portal.js` 提供了获取账户 `getAccount` 和发送交易 `sendTransaction` 两个主要的方法。

##### abi

`lib/abi` 文件夹下提供了两个 json 文件，分别为 `Coin.json` 和 `SponsorWhitelistControl.json`，这两个文件是构造合约所需要使用的 abi 文件。
