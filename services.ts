export interface RetryOptions {
  maxRetries?: number;
  initialDelayMs?: number;
  backoffFactor?: number;
}

export interface RpcResponse<T = unknown> {
  jsonrpc: string;
  id: number;
  result?: T;
  error?: { code: number; message: string };
}

/**
 * Executes an asynchronous call with exponential backoff retry logic.
 * Useful for handling transient network issues and rate limits on crypto nodes.
 */
export async function fetchWithRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const { maxRetries = 3, initialDelayMs = 500, backoffFactor = 2 } = options;
  let attempt = 0;
  let delay = initialDelayMs;

  while (true) {
    try {
      return await fn();
    } catch (error) {
      attempt++;
      if (attempt > maxRetries) {
        const message = error instanceof Error ? error.message : String(error);
        throw new Error(`Operation failed after ${maxRetries} retries: ${message}`);
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
      delay *= backoffFactor;
    }
  }
}

/**
 * Fetches native token balance from a crypto RPC provider with automatic retries.
 */
export async function getAccountBalance(
  rpcUrl: string,
  address: string
): Promise<string> {
  const payload = {
    jsonrpc: "2.0",
    method: "eth_getBalance",
    params: [address, "latest"],
    id: 1,
  };

  return fetchWithRetry(async () => {
    const response = await fetch(rpcUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
    }

    const data = (await response.json()) as RpcResponse<string>;
    if (data.error) {
      throw new Error(`RPC node error: ${data.error.message}`);
    }

    if (typeof data.result !== "string") {
      throw new Error("Malformed response: missing balance hex result");
    }

    return data.result;
  });
}