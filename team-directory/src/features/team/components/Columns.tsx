import { ColumnDef } from '@tanstack/react-table';
import { TeamMember } from '../types';

export const columns: ColumnDef<TeamMember>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => {
            const member = row.original;
            return (
                <div className="flex items-center gap-4">
                    <img
                        src={member.avatar}
                        alt={member.name}
                        className="h-10 w-10 rounded-full object-cover border border-slate-200"
                    />
                    <span className="font-medium text-slate-900">{member.name}</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'role',
        header: 'Role',
        cell: ({ row }) => (
            <span className="text-slate-600">{row.getValue('role')}</span>
        ),
    },
    {
        accessorKey: 'email',
        header: 'Email',
        cell: ({ row }) => (
            <span className="text-slate-500">{row.getValue('email')}</span>
        ),
    },
];