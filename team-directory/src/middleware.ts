import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    locales: ['en', 'ar'],
    defaultLocale: 'en'
});

export const config = {
    // This regex ignores api routes, static files, images, etc.
    matcher: ['/', '/(ar|en)/:path*']
};