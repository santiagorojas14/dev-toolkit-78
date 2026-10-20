# dev-toolkit-78

A high-performance TypeScript utility suite designed for rapid integration with EVM-compatible chains. It simplifies complex blockchain interactions, allowing developers to focus on application logic rather than low-level RPC plumbing.

## Features

*   **Robust RPC Provider Wrapper:** Automated retry logic and automatic failover for multiple node endpoints.
*   **Type-Safe Transaction Builder:** Pre-configured decorators for common contract interactions using Ethers v6 patterns.
*   **Encrypted Keyring Manager:** Secure local storage utilities for managing ephemeral test accounts during development.
*   **Gas Estimation Engine:** Optimized algorithms for real-time fee calculation to prevent transaction drops.

## Installation

Install the package via npm or yarn:

```bash
npm install dev-toolkit-78
# or
yarn add dev-toolkit-78
```

Ensure you have your environment variables configured for your target network in a `.env` file.

## Usage

```typescript
import { BlockchainClient } from 'dev-toolkit-78';

const client = new BlockchainClient({
  rpcUrl: process.env.RPC_ENDPOINT,
  chainId: 1
});

async function getBalance(address: string) {
  const balance = await client.getBalance(address);
  console.log(`Balance: ${balance.formatted} ETH`);
}

getBalance('0x742d35Cc6634C0532925a3b844Bc454e4438f44e');
```

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.