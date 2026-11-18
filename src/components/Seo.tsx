import { useEffect } from 'react'

type SeoProps = {
  title: string
  description: string
  path: string
  type?: 'website' | 'article'
  structuredData?: object
}

export default function Seo({ title, description, path, type = 'website', structuredData }: SeoProps) {
  useEffect(() => {
    const url = `https://goryzer.online${path}`
    document.title = title

    const setMeta = (selector: string, attribute: string, content: string) => {
      let element = document.head.querySelector(selector) as HTMLMetaElement | null
      if (!element) {
        element = document.createElement('meta')
        const [name, value] = selector.includes('[name=') ? ['name', selector.match(/name="([^"]+)"/)?.[1] ?? ''] : ['property', selector.match(/property="([^"]+)"/)?.[1] ?? '']
        element.setAttribute(name, value)
        document.head.appendChild(element)
      }
      element.setAttribute(attribute, content)
    }

    setMeta('meta[name="description"]', 'content', description)
    setMeta('meta[property="og:title"]', 'content', title)
    setMeta('meta[property="og:description"]', 'content', description)
    setMeta('meta[property="og:type"]', 'content', type)
    setMeta('meta[property="og:url"]', 'content', url)
    setMeta('meta[property="og:site_name"]', 'content', 'GoRyzer')
    setMeta('meta[name="twitter:card"]', 'content', 'summary')
    setMeta('meta[name="twitter:title"]', 'content', title)
    setMeta('meta[name="twitter:description"]', 'content', description)

    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url

    let script = document.getElementById('route-schema') as HTMLScriptElement | null
    if (!script) {
      script = document.createElement('script')
      script.id = 'route-schema'
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }
    const schemaNodes: Record<string, unknown>[] = [
      {
        '@type': 'Organization',
        name: 'GoRyzer',
        url: 'https://goryzer.online/',
        email: 'goryzercorporation@gmail.com',
        founder: [
          { '@type': 'Person', name: 'SILAPARASETTI DEEPAK SURYA MANI LAKSHMAN', jobTitle: 'Founder' },
          { '@type': 'Person', name: 'SILAPARASETTI DEEKSHITH SATYA SAI RAM', jobTitle: 'Founder' },
        ],
      },
      {
        '@type': 'WebSite',
        name: 'GoRyzer',
        url: 'https://goryzer.online/',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://goryzer.online/' },
          ...(path === '/' ? [] : path.split('/').filter(Boolean).map((part, index, parts) => ({
            '@type': 'ListItem',
            position: index + 2,
            name: index === parts.length - 1 ? title : part.replace(/-/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase()),
            item: `https://goryzer.online/${parts.slice(0, index + 1).join('/')}`,
          }))),
        ],
      },
    ]

    if (structuredData) {
      const pageSchema = { ...structuredData } as Record<string, unknown>
      delete pageSchema['@context']
      schemaNodes.push(pageSchema)
    }

    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': schemaNodes,
    })
  }, [title, description, path, type, structuredData])

  return null
}
