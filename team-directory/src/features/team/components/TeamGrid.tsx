'use client';

import { useTranslations } from 'next-intl';
import { TeamMember } from '../types';
import { TeamMemberCard } from './TeamMemberCard';

interface TeamGridProps {
    data: TeamMember[];
    loading: boolean;
    onPaginationChange: (page: number) => void;
    currentPage: number;
    totalPages: number;
}

export const TeamGrid = ({
    data,
    loading,
    onPaginationChange,
    currentPage,
    totalPages
}: TeamGridProps) => {
    const t = useTranslations('teamDirectory');

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            onPaginationChange(newPage);
        }
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden animate-pulse">
                            <div className="p-6">
                                <div className="flex items-center gap-4">
                                    <div className="h-16 w-16 rounded-full bg-slate-200"></div>
                                    <div className="flex-1">
                                        <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                                        <div className="h-3 bg-slate-200 rounded w-1/2 mb-2"></div>
                                        <div className="h-4 bg-slate-200 rounded w-16"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between items-center p-4">
                    <div className="h-4 bg-slate-200 rounded w-32"></div>
                    <div className="flex space-x-2">
                        <div className="h-8 w-20 bg-slate-200 rounded"></div>
                        <div className="h-8 w-20 bg-slate-200 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-slate-500">{t('emptyState')}</div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((member) => (
                    <TeamMemberCard key={member.id} member={member} />
                ))}
            </div>
            {/* Pagination */}
            <div className="flex justify-between items-center p-4">
                <div className="text-sm text-slate-600">
                    {t('page')} {currentPage} {t('of')} {totalPages}
                </div>
                <div className="flex space-x-2">
                    <button
                        className={`px-4 py-2 rounded-lg ${currentPage === 1
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                            }`}
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        {t('previous')}
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg ${currentPage === totalPages
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                            }`}
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        {t('next')}
                    </button>
                </div>
            </div>
        </div>
    );
};