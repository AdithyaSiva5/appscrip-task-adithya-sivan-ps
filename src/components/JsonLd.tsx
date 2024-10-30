// app/components/JsonLd.tsx
import { Product } from '@/types/Product'

interface JsonLdProps {
    products?: Product[]
}

export default function JsonLd({ products }: JsonLdProps) {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Adithya's E-commerce Store",
        "url": "https://your-domain.vercel.app",
        "logo": "https://your-domain.vercel.app/logo.png",
        "sameAs": [
            "https://twitter.com/yourusername",
            "https://linkedin.com/in/yourusername"
        ]
    }

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Adithya's E-commerce Store",
        "url": "https://your-domain.vercel.app",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://your-domain.vercel.app/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    }

    const productsSchema = products?.map(product => ({
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "description": product.description,
        "image": product.imageUrl,
        "offers": {
            "@type": "Offer",
            "price": product.price,
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
        }
    }))

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(organizationSchema)
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(websiteSchema)
                }}
            />
            {products && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(productsSchema)
                    }}
                />
            )}
        </>
    )
}