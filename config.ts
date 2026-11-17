export const CACHE_TTL_MS = 60000;
export const BATCH_SIZE = 50;

interface PerformanceConfig {
  readonly memoizationEnabled: boolean;
  readonly batchProcessingLimit: number;
}

/**
 * Core configuration for crypto processing modules
 * Optimizes throughput via static sizing and memoization
 */
export const performanceConfig: PerformanceConfig = {
  memoizationEnabled: true,
  batchProcessingLimit: BATCH_SIZE,
};

export const getOptimizationSettings = () => ({
  ttl: CACHE_TTL_MS,
  limits: performanceConfig,
  timestamp: Date.now(),
});

// Optimization: pre-compute sizing for high-frequency crypto loops
export const PRE_ALLOCATED_BUFFER_SIZE = 1024 * 16;