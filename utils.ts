type CryptoWallet = {
    address: string;
    balance: number;
    tokens: Token[];
};

type Token = {
    symbol: string;
    amount: number;
};

/**
 * Calculate the total balance of a crypto wallet including all tokens.
 * @param wallet - The CryptoWallet object containing address and tokens.
 * @returns The total balance as a number.
 */
function calculateTotalBalance(wallet: CryptoWallet): number {
    return wallet.balance + wallet.tokens.reduce((total, token) => total + token.amount, 0);
}

/**
 * Format a cryptocurrency amount to a specified decimal precision.
 * @param amount - The amount to format.
 * @param precision - The number of decimal places to format.
 * @returns A string representing the formatted amount.
 */
function formatCryptoAmount(amount: number, precision: number = 4): string {
    return amount.toFixed(precision);
}

/**
 * Validate a crypto address based on a basic length check.
 * @param address - The cryptocurrency address to validate.
 * @returns True if valid, otherwise false.
 */
function isValidCryptoAddress(address: string): boolean {
    return address.length === 42; // Example for Ethereum address length
}

export { CryptoWallet, Token, calculateTotalBalance, formatCryptoAmount, isValidCryptoAddress };