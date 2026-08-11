export function isArray(obj: any): obj is Array<any> { return Array.isArray(obj); }

export function isObject(obj: any): obj is Record<string, any> { return obj !== null && typeof obj === 'object'; }

export function deepClone<T>(obj: T): T { return JSON.parse(JSON.stringify(obj)); }

export function mergeObjects<T extends object, U extends object>(target: T, source: U): T & U { return { ...target, ...source }; }

export function debounce(func: Function, delay: number): Function { let timeout: NodeJS.Timeout; return function(...args: any[]) { const context = this; clearTimeout(timeout); timeout = setTimeout(() => func.apply(context, args), delay); }; }