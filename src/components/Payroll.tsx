import { useState } from "react";
import { Contract } from "ethers";
import { connectWallet } from "../contracts/wallet";
import { ADDRESSES, PAYROLL_ABI } from "../contracts/addresses";

export default function Payroll({ address }: { address: string }) {
  const [role, setRole] = useState<"employer" | "employee">("employer");
  const [employeeAddress, setEmployeeAddress] = useState("");
  const [salary, setSalary] = useState("");
  const [submitted, setSubmitted] = useState<{ addr: string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Employee view
  const [employerAddress, setEmployerAddress] = useState("");
  const [myPay, setMyPay] = useState<string | null>(null);

  const handleAddAndSetSalary = async () => {
    if (!employeeAddress || !salary) return;
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const { signer } = await connectWallet();
      const contract = new Contract(ADDRESSES.ConfidentialPayroll, PAYROLL_ABI, signer);

      const alreadyEmployee = await contract.isEmployee(address, employeeAddress);
      if (!alreadyEmployee) {
        const addTx = await contract.addEmployee(employeeAddress);
        await addTx.wait();
      }

      const salaryTx = await contract.setSalary(employeeAddress, parseInt(salary));
      await salaryTx.wait();

      setSubmitted((prev) => [...prev, { addr: employeeAddress, name: `${employeeAddress.slice(0, 6)}...${employeeAddress.slice(-4)}` }]);
      setEmployeeAddress("");
      setSalary("");
      setSuccess("Salary set and encrypted on-chain.");
    } catch (e: any) {
      setError(e.message || "Transaction failed");
    }
    setLoading(false);
  };

  const handleViewMySalary = async () => {
    if (!employerAddress) return;
    setLoading(true);
    setError(null);
    setMyPay(null);
    try {
      const { signer } = await connectWallet();
      const contract = new Contract(ADDRESSES.ConfidentialPayroll, PAYROLL_ABI, signer);
      const result = await contract.getSalary(employerAddress, address);
      const hasValue = result && result !== "0x0000000000000000000000000000000000000000000000000000000000000000";
      setMyPay(hasValue
        ? "Your encrypted salary record exists on-chain. Full decryption requires the Zama relayer SDK — your value is private and only accessible to you."
        : "No salary record found. Ask your employer to set your salary first.");
    } catch (e: any) {
      setError(e.message || "Could not fetch salary");
    }
    setLoading(false);
  };

  return (
    <div className="module">
      <h2>Confidential Payroll</h2>
      <p>Employers set salaries privately. No employee can see another's pay.</p>

      <div className="toggle">
        <button className={role === "employer" ? "active" : ""} onClick={() => setRole("employer")}>Employer View</button>
        <button className={role === "employee" ? "active" : ""} onClick={() => setRole("employee")}>Employee View</button>
      </div>

      {role === "employer" ? (
        <div className="form">
          <label>Employee Wallet Address</label>
          <input
            type="text"
            placeholder="0x..."
            value={employeeAddress}
            onChange={(e) => setEmployeeAddress(e.target.value)}
          />

          <label>Monthly Salary (will be encrypted on-chain)</label>
          <input
            type="number"
            placeholder="e.g. 4200"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />

          <button onClick={handleAddAndSetSalary} disabled={loading || !employeeAddress || !salary}>
            {loading ? "Encrypting and submitting..." : "Set Encrypted Salary"}
          </button>

          {submitted.length > 0 && (
            <div className="employee-list">
              {submitted.map((e, i) => (
                <div key={i} className="employee-row">
                  <span>{e.name}</span>
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
          <input
            type="text"
            placeholder="0x... (employer who set your salary)"
            value={employerAddress}
            onChange={(e) => setEmployerAddress(e.target.value)}
          />
          <button onClick={handleViewMySalary} disabled={loading || !employerAddress}>
            {loading ? "Decrypting your salary..." : "View My Salary"}
          </button>
          {myPay && <div className="result">{myPay}</div>}
          <div className="info">Only you can decrypt your salary. No one else on-chain can read it.</div>
        </div>
      )}

      {success && <div className="result">{success}</div>}
      {error && <div className="error">{error}</div>}
    </div>
  );
}
