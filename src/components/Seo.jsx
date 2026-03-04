import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'Internet Is Beautiful'
const DEFAULT_DESC = 'Curated Web3 apps, hidden gems, tools for blockchain builders, and hand-picked resources. Straight to your inbox.'

export function Seo({ title, description = DEFAULT_DESC, image, path = '' }) {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://internetisbeautiful.io'
  const url = `${baseUrl}${path}`
  const ogImage = image || `${baseUrl}/og-image.svg`

  return (
    <Helmet>
      <title>{title ? `${title} | ${SITE_NAME}` : SITE_NAME}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title ? `${title} | ${SITE_NAME}` : SITE_NAME} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={SITE_NAME} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title ? `${title} | ${SITE_NAME}` : SITE_NAME} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  )
}
