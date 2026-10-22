import { z } from 'zod';

const ConfigSchema = z.object({
  rpcUrl: z.string().default('https://api.mainnet-beta.solana.com'),
  retryAttempts: z.number().int().min(0).default(3),
  debugMode: z.boolean().default(false),
  timeoutMs: z.number().positive().default(5000),
});

type Config = z.infer<typeof ConfigSchema>;

/**
 * loads and validates application configuration
 * merges environment variables with defaults
 */
export function loadConfig(): Config {
  const env = {
    rpcUrl: process.env.RPC_URL,
    retryAttempts: process.env.RETRY_ATTEMPTS ? parseInt(process.env.RETRY_ATTEMPTS, 10) : undefined,
    debugMode: process.env.DEBUG_MODE === 'true',
    timeoutMs: process.env.TIMEOUT_MS ? parseInt(process.env.TIMEOUT_MS, 10) : undefined,
  };

  const result = ConfigSchema.safeParse(env);

  if (!result.success) {
    throw new Error(`invalid configuration: ${result.error.message}`);
  }

  return result.data;
}

export const config = loadConfig();