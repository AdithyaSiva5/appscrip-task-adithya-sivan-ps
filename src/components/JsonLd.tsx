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
      "https://github.com/yourusername",
      "https://linkedin.com/in/yourusername"
    ]
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Adithya's E-commerce Store",
    "url": "https://your-domain.vercel.app"
  }

  const productsSchema = products?.map(product => ({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name || '',
    "image": product.image || '',
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    // Optional fields
    "brand": {
      "@type": "Brand",
      "name": product.brand || ''
    },
    ...(product.category && {
      "category": product.category
    }),
    // Add any other fields that exist in your Product type
    ...(product.customizable && {
      "customizable": product.customizable
    }),
    ...(product.idealFor && {
      "audience": {
        "@type": "Audience",
        "audienceType": product.idealFor.join(', ')
      }
    })
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