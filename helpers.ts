import { createHash } from "crypto";

export interface CryptoFormattingOptions {
  decimals?: number;
  symbol?: string;
  compact?: boolean;
}

/**
 * Formats raw token units (e.g., Wei, Satoshis) to a human-readable string.
 */
export function formatUnits(
  amount: bigint | number | string,
  decimals = 18,
  options: CryptoFormattingOptions = {}
): string {
  const raw = BigInt(amount);
  const base = BigInt(10 ** decimals);
  const integerPart = raw / base;
  const remainder = raw % base;

  let fractionStr = remainder.toString().padStart(decimals, "0");
  fractionStr = fractionStr.replace(/0+$/, "");

  const displayDecimals = options.decimals ?? 4;
  if (fractionStr.length > displayDecimals) {
    fractionStr = fractionStr.slice(0, displayDecimals);
  }

  const formattedNumber = fractionStr ? `${integerPart}.${fractionStr}` : `${integerPart}`;
  return options.symbol ? `${formattedNumber} ${options.symbol}` : formattedNumber;
}

/**
 * Truncates an Ethereum or Solana wallet address for display UI.
 */
export function truncateAddress(address: string, startChars = 6, endChars = 4): string {
  if (!address || address.length <= startChars + endChars) {
    return address;
  }
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

/**
 * Calculates a double SHA-256 hash commonly used in Bitcoin/UTXO chains.
 */
export function hash256(payload: string | Buffer): string {
  const buffer = typeof payload === "string" ? Buffer.from(payload, "utf8") : payload;
  const firstHash = createHash("sha256").update(buffer).digest();
  return createHash("sha256").update(firstHash).digest("hex");
}

/**
 * Validates basic structure of an EVM address.
 */
export function isValidEvmAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}