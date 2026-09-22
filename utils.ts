export class CryptoError extends Error {
  constructor(public message: string, public code: string, public retryable: boolean = false) {
    super(message);
    this.name = 'CryptoError';
  }
}

/**
 * Safely handles transaction parsing with explicit error categorization
 */
export function parseTransaction(data: unknown): any {
  if (data === null || typeof data !== 'object') {
    throw new CryptoError('Invalid transaction format', 'ERR_INVALID_DATA', false);
  }

  try {
    const tx = JSON.parse(JSON.stringify(data));
    if (!tx.hash || !tx.nonce) {
      throw new CryptoError('Missing required fields', 'ERR_MISSING_FIELDS', false);
    }
    return tx;
  } catch (err) {
    if (err instanceof CryptoError) throw err;
    throw new CryptoError('Malformed transaction structure', 'ERR_MALFORMED', false);
  }
}

/**
 * Wrapper for network calls to ensure connectivity issues are catchable
 */
export async function safeFetch<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const retryable = response.status >= 500;
      throw new CryptoError(`Request failed with status ${response.status}`, 'ERR_NETWORK', retryable);
    }
    return await response.json();
  } catch (err) {
    if (err instanceof CryptoError) throw err;
    throw new CryptoError('Unexpected transport failure', 'ERR_TRANSPORT', true);
  }
}