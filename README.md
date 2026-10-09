# dev-toolkit-78

A high-performance TypeScript utility suite designed for rapid integration with EVM-compatible chains. This toolkit streamlines wallet management, gas estimation, and raw transaction signing for decentralized application developers.

## Features

*   **Gas Oracle Integration:** Real-time fee estimation with multi-provider fallback support to ensure optimal transaction inclusion.
*   **Encrypted Key Management:** Secure mnemonic and private key handling using AES-256-GCM encryption standards.
*   **Type-Safe Contract Wrappers:** Automated generation of TypeScript interfaces from ABI files to prevent runtime errors.
*   **Cross-Chain Utilities:** Built-in cross-chain verification methods for monitoring bridge liquidity and transaction status across L1s and L2s.

## Installation

Install the package via npm or yarn:

```bash
npm install dev-toolkit-78
# or
yarn add dev-toolkit-78
```

## Usage Example

```typescript
import { WalletManager, GasEstimator } from 'dev-toolkit-78';

const wallet = new WalletManager(process.env.PRIVATE_KEY);
const estimator = new GasEstimator('mainnet');

async function sendTransaction() {
  const gasPrice = await estimator.getGasPrice();
  const tx = await wallet.signTransaction({
    to: '0xabc...',
    value: '1000000000000000000',
    gasLimit: 21000,
    maxFeePerGas: gasPrice
  });

  console.log('Signed Tx:', tx);
}
```

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.