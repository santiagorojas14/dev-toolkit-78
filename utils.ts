type InputValidationResult = {
    isValid: boolean;
    errors?: string[];
};

/**
 * Validates an input string for transactions.
 * @param input - The transaction input string.
 * @returns InputValidationResult - The validation result.
 */
function validateTransactionInput(input: string): InputValidationResult {
    const errors: string[] = [];
    const trimmedInput = input.trim();

    if (trimmedInput.length === 0) {
        errors.push('Input cannot be empty.');
    }
    if (!/^[A-Za-z0-9]+$/.test(trimmedInput)) {
        errors.push('Input must be alphanumeric.');
    }
    if (trimmedInput.length < 5 || trimmedInput.length > 50) {
        errors.push('Input must be between 5 and 50 characters long.');
    }

    return { isValid: errors.length === 0, errors: errors.length > 0 ? errors : undefined }; 
}

export { validateTransactionInput };