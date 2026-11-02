[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

# dev-toolkit-78

`dev-toolkit-78` is a lightweight TypeScript utility library designed for seamless cross-chain address validation, gas estimation, and RPC node failover management. It streamlines core Web3 developer workflows across EVM and Solana ecosystems with zero heavy external dependencies.

## Features

- **Multi-Chain Address Normalization:** Validate and format public keys across Ethereum (EIP-55 checksum), Solana, and Bitcoin formats with strict type guarantees.
- **Smart RPC Failover:** Automatic provider switching with health check caching to eliminate downtime caused by rate limits or node degradation.
- **EIP-1559 Gas Estimator:** Real-time priority fee calculations parsed directly from block headers to prevent stuck transactions.
- **Compact Payload Decoders:** Lightweight utilities for parsing raw transaction logs without importing massive full-node SDKs.

## Installation

Install via npm or pnpm:

```bash
npm install dev-toolkit-78
```

```bash
pnpm add dev-toolkit-78
```

## Quick Start

```typescript
import { AddressValidator, RpcResolver } from 'dev-toolkit-78';

// Set up multi-provider failover
const provider = new RpcResolver({
  endpoints: [
    'https://eth-mainnet.g.alchemy.com/v2/demo',
    'https://rpc.ankr.com/eth'
  ],
  timeoutMs: 2500
});

async function main() {
  const targetAddress = '0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed';
  
  // Validate EVM checksum
  if (AddressValidator.isValidEVM(targetAddress)) {
    console.log('Valid EVM Address');
  }

  // Fetch optimal gas metrics
  const feeData = await provider.getOptimalFeeData();
  console.