import { useEffect, useState } from 'react'

export function navigate(path: string) {
  if (window.location.pathname !== path) {
    window.history.pushState({}, '', path)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }
  window.scrollTo({ top: 0, behavior: 'auto' })
}

export function navigateToSection(sectionId: string) {
  const sectionUrl = `/#${sectionId}`
  if (window.location.pathname !== '/' || window.location.hash !== `#${sectionId}`) {
    window.history.pushState({}, '', sectionUrl)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  window.requestAnimationFrame(() => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}

export function usePathname() {
  const [pathname, setPathname] = useState(window.location.pathname)

  useEffect(() => {
    const update = () => setPathname(window.location.pathname)
    window.addEventListener('popstate', update)
    return () => window.removeEventListener('popstate', update)
  }, [])

  return pathname
}
