import { useEffect, useCallback } from "react";
import { useState } from "react"

export const useFetch = (fetchFunction, dependencies=[]) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async (signal) => {
        try {
            setLoading(true);
            setError(null);
            const result = await fetchFunction(signal);
            setData(result);
        } catch (error) {
            if (error.name === 'AbortError') return;
            setError(error.message);
            setData(null);
        } finally {
            setLoading(false);
        }
    }, [fetchFunction]);

    useEffect(() => {
        const abortController = new AbortController();
        fetchData(abortController.signal);
        
        return () => abortController.abort();
    }, [...dependencies, fetchData]);

    const refresh = () => {
        const abortController = new AbortController();
        fetchData(abortController.signal);
        return () => abortController.abort();
    };

    return { data, loading, error, refresh };
}