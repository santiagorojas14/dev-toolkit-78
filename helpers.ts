import fs from 'fs';
import path from 'path';

interface Config {
    apiUrl: string;
    apiKey: string;
    timeout: number;
}

const defaultConfig: Config = {
    apiUrl: 'https://api.default.example',
    apiKey: 'defaultApiKey',
    timeout: 5000,
};

function loadConfig(filePath: string): Config {
    const resolvedPath = path.resolve(filePath);
    try {
        const configFile = fs.readFileSync(resolvedPath, 'utf-8');
        const userConfig = JSON.parse(configFile) as Partial<Config>;
        return { ...defaultConfig, ...userConfig };
    } catch (error) {
        console.warn('Could not load config file:', error);
        return defaultConfig;
    }
}

export { loadConfig, Config };