import React from 'react';
import { COMPANY_INFO } from '@/lib/data/seedData';

interface SchemaMarkupProps {
  type?: 'Organization' | 'WebSite' | 'Service' | 'Article';
  data?: Record<string, unknown>;
}

export const SchemaMarkup: React.FC<SchemaMarkupProps> = ({ type = 'Organization', data }) => {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'ITServices',
    name: COMPANY_INFO.name,
    legalName: COMPANY_INFO.name,
    url: COMPANY_INFO.website,
    logo: `${COMPANY_INFO.website}/logo.png`,
    description: COMPANY_INFO.tagline,
    email: COMPANY_INFO.email,
    foundingDate: COMPANY_INFO.founded,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Sector 62',
      addressLocality: 'Noida',
      addressRegion: 'Uttar Pradesh',
      postalCode: '201309',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '28.6280',
      longitude: '77.3649'
    },
    sameAs: [
      COMPANY_INFO.socials.linkedin,
      COMPANY_INFO.socials.github,
      COMPANY_INFO.socials.twitter
    ],
    priceRange: '$$$$'
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: COMPANY_INFO.name,
    url: COMPANY_INFO.website,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${COMPANY_INFO.website}/blog?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };

  let schemaToRender: Record<string, unknown> = organizationSchema;

  if (type === 'WebSite') {
    schemaToRender = websiteSchema;
  } else if (type === 'Article' && data) {
    schemaToRender = {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: String(data.title || ''),
      description: String(data.excerpt || ''),
      author: {
        '@type': 'Person',
        name: (data.author as { name?: string })?.name || 'Ecreation IT Solution'
      },
      publisher: organizationSchema,
      datePublished: String(data.publishedAt || ''),
      dateModified: String(data.publishedAt || '')
    };
  } else if (type === 'Service' && data) {
    schemaToRender = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: String(data.title || ''),
      description: String(data.shortDescription || ''),
      provider: organizationSchema,
      serviceType: String(data.category || ''),
      areaServed: 'Worldwide'
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaToRender) }}
    />
  );
};
