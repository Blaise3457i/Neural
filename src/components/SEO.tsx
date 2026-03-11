import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface SEOData {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  canonicalURL: string;
  openGraphTitle: string;
  openGraphDescription: string;
  openGraphImage: string;
  robotsIndex: boolean;
  structuredData?: any;
}

interface SEOProps {
  pageId?: string; // For static pages like 'homepage', 'tools', etc.
  dynamicData?: {
    title?: string;
    description?: string;
    keywords?: string;
    ogImage?: string;
    canonical?: string;
  };
  structuredData?: any;
  type?: 'website' | 'article' | 'software';
}

export function SEO({ pageId, dynamicData, structuredData, type = 'website' }: SEOProps) {
  const [seo, setSeo] = useState<SEOData | null>(null);

  useEffect(() => {
    async function fetchSEO() {
      if (pageId) {
        try {
          const docRef = doc(db, 'seo_pages', pageId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setSeo(docSnap.data() as SEOData);
          }
        } catch (error) {
          console.error('Error fetching SEO data:', error);
        }
      }
    }
    fetchSEO();
  }, [pageId]);

  const finalData: SEOData = {
    metaTitle: dynamicData?.title || seo?.metaTitle || 'Neural - AI Tools & Resources',
    metaDescription: dynamicData?.description || seo?.metaDescription || 'Discover the best AI tools, prompts, and tutorials.',
    metaKeywords: dynamicData?.keywords || seo?.metaKeywords || 'AI, tools, prompts, tutorials',
    canonicalURL: dynamicData?.canonical || seo?.canonicalURL || window.location.href,
    openGraphTitle: dynamicData?.title || seo?.openGraphTitle || seo?.metaTitle || 'Neural',
    openGraphDescription: dynamicData?.description || seo?.openGraphDescription || seo?.metaDescription || '',
    openGraphImage: dynamicData?.ogImage || seo?.openGraphImage || 'https://ai-free-hub-phi.vercel.app/og-image.jpg',
    robotsIndex: seo?.robotsIndex !== undefined ? seo.robotsIndex : true,
    structuredData: structuredData || seo?.structuredData,
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{finalData.metaTitle}</title>
      <meta name="description" content={finalData.metaDescription} />
      <meta name="keywords" content={finalData.metaKeywords} />
      <link rel="canonical" href={finalData.canonicalURL} />
      <meta name="robots" content={finalData.robotsIndex ? 'index, follow' : 'noindex, nofollow'} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type === 'article' ? 'article' : 'website'} />
      <meta property="og:url" content={finalData.canonicalURL} />
      <meta property="og:title" content={finalData.openGraphTitle} />
      <meta property="og:description" content={finalData.openGraphDescription} />
      <meta property="og:image" content={finalData.openGraphImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={finalData.canonicalURL} />
      <meta property="twitter:title" content={finalData.openGraphTitle} />
      <meta property="twitter:description" content={finalData.openGraphDescription} />
      <meta property="twitter:image" content={finalData.openGraphImage} />

      {/* Structured Data */}
      {finalData.structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(finalData.structuredData)}
        </script>
      )}
    </Helmet>
  );
}
