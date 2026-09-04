/**
 * Utility helpers for converting crypto token amounts between human-readable
 * decimal strings and their raw BigInt representations (e.g., Wei, Satoshis).
 */

/**
 * Converts a human-readable token amount string to a BigInt based on decimal places.
 * Crucial for avoiding floating-point arithmetic errors in crypto transactions.
 * 
 * @param amountStr The human-readable string (e.g., "1.234")
 * @param decimals The token decimal precision (e.g., 18 for ETH, 8 for BTC)
 * @returns BigInt representation of the amount
 */
export function toBigIntAmount(amountStr: string, decimals: number): bigint {
  if (!amountStr || isNaN(Number(amountStr))) {
    throw new Error("Invalid amount string provided");
  }

  const [integerPart, fractionalPart = ""] = amountStr.split(".");
  const paddedFraction = fractionalPart
    .slice(0, decimals)
    .padEnd(decimals, "0");
  
  const combined = `${integerPart}${paddedFraction}`;
  return BigInt(combined);
}

/**
 * Converts a BigInt representation of a token amount back to a human-readable decimal string.
 * 
 * @param amount The BigInt representation (e.g., 1000000000000000000n)
 * @param decimals The token decimal precision (e.g., 18)
 * @param precision Optional decimal places to include in the returned string (defaults to decimals)
 * @returns A formatted decimal string representation
 */
export function fromBigIntAmount(
  amount: bigint,
  decimals: number,
  precision?: number
): string {
  const amountStr = amount.toString();
  const negative = amount < 0n;
  const absoluteStr = negative ? amountStr.slice(1) : amountStr;

  let integerPart = "0";
  let fractionalPart = "";

  if (absoluteStr.length <= decimals) {
    fractionalPart = absoluteStr.padStart(decimals, "0");
  } else {
    const splitIndex = absoluteStr.length - decimals;
    integerPart = absoluteStr.slice(0, splitIndex);
    fractionalPart = absoluteStr.slice(splitIndex);
  }

  // Clean trailing zeros
  fractionalPart = fractionalPart.replace(/0+$/, "");

  // Apply precision formatting if requested
  if (precision !== undefined && precision < decimals) {
    fractionalPart = fractionalPart.slice(0, precision).replace(/0+$/, "");
  }

  const sign = negative ? "-" : "";
  return fractionalPart.length > 0
    ? `${sign}${integerPart}.${fractionalPart}`
    : `${sign}${integerPart}`;
}