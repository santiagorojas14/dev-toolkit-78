import * as fs from 'fs';
import * as path from 'path';

interface Config {  
    apiUrl: string;  
    timeout: number;  
}

const defaultConfig: Config = {  
    apiUrl: 'https://api.example.com',  
    timeout: 5000,  
};

function loadConfig(configPath: string): Config {  
    try {  
        const absolutePath = path.resolve(configPath);  
        const rawData = fs.readFileSync(absolutePath, 'utf-8');  
        const parsedConfig = JSON.parse(rawData);  
        return {  
            ...defaultConfig,  
            ...parsedConfig,  
        };  
    } catch (error) {  
        if (error.code === 'ENOENT') {  
            console.error(`Config file not found at ${configPath}`);  
        } else if (error instanceof SyntaxError) {  
            console.error(`Config file contains invalid JSON: ${error.message}`);  
        } else {  
            console.error(`Unexpected error: ${error.message}`);  
        }  
        return defaultConfig;  
    }  
}

export { loadConfig, Config };