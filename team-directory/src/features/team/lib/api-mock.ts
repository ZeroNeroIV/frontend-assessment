import type { FetchOptions } from '@/features/team/types/index.js';
import { MOCK_TEAM_MEMBERS } from '../data/mock-data';

export const fetchMockTeamMembers = async ({
    page = 1,
    limit = 10,
    search = '',
    role = null,
    sortField = null,
    sortOrder = null,
}: FetchOptions) => {
    // Simulate Network Delay (1s)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    let filteredData = [...MOCK_TEAM_MEMBERS]; // This is a shallow copy
    // We can use structuredClone() to make a Deep Copy if needed
    // let filteredData = structuredClone(MOCK_TEAM_MEMBERS);

    // Filter by Search Term 
    if (search) {
        const lowerSearch = search.toLowerCase();
        filteredData = filteredData.filter(
            (member) =>
                member.name.toLowerCase().includes(lowerSearch) ||
                member.email.toLowerCase().includes(lowerSearch)
        );
    }

    // Filter by Role
    if (role && role !== 'All') {
        filteredData = filteredData.filter((member) => member.role === role);
    }

    // Apply sorting if requested
    if (sortField) {
        filteredData.sort((a, b) => {
            const aVal = (a as any)[sortField];
            const bVal = (b as any)[sortField];
            if (aVal == null && bVal == null) return 0;
            if (aVal == null) return -1;
            if (bVal == null) return 1;
            if (typeof aVal === 'string' && typeof bVal === 'string') {
                const cmp = aVal.localeCompare(bVal);
                return (sortOrder === 'desc') ? -cmp : cmp;
            }
            if (aVal < bVal) return sortOrder === 'desc' ? 1 : -1;
            if (aVal > bVal) return sortOrder === 'desc' ? -1 : 1;
            return 0;
        });
    }

    // Pagination Logic
    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedData = filteredData.slice(startIndex, endIndex);

    return {
        data: paginatedData,
        meta: {
            totalItems,
            totalPages,
            currentPage: page,
        },
    };
};