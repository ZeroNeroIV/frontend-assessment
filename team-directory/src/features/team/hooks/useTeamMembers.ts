import { useQuery } from '@apollo/client/react';
import { useEffect, useState } from 'react';
import { GET_TEAM_MEMBERS } from '../queries';
import { fetchMockTeamMembers } from '../lib/api-mock';
import type { TeamMembersData, TeamMembersResponse, UseTeamMembersProps } from '@/features/team/types/index.js';

const USE_MOCK = true;

export const useTeamMembers = ({
    page,
    limit = 10,
    search = '',
    role = null
}: UseTeamMembersProps): TeamMembersResponse => {
    const [mockData, setMockData] = useState<TeamMembersResponse>({
        data: [],
        meta: {
            totalItems: 0,
            totalPages: 0,
            currentPage: 1
        },
        loading: false,
        error: null
    });

    const { data, loading, error } = useQuery<TeamMembersData>(GET_TEAM_MEMBERS, {
        variables: { page, limit, search, role },
        skip: USE_MOCK
    });

    useEffect(() => {
        if (USE_MOCK) {
            const fetchData = async () => {
                setMockData(prev => ({ ...prev, loading: true, error: null }));
                try {
                    const result = await fetchMockTeamMembers({ page, limit, search, role });
                    setMockData({
                        data: result.data,
                        meta: result.meta,
                        loading: false,
                        error: null
                    });
                } catch (err) {
                    setMockData({
                        data: [],
                        meta: { totalItems: 0, totalPages: 0, currentPage: 1 },
                        loading: false,
                        error: err instanceof Error ? err : new Error('An unknown error occurred')
                    });
                }
            };

            fetchData();
        }
    }, [page, limit, search, role]);

    if (USE_MOCK) {
        return mockData;
    }

    return {
        data: data?.teamMembers?.data || [],
        meta: data?.teamMembers?.meta || { totalItems: 0, totalPages: 0, currentPage: 1 },
        loading,
        error: error ? new Error(error.message) : null
    };
};