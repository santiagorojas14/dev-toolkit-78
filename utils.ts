/**
 * Crypto utility functions for dev-toolkit-78
 */

export interface TransactionHash {
  id: string;
  timestamp: number;
  confirmed: boolean;
}

/**
 * Formats a raw hex string into a standardized 64-character hash
 */
export const formatTxHash = (hash: string): string => {
  const clean = hash.startsWith('0x') ? hash.slice(2) : hash;
  return clean.toLowerCase().padStart(64, '0');
};

/**
 * Validates if a string matches the expected crypto address format
 */
export const isValidAddress = (address: string): boolean => {
  const addressRegex = /^(0x)?[0-9a-fA-F]{40}$/;
  return addressRegex.test(address);
};

/**
 * Calculates the fee for a transaction based on network congestion
 */
export const calculateNetworkFee = (
  gasLimit: number,
  gasPriceGwei: number
): number => {
  const GWEI_TO_ETH = 1e-9;
  return gasLimit * gasPriceGwei * GWEI_TO_ETH;
};

/**
 * Parses a transaction response object into a typed interface
 */
export const parseTxResponse = (data: any): TransactionHash => {
  return {
    id: data.hash || '0x0',
    timestamp: data.blockTime || Date.now(),
    confirmed: !!data.confirmations && data.confirmations > 0
  };
};