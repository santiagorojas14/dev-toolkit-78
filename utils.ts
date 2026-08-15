/**
 * Converts a hexadecimal string to a number.
 * @param hex - The hexadecimal string to convert.
 * @returns The corresponding number.
 */
function hexToNumber(hex: string): number {
    return parseInt(hex, 16);
}

/**
 * Generates a random cryptographic nonce.
 * @returns A random nonce represented as a hexadecimal string.
 */
function generateNonce(): string {
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Checks if a given address is valid.
 * @param address - The address string to validate.
 * @returns True if the address is valid, otherwise false.
 */
function isValidAddress(address: string): boolean {
    const addressRegex = /^0x[a-fA-F0-9]{40}$/;
    return addressRegex.test(address);
}

export { hexToNumber, generateNonce, isValidAddress };