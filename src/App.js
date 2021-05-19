import Header from "./components/Header"
import Footer from "./components/Footer"
import Ether from "./components/Ether"
//import AEther from "./components/AEthers"
import Connect from "./components/Connect"
import { useState } from 'react'

function App() {
  const [account, setAccount] = useState('0x0')

  return (
    <>
      <Header />
      <div className="App container">
        <div className="row">
          <div className="col-6 text-danger">
            {/*<AEther />*/}
            <h1>TEST CONNECT</h1>
            <Connect account={account} setAccount={setAccount} />
          </div>
          <div className="col-6">
            <h1>TEST CONTRACT (on rinkeby)</h1>
            <Ether account={account} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
