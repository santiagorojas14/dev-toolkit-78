function formatCryptoAmount(amount: number, decimals: number = 8): string {
    return amount.toFixed(decimals);
}

function convertToCurrency(amount: number, exchangeRate: number): number {
    return amount * exchangeRate;
}

function isValidAddress(address: string): boolean {
    const regex = /^0x[a-fA-F0-9]{40}$/;
    return regex.test(address);
}

function calculateMarketCap(supply: number, price: number): number {
    return supply * price;
}

function getPriceChangePercentage(oldPrice: number, newPrice: number): number {
    if (oldPrice === 0) return 0;
    return ((newPrice - oldPrice) / oldPrice) * 100;
}

export { formatCryptoAmount, convertToCurrency, isValidAddress, calculateMarketCap, getPriceChangePercentage };