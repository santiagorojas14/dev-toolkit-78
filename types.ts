export interface ChainConfig {
  rpcUrl: string;
  chainId: number;
  nativeCurrency: string;
}

export interface TransactionResponse {
  txHash: string;
  status: 'pending' | 'confirmed' | 'failed';
  timestamp: number;
}

export interface CryptoWallet {
  address: string;
  balance: bigint;
  network: string;
}

export type NetworkMode = 'mainnet' | 'testnet' | 'devnet';

export interface ServiceError {
  code: number;
  message: string;
  retryable: boolean;
}

export interface ProtocolFee {
  basisPoints: number;
  recipient: string;
}