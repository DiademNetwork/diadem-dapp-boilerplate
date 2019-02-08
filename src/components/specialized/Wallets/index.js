import React from 'react'
import * as U from 'utils'
import Wallet from './Wallet'
import blockchains from 'configurables/blockchains'

const Wallets = () => U.mapObj(blockchain => <Wallet key={blockchain.name} blockchain={blockchain} />)(blockchains.all)

export default Wallets
