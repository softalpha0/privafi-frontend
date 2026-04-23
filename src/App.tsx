import { useState } from "react";
import Landing from "./components/Landing";
import CreditScore from "./components/CreditScore";
import Payroll from "./components/Payroll";
import Portfolio from "./components/Portfolio";
import { connectWallet } from "./contracts/wallet";
import "./App.css";

function App() {
  const [page, setPage] = useState<"landing" | "app">("landing");
  const [tab, setTab] = useState<"credit" | "payroll" | "portfolio">("credit");
  const [address, setAddress] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);

  const handleConnect = async () => {
    setConnecting(true);
    try {
      const { address } = await connectWallet();
      setAddress(address);
    } catch (e: any) {
      alert(e.message);
    }
    setConnecting(false);
  };

  if (page === "landing") {
    return <Landing onEnter={() => setPage("app")} />;
  }

  return (
    <div className="app">
      <header>
        <div className="header-top">
          <div className="header-left">
            <button className="back-btn" onClick={() => setPage("landing")}>Back</button>
            <span className="logo" onClick={() => setPage("landing")}>PrivaFi</span>
            <span className="logo-sub">Confidential DeFi</span>
          </div>
          <div>
            {address ? (
              <div className="wallet-connected">
                {address.slice(0, 6)}...{address.slice(-4)}
              </div>
            ) : (
              <button className="connect-btn" onClick={handleConnect} disabled={connecting}>
                {connecting ? "Connecting..." : "Connect Wallet"}
              </button>
            )}
          </div>
        </div>
      </header>

      {!address ? (
        <div className="connect-prompt">
          <p>Connect your MetaMask wallet on Sepolia to use PrivaFi</p>
          <button className="connect-btn" onClick={handleConnect} disabled={connecting}>
            {connecting ? "Connecting..." : "Connect Wallet"}
          </button>
        </div>
      ) : (
        <>
          <nav>
            <button className={tab === "credit" ? "active" : ""} onClick={() => setTab("credit")}>Credit Score</button>
            <button className={tab === "payroll" ? "active" : ""} onClick={() => setTab("payroll")}>Payroll</button>
            <button className={tab === "portfolio" ? "active" : ""} onClick={() => setTab("portfolio")}>Portfolio</button>
          </nav>
          <main>
            {tab === "credit" && <CreditScore address={address} />}
            {tab === "payroll" && <Payroll address={address} />}
            {tab === "portfolio" && <Portfolio address={address} />}
          </main>
        </>
      )}
    </div>
  );
}

export default App;
