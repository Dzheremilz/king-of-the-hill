//import { useState } from 'react';
import { ethers } from 'ethers'
import KingOfTheHill from '../KingOfTheHill.json';


// Update with the contract address logged out to the CLI when it was deployed 
const contractAddress = "0x756d9B42A54F6a18254C439B86651C6071377FDc"

const Ether = ({ account }) => {
  // store greeting in local state
  //const [greeting, setGreetingValue] = useState()

  // request access to the user's MetaMask account

  /*
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' })
  }
  */


  // call the smart contract, read the current greeting value
  /*
  async function fetchGreeting() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(contractAddress, KingOfTheHill.abi, provider)
      try {
        const data = await contract.blockNumber()
        console.log('data: ', data)
      } catch (err) {
        console.log("Error: ", err)
      }
    }
  }
  */

  async function fetchPot() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(contractAddress, KingOfTheHill.abi, provider)
      try {
        const data = await contract.pot()
        console.log(parseInt(data._hex, 16))
      } catch (err) {
        console.log("Error: ", err)
      }
    }
  }

  async function fetchPot2() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(contractAddress, KingOfTheHill.abi, provider)
      try {
        const data = await contract.pot2()
        console.log(parseInt(data._hex, 16))
        return parseInt(data._hex, 16)
      } catch (err) {
        console.log("Error: ", err)
      }
    }
  }

  async function fetchPotOwner() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(contractAddress, KingOfTheHill.abi, provider)
      try {
        const data = await contract.potOwner()
        console.log(data)
      } catch (err) {
        console.log("Error: ", err)
      }
    }
  }

  async function fetchOwner() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(contractAddress, KingOfTheHill.abi, provider)
      try {
        const data = await contract.owner()
        console.log(data)
      } catch (err) {
        console.log("Error: ", err)
      }
    }
  }

  async function fetchBlockNumber() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(contractAddress, KingOfTheHill.abi, provider)
      try {
        const data = await contract.blockNumber()
        console.log(parseInt(data._hex, 16))
      } catch (err) {
        console.log("Error: ", err)
      }
    }
  }

  async function fetchBlockNumberToWin() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(contractAddress, KingOfTheHill.abi, provider)
      try {
        const data = await contract.blockNumberToWin()
        console.log(parseInt(data._hex, 16))
      } catch (err) {
        console.log("Error: ", err)
      }
    }
  }

  // call the smart contract, send an update
  /*
  async function setGreeting() {
    if (!greeting) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, KingOfTheHill.abi, signer)
      const transaction = await contract.potOffering(greeting)
      await transaction.wait()
      fetchGreeting()
    }
  }
  */

  async function sendPotOffering() {
    if (account !== '0x0') {
      const pot2 = await fetchPot2()
      const value = pot2.toString(16)
        ; (async () => {
          try {
            const transaction = await window.ethereum.request({
              method: 'eth_sendTransaction',
              params: [
                {
                  from: account,
                  to: contractAddress,
                  value: value,
                },
              ],
            })
            console.log(transaction)
          } catch (e) {
            alert(e.message)
          }
        })()
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        {/*<button onClick={fetchGreeting}>Fetch Greeting</button>
        <button onClick={setGreeting}>Set Greeting</button>
  <input onChange={e => setGreetingValue(e.target.value)} placeholder="Set greeting" />*/}
        <div>
          <button onClick={fetchPot}>Pot</button>
          <button onClick={fetchPot2}>Pot2</button>
          <button onClick={fetchPotOwner}>Pot Owner</button>
          <button onClick={fetchOwner}>Owner</button>
        </div>
        <div>
          <button onClick={fetchBlockNumber}>Block Number</button>
          <button onClick={fetchBlockNumberToWin}>Block Number to win</button>
        </div>
        <div>
          <button onClick={sendPotOffering}>Pot Offering</button>
        </div>
      </header>
    </div>
  );
}

export default Ether