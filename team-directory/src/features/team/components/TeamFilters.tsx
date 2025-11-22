'use client';

import { useTranslations } from 'next-intl';
import { useTeamStore } from '../stores/team-store';
import { useState, useEffect, useMemo, useCallback, type ChangeEvent } from 'react';
import debounce from 'debounce';
import type { View } from '@/features/team/types/index.ts';

export const TeamFilters = () => {
    const t = useTranslations('teamDirectory');
    const {
        searchTerm,
        roleFilter,
        viewMode,
        setSearchTerm,
        setRoleFilter,
        resetFilters,
        setViewMode } = useTeamStore();

    const [localSearchTerm, setLocalSearchTerm] = useState<string>(searchTerm);

    // Debounced setter for the store's search term
    const debouncedSetSearchTerm = useMemo(
        () =>
            debounce((value: string) => {
                setSearchTerm(value);
            }, 300),
        [setSearchTerm]
    );

    // Keep local input in sync if the store updates externally
    useEffect(() => {
        setLocalSearchTerm(searchTerm);
    }, [searchTerm]);

    // Apply debounced search term to store whenever localSearchTerm changes
    useEffect(() => {
        debouncedSetSearchTerm(localSearchTerm);
        return () => {
            debouncedSetSearchTerm.clear();
        };
    }, [localSearchTerm, debouncedSetSearchTerm]);

    // Initialize view from localStorage on client
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const stored = (localStorage.getItem('teamView') as View) || 'table';
        setViewMode(stored);
    }, [setViewMode]);

    const ROLE_OPTIONS = useMemo(
        () => [
            { value: '', label: t('filters.roleFilter') },
            { value: 'Admin', label: t('admin') },
            { value: 'Agent', label: t('agent') },
            { value: 'Creator', label: t('creator') },
        ],
        [t]
    );

    const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setLocalSearchTerm(e.target.value);
    }, []);

    const handleRoleChange = useCallback(
        (e: ChangeEvent<HTMLSelectElement>) => {
            const value = e.target.value || null;
            setRoleFilter(value);
        },
        [setRoleFilter]
    );

    const handleClearFilters = useCallback(() => {
        debouncedSetSearchTerm.clear();
        setLocalSearchTerm('');
        resetFilters();
    }, [debouncedSetSearchTerm, resetFilters]);

    const toggleView = useCallback(() => {
        const next: View = viewMode === 'table' ? 'grid' : 'table';
        setViewMode(next);
        if (typeof window !== 'undefined') {
            localStorage.setItem('teamView', next);
            window.dispatchEvent(new CustomEvent('teamViewChange', { detail: { view: next } }));
        }
    }, [setViewMode, viewMode]);

    const isGrid = viewMode === 'grid';

    return (
        <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white p-4 rounded-lg shadow-sm border border-slate-200">
            <section className="relative w-full sm:max-w-md">
                <input
                    type="text"
                    value={localSearchTerm}
                    onChange={handleSearchChange}
                    placeholder={t('filters.searchPlaceholder')}
                    className="w-full px-4 py-2 pl-10 pr-4 shadow rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </section>

            <section className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto sm:items-end">
                <section className="w-full sm:w-auto">
                    <label htmlFor="role-filter" className="block text-sm font-medium text-slate-700 mb-1 sm:hidden">
                        {t('filters.roleFilter')}
                    </label>
                    <select
                        id="role-filter"
                        value={roleFilter || ''}
                        onChange={handleRoleChange}
                        className="w-full sm:w-[180px] px-3 py-2 shadow rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        {ROLE_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </section>

                <button
                    type="button"
                    onClick={toggleView}
                    aria-pressed={isGrid}
                    title={t('filters.toggleView') || 'Toggle view'}
                    className="px-3 py-2 flex items-center gap-2 rounded-lg shadow border border-slate-300 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <svg
                        data-icon="table"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`${isGrid ? 'text-slate-400' : 'text-blue-600'} h-5 w-5`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18" />
                    </svg>

                    <svg
                        data-icon="grid"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`${isGrid ? 'text-blue-600' : 'text-slate-400'} h-5 w-5`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h8v8H3V3zM13 3h8v8h-8V3zM3 13h8v8H3v-8zM13 13h8v8h-8v-8z" />
                    </svg>

                    <article className="hidden sm:inline-block text-sm text-slate-700">
                        {isGrid ? t('filters.viewGrid') ?? 'Grid' : t('filters.viewTable') ?? 'Table'}
                    </article>
                </button>

                <button
                    onClick={handleClearFilters}
                    className="w-full sm:w-auto px-4 py-2 rounded-lg shadow bg-red-700 text-white hover:bg-orange-700  focus:ring-2 focus:ring-red-400 transition-colors"
                >
                    {t('filters.clearFilters')}
                </button>
            </section>
        </section>
    );
};