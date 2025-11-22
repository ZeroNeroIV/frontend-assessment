import TeamDirectoryClientWrapper from '@/features/team/components/TeamDirectoryClientWrapper';
import TeamDirectoryHeading from '@/features/team/components/TeamDirectoryHeading.tsx';
import { getMessages } from 'next-intl/server';

// Dynamic SEO Metadata
export async function generateMetadata({ params: { locale } }: { params: { locale: string; }; }) {
    const messages = await getMessages({ locale: locale });

    return {
        title: messages['teamDirectory.metadata.title'],
        description: messages['teamDirectory.metadata.description'],
        openGraph: {
            title: messages['teamDirectory.metadata.title'],
            description: messages['teamDirectory.metadata.description'],
            type: 'website',
        },
    };
}

export default function TeamDirectoryPage() {

    return (
        <section className="bg-[#eeeeff] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-black">
            <TeamDirectoryHeading />

            <TeamDirectoryClientWrapper />
        </section>
    );
}