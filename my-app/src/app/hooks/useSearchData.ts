// hooks/useSearchData.ts
'use client';
import { useState, useEffect } from 'react';
import { SearchLog } from '@/app/_component/types';

export function useSearchData(query?: string | null) {
    const [searchDatas, setSearchData] = useState<SearchLog[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchSearchHistory = async () => {
            try {
                const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/search`)
                if (query) {
                    url.searchParams.set('search_query', query);
                }
                const response = await fetch(url.toString());
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

                const data = await response.json();
                setSearchData(data || []);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setIsLoading(false);
            }
        };
        fetchSearchHistory();
    }, [query]);

    return { searchDatas, isLoading, error };
}