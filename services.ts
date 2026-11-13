export class CryptoServiceError extends Error {
  constructor(message: string, public readonly code: string, public readonly originalError?: unknown) {
    super(message);
    this.name = 'CryptoServiceError';
  }
}

export interface RpcEndpoint {
  url: string;
  weight: number;
}

export class ProviderService {
  private endpoints: RpcEndpoint[];

  constructor(endpoints: RpcEndpoint[]) {
    if (!endpoints || endpoints.length === 0) {
      throw new CryptoServiceError('At least one RPC endpoint is required', 'EMPTY_ENDPOINTS');
    }
    this.endpoints = [...endpoints].sort((a, b) => b.weight - a.weight);
  }

  public async fetchAccountBalance(address: string, maxRetries = 3): Promise<bigint> {
    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
      throw new CryptoServiceError(`Invalid EVM address format: ${address}`, 'INVALID_ADDRESS');
    }

    let lastError: unknown;

    for (const endpoint of this.endpoints) {
      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          const response = await fetch(endpoint.url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              jsonrpc: '2.0',
              id: Date.now(),
              method: 'eth_getBalance',
              params: [address, 'latest'],
            }),
          });

          if (response.status === 429) {
            await new Promise((res) => setTimeout(res, attempt * 500));
            continue;
          }

          if (!response.ok) {
            throw new Error(`HTTP status error: ${response.status}`);
          }

          const data = (await response.json()) as { result?: string; error?: { message: string } };

          if (data.error) {
            throw new Error(`RPC Error: ${data.error.message}`);
          }

          if (!data.result || typeof data.result !== 'string') {
            throw new Error('Malformed RPC response structure');
          }

          return BigInt(data.result);
        } catch (err) {
          lastError = err;
          await new Promise((res) => setTimeout(res, 250 * Math.pow(2, attempt - 1)));
        }
      }
    }

    throw new CryptoServiceError(
      'Failed to fetch balance across all RPC providers',
      'PROVIDER_EXHAUSTED',
      lastError
    );
  }
}
