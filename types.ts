// Definitions for various types used in the crypto application

// Represents a cryptocurrency with essential details
export interface CryptoCurrency {
    id: string;
    name: string;
    symbol: string;
    currentPrice: number;
    marketCap: number;
    volume: number;
}

// Response format for fetching cryptocurrency data
export interface CryptoApiResponse {
    data: CryptoCurrency[];
    status: string;
}

// Represents a transaction for a crypto exchange
export interface Transaction {
    transactionId: string;
    fromAddress: string;
    toAddress: string;
    amount: number;
    timestamp: number;
    status: 'pending' | 'completed' | 'failed';
}

// Represents user information for wallet management
export interface User {
    userId: string;
    email: string;
    walletAddress: string;
    balance: number;
}

// Configuration options for the api client
type ApiConfig = {
    baseUrl: string;
    apiKey: string;
    timeout: number;
};
