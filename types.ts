export interface CryptoConfig {
  network: string;
  chainId: number;
  defaultGasLimit: number;
}

/**
 * Represents a user's crypto wallet
 */
export interface Wallet {
  address: string;
  privateKey: string;
  balance: number;
  tokens: TokenBalance[];
}

/**
 * Token balance details
 */
export interface TokenBalance {
  tokenAddress: string;
  symbol: string;
  amount: number;
  decimals: number;
}

/**
 * Crypto transaction structure
 */
export interface Transaction {
  from: string;
  to: string;
  amount: number;
  fee: number;
  timestamp: number;
  data?: string;
}

/**
 * Calculates total balance including tokens
 * @param wallet user wallet
 * @returns total amount
 */
export function calculateTotalBalance(wallet: Wallet): number {
  const tokenTotal = wallet.tokens.reduce((sum, token) => sum + token.amount, 0);
  return wallet.balance + tokenTotal;
}

/**
 * Creates a transaction
 * @param from from address
 * @param to to address
 * @param amount transfer amount
 * @param fee transaction fee
 * @returns transaction object
 */
export function createTransaction(from: string, to: string, amount: number, fee: number = 0.01): Transaction {
  return { from, to, amount, fee, timestamp: Date.now() };
}

/**
 * Checks address validity
 * @param address hex address
 * @returns boolean valid or not
 */
export function isValidAddress(address: string): boolean {
  return address.length === 42 && address.startsWith('0x');
}