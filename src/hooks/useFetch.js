import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error('Failed to fetch');
            }
            const result = await res.json();
            setData(result.data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [url]);

    const refetch = () => {
        fetchData();
    };

    return {
        data,
        error,
        loading,
        refetch
    };
};

export default useFetch;
