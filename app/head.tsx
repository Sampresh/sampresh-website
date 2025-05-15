export default function Head() {
  return (
    <>
      {/* Preload critical resources */}
      <link rel="preload" href="/images/profile.jpeg" as="image" />

      {/* Add preconnect for external resources */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* Add resource hints */}
      <link rel="dns-prefetch" href="https://github.com" />
      <link rel="dns-prefetch" href="https://linkedin.com" />

      {/* Add performance optimization meta tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </>
  )
}
