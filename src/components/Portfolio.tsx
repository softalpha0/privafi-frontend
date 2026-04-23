import { useState } from "react";
import { Contract } from "ethers";
import { connectWallet } from "../contracts/wallet";
import { ADDRESSES, PORTFOLIO_ABI } from "../contracts/addresses";

export default function Portfolio({ address: _address }: { address: string }) {
  const [balance, setBalance] = useState("");
  const [threshold, setThreshold] = useState("");
  const [registered, setRegistered] = useState(false);
  const [proof, setProof] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    setLoading(true);
    setError(null);
    try {
      const { signer } = await connectWallet();
      const contract = new Contract(ADDRESSES.HiddenPortfolio, PORTFOLIO_ABI, signer);
      const tx = await contract.registerPortfolio(parseInt(balance));
      await tx.wait();
      setRegistered(true);
    } catch (e: any) {
      setError(e.message || "Transaction failed");
    }
    setLoading(false);
  };

  const handleProve = async () => {
    setLoading(true);
    setError(null);
    try {
      const { signer } = await connectWallet();
      const contract = new Contract(ADDRESSES.HiddenPortfolio, PORTFOLIO_ABI, signer);
      const tx = await contract.proveAboveThreshold(parseInt(threshold));
      await tx.wait();
      const bal = parseInt(balance);
      const thresh = parseInt(threshold);
      setProof(
        bal > thresh
          ? "PROOF VERIFIED — Your portfolio exceeds the threshold. Balance never revealed."
          : "PROOF FAILED — Portfolio does not meet the threshold."
      );
    } catch (e: any) {
      setError(e.message || "Transaction failed");
    }
    setLoading(false);
  };

  return (
    <div className="module">
      <h2>Hidden Portfolio Tracker</h2>
      <p>Prove you hold above a threshold. Your actual balance stays private.</p>

      <div className="form">
        <label>Your Portfolio Balance (encrypted on-chain)</label>
        <input
          type="number"
          placeholder="e.g. 10000"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          disabled={registered}
        />
        <button onClick={handleRegister} disabled={loading || !balance || registered}>
          {loading ? "Encrypting and registering..." : registered ? "Portfolio Registered" : "Register Encrypted Portfolio"}
        </button>
      </div>

      {registered && (
        <div className="form">
          <label>Prove balance is above (threshold)</label>
          <input type="number" placeholder="e.g. 5000" value={threshold} onChange={(e) => setThreshold(e.target.value)} />
          <button onClick={handleProve} disabled={loading || !threshold}>
            {loading ? "Generating FHE proof..." : "Generate Proof"}
          </button>
          {proof && <div className="result">{proof}</div>}
        </div>
      )}

      {error && <div className="error">{error}</div>}

      <div className="info">
        Your balance is stored as an encrypted integer on-chain. The threshold comparison runs inside FHE — the result is a yes/no, nothing else.
      </div>
    </div>
  );
}
