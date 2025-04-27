import { useState, useMemo, useCallback } from 'react';


export function usePagination<T>(items: T[], initialSize = 10) {
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(initialSize);
    const totalPages = useMemo(() => Math.ceil(items.length / pageSize), [items.length, pageSize]);
    const paginated = useMemo(() => {
        const start = pageIndex * pageSize;
        return items.slice(start, start + pageSize);
    }, [items, pageIndex, pageSize]);
    const next = useCallback(() => setPageIndex(i => Math.min(i + 1, totalPages - 1)), [totalPages]);
    const prev = useCallback(() => setPageIndex(i => Math.max(i - 1, 0)), []);
    const reset = useCallback(() => setPageIndex(0), []);
    return { paginated, pageIndex, pageSize, setPageSize, totalPages, next, prev, reset };
}