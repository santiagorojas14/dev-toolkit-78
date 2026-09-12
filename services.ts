import { ethers } from 'ethers';
import { NETWORK_RPC } from './config';

export interface CryptoProvider {
  network: string;
  provider: ethers.JsonRpcProvider;
}

/**
 * Initializes a new provider connection to the blockchain
 */
export const getBlockchainProvider = (network: string): CryptoProvider => {
  const rpc = NETWORK_RPC[network] || 'https://cloudflare-eth.com';
  return {
    network,
    provider: new ethers.JsonRpcProvider(rpc),
  };
};

/**
 * Fetches balance with basic validation
 */
export const fetchBalance = async (
  provider: ethers.JsonRpcProvider,
  address: string
): Promise<string> => {
  try {
    const balance = await provider.getBalance(address);
    return ethers.formatEther(balance);
  } catch (error) {
    console.error(`Balance retrieval failed for ${address}:`, error);
    return '0.0';
  }
};

/**
 * Sanitizes gas price data for transaction modules
 */
export const formatGasPrice = (price: bigint): string => {
  return ethers.formatUnits(price, 'gwei');
};