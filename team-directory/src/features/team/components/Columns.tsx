import Image from 'next/image';
import { ColumnDef } from '@tanstack/react-table';
import { TeamMember } from '../types';

export const columns: ColumnDef<TeamMember>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => {
            const member = row.original;
            return (
                <section className="flex items-center gap-4">
                    <section className="relative h-10 w-10 rounded-full overflow-hidden border border-slate-200">
                        <Image src={member.avatar} alt={member.name} fill sizes="40px" className="object-cover" />
                    </section>
                    <article className="font-medium text-slate-900">{member.name}</article>
                </section>
            );
        },
    },
    {
        accessorKey: 'role',
        header: 'Role',
        cell: ({ row }) => (
            <article className="text-slate-600">{row.getValue('role')}</article>
        ),
    },
    {
        accessorKey: 'email',
        header: 'Email',
        cell: ({ row }) => (
            <article className="text-slate-500">{row.getValue('email')}</article>
        ),
    },
];