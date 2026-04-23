import { useState } from "react";
import { Contract, parseEther, formatEther } from "ethers";
import { connectWallet } from "../contracts/wallet";
import { ADDRESSES, PAYROLL_ABI } from "../contracts/addresses";

export default function Payroll({ address }: { address: string }) {
  const [role, setRole] = useState<"employer" | "employee">("employer");

  // Employer state
  const [employeeAddress, setEmployeeAddress] = useState("");
  const [salary, setSalary] = useState("");
  const [deposit, setDeposit] = useState("");
  const [submitted, setSubmitted] = useState<{ addr: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Employee state
  const [employerAddress, setEmployerAddress] = useState("");
  const [myPay, setMyPay] = useState<string | null>(null);
  const [claimable, setClaimable] = useState<string | null>(null);
  const [claimed, setClaimed] = useState(false);

  const handleSetSalary = async () => {
    if (!employeeAddress || !salary) return;
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const { signer } = await connectWallet();
      const contract = new Contract(ADDRESSES.ConfidentialPayroll, PAYROLL_ABI, signer);
      const depositAmount = deposit ? parseEther(deposit) : 0n;
      const tx = await contract.setSalary(employeeAddress, parseInt(salary), { value: depositAmount });
      await tx.wait();
      setSubmitted((prev) => [...prev, { addr: employeeAddress }]);
      setEmployeeAddress("");
      setSalary("");
      setDeposit("");
      setSuccess("Salary set and encrypted on-chain.");
    } catch (e: any) {
      setError(e.message || "Transaction failed");
    }
    setLoading(false);
  };

  const handleViewSalary = async () => {
    if (!employerAddress) return;
    setLoading(true);
    setError(null);
    setMyPay(null);
    setClaimable(null);
    try {
      const { signer } = await connectWallet();
      const contract = new Contract(ADDRESSES.ConfidentialPayroll, PAYROLL_ABI, signer);
      const salaryValue = await contract.getMySalary(employerAddress);
      const claimableWei = await contract.getClaimableAmount(employerAddress, address);
      setMyPay(`Your salary: $${Number(salaryValue).toLocaleString()} / month`);
      setClaimable(claimableWei > 0n ? formatEther(claimableWei) : "0");
    } catch (e: any) {
      setError(e.message || "No salary record found for your address");
    }
    setLoading(false);
  };

  const handleClaim = async () => {
    if (!employerAddress) return;
    setLoading(true);
    setError(null);
    try {
      const { signer } = await connectWallet();
      const contract = new Contract(ADDRESSES.ConfidentialPayroll, PAYROLL_ABI, signer);
      const tx = await contract.claimSalary(employerAddress);
      await tx.wait();
      setClaimed(true);
      setClaimable("0");
      setSuccess("Salary claimed and transferred to your wallet.");
    } catch (e: any) {
      setError(e.message || "Claim failed");
    }
    setLoading(false);
  };

  return (
    <div className="module">
      <h2>Confidential Payroll</h2>
      <p>Employers set salaries privately. Employees claim their pay. No one sees anyone else's amount.</p>

      <div className="toggle">
        <button className={role === "employer" ? "active" : ""} onClick={() => setRole("employer")}>Employer View</button>
        <button className={role === "employee" ? "active" : ""} onClick={() => setRole("employee")}>Employee View</button>
      </div>

      {role === "employer" ? (
        <div className="form">
          <label>Employee Wallet Address</label>
          <input type="text" placeholder="0x..." value={employeeAddress} onChange={(e) => setEmployeeAddress(e.target.value)} />

          <label>Monthly Salary (encrypted on-chain)</label>
          <input type="number" placeholder="e.g. 4200" value={salary} onChange={(e) => setSalary(e.target.value)} />

          <label>Deposit ETH for employee to claim (optional)</label>
          <input type="number" placeholder="e.g. 0.001" step="0.001" value={deposit} onChange={(e) => setDeposit(e.target.value)} />

          <button onClick={handleSetSalary} disabled={loading || !employeeAddress || !salary}>
            {loading ? "Encrypting and submitting..." : "Set Encrypted Salary"}
          </button>

          {submitted.length > 0 && (
            <div className="employee-list">
              {submitted.map((e, i) => (
                <div key={i} className="employee-row">
                  <span>{e.addr.slice(0, 6)}...{e.addr.slice(-4)}</span>
                  <span>Salary set (encrypted)</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="form">
          <p>Logged in as: <strong>{address.slice(0, 6)}...{address.slice(-4)}</strong></p>

          <label>Employer Wallet Address</label>
          <input type="text" placeholder="0x... (your employer's address)" value={employerAddress} onChange={(e) => setEmployerAddress(e.target.value)} />

          <button onClick={handleViewSalary} disabled={loading || !employerAddress}>
            {loading ? "Fetching..." : "View My Salary"}
          </button>

          {myPay && (
            <div className="result">{myPay}</div>
          )}

          {claimable !== null && (
            <div className="claim-box">
              <div className="claim-info">
                Claimable balance: <strong>{claimable} ETH</strong>
              </div>
              {Number(claimable) > 0 && !claimed && (
                <button onClick={handleClaim} disabled={loading}>
                  {loading ? "Claiming..." : "Claim Salary"}
                </button>
              )}
              {claimed && <div className="result">Salary claimed and sent to your wallet.</div>}
            </div>
          )}

          <div className="info">Only you can view your salary. The encrypted value on-chain is unreadable to anyone else.</div>
        </div>
      )}

      {success && <div className="result">{success}</div>}
      {error && <div className="error">{error}</div>}
    </div>
  );
}
