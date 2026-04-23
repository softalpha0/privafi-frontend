# PrivaFi Frontend

React + TypeScript frontend for [PrivaFi](https://github.com/softalpha0/PrivaFi) — a confidential DeFi suite built on the Zama FHEVM protocol.

## Overview

This frontend connects to three FHE-powered smart contracts deployed on Sepolia testnet, enabling users to:

- **Check credit eligibility** without revealing wallet balance or transaction history
- **Set and view encrypted salaries** where only the intended employee can decrypt their pay
- **Prove portfolio thresholds** without disclosing actual holdings

## Deployed Contracts (Sepolia)

| Contract | Address |
|---|---|
| PrivateCreditScore | `0xaa7D007ede04C1c52D7cc95A8357813c394f3af6` |
| ConfidentialPayroll | `0x832E4087cf2a7115adc74137644AdcFb76B3A0Fd` |
| HiddenPortfolio | `0x4708F4c5Afc818B9cF42c1652666aC67034866ae` |

## Setup

### Prerequisites
- Node.js 20+
- MetaMask with Sepolia testnet configured
- Sepolia ETH (free from https://cloud.google.com/application/web3/faucet/ethereum/sepolia)

### Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173 and connect your MetaMask wallet on Sepolia.

## Tech Stack

- React 19 + TypeScript
- Vite
- ethers.js v6
- MetaMask wallet integration

## Related

- [PrivaFi Smart Contracts](https://github.com/softalpha0/PrivaFi)
- [Zama FHEVM](https://docs.zama.ai/fhevm)
- [Zama Developer Program](https://www.zama.ai/developer-program)
