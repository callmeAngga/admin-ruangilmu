import { useState, useCallback } from 'react';
interface UseMutationResult<T, U = unknown> {
    data: T | null;
    loading: boolean;
    error: string | null;
    execute: (method: string, endpoint: string, body?: U | FormData) => Promise<T | null>;
    reset: () => void;
}

const API_URL = import.meta.env.VITE_API_BASE_URL;
// const token = import.meta.env.VITE_TOKEN;
const token = localStorage.getItem('accessTokenAdmin');

const useMutation = <T, U = unknown>(): UseMutationResult<T, U> => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const execute = useCallback(async (method: string, endpoint: string, body?: U | FormData) => {
        setLoading(true);
        setError(null);
        setData(null);

        try {
            const options: RequestInit = {
                method: method,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            };

            if (body instanceof FormData) {
                options.body = body;
            } else if (body) {
                if (!(body instanceof FormData)) {
                    options.headers = {
                        ...options.headers,
                        'Content-Type': 'application/json'
                    };
                    options.body = JSON.stringify(body);
                }
            }

            const response = await fetch(`${API_URL}/admin${endpoint}`, options);

            if (!response.ok) {
                let errorMessage = `HTTP error! status: ${response.status}`;
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorMessage;
                } catch {
                    errorMessage = response.statusText || errorMessage;
                }
                throw new Error(errorMessage);
            }

            const result = await response.json();
            setData(result.data || result);
            return result.data || result;
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
            setError(errorMessage);
            console.error('Mutation Error:', err);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const reset = useCallback(() => {
        setData(null);
        setLoading(false);
        setError(null);
    }, []);

    return { data, loading, error, execute, reset };
};

export default useMutation;