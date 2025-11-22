import TeamDirectoryClientWrapper from '@/features/team/components/TeamDirectoryClientWrapper';
import TeamDirectoryHeading from '@/features/team/components/TeamDirectoryHeading.tsx';
import type { GenerateMetadataProps } from '@/features/team/types/index.ts';
import { getMessages } from 'next-intl/server';

// Dynamic SEO Metadata
export async function generateMetadata({ params }: GenerateMetadataProps) {
    const { locale } = await params;
    const messages = await getMessages({ locale });

    return {
        title: messages.teamDirectory?.title || messages.teamDirectory?.metadata?.title,
        description: messages.teamDirectory?.description || messages.teamDirectory?.metadata?.description,
        openGraph: {
            title: messages.teamDirectory?.title || messages.teamDirectory?.metadata?.title,
            description: messages.teamDirectory?.description || messages.teamDirectory?.metadata?.description,
            type: 'website',
        },
    };
}

export default function TeamDirectoryPage() {
    return (
        <section className="max-w-full min-w-9/12 px-4 py-6 text-black sm:px-6 sm:py-8 sm:max-w-7xl mx-auto lg:px-8">
            <section className="sm:max-w-3xl mx-auto min-w-11/12">
                <TeamDirectoryHeading />
                <TeamDirectoryClientWrapper />
            </section>
        </section>
    );
}