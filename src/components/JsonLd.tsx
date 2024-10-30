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
        "url": "https://appscrip-task-adithya-sivan-ps.vercel.app/"
    }

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Adithya's E-commerce Store",
        "url": "https://appscrip-task-adithya-sivan-ps.vercel.app/"
    }

    const productsSchema = products?.map(product => ({
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "image": product.image,
        "offers": {
            "@type": "Offer",
            "price": product.price,
            "priceCurrency": "USD"
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
            {products && products.length > 0 && (
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