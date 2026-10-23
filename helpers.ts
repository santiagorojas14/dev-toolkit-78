import { z } from 'zod';

/**
 * Schema for crypto transaction input
 */
const TransactionSchema = z.object({
  txHash: z.string().length(66, 'Invalid transaction hash length'),
  amount: z.number().positive('Amount must be positive'),
  asset: z.string().min(2),
  timestamp: z.number().int()
});

export type Transaction = z.infer<typeof TransactionSchema>;

/**
 * Validates inputs before processing in main loop
 */
export function validateInput(data: unknown): Transaction | null {
  try {
    return TransactionSchema.parse(data);
  } catch (error) {
    console.error('Validation failed for crypto payload:', error);
    return null;
  }
}

/**
 * Batch validation utility for processing loops
 */
export function validateBatch(items: unknown[]): Transaction[] {
  return items
    .map((item) => validateInput(item))
    .filter((item): item is Transaction => item !== null);
}