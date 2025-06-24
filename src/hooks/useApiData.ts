import { useState, useEffect } from 'react';

interface UseApiDataResult<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

const API_URL = import.meta.env.VITE_API_BASE_URL;
// const token = import.meta.env.VITE_TOKEN;
const token = localStorage.getItem('accessTokenAdmin');

const useApiData = <T>(endpoint: string): UseApiDataResult<T> => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!endpoint) {
            setLoading(false);
            setData(null);
            setError(null);
            return;
        }

        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_URL}/admin${endpoint}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                setData(result.data);
            } catch (err: unknown) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
                console.error('API Error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [endpoint]);

    return { data, loading, error };
};

export default useApiData;