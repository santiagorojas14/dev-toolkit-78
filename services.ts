import { ethers } from 'ethers';

/**
 * Configuration interface for crypto provider initialization
 */
interface ProviderConfig {
  rpcUrl: string;
  chainId: number;
}

/**
 * Represents a standard blockchain transaction response
 */
interface TxResponse {
  hash: string;
  nonce: number;
  gasLimit: bigint;
}

/**
 * Service for interacting with EVM-compatible networks
 */
export class ChainService {
  private provider: ethers.JsonRpcProvider;

  constructor(config: ProviderConfig) {
    this.provider = new ethers.JsonRpcProvider(config.rpcUrl, config.chainId);
  }

  /**
   * Retrieves balance for a specific wallet address
   * @param address - The hex address to query
   * @returns BigInt representing balance in wei
   */
  public async getBalance(address: string): Promise<bigint> {
    try {
      return await this.provider.getBalance(address);
    } catch (error) {
      console.error(`Failed to fetch balance for ${address}:`, error);
      throw new Error('NETWORK_UNAVAILABLE');
    }
  }

  /**
   * Fetches pending transaction metadata
   * @param txHash - The transaction hash to inspect
   */
  public async getTransaction(txHash: string): Promise<TxResponse | null> {
    const tx = await this.provider.getTransaction(txHash);
    if (!tx) return null;

    return {
      hash: tx.hash,
      nonce: tx.nonce,
      gasLimit: tx.gasLimit,
    };
  }
}