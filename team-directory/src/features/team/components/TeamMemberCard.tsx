'use client';

import { TeamMemberCardProps } from '../types';

export const TeamMemberCard = ({ member }: TeamMemberCardProps) => {

    return (
        <section className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
            <section className="p-6">
                <section className="flex items-center gap-4">
                    <img
                        src={member.avatar}
                        alt={member.name}
                        className="h-16 w-16 rounded-full object-cover border border-slate-200"
                    />
                    <section>
                        <h3 className="font-medium text-slate-900">{member.name}</h3>
                        <p className="text-slate-600 text-sm">{member.email}</p>
                        <article className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                            {member.role}
                        </article>
                    </section>
                </section>
            </section>
        </section>
    );
};