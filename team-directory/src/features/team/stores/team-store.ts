import { create } from 'zustand';

interface TeamState {
    viewMode: 'grid' | 'table';
    searchTerm: string;
    roleFilter: string | null;
    currentPage: number;
    totalPages: number;
    setSearchTerm: (term: string) => void;
    setRoleFilter: (role: string | null) => void;
    setViewMode: (mode: 'grid' | 'table') => void;
    setCurrentPage: (page: number) => void;
    setTotalPages: (pages: number) => void;
    resetFilters: () => void;
    resetPagination: () => void;
}

export const useTeamStore = create<TeamState>((set) => ({
    viewMode: 'table',
    searchTerm: '',
    roleFilter: null,
    currentPage: 1,
    totalPages: 1,
    setSearchTerm: (term) => set({ searchTerm: term, currentPage: 1 }),
    setRoleFilter: (role) => set({ roleFilter: role, currentPage: 1 }),
    setViewMode: (mode) => set({ viewMode: mode }),
    setCurrentPage: (page) => set({ currentPage: page }),
    setTotalPages: (pages) => set({ totalPages: pages }),
    resetFilters: () => set({ searchTerm: '', roleFilter: null, currentPage: 1 }),
    resetPagination: () => set({ currentPage: 1 }),
}));