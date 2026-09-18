import { createHmac, randomBytes, timingSafeEqual } from 'crypto';

export interface ServiceConfig {
  secretKey: string;
  algorithm: string;
}

export class CryptoService {
  private readonly secretKey: Buffer;
  private readonly algorithm: string;

  constructor(config: ServiceConfig) {
    if (!config.secretKey) {
      throw new Error('Secret key is required for CryptoService initialization');
    }
    this.secretKey = Buffer.from(config.secretKey, 'utf-8');
    this.algorithm = config.algorithm || 'sha256';
  }

  /**
   * Generates a secure HMAC signature for the given payload.
   */
  public generateSignature(payload: string): string {
    return createHmac(this.algorithm, this.secretKey)
      .update(payload)
      .digest('hex');
  }

  /**
   * Verifies a signature using timing-safe comparison to prevent side-channel attacks.
   */
  public verifySignature(payload: string, signature: string): boolean {
    const expected = this.generateSignature(payload);
    const expectedBuffer = Buffer.from(expected, 'hex');
    const signatureBuffer = Buffer.from(signature, 'hex');

    if (expectedBuffer.length !== signatureBuffer.length) {
      return false;
    }

    return timingSafeEqual(expectedBuffer, signatureBuffer);
  }

  /**
   * Generates a cryptographically secure random token.
   */
  public generateRandomToken(bytes = 32): string {
    return randomBytes(bytes).toString('hex');
  }
}