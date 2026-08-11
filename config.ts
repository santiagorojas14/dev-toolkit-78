import fs from 'fs';
import path from 'path';

interface Config {
    apiUrl: string;
    timeout: number;
    logLevel: string;
}

const defaultConfig: Config = {
    apiUrl: 'https://api.example.com',
    timeout: 5000,
    logLevel: 'info',
};

const loadConfig = (configPath: string): Config => {
    const fullPath = path.resolve(configPath);
    try {
        const fileContent = fs.readFileSync(fullPath, 'utf-8');
        const fileConfig: Partial<Config> = JSON.parse(fileContent);
        return { ...defaultConfig, ...fileConfig };
    } catch (error) {
        console.warn(`Could not load config from ${fullPath}, using defaults.`, error);
        return defaultConfig;
    }
};

export { loadConfig, Config };