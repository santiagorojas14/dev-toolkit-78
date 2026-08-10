// A utility function to perform a deep merge of two objects
function deepMerge<T>(target: T, source: Partial<T>): T {
    for (const key in source) {
        if (source.hasOwnProperty(key)) {
            const srcValue = source[key];
            const tgtValue = target[key];

            if (typeof srcValue === 'object' && srcValue !== null && typeof tgtValue === 'object' && tgtValue !== null) {
                target[key] = deepMerge(tgtValue, srcValue);
            } else {
                target[key] = srcValue;
            }
        }
    }
    return target;
}

// A utility function to generate a unique ID
function generateUniqueId(prefix: string = 'id'): string {
    return `${prefix}_${Math.random().toString(36).substr(2, 9)}`;
}

// A utility function to format dates in 'YYYY-MM-DD' format
function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export { deepMerge, generateUniqueId, formatDate };