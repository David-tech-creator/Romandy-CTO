import createIntlMiddleware from 'next-intl/middleware'

export default createIntlMiddleware({
  locales: ['en', 'fr'],
  defaultLocale: 'en',
})

export const config = {
  matcher: ['/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)'],
}
