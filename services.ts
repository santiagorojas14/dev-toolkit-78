interface WalletBalance {
  address: string;
  balanceWei: bigint;
  formattedBalance: string;
  symbol: string;
}

interface RPCResponse<T> {
  jsonrpc: string;
  id: number;
  result?: T;
  error?: {
    code: number;
    message: string;
  };
}

/**
 * Service for interacting with EVM-compatible blockchain nodes.
 */
export class CryptoRpcService {
  private readonly rpcUrl: string;

  /**
   * Initializes the RPC service with a target node URL.
   * @param rpcUrl The HTTP endpoint of the RPC provider.
   */
  constructor(rpcUrl: string) {
    this.rpcUrl = rpcUrl;
  }

  /**
   * Fetches the native token balance for a given wallet address.
   * @param address The hex-encoded public address of the wallet.
   * @param symbol Symbol for formatted display (default: 'ETH').
   * @returns Detailed wallet balance information.
   */
  public async getBalance(address: string, symbol: string = 'ETH'): Promise<WalletBalance> {
    const payload = {
      jsonrpc: '2.0',
      method: 'eth_getBalance',
      params: [address, 'latest'],
      id: Date.now(),
    };

    const response = await fetch(this.rpcUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`RPC request failed with status ${response.status}`);
    }

    const data: RPCResponse<string> = await response.json();

    if (data.error) {
      throw new Error(`RPC Error (${data.error.code}): ${data.error.message}`);
    }

    const hexBalance = data.result ?? '0x0';
    const balanceWei = BigInt(hexBalance);
    const balanceFormatted = (Number(balanceWei) / 1e18).toFixed(4);

    return {
      address,
      balanceWei,
      formattedBalance: balanceFormatted,
      symbol,
    };
  }
}