import { ethers } from 'ethers';

export interface CryptoTransaction {
  hash: string;
  value: bigint;
  timestamp: number;
}

/**
 * converts hex wei string to decimal eth
 */
export const formatEtherUnits = (wei: string): string => {
  return ethers.formatEther(BigInt(wei));
};

/**
 * validates standard ethereum address format
 */
export const isValidAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

/**
 * calculates transaction fee based on gas and price
 */
export const calculateFee = (gasLimit: bigint, gasPrice: bigint): bigint => {
  return gasLimit * gasPrice;
};

/**
 * parses timestamp from blockchain hex block
 */
export const parseBlockTimestamp = (hex: string): number => {
  return parseInt(hex, 16) * 1000;
};

/**
 * truncates long hashes for display
 */
export const truncateHash = (hash: string, len: number = 6): string => {
  return `${hash.slice(0, len + 2)}...${hash.slice(-len)}`;
};