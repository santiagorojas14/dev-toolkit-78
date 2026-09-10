import { ethers } from 'ethers';

export class CryptoService {
  private provider: ethers.JsonRpcProvider;

  constructor(rpcUrl: string) {
    this.provider = new ethers.JsonRpcProvider(rpcUrl);
  }

  async getSafeBalance(address: string): Promise<bigint> {
    try {
      if (!ethers.isAddress(address)) {
        throw new Error('invalid ethereum address format');
      }

      const balance = await this.provider.getBalance(address);
      return balance;
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(`rpc fetch failure: ${err.message}`);
        throw new Error(`balance retrieval failed: ${err.message}`);
      }
      throw new Error('unknown rpc execution error');
    }
  }

  async getGasPrice(): Promise<bigint> {
    try {
      const feeData = await this.provider.getFeeData();
      if (!feeData.gasPrice) {
        throw new Error('gas price oracle returned null');
      }
      return feeData.gasPrice;
    } catch (err) {
      console.warn('fallback to default gas price');
      return BigInt(20_000_000_000);
    }
  }
}