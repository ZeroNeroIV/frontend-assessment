import { NextIntlClientProvider } from 'next-intl';
import { Inter } from 'next/font/google';
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
    let { locale } = await params;

    if (!['en', 'ar'].includes(locale)) {
        console.error('This language is not supported: ', locale, '\nFalling back to English messages!');
        locale = 'en';
    }

    const direction = locale == 'ar' ? 'rtl' : 'ltr';

    let messages;
    try {
        messages = await getMessages({ locale });
    } catch (error) {
        console.error('Failed to load messages:', error, "\nFalling back to English messages!");
        // Fallback to English messages
        messages = await getMessages({ locale: 'en' });
    }

    return (
        <html lang={locale} dir={direction}>
            <body className={`${inter.className} antialiased`}>
                <section className="bg-[#eeeeff] min-h-screen mx-auto">
                    <NextIntlClientProvider messages={messages} locale={locale}>
                        {children}
                    </NextIntlClientProvider>
                </section>
            </body>
        </html>
    );
}