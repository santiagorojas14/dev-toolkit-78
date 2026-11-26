# dev-toolkit-78

A high-performance TypeScript utility library designed to streamline blockchain interaction and cryptographic data handling. It provides a robust, type-safe foundation for developers building decentralized applications on EVM-compatible networks.

### Features

*   **Ethers.js Abstractions:** Simplified wrappers for contract deployment, transaction signing, and gas estimation to reduce boilerplate code.
*   **Wallet Integration:** Built-in hooks for secure mnemonic generation and encrypted keystore management.
*   **Unit Conversion Utilities:** Precision-focused helpers for Wei/Ether conversions and high-accuracy fixed-point arithmetic to prevent floating-point errors.
*   **Event Monitoring:** Optimized event listener patterns for real-time indexing of on-chain logs and state changes.

### Installation

Install the package via npm or yarn:

```bash
npm install dev-toolkit-78
# or
yarn add dev-toolkit-78
```

Ensure your project has `ethers` installed as a peer dependency:

```bash
npm install ethers
```

### Basic Usage

Import the required modules to initialize a provider and execute a basic balance lookup:

```typescript
import { WalletToolkit } from 'dev-toolkit-78';
import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider('https://mainnet.infura.io/v3/YOUR_KEY');
const toolkit = new WalletToolkit(provider);

async function getBalance(address: string) {
  const balance = await toolkit.getFormattedBalance(address);
  console.log(`Address ${address} holds ${balance} ETH`);
}

getBalance('0x742d35Cc6634C0532925a3b844Bc454e4438f44e');
```

### License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Distributed under the MIT License. See `LICENSE` for more information.