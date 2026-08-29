import * as crypto from 'crypto';

export interface HashOptions {
  algorithm?: string;
  encoding?: 'hex' | 'base64';
}

// Core cryptographic hash computation
export function computeHash(input: string, options: HashOptions = {}): string {
  const algorithm = options.algorithm || 'sha256';
  const encoding = options.encoding || 'hex';
  const hash = crypto.createHash(algorithm);
  hash.update(input, 'utf8');
  return hash.digest(encoding);
}

export function generateRandomBytes(length: number): string {
  if (length <= 0) {
    throw new Error('Length must be positive');
  }
  return crypto.randomBytes(length).toString('hex');
}

// Derives a secure key using PBKDF2
export function deriveKeyFromPassword(password: string, salt: string, iterations: number = 100000, keyLen: number = 32): string {
  const key = crypto.pbkdf2Sync(
    password,
    Buffer.from(salt, 'hex'),
    iterations,
    keyLen,
    'sha512'
  );
  return key.toString('hex');
}

export function constantTimeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export function hexToBytes(hex: string): Uint8Array {
  if (hex.length % 2 !== 0) {
    throw new Error('Hex string must have even length');
  }
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes;
}

export function isValidCryptoAddress(address: string): boolean {
  return /^0x[0-9a-fA-F]{40}$/.test(address);
}