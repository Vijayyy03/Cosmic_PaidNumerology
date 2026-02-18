import { Helmet } from 'react-helmet-async';

const SeoHead = ({ title, description, keywords, canonicalUrl, ogImage, ogType = 'website', schema }) => {
    const siteUrl = window.location.origin;
    const fullUrl = canonicalUrl ? (canonicalUrl.startsWith('http') ? canonicalUrl : `${siteUrl}${canonicalUrl}`) : siteUrl;
    const fullImage = ogImage ? (ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`) : `${siteUrl}/images/Numerology_Banner.jpg`;

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{title} | Shiv Cosmic Numerology</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={fullImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={fullUrl} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={fullImage} />

            {/* Structural Data (JSON-LD) for AEO/GEO */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
};

export default SeoHead;
