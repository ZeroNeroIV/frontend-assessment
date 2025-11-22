import { create } from 'zustand';
import type { TeamMember } from '../types';

export interface TeamMeta {
    totalItems: number;
    totalPages: number;
    currentPage: number;
}

interface TeamState {
    // UI / filters / pagination
    viewMode: 'grid' | 'table';
    searchTerm: string;
    roleFilter: string | null;
    currentPage: number;
    totalPages: number;
    sortField: string | null;
    sortOrder: 'asc' | 'desc' | null;

    // Data managed in the store
    teamMembers: TeamMember[];
    meta: TeamMeta;
    loading: boolean;
    error: Error | null;

    // Actions
    setSearchTerm: (term: string) => void;
    setRoleFilter: (role: string | null) => void;
    setViewMode: (mode: 'grid' | 'table') => void;
    setCurrentPage: (page: number) => void;
    setTotalPages: (pages: number) => void;
    setSortField: (field: string | null) => void;
    setSortOrder: (order: 'asc' | 'desc' | null) => void;
    setTeamMembers: (members: TeamMember[]) => void;
    appendTeamMembers: (members: TeamMember[]) => void;
    setMeta: (meta: TeamMeta) => void;
    setLoading: (loading: boolean) => void;
    setError: (err: Error | null) => void;
    clearTeamMembers: () => void;
    resetFilters: () => void;
    resetPagination: () => void;
}

export const useTeamStore = create<TeamState>((set) => ({
    viewMode: 'table',
    searchTerm: '',
    roleFilter: null,
    currentPage: 1,
    totalPages: 1,
    sortField: null,
    sortOrder: null,

    teamMembers: [],
    meta: { totalItems: 0, totalPages: 0, currentPage: 1 },
    loading: false,
    error: null,

    setSearchTerm: (term) => set({ searchTerm: term, currentPage: 1 }),
    setRoleFilter: (role) => set({ roleFilter: role, currentPage: 1 }),
    setViewMode: (mode) => set({ viewMode: mode }),
    setCurrentPage: (page) => set({ currentPage: page }),
    setTotalPages: (pages) => set({ totalPages: pages }),
    setSortField: (field) => set({ sortField: field }),
    setSortOrder: (order) => set({ sortOrder: order }),

    setTeamMembers: (members) => set({ teamMembers: members }),
    appendTeamMembers: (members) => set((s) => ({ teamMembers: [...s.teamMembers, ...members] })),
    setMeta: (meta) => set({ meta }),
    setLoading: (loading) => set({ loading }),
    setError: (err) => set({ error: err }),
    clearTeamMembers: () => set({ teamMembers: [], meta: { totalItems: 0, totalPages: 0, currentPage: 1 } }),

    resetFilters: () => set({ searchTerm: '', roleFilter: null, currentPage: 1 }),
    resetPagination: () => set({ currentPage: 1 }),
}));