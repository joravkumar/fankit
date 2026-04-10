import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      <nav>
        <Link href="/" className="nav-logo">
          Fan<span>Kit</span>
        </Link>
      </nav>

      <section className="not-found-section">
        <div className="not-found-glow" />
        <div className="hero-eyebrow">404</div>
        <h1 className="not-found-headline">
          Oops!<br />
          This page<br />
          <span className="accent">got lost.</span>
        </h1>
        <p className="not-found-sub">
          Looks like this link went missing in transit. Happens to parcels sometimes too — but we always track them down.
        </p>
        <div className="not-found-actions">
          <Link href="/" className="btn-primary">Back to home →</Link>
        </div>
      </section>
    </>
  )
}
