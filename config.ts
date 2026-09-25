export interface NetworkConfig {
  rpcUrl: string;
  chainId: number;
  retryAttempts: number;
}

export const validateConfig = (config: Partial<NetworkConfig>): NetworkConfig => {
  const defaults = {
    rpcUrl: 'https://mainnet.infura.io/v3/',
    chainId: 1,
    retryAttempts: 3
  };

  if (!config.rpcUrl?.startsWith('https://')) {
    throw new Error('invalid rpc endpoint provided in configuration');
  }

  if (typeof config.chainId !== 'number' || config.chainId <= 0) {
    throw new Error('invalid chain identifier specified');
  }

  return {
    ...defaults,
    ...config
  } as NetworkConfig;
};

export const getSecureConfig = (env: Record<string, string | undefined>): NetworkConfig => {
  try {
    return validateConfig({
      rpcUrl: env.RPC_URL,
      chainId: env.CHAIN_ID ? parseInt(env.CHAIN_ID, 10) : undefined
    });
  } catch (error) {
    console.error('config initialization failure:', error instanceof Error ? error.message : 'unknown error');
    throw new Error('failed to load crypto network settings');
  }
};