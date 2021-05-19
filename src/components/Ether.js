import { ethers } from 'ethers'
import KingOfTheHill from '../KingOfTheHill.json';

const contractAddress = "0x756d9B42A54F6a18254C439B86651C6071377FDc"

const Ether = ({ account }) => {

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

  async function sendPotOffering() {
    if (JSON.parse(localStorage.getItem('isConnect')) === true) {
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
    } else {
      alert('You need to connect a wallet to send ether')
    }
  }

  return (
    <div className="App">
      <header className="App-header">
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