import { useQuery } from '@apollo/client/react';
import { useEffect } from 'react';
import { GET_TEAM_MEMBERS } from '../queries';
import { fetchMockTeamMembers } from '../lib/api-mock';
import type { TeamMembersData, TeamMembersResponse, UseTeamMembersProps } from '@/features/team/types/index.js';
import { useTeamStore } from '../stores/team-store';
import { useRef } from 'react';

const USE_MOCK = true;

export const useTeamMembers = ({
    page,
    limit = 10,
    search = '',
    role = null,
    sortField = null,
    sortOrder = null,
}: UseTeamMembersProps): TeamMembersResponse => {
    // Store actions
    const setTeamMembers = useTeamStore(state => state.setTeamMembers);
    const setMeta = useTeamStore(state => state.setMeta);
    const setLoading = useTeamStore(state => state.setLoading);
    const setError = useTeamStore(state => state.setError);
    const appendTeamMembers = useTeamStore(state => state.appendTeamMembers);

    // Store state (returned to callers for convenience)
    const teamMembers = useTeamStore(state => state.teamMembers);
    const meta = useTeamStore(state => state.meta);
    const loading = useTeamStore(state => state.loading);
    const error = useTeamStore(state => state.error);

    const { data, loading: apolloLoading, error: apolloError } = useQuery<TeamMembersData>(GET_TEAM_MEMBERS, {
        variables: { page, limit, search, role, sortField, sortOrder },
        skip: USE_MOCK
    });

    // When using a live Apollo backend, sync results into the store
    useEffect(() => {
        if (!USE_MOCK && apolloLoading) {
            setLoading(true);
            setError(null);
            return;
        }

        if (!USE_MOCK && data) {
            // If page increased, append; otherwise replace
            // Note: we don't have prevPage for Apollo here; simple replace for now (backend should control append semantics)
            setTeamMembers(data.teamMembers.data || []);
            setMeta(data.teamMembers.meta || { totalItems: 0, totalPages: 0, currentPage: 1 });
            setLoading(false);
            setError(null);
        }

        if (!USE_MOCK && apolloError) {
            setTeamMembers([]);
            setMeta({ totalItems: 0, totalPages: 0, currentPage: 1 });
            setLoading(false);
            setError(apolloError instanceof Error ? apolloError : new Error(apolloError.message));
        }
    }, [data, apolloLoading, apolloError, setTeamMembers, setMeta, setLoading, setError]);

    // Mock path: fetch and write/append into store
    const prevPageRef = useRef<number>(page);
    useEffect(() => {
        if (!USE_MOCK) return;

        let mounted = true;
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const result = await fetchMockTeamMembers({ page, limit, search, role, sortField, sortOrder });
                if (!mounted) return;

                const isAppend = page > (prevPageRef.current || 1);
                if (isAppend) {
                    appendTeamMembers(result.data || []);
                } else {
                    setTeamMembers(result.data || []);
                }

                setMeta(result.meta || { totalItems: 0, totalPages: 0, currentPage: 1 });
                setLoading(false);
                prevPageRef.current = page;
            } catch (err) {
                if (!mounted) return;
                setTeamMembers([]);
                setMeta({ totalItems: 0, totalPages: 0, currentPage: 1 });
                setLoading(false);
                setError(err instanceof Error ? err : new Error('An unknown error occurred'));
            }
        };

        fetchData();

        return () => {
            mounted = false;
        };
    }, [page, limit, search, role, sortField, sortOrder, setTeamMembers, setMeta, setLoading, setError, appendTeamMembers]);

    return {
        data: teamMembers,
        meta,
        loading,
        error
    };
};