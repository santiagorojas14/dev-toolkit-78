type Transaction = {
    id: string;
    amount: number;
    timestamp: Date;
};

export const validateTransaction = (transaction: Transaction): boolean => {
    if (!transaction.id || typeof transaction.id !== 'string') {
        console.error('Invalid transaction ID.');
        return false;
    }
    if (transaction.amount <= 0 || typeof transaction.amount !== 'number') {
        console.error('Invalid transaction amount.');
        return false;
    }
    if (!(transaction.timestamp instanceof Date) || isNaN(transaction.timestamp.getTime())) {
        console.error('Invalid transaction timestamp.');
        return false;
    }
    return true;
};

export const processTransactions = (transactions: Transaction[]): void => {
    transactions.forEach(transaction => {
        if (validateTransaction(transaction)) {
            console.log(`Processing transaction ${transaction.id}...`);
            // Further processing logic here
        }
    });
};