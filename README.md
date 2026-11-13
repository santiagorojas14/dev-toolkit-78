# dev-toolkit-78

`dev-toolkit-78` is a high-performance TypeScript library designed to streamline blockchain interaction and cryptographic data processing. It provides a robust set of utilities for developers building decentralized applications, focusing on type safety and gas-efficient execution.

## Features

*   **EVM-Compatible Signatures:** Simplified signing and verification workflows for EIP-712 structured data and standard personal messages.
*   **On-Chain Data Normalization:** Built-in transformers to convert raw contract hex outputs into human-readable TypeScript interfaces.
*   **Gas-Aware Estimators:** Automated batch calculation utilities for optimizing transaction fees across L1 and L2 networks.
*   **Secure Keystore Management:** Robust helpers for encrypting and decrypting local private keys using AES-256-GCM encryption standards.

## Installation

Install the package via npm or yarn:

```bash
npm install dev-toolkit-78
# or
yarn add dev-toolkit-78
```

## Basic Usage

The toolkit is designed with a functional programming approach. Below is a quick example of verifying a transaction signature:

```typescript
import { SignatureVerifier } from 'dev-toolkit-78';

const verifier = new SignatureVerifier();

const isValid = await verifier.verify({
  message: "Authenticate with dev-toolkit",
  signature: "0x...",
  address: "0x78..."
});

console.log(`Signature status: ${isValid ? 'Valid' : 'Invalid'}`);
```

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Distributed under the MIT License. See `LICENSE` for more information.