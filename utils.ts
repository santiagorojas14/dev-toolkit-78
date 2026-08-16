export function parseTransaction(transaction: any): { id: string; amount: number; timestamp: Date; } | null {
    try {
        if (!transaction || !transaction.id || !transaction.amount || !transaction.timestamp) {
            throw new Error('Invalid transaction structure');
        }
        return {
            id: transaction.id,
            amount: parseFloat(transaction.amount),
            timestamp: new Date(transaction.timestamp)
        };
    } catch (error) {
        console.error('Error parsing transaction:', error);
        return null;
    }
}

export function validateAddress(address: string): boolean {
    const addressRegex = /^[A-Za-z0-9]{34}$/;
    if (!addressRegex.test(address)) {
        console.error('Invalid address format:', address);
        return false;
    }
    return true;
}

export function fetchTransactionData(apiUrl: string): Promise<any> {
    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Failed to fetch transaction data:', error);
            throw new Error('Failed to fetch transaction data');
        });
}