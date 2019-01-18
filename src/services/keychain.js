import EthereumTx from 'ethereumjs-tx'

export const createKeychain = (url) => {
  const ws = new WebSocket(url)

  const queue = []

  ws.onmessage = (response) => {
    try {
      const callback = queue.shift(JSON.parse(response.data))
      callback()
    } catch (e) {
      console.error(e)
    }
  }

  const rsv = (signature, chainId) => {
    const ret = {};

    if (signature) {
      ret.r = `0x${signature.slice(0, 64)}`;

      ret.s = `0x${signature.slice(64, 128)}`;

      const recovery = parseInt(signature.slice(128, 130), 16);
      let tmpV = recovery + 27;
      if (chainId > 0) {
        tmpV += chainId * 2 + 8;
      }
      let hexString = tmpV.toString(16);
      if (hexString.length % 2) {
        hexString = '0' + hexString;
      }
      ret.v = `0x${hexString}`;
    } else {
      ret.r = '0x00';
      ret.s = '0x00';
      ret.v = chainId;
    }

    return ret;
  }

  const command = (request, callback) => {
    ws.send(JSON.stringify(request))

    queue.push(callback)
  }

  const method = (request) => {
    return new Promise(resolve => {
      command(request, resolve)
    })
  }

  const getResult = (rsv, tx) => {
    const txParams = { ...tx, ...rsv }

    const rawTransaction = new EthereumTx(txParams)

    const buffer = rawTransaction.serialize()

    const messageHash = rawTransaction.hash().toString('hex')

    return {
      rawTransaction, messageHash
    }
  }

  const signMessageHash = async (hash, keyname) => {
    const { result: signature } = await method({ command: 'sign_hash', params: { hash, keyname } })

    const { v, r, s } = rsv(signature, 0)

    return {
      message, messageHash, signature, v, r, s
    }
  }

  const signTransaction = (tx, keyname, blockchain = "ethereum") => {
    const rsvEmpty = rsv('', tx.chainId)

    const { rawTransaction, messageHash } = getResult(rsvEmpty, tx)

    const params = {
      keyname,
      transaction: rawTransaction,
      blockchain_type: blockchain
    }

    const { result: signature } = await method({ command: 'sign_hex', params })

    const rsv = rsv(signature, tx.chainId)

    const { rawTransaction } = getResult(rsv, tx)

    return {
      ...rsv,
      rawTransaction,
      messageHash
    }
  }

  return Object.freeze({
    signMessageHash,
    signTransaction
  })
}

export default createKeychain(process.env.KEYCHAIN_URL)