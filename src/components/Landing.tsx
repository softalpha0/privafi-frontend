export default function Landing({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="landing">
      <section className="hero">
        <div className="hero-badge">Powered by Zama FHE</div>
        <h1>PrivaFi</h1>
        <p className="hero-sub">
          The first confidential DeFi suite where your financial data stays encrypted — on-chain, always.
        </p>
        <button className="hero-btn" onClick={onEnter}>Launch App</button>
      </section>

      <section className="problem">
        <h2>The Problem</h2>
        <div className="cards">
          <div className="card">
            <div className="card-icon">01</div>
            <h3>DeFi is Transparent</h3>
            <p>Every balance, salary, and credit check is visible to anyone on the blockchain. Privacy does not exist.</p>
          </div>
          <div className="card">
            <div className="card-icon">02</div>
            <h3>Traditional Finance is Closed</h3>
            <p>Banks demand full access to your financial history just to determine if you qualify for a loan.</p>
          </div>
          <div className="card">
            <div className="card-icon">03</div>
            <h3>No Middle Ground</h3>
            <p>You either expose everything or get access to nothing. There has been no way to prove without revealing.</p>
          </div>
        </div>
      </section>

      <section className="solution">
        <h2>The Solution</h2>
        <p className="section-sub">
          PrivaFi uses Fully Homomorphic Encryption (FHE) via the Zama Protocol to compute directly on encrypted data.
          Your inputs are never decrypted on-chain. Ever.
        </p>
        <div className="how-it-works">
          <div className="step">
            <div className="step-num">1</div>
            <div className="step-text">
              <h4>You encrypt your data locally</h4>
              <p>Your balance, salary, or portfolio value is encrypted in your browser before it touches the blockchain.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-num">2</div>
            <div className="step-text">
              <h4>The smart contract computes on ciphertext</h4>
              <p>Using Zama's FHEVM, the contract runs comparisons and logic directly on the encrypted values.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-num">3</div>
            <div className="step-text">
              <h4>You get a result — not raw data</h4>
              <p>The output is a pass/fail, a proof, or a decrypted value visible only to you. Nothing else is revealed.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="modules">
        <h2>Three Modules. One Suite.</h2>
        <div className="module-cards">
          <div className="module-card">
            <div className="module-tag">Module 01</div>
            <h3>Private Credit Score</h3>
            <p>
              Submit your encrypted wallet balance and transaction history. PrivaFi computes whether you qualify
              for a DeFi loan — without the lender ever seeing your actual figures.
            </p>
            <div className="module-detail">
              <span>Encrypted input</span>
              <span>On-chain FHE computation</span>
              <span>Pass / Fail output</span>
            </div>
          </div>
          <div className="module-card">
            <div className="module-tag">Module 02</div>
            <h3>Confidential Payroll</h3>
            <p>
              Employers set salaries as encrypted values on-chain. Each employee can only decrypt their own pay.
              No colleague, no auditor, no block explorer can see what anyone else earns.
            </p>
            <div className="module-detail">
              <span>Per-employee encryption</span>
              <span>Role-gated decryption</span>
              <span>On-chain payroll total</span>
            </div>
          </div>
          <div className="module-card">
            <div className="module-tag">Module 03</div>
            <h3>Hidden Portfolio Tracker</h3>
            <p>
              Register your encrypted portfolio balance and generate cryptographic proofs that you hold
              above any threshold — without disclosing a single number.
            </p>
            <div className="module-detail">
              <span>Encrypted balance</span>
              <span>Threshold proof</span>
              <span>Zero data leakage</span>
            </div>
          </div>
        </div>
      </section>

      <section className="tech">
        <h2>Built With</h2>
        <div className="tech-grid">
          <div className="tech-item">
            <h4>Zama FHEVM</h4>
            <p>Solidity-native FHE operations on encrypted integers</p>
          </div>
          <div className="tech-item">
            <h4>Sepolia Testnet</h4>
            <p>All 3 contracts deployed and verified on Etherscan</p>
          </div>
          <div className="tech-item">
            <h4>Hardhat</h4>
            <p>Contract compilation, testing, and deployment</p>
          </div>
          <div className="tech-item">
            <h4>React + TypeScript</h4>
            <p>Frontend interface with MetaMask wallet integration</p>
          </div>
        </div>
      </section>

      <section className="contracts">
        <h2>Verified Contracts</h2>
        <div className="contract-list">
          <a href="https://sepolia.etherscan.io/address/0xB67B9e480956D75942de17f6F34BD5d4Df56Ddb7#code" target="_blank" rel="noreferrer">
            <span>PrivateCreditScore</span>
            <span className="addr">0xB67B...6Ddb7</span>
          </a>
          <a href="https://sepolia.etherscan.io/address/0xD48BD6D863B0B6A153C7455fae7766b7f4C9eac0#code" target="_blank" rel="noreferrer">
            <span>ConfidentialPayroll</span>
            <span className="addr">0xD48B...eac0</span>
          </a>
          <a href="https://sepolia.etherscan.io/address/0x0DFf51a487966088c9Aea7CFbf6A0c67F87a2544#code" target="_blank" rel="noreferrer">
            <span>HiddenPortfolio</span>
            <span className="addr">0x0DFf...2544</span>
          </a>
        </div>
      </section>

      <section className="cta">
        <h2>Ready to try it?</h2>
        <p>Connect your MetaMask wallet on Sepolia and experience confidential DeFi.</p>
        <button className="hero-btn" onClick={onEnter}>Launch App</button>
      </section>
    </div>
  );
}
