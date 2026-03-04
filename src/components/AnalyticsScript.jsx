import { Helmet } from 'react-helmet-async'

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID

export function AnalyticsScript() {
  if (!GA_ID) return null

  return (
    <Helmet>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </script>
    </Helmet>
  )
}
