# dev-toolkit-78

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

dev-toolkit-78 is a TypeScript toolkit that helps crypto developers interact with blockchain networks without writing repetitive boilerplate. It focuses on reliable wallet handling, transaction construction, and on-chain queries for production-grade applications.

## Features
- Unified client for Ethereum, Polygon, and Arbitrum with automatic network switching and RPC failover.
- Secure transaction signing supporting EIP-1559 fees and hardware wallet integration via Ledger.
- Gas estimation and simulation tools that predict transaction outcomes before broadcasting.
- Type-safe helpers for common DeFi operations including token approvals and balance tracking.

## Installation

```bash
npm install dev-toolkit-78
```

## Basic Usage

```typescript
import { createClient, getBalance } from 'dev-toolkit-78';

const client = createClient({ network: 'polygon' });
const balance = await getBalance('0x742d35Cc6634C0532925a3b844Bc454e4438f44e', 'USDC');
console.log(balance);
```