# dev-toolkit-78

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight, production-ready TypeScript utility library designed to streamline Web3 interactions and cryptographic data transformations. It provides developers with secure, high-performance tools for address validation, gas estimation, and payload signing across EVM-compatible networks.

## Features

- **EVM Address Sanitizer:** Normalize and safely checksum Ethereum addresses using the Keccak-256 algorithm.
- **Gas Optimizer:** Real-time fee estimation and gas limit scaling factors for predictable transaction execution under network congestion.
- **Deterministic Key Derivation:** Safe local keypair generation and offline message signing utilities compliant with BIP-32/44 standards.

## Installation

Install the package via npm:

```bash
npm install dev-toolkit-78
```

Or using yarn:

```bash
yarn add dev-toolkit-78
```

## Quick Start

```typescript
import { EVMToolkit, GasEstimator } from 'dev-toolkit-78';

// 1. Validate and checksum a user address
const rawAddress = "0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359";
const safeAddress = EVMToolkit.toChecksumAddress(rawAddress);
console.log(`Checksummed Address: ${safeAddress}`);

// 2. Estimate transaction gas with a safety buffer
async function estimateTx() {
  const estimator = new GasEstimator("https://cloudflare-eth.com");
  
  const safeGasLimit = await estimator.getSafeGasLimit({
    to: safeAddress,
    value: "100000000000000000", // 0.1 ETH in wei
    data: "0x"
  });

  console.log(`Recommended Gas Limit: ${safeGasLimit.toString()} units`);
}

estimateTx();
```

## License

Distributed under the MIT License. See `LICENSE` for more information.