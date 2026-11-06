/**
 * Custom error class for crypto edge case failures.
 */
export class CryptoValidationError extends Error {
  constructor(message: string, public readonly code: string) {
    super(message);
    this.name = 'CryptoValidationError';
  }
}

/**
 * Validates and normalizes an Ethereum address, handling common edge cases.
 */
export function sanitizeAddress(address: unknown): string {
  if (typeof address !== 'string') {
    throw new CryptoValidationError('Address must be a string', 'INVALID_TYPE');
  }

  const trimmed = address.trim().toLowerCase();

  if (!trimmed) {
    throw new CryptoValidationError('Address cannot be empty', 'EMPTY_INPUT');
  }

  if (!/^0x[a-f0-9]{40}$/.test(trimmed)) {
    throw new CryptoValidationError('Invalid Ethereum address format', 'INVALID_FORMAT');
  }

  return trimmed;
}

/**
 * Safely parses BigInt amounts with overflow and negative value checks.
 */
export function parseTokenAmount(amount: string | number, decimals: number = 18): bigint {
  if (decimals < 0 || decimals > 36 || !Number.isInteger(decimals)) {
    throw new CryptoValidationError('Invalid decimals range', 'INVALID_DECIMALS');
  }

  try {
    const strVal = String(amount).trim();
    if (!strVal || isNaN(Number(strVal))) {
      throw new CryptoValidationError('Value is not a valid number', 'INVALID_NUMBER');
    }

    const numVal = Number(strVal);
    if (numVal < 0) {
      throw new CryptoValidationError('Token amount cannot be negative', 'NEGATIVE_AMOUNT');
    }

    const [integerPart, decimalPart = ''] = strVal.split('.');
    const paddedDecimal = decimalPart.padEnd(decimals, '0').slice(0, decimals);
    return BigInt(`${integerPart}${paddedDecimal}`);
  } catch (err) {
    if (err instanceof CryptoValidationError) throw err;
    throw new CryptoValidationError('Failed to parse token amount safely', 'PARSE_FAILED');
  }
}