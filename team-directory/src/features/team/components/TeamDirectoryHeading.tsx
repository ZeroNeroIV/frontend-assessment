'use client';

import { useTranslations } from "next-intl";

export default function TeamDirectoryHeading() {
    const t = useTranslations('teamDirectory');
    return (
        <section className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">{t('title')}</h1>
            <p className="text-slate-600">{t('description')}</p>
        </section>
    );
}