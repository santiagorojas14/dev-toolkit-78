import { ethers } from 'ethers';

interface ProviderConfig {
  rpcUrl: string;
  chainId: number;
}

/**
 * Manages interaction with blockchain providers for dev-toolkit-78
 */
export class BlockchainService {
  private provider: ethers.JsonRpcProvider;

  constructor(config: ProviderConfig) {
    this.provider = new ethers.JsonRpcProvider(config.rpcUrl, config.chainId);
  }

  async getGasPrice(): Promise<bigint> {
    try {
      const feeData = await this.provider.getFeeData();
      return feeData.gasPrice ?? 0n;
    } catch (error) {
      console.error('Failed to fetch gas price:', error);
      return 0n;
    }
  }

  async getBlockNumber(): Promise<number> {
    return await this.provider.getBlockNumber();
  }

  async validateAddress(address: string): Promise<boolean> {
    return ethers.isAddress(address);
  }
}

export const createProvider = (rpcUrl: string, chainId: number): BlockchainService => {
  return new BlockchainService({ rpcUrl, chainId });
};