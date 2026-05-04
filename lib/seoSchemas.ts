import { BASE_URL } from "./metadata"

export interface FAQItem {
  question: string
  answer: string
}

export function buildFAQPageSchema(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((q) => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer,
      },
    })),
  }
}

interface ServiceSchemaParams {
  locale: string
  path: string
  nameEs: string
  nameEn: string
  descriptionEs: string
  descriptionEn: string
  serviceType: string
  priceRange?: string
  offerPriceEs?: number
  offerPriceEn?: number
  areaServed?: string[]
  audienceTypes?: string[]
}

export function buildServiceSchema(p: ServiceSchemaParams) {
  const isEn = p.locale === "en"
  const url = `${BASE_URL}/${p.locale}${p.path}`
  const offers: any = {}
  if (p.offerPriceEs && !isEn) {
    offers.offers = {
      "@type": "Offer",
      "price": p.offerPriceEs,
      "priceCurrency": "PEN",
      "availability": "https://schema.org/InStock",
      "url": url,
    }
  }
  if (p.offerPriceEn && isEn) {
    offers.offers = {
      "@type": "Offer",
      "price": p.offerPriceEn,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": url,
    }
  }
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": isEn ? p.nameEn : p.nameEs,
    "description": isEn ? p.descriptionEn : p.descriptionEs,
    "provider": { "@id": `${BASE_URL}/#organization` },
    "serviceType": p.serviceType,
    "areaServed": (p.areaServed ?? ["PE", "US"]).map((c) => ({ "@type": "Country", "name": c })),
    "audience": (p.audienceTypes ?? ["Small business", "Medium business", "Enterprise"]).map((a) => ({
      "@type": "Audience",
      "audienceType": a,
    })),
    "url": url,
    ...(p.priceRange && { "priceRange": p.priceRange }),
    ...offers,
  }
}

interface ItemListServiceParams {
  locale: string
  items: { name: string; path: string; description: string }[]
}

export function buildServiceItemList(p: ItemListServiceParams) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": p.items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "url": `${BASE_URL}/${p.locale}${item.path}`,
      "name": item.name,
      "description": item.description,
    })),
  }
}
