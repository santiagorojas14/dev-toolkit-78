import { z } from 'zod';

const ConfigSchema = z.object({
  rpcUrl: z.string().url(),
  chainId: z.number().int().positive(),
  timeoutMs: z.number().default(5000),
  retryCount: z.number().default(3),
});

type Config = z.infer<typeof ConfigSchema>;

const defaults: Config = {
  rpcUrl: 'https://mainnet.infura.io/v3/default',
  chainId: 1,
  timeoutMs: 5000,
  retryCount: 3,
};

/**
 * Merges environment variables with hardcoded defaults
 */
export const loadConfig = (env: Record<string, string | undefined>): Config => {
  const rawConfig = {
    rpcUrl: env.RPC_URL ?? defaults.rpcUrl,
    chainId: env.CHAIN_ID ? parseInt(env.CHAIN_ID, 10) : defaults.chainId,
    timeoutMs: env.TIMEOUT_MS ? parseInt(env.TIMEOUT_MS, 10) : defaults.timeoutMs,
    retryCount: env.RETRY_COUNT ? parseInt(env.RETRY_COUNT, 10) : defaults.retryCount,
  };

  const result = ConfigSchema.safeParse(rawConfig);

  if (!result.success) {
    throw new Error(`Invalid configuration: ${result.error.message}`);
  }

  return result.data;
};
