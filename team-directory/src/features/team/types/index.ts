export type View = 'table' | 'grid';

export type TeamRole = 'Admin' | 'Agent' | 'Creator';

export interface TeamMember {
    id: string;
    name: string;
    email: string;
    role: TeamRole;
    avatar: string;
}

export interface TeamMembersData {
    teamMembers: {
        data: TeamMember[];
        meta: {
            totalItems: number;
            totalPages: number;
            currentPage: number;
        };
    };
}

export interface UseTeamMembersProps {
    page: number;
    limit?: number;
    search?: string;
    role?: string | null;
}

export interface TeamMembersResponse {
    data: TeamMember[];
    meta: {
        totalItems: number;
        totalPages: number;
        currentPage: number;
    };
    loading: boolean;
    error: Error | null;
}

export interface FetchOptions {
    page?: number;
    limit?: number;
    search?: string;
    role?: string | null;
}

export interface TeamMemberCardProps {
    member: TeamMember;
}

export interface TeamTableProps {
    data: TeamMember[];
    loading: boolean;
    onPaginationChange: (page: number) => void;
    currentPage: number;
    totalPages: number;
}

export interface GenerateMetadataProps {
    params: Promise<{ locale: string; }>;
}

