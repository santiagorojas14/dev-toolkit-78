export async function fetchWithRetry(url: string, options: RequestInit = {}, retries: number = 3, delay: number = 1000): Promise<Response> {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response;
    } catch (error) {
        if (retries > 0) {
            console.warn(`Fetch failed, retrying... (${retries} retries left)`);
            await new Promise(res => setTimeout(res, delay));
            return fetchWithRetry(url, options, retries - 1, delay);
        } else {
            console.error('Max retries reached.');
            throw error;
        }
    }
}

// Example usage
// (async () => {
//    try {
//        const response = await fetchWithRetry('https://api.example.com/data');
//        const data = await response.json();
//        console.log(data);
//    } catch (error) {
//        console.error('Final error:', error);
//    }
//})();