# dev-toolkit-78

Dev Toolkit 78 is a powerful TypeScript library designed to streamline developer workflows by providing essential utilities and tools for modern application development. With a focus on modularity and ease of use, this toolkit empowers developers to build efficient applications faster.

## Features

- **Type-Safe Config Management**: Effortlessly manage configuration files with type safety, enabling better development practices and reduced runtime errors.
- **Custom Logger**: A flexible logging utility that integrates seamlessly within your applications, offering customizable log levels and output formats.
- **API Request Builder**: Simplify the process of making API calls with a built-in request builder that supports promise-based and async/await patterns.
- **Validation Utilities**: Robust validation functions for common data types, ensuring your application handles user input consistently and safely.

## Installation

To install the dev-toolkit-78 package, use npm or yarn:

```bash
npm install dev-toolkit-78
```

or

```bash
yarn add dev-toolkit-78
```

## Basic Usage

After installing the package, you can import the desired utilities into your TypeScript project. Here’s a quick usage example demonstrating the custom logger and API request builder:

```typescript
import { Logger, ApiRequestBuilder } from 'dev-toolkit-78';

// Initializing the logger
const logger = new Logger({ level: 'info' });
logger.info('Dev Toolkit 78 is ready to use!');

// Making a GET request
const apiRequest = new ApiRequestBuilder('https://api.example.com/data');
apiRequest.get().then(response => {
    logger.info('Data fetched successfully:', response);
}).catch(error => {
    logger.error('Error fetching data:', error);
});
```

## License

![MIT License](https://img.shields.io/badge/license-MIT-green)

dev-toolkit-78 is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.