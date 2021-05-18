import Header from "./components/Header"
import Footer from "./components/Footer"
import Ether from "./components/Ether"
//import AEther from "./components/AEthers"
import Connect from "./components/Connect"

function App() {
  return (
    <>
      <Header />
      <div className="App container">
        <div className="row">
          <div className="col-6 text-danger">
            {/*<AEther />*/}
            <h1>TEST CONNECT</h1>
            <Connect />
          </div>
          <div className="col-6">
            <h1>TEST CONTRACT</h1>
            <Ether />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
