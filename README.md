# dev-toolkit-78

A high-performance TypeScript toolkit designed for rapid integration of decentralized finance (DeFi) protocols and blockchain data indexing. It provides a robust abstraction layer for interacting with EVM-compatible chains with minimal latency.

## Features

*   **EVM-Native Adapters:** Built-in support for complex smart contract interactions, including gas estimation and multi-call execution.
*   **Zero-Dependency Validation:** High-speed schema validation for transaction payloads using optimized TypeScript type guards.
*   **Event Listener Engine:** A resilient WebSocket wrapper that maintains stateful connections to nodes, featuring automatic reconnection and heartbeat monitoring.
*   **Modular Middleware:** Extensible architecture for injecting custom logic into transaction lifecycles, such as custom fee logic or multi-sig signing wrappers.

## Installation

```bash
# Install via npm
npm install dev-toolkit-78

# Or via yarn
yarn add dev-toolkit-78
```

## Usage

Initialize the client to start monitoring state changes or executing cross-chain transactions:

```typescript
import { ToolkitClient } from 'dev-toolkit-78';

const client = new ToolkitClient({
  rpcUrl: 'https://eth-mainnet.alchemyapi.io/v2/your-api-key',
  chainId: 1
});

// Fetching account balance
const balance = await client.getBalance('0x71C7656EC7ab88b098defB751B7401B5f6d8976F');

console.log(`Wallet Balance: ${balance} ETH`);
```

## License

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

Distributed under the MIT License. See `LICENSE` for more information.