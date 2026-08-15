import axios, { AxiosError } from 'axios';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // milliseconds

async function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function fetchWithRetry(url: string, options: object = {}, retries: number = MAX_RETRIES): Promise<any> {
    for (let attempt = 0; attempt < retries; attempt++) {
        try {
            const response = await axios.get(url, options);
            return response.data;
        } catch (error) {
            if (attempt === retries - 1) {
                throw error; // rethrow after final attempt
            }
            if (axios.isAxiosError(error) && error.response) {
                console.error(`Attempt ${attempt + 1}: Received status ${error.response.status}`);
            } else {
                console.error(`Attempt ${attempt + 1}: ${error.message}`);
            }
            await delay(RETRY_DELAY);
        }
    }
}