import { NextIntlClientProvider } from 'next-intl';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import '@/app/globals.css';
import { getMessages } from 'next-intl/server';

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string; }>;
}) {
    const { locale } = await params;
    // Validate locale
    if (!['en', 'ar'].includes(locale)) {
        notFound();
    }

    const direction = locale === 'ar' ? 'rtl' : 'ltr';

    // Use our custom getMessages function
    let messages;
    try {
        messages = await getMessages({ locale: locale });
    } catch (error) {
        console.error('Failed to load messages:', error);
        // Fallback to English messages
        messages = await getMessages({ locale: 'en' });
    }

    return (
        <html lang={locale} dir={direction}>
            <body className={`${inter.className} bg-[#ffffff] min-h-screen antialiased`}>
                <NextIntlClientProvider messages={messages} locale={locale}>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}