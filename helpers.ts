import { createHash } from "crypto";

/**
 * Normalizes a Hex string by ensuring a standard '0x' prefix and lowercase format.
 */
export function normalizeHexString(hex: string): string {
  const cleaned = hex.trim().replace(/^0x/i, "");
  return `0x${cleaned.toLowerCase()}`;
}

/**
 * Validates whether a given string is a valid EVM-compatible address.
 */
export function isValidEvmAddress(address: string): boolean {
  if (!address || typeof address !== "string") {
    return false;
  }
  return /^0x[a-fA-F0-9]{40}$/.test(address.trim());
}

/**
 * Formats raw wei value into human-readable Ether representation.
 */
export function formatWeiToEther(wei: bigint | string): string {
  const weiBigInt = BigInt(wei);
  const weiString = weiBigInt.toString().padStart(19, "0");
  const integerPart = weiString.slice(0, -18) || "0";
  const fractionalPart = weiString.slice(-18).replace(/0+$/, "");
  
  return fractionalPart ? `${integerPart}.${fractionalPart}` : integerPart;
}

/**
 * Generates a deterministic SHA-256 hash formatted with '0x' prefix.
 */
export function hashPayload(payload: string): string {
  const hash = createHash("sha256").update(payload).digest("hex");
  return `0x${hash}`;
}

/**
 * Truncates a crypto wallet address for safe display in UI elements.
 */
export function truncateAddress(address: string, startChars = 6, endChars = 4): string {
  const normalized = normalizeHexString(address);
  if (normalized.length <= startChars + endChars) {
    return normalized;
  }
  return `${normalized.slice(0, startChars)}...${normalized.slice(-endChars)}`;
}