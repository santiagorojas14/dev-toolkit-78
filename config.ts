export interface Config {
    apiBaseUrl: string;
    apiKey: string;
    timeout: number;
}

const config: Config = {
    apiBaseUrl: 'https://api.crypto.example.com',
    apiKey: process.env.API_KEY || '',
    timeout: 5000,
};

export const getConfig = (): Config => {
    return config;
};

export const setApiBaseUrl = (url: string): void => {
    config.apiBaseUrl = url;
};

export const setApiKey = (key: string): void => {
    config.apiKey = key;
};

export const setTimeout = (time: number): void => {
    config.timeout = time;
};
