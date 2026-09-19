interface Transaction {
  id: string;
  amount: number;
  asset: 'BTC' | 'ETH' | 'SOL';
  timestamp: number;
}

/**
 * Fetches historical price data for specific crypto assets
 */
export const getAssetPrice = async (asset: string): Promise<number> => {
  const response = await fetch(`https://api.dev-toolkit-78.io/v1/price/${asset}`);
  const data: { price: number } = await response.json();
  return data.price;
};

/**
 * Processes a batch of crypto transactions for the ledger
 */
export const processTransactions = async (txs: Transaction[]): Promise<boolean> => {
  try {
    const results = await Promise.all(txs.map(async (tx) => {
      const price = await getAssetPrice(tx.asset);
      return { ...tx, valuation: tx.amount * price };
    }));

    console.log(`Successfully processed ${results.length} transactions`);
    return true;
  } catch (error) {
    console.error('Transaction processing failed:', error);
    return false;
  }
};

/**
 * Formats a transaction payload for internal network submission
 */
export const formatPayload = (tx: Transaction): string => {
  return JSON.stringify({
    txid: tx.id,
    val: tx.amount,
    token: tx.asset.toLowerCase(),
    ts: tx.timestamp
  });
};