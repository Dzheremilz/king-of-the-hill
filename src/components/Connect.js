import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

const Connect = () => {
  const [isConnect, setIsConnect] = useState(JSON.parse(localStorage.getItem('isConnect')) || false)
  const [account, setAccount] = useState('0x0')
  const [network, setNetwork] = useState(null)
  const [balance, setBalance] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    localStorage.setItem("isConnect", JSON.stringify(isConnect))
  }, [isConnect])

  useEffect(() => {
    if (isConnect) {
      ; (async () => {
        try {
          const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
          })
          const account = accounts[0] // tableau de 1 element
          setAccount(account)
        } catch (e) {
          alert(e.message)
        }
      })()
    }
  }, [isConnect])

  useEffect(() => {
    if (account !== '0x0') {
      setLoading(true)
        ; (async () => {
          try {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const network = await provider.getNetwork()
            const _balance = await provider.getBalance(account)
            const balance = ethers.utils.formatEther(_balance)
            setNetwork(network)
            setBalance(balance)
            setLoading(false)
          } catch (e) {
            alert(e.message)
            setLoading(false)
          }
        })()
    }
  }, [account])

  useEffect(() => {
    window.ethereum.on('accountsChanged', (accounts) => {
      setAccount(accounts[0]);
    });
    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    });
  }, [account, network])

  const handleButtonClick = () => {
    setIsConnect(isConnect => !isConnect)
  }

  return (
    <>
      { isConnect ? (<button type="button" className="btn btn-danger my-3" onClick={handleButtonClick} > Disconnect</button >) : (<button type="button" className="btn btn-primary my-3" onClick={handleButtonClick} >Connect to your wallet</button >)}
      {network !== null && isConnect && (
        <>
          <p>Account: {account}</p>
          <p>Network name: {network.name}</p>
          <p>Network id: {network.chainId}</p>
          <p>Balance: {balance} ETH</p>
        </>
      )}
      {loading && <p>loading...</p>}
    </>
  )
}

export default Connect