import { z } from 'zod';

const ConfigSchema = z.object({
  rpcUrl: z.string().url(),
  chainId: z.number().default(1),
  timeout: z.number().default(30000),
  apiKey: z.string().optional(),
});

type Config = z.infer<typeof ConfigSchema>;

const defaults: Partial<Config> = {
  rpcUrl: 'https://eth-mainnet.public.blastapi.io',
  chainId: 1,
  timeout: 30000,
};

/**
 * Loads environment configuration with validation and fallbacks
 */
export function loadConfig(env: Record<string, string | undefined>): Config {
  const rawConfig = {
    rpcUrl: env.RPC_URL || defaults.rpcUrl,
    chainId: env.CHAIN_ID ? parseInt(env.CHAIN_ID, 10) : defaults.chainId,
    timeout: env.TIMEOUT ? parseInt(env.TIMEOUT, 10) : defaults.timeout,
    apiKey: env.API_KEY,
  };

  const result = ConfigSchema.safeParse(rawConfig);

  if (!result.success) {
    throw new Error(`Invalid configuration: ${result.error.message}`);
  }

  return result.data;
}