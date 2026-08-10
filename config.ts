import fs from 'fs';

interface Config {
  port: number;
  dbUrl: string;
  logLevel: string;
}

const defaultConfig: Config = {
  port: 3000,
  dbUrl: 'mongodb://localhost:27017/myapp',
  logLevel: 'info',
};

export function loadConfig(filePath: string): Config {
  try {
    const rawConfig = fs.readFileSync(filePath, 'utf-8');
    const userConfig: Partial<Config> = JSON.parse(rawConfig);
    return { ...defaultConfig, ...userConfig };
  } catch (error) {
    console.error('Error loading config:', error);
    return defaultConfig;
  }
}

export default defaultConfig;
