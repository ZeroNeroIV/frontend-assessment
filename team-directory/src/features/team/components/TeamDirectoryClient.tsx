'use client';

import { TeamFilters } from './TeamFilters';
import { TeamTable } from './TeamTable';
import { TeamGrid } from './TeamGrid';
import { useTeamMembers } from '../hooks/useTeamMembers';
import { useTeamStore } from '../stores/team-store';
import { useEffect } from 'react';

export function TeamDirectoryClient() {
    const {
        viewMode,
        searchTerm,
        roleFilter,
        currentPage,
        totalPages,
        setCurrentPage,
        setTotalPages
    } = useTeamStore();

    const { data, loading, error, meta } = useTeamMembers({
        page: currentPage,
        limit: 10,
        search: searchTerm,
        role: roleFilter
    });

    // Update total pages in store when meta changes
    useEffect(() => {
        if (meta) {
            setTotalPages(meta.totalPages);
        }
    }, [meta, setTotalPages]);

    const handlePaginationChange = (page: number) => {
        setCurrentPage(page);
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