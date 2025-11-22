'use client';

import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';
import { type TeamTableProps } from '../types';
import { columns } from './Columns';

export const TeamTable = ({
    data,
    loading,
    onPaginationChange,
    currentPage,
    totalPages,
    onSortChange,
    onLoadMore,
}: TeamTableProps) => {
    const t = useTranslations('teamDirectory');
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    // Notify parent about sort changes so sorting can be applied globally (server-side)
    const isFirst = useRef(true);
    useEffect(() => {
        if (typeof onSortChange !== 'function') return;
        if (isFirst.current) {
            isFirst.current = false;
            return;
        }

        if (!sorting || sorting.length === 0) {
            onSortChange(null, null);
            return;
        }

        const top = sorting[0];
        const field = String(top.id);
        const order = top.desc ? 'desc' : 'asc';
        onSortChange(field, order);
    }, [sorting, onSortChange]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            onPaginationChange(newPage);
        }
    };

    if (loading) {
        return (
            <section className="space-y-4">
                <section className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
                    <section className="overflow-x-auto">
                        <table className="w-full text-left text-sm min-w-[600px]">
                            <thead className="bg-slate-50">
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <tr key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <th
                                                key={header.id}
                                                className="px-6 py-3 font-medium text-slate-900"
                                            >
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {[...Array(5)].map((_, index) => (
                                    <tr key={index} className="animate-pulse">
                                        <td className="px-6 py-4">
                                            <section className="h-4 bg-slate-200 rounded"></section>
                                        </td>
                                        <td className="px-6 py-4">
                                            <section className="h-4 bg-slate-200 rounded"></section>
                                        </td>
                                        <td className="px-6 py-4">
                                            <section className="h-4 bg-slate-200 rounded"></section>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                </section>
                <section className="flex justify-between items-center p-4">
                    <section className="h-4 bg-slate-200 rounded w-32"></section>
                    <section className="flex space-x-2">
                        <section className="h-8 w-20 bg-slate-200 rounded"></section>
                        <section className="h-8 w-20 bg-slate-200 rounded"></section>
                    </section>
                </section>
            </section>
        );
    }

    if (data.length === 0) {
        return (
            <section className="text-center py-12">
                <section className="text-slate-500">{t('emptyState')}</section>
            </section>
        );
    }

    return (
        <section className="space-y-4">
            <section className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
                {/* CRITICAL: The wrapper for mobile responsiveness */}
                <section className="overflow-x-auto">
                    <table className="w-full text-left text-sm min-w-[600px]">
                        {/* min-w-[600px] forces the scrollbar to appear on small screens 
                instead of squishing the columns */}

                        <thead className="bg-slate-50">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        const canSort = header.column.getCanSort();
                                        const sortState = header.column.getIsSorted(); // 'asc' | 'desc' | false
                                        const ariaSort = canSort
                                            ? sortState === 'asc'
                                                ? 'ascending'
                                                : sortState === 'desc'
                                                    ? 'descending'
                                                    : 'none'
                                            : undefined;

                                        return (
                                            <th
                                                key={header.id}
                                                className="px-6 py-3 font-medium text-slate-900"
                                                aria-sort={ariaSort}
                                            >
                                                {header.isPlaceholder ? null : (
                                                    canSort ? (
                                                        <button
                                                            type="button"
                                                            onClick={header.column.getToggleSortingHandler()}
                                                            className={`flex items-center gap-2 ${sortState ? 'text-sky-600 font-semibold' : 'text-slate-900'}`}
                                                            aria-label={
                                                                typeof sortState === 'string'
                                                                    ? `Sort ${sortState}`
                                                                    : 'Sort'
                                                            }
                                                        >
                                                            <span>
                                                                {flexRender(
                                                                    header.column.columnDef.header,
                                                                    header.getContext()
                                                                )}
                                                            </span>
                                                            <span className="flex items-center" aria-hidden>
                                                                {sortState === 'asc' ? (
                                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                                                        <path d="M7 14l5-5 5 5H7z" fill="currentColor" />
                                                                    </svg>
                                                                ) : sortState === 'desc' ? (
                                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                                                        <path d="M7 10l5 5 5-5H7z" fill="currentColor" />
                                                                    </svg>
                                                                ) : (
                                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                                                        <path d="M7 10l5-5 5 5H7z" fill="currentColor" opacity="0.4" />
                                                                        <path d="M7 14l5 5 5-5H7z" fill="currentColor" opacity="0.2" />
                                                                    </svg>
                                                                )}
                                                            </span>
                                                        </button>
                                                    ) : (
                                                        <span>
                                                            {flexRender(
                                                                header.column.columnDef.header,
                                                                header.getContext()
                                                            )}
                                                        </span>
                                                    )
                                                )}
                                            </th>
                                        );
                                    })}
                                </tr>
                            ))}
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {table.getRowModel().rows.map((row) => (
                                <tr key={row.id} className="hover:bg-slate-50">
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className="px-6 py-4">
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </section>
            {/* Pagination */}
            <section className="flex justify-between items-center p-4">
                <section className="text-sm text-slate-600">
                    {t('page')} {currentPage} {t('of')} {totalPages}
                </section>
                <section className="flex space-x-2">
                    <button
                        className={`px-4 py-2 rounded-lg ${currentPage === 1
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                            }`}
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        {t('previous')}
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg ${currentPage === totalPages
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                            }`}
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        {t('next')}
                    </button>
                    {onLoadMore && currentPage < totalPages && (
                        <button
                            className={`px-4 py-2 rounded-lg bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={onLoadMore}
                            disabled={loading}
                            aria-busy={loading}
                        >
                            {t('loadMore')}
                        </button>
                    )}
                </section>
            </section>
        </section>
    );
};