'use client';

import { useTranslations } from 'next-intl';
import { useTeamStore } from '../stores/team-store';
import { useState, useEffect } from 'react';

export const TeamFilters = () => {
    const t = useTranslations('teamDirectory');
    const { searchTerm, roleFilter, setSearchTerm, setRoleFilter, resetFilters } = useTeamStore();

    const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

    // Debounce search term updates
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(localSearchTerm);
        }, 300);

        return () => clearTimeout(timer);
    }, [localSearchTerm]);

    // Apply debounced search term to store
    useEffect(() => {
        setSearchTerm(debouncedSearchTerm);
    }, [debouncedSearchTerm, setSearchTerm]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalSearchTerm(e.target.value);
    };

    const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value || null;
        setRoleFilter(value);
    };

    const handleClearFilters = () => {
        setLocalSearchTerm('');
        resetFilters();
    };

    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white p-4 rounded-lg shadow-sm border border-slate-200">

            {/* Search: Full width on mobile, flexible on desktop */}
            <div className="relative w-full sm:max-w-md">
                <input
                    type="text"
                    value={localSearchTerm}
                    onChange={handleSearchChange}
                    placeholder={t('filters.searchPlaceholder')}
                    className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </div>

            {/* Controls: Stacked on very small, Row on mobile+ */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto sm:items-end">

                <div className="w-full sm:w-auto">
                    <label htmlFor="role-filter" className="block text-sm font-medium text-slate-700 mb-1 sm:hidden">
                        {t('filters.roleFilter')}
                    </label>
                    <select
                        id="role-filter"
                        value={roleFilter || ''}
                        onChange={handleRoleChange}
                        className="w-full sm:w-[180px] px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="">{t('filters.roleFilter')}</option>
                        <option value="Admin">Admin</option>
                        <option value="Agent">Agent</option>
                        <option value="Creator">Creator</option>
                    </select>
                </div>

                <button
                    onClick={handleClearFilters}
                    className="w-full sm:w-auto px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                    {t('filters.clearFilters')}
                </button>
            </div>
        </div>
    );
};