'use client';

import { TeamFilters } from './TeamFilters';
import { TeamTable } from './TeamTable';
import { TeamGrid } from './TeamGrid';
import { useTeamMembers } from '../hooks/useTeamMembers';
import { useTeamStore } from '../stores/team-store';
import { useEffect } from 'react';

export function TeamDirectoryClient() {
    const viewMode = useTeamStore(state => state.viewMode);
    const searchTerm = useTeamStore(state => state.searchTerm);
    const roleFilter = useTeamStore(state => state.roleFilter);
    const currentPage = useTeamStore(state => state.currentPage);
    const totalPages = useTeamStore(state => state.totalPages);
    const setCurrentPage = useTeamStore(state => state.setCurrentPage);
    const setTotalPages = useTeamStore(state => state.setTotalPages);
    const sortField = useTeamStore(state => state.sortField);
    const sortOrder = useTeamStore(state => state.sortOrder);
    const setSortField = useTeamStore(state => state.setSortField);
    const setSortOrder = useTeamStore(state => state.setSortOrder);

    // Trigger data fetching and subscribe to store for data
    useTeamMembers({
        page: currentPage,
        limit: 10,
        search: searchTerm,
        role: roleFilter,
        sortField,
        sortOrder,
    });

    const data = useTeamStore(state => state.teamMembers);
    const loading = useTeamStore(state => state.loading);
    const error = useTeamStore(state => state.error);
    const meta = useTeamStore(state => state.meta);

    // Update total pages in store when meta changes
    useEffect(() => {
        if (meta) {
            setTotalPages(meta.totalPages);
        }
    }, [meta, setTotalPages]);

    const handlePaginationChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleSortChange = (field: string | null, order: 'asc' | 'desc' | null) => {
        setSortField(field);
        setSortOrder(order);
        // reset to first page when sorting changes so sorting applies to full dataset
        setCurrentPage(1);
    };

    const handleLoadMore = () => {
        // increment page to trigger fetch for next page; useTeamMembers will append when page increases
        setCurrentPage(currentPage + 1);
    };

    if (error) {
        return (
            <div className="text-center py-12">
                <div className="text-red-500">Error: {error.message}</div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <TeamFilters />

            {viewMode === 'table' ? (
                <TeamTable
                    data={data}
                    loading={loading}
                    onPaginationChange={handlePaginationChange}
                    onSortChange={handleSortChange}
                    onLoadMore={handleLoadMore}
                    currentPage={currentPage}
                    totalPages={totalPages}
                />
            ) : (
                <TeamGrid
                    data={data}
                    loading={loading}
                    onPaginationChange={handlePaginationChange}
                    currentPage={currentPage}
                    totalPages={totalPages}
                />
            )}
        </div>
    );
};