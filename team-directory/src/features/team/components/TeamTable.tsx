'use client';

import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { type TeamTableProps } from '../types';
import { columns } from './Columns';

export const TeamTable = ({
    data,
    loading,
    onPaginationChange,
    currentPage,
    totalPages
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
                </section>
            </section>
        </section>
    );
};