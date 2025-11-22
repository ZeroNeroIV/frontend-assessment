import { getTranslations } from "next-intl/server";


export default async function TeamDirectoryHeading() {
    const t = await getTranslations();
    return (
        <section className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">{t('teamDirectory.metadata.title')}</h1>
            <p className="text-slate-600">{t('teamDirectory.metadata.description')}</p>
        </section>
    );
}