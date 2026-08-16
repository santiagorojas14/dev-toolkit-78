import axios from 'axios';
import { CryptoData, ExchangeRates } from './types';

export async function fetchCryptoData(cryptoId: string): Promise<CryptoData> {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${cryptoId}`);
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch data for ${cryptoId}:`, error);
        throw new Error('Could not fetch crypto data');
    }
}

export async function fetchExchangeRates(baseCurrency: string): Promise<ExchangeRates> {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=${baseCurrency}`);
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch exchange rates for ${baseCurrency}:`, error);
        throw new Error('Could not fetch exchange rates');
    }
}

export function formatCryptoData(data: CryptoData): string {
    return `Name: ${data.name}, Symbol: ${data.symbol}, Price: $${data.market_data.current_price.usd}`;
}

export function getCurrentPrice(data: CryptoData): number {
    return data.market_data.current_price.usd;
}