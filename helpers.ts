// Utility functions for crypto-related tasks

/**
 * Generates a random hexadecimal string of the specified length.
 *
 * @param length - The length of the desired hexadecimal string.
 * @returns A random hexadecimal string.
 */
function generateRandomHex(length: number): string {
    const characters = '0123456789abcdef';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}

/**
 * Converts a currency amount from one denomination to another based on the provided exchange rate.
 *
 * @param amount - The amount to convert.
 * @param exchangeRate - The rate to use for conversion.
 * @returns The converted amount.
 */
function convertCurrency(amount: number, exchangeRate: number): number {
    return amount * exchangeRate;
}

/**
 * Validates a cryptocurrency address to ensure it meets specified format criteria.
 *
 * @param address - The cryptocurrency address to validate.
 * @returns True if valid, false if invalid.
 */
function isValidCryptoAddress(address: string): boolean {
    const addressRegex = /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/; // Simple regex for Bitcoin
    return addressRegex.test(address);
}

export { generateRandomHex, convertCurrency, isValidCryptoAddress };