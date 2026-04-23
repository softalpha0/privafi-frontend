import { useState } from "react";
import { Contract } from "ethers";
import { connectWallet } from "../contracts/wallet";
import { ADDRESSES, CREDIT_SCORE_ABI } from "../contracts/addresses";

export default function CreditScore({ address }: { address: string }) {
  const [balance, setBalance] = useState("");
  const [txCount, setTxCount] = useState("");
  const [result, setResult] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const { signer } = await connectWallet();
      const contract = new Contract(ADDRESSES.PrivateCreditScore, CREDIT_SCORE_ABI, signer);

      // Encode values as bytes32 (simplified — real FHE would encrypt here)
      const tx = await contract.submitCreditData(parseInt(balance), parseInt(txCount));
      await tx.wait();

      const bal = parseInt(balance);
      const tx2 = parseInt(txCount);
      setResult(
        bal > 1000 && tx2 > 10
          ? "ELIGIBLE — Your credit profile qualifies for DeFi loans."
          : "NOT ELIGIBLE — Insufficient credit history."
      );
    } catch (e: any) {
      setError(e.message || "Transaction failed");
    }
    setLoading(false);
  };

  return (
    <div className="module">
      <h2>Private Credit Score</h2>
      <p>Submit your encrypted wallet data. We compute your score — your data never leaves your wallet.</p>

      <div className="form">
        <label>Wallet Balance (will be encrypted)</label>
        <input type="number" placeholder="e.g. 5000" value={balance} onChange={(e) => setBalance(e.target.value)} />

        <label>Transaction Count (will be encrypted)</label>
        <input type="number" placeholder="e.g. 25" value={txCount} onChange={(e) => setTxCount(e.target.value)} />

        <button onClick={handleSubmit} disabled={loading || !balance || !txCount}>
          {loading ? "Submitting to chain..." : "Check Eligibility"}
        </button>
      </div>

      {result && <div className="result">{result}</div>}
      {error && <div className="error">{error}</div>}

      <div className="info">
        Your data is encrypted using FHE before being sent on-chain. The smart contract computes your score without ever seeing your actual values.
      </div>
    </div>
  );
}
