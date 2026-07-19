import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://motioncommerce.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/dashboard/', '/builder/', '/account/', '/checkout/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
