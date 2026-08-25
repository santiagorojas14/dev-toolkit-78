function isValidCryptoInput(input: unknown): boolean {
  if (typeof input !== 'string' || input.length === 0) {
    return false;
  }

  // Check for valid transaction hash (64 hex chars) or Ethereum address (with 0x prefix)
  const txHashPattern = /^[0-9a-fA-F]{64}$/;
  const ethAddressPattern = /^0x[0-9a-fA-F]{40}$/;
  return txHashPattern.test(input) || ethAddressPattern.test(input);
}

export function processCryptoInputs(rawInputs: unknown[]): Array<{ valid: boolean; value: string; processed: any }> {
  const processedResults: Array<{ valid: boolean; value: string; processed: any }> = [];

  // Main processing loop with input validation
  for (const rawInput of rawInputs) {
    const inputStr = String(rawInput || '').trim();
    if (!isValidCryptoInput(inputStr)) {
      processedResults.push({
        valid: false,
        value: inputStr,
        processed: null
      });
      continue;
    }

    // Practical processing for crypto toolkit - normalize and flag type
    const processed = {
      original: inputStr,
      length: inputStr.length,
      isAddress: inputStr.startsWith('0x') && inputStr.length === 42,
      normalized: inputStr.toLowerCase()
    };
    processedResults.push({
      valid: true,
      value: inputStr,
      processed
    });
  }

  return processedResults;
}

// Sample data for demonstration in crypto context
const sampleInputs: unknown[] = [
  '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3',
  'short',
  '0xinvalidlengthaddresshere12345678901234567890',
  987654321
];

const output = processCryptoInputs(sampleInputs);
console.log(JSON.stringify(output, null, 2));