/**
 * Service module for fetching crypto gas estimations and network telemetry.
 */

export interface GasEstimate {
  slow: number;
  standard: number;
  fast: number;
  baseFee: number;
  timestamp: number;
}

export interface NetworkStatus {
  chainId: number;
  blockNumber: number;
  isSyncing: boolean;
}

/**
 * Service for interacting with blockchain telemetry and RPC endpoints.
 */
export class CryptoNetworkService {
  private readonly rpcUrl: string;

  /**
   * Initializes the network service with a specific RPC endpoint URL.
   * @param rpcUrl - The HTTP RPC endpoint for the target network.
   */
  constructor(rpcUrl: string) {
    this.rpcUrl = rpcUrl;
  }

  /**
   * Fetches current gas price estimates in Gwei.
   * @returns Promise resolving to gas price estimates across speed tiers.
   */
  async getGasEstimates(): Promise<GasEstimate> {
    const response = await fetch(this.rpcUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_gasPrice',
        params: [],
        id: Date.now(),
      }),
    });

    if (!response.ok) {
      throw new Error(`RPC node error: ${response.statusText}`);
    }

    const data = (await response.json()) as { result?: string };
    const baseGwei = data.result ? parseInt(data.result, 16) / 1e9 : 20;

    return {
      slow: Math.round(baseGwei * 0.9 * 100) / 100,
      standard: Math.round(baseGwei * 100) / 100,
      fast: Math.round(baseGwei * 1.25 * 100) / 100,
      baseFee: Math.round(baseGwei * 0.8 * 100) / 100,
      timestamp: Date.now(),
    };
  }

  /**
   * Validates whether a provided string matches Ethereum address formatting.
   * @param address - Hexadecimal Ethereum wallet address.
   * @returns True if address format is valid, false otherwise.
   */
  isValidAddress(address: string): boolean {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  }
}