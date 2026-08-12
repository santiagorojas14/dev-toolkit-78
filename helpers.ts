export function calculateTransactionFee(gasPrice: number, gasLimit: number): number {
    return gasPrice * gasLimit;
}

export function isValidAddress(address: string): boolean {
    const regex = /^(0x)?[0-9a-fA-F]{40}$/;
    return regex.test(address);
}

export function formatBalance(balance: number, decimals: number = 18): string {
    return (balance / Math.pow(10, decimals)).toFixed(decimals);
}

export function uniqueTransactionIds(transactions: Array<{ id: string }>): string[] {
    const ids = new Set<string>();
    transactions.forEach(tx => ids.add(tx.id));
    return Array.from(ids);
}

export function getCurrentTimestamp(): number {
    return Math.floor(Date.now() / 1000);
}
