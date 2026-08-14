import axios, { AxiosError } from 'axios';

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

async function fetchWithRetry(url: string, retries = MAX_RETRIES): Promise<any> {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        if (retries > 0 && isNetworkError(error)) {
            console.warn(`Retrying... ${MAX_RETRIES - retries + 1}/${MAX_RETRIES}`);
            await delay(RETRY_DELAY_MS);
            return fetchWithRetry(url, retries - 1);
        } else {
            throw new Error(`Failed to fetch data: ${error}`);
        }
    }
}

function isNetworkError(error: AxiosError): boolean {
    return !error.response;
}

function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export { fetchWithRetry };