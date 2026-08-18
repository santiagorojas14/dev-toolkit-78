import axios from 'axios';

interface CryptoData {
    id: string;
    name: string;
    symbol: string;
    price_usd: string;
}

const API_URL = 'https://api.coingecko.com/api/v3/coins/markets';

const fetchCryptoData = async (currency: string): Promise<CryptoData[]> => {
    try {
        const response = await axios.get(API_URL, { params: { vs_currency: currency } });
        return response.data;
    } catch (error) {
        console.error('Error fetching crypto data:', error);
        return [];
    }
};

const getTopCryptos = async (currency: string, limit: number = 10): Promise<CryptoData[]> => {
    const data = await fetchCryptoData(currency);
    return data.slice(0, limit);
};

export { fetchCryptoData, getTopCryptos };