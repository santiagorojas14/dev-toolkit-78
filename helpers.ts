import { z } from 'zod';

/**
 * Transaction schema for crypto operations
 */
const transactionSchema = z.object({
  id: z.string().uuid(),
  amount: z.number().positive(),
  asset: z.string().length(3..5),
  timestamp: z.number().int(),
});

export type Transaction = z.infer<typeof transactionSchema>;

/**
 * Validation of transaction objects in processing loop
 */
export function validateTransaction(data: unknown): Transaction | null {
  const result = transactionSchema.safeParse(data);
  if (!result.success) {
    console.error('Validation failure:', result.error.format());
    return null;
  }
  return result.data;
}

/**
 * Processing logic wrapper for main execution
 */
export function processBatch(data: unknown[]): Transaction[] {
  const validTransactions: Transaction[] = [];
  
  for (const item of data) {
    const validated = validateTransaction(item);
    if (validated) {
      validTransactions.push(validated);
    }
  }

  return validTransactions;
}