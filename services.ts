import axios from 'axios';

export interface CryptoData {
  id: string;
  name: string;
  price: number;
  marketCap: number;
}

// Function to fetch cryptocurrency data
export const fetchCryptoData = async (coinId: string): Promise<CryptoData | null> => {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`);
    const data = response.data;
    return {
      id: data.id,
      name: data.name,
      price: parseFloat(data.market_data.current_price.usd),
      marketCap: parseFloat(data.market_data.market_cap.usd),
    };
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    return null;
  }
};

// Function to fetch multiple cryptocurrencies
export const fetchMultipleCryptoData = async (coinIds: string[]): Promise<CryptoData[]> => {
  const results: CryptoData[] = [];
  for (const coinId of coinIds) {
    const data = await fetchCryptoData(coinId);
    if (data) {
      results.push(data);
    } else {
      console.warn('No data found for coinId:', coinId);
    }
  }
  return results;
};