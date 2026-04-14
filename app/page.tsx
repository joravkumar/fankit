'use client'

import { useEffect } from 'react'

export default function Home() {

  useEffect(() => {
    // Intersection Observer for reveal animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((el) => {
          if (el.isIntersecting) {
            el.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 },
    )

    document
      .querySelectorAll('.reveal, .step')
      .forEach((el) => observer.observe(el))

    // Revenue split bar animation
    const splitObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((el) => {
          if (el.isIntersecting) {
            const fill = document.getElementById('splitFill')
            if (fill) fill.classList.add('animate')
          }
        })
      },
      { threshold: 0.3 },
    )

    const splitFill = document.getElementById('splitFill')
    if (splitFill) {
      const howVisual = splitFill.closest('.how-visual')
      if (howVisual) splitObserver.observe(howVisual)
    }

    // Smooth scroll for anchor links
    const handleAnchorClick = (e: Event) => {
      const anchor = e.currentTarget as HTMLAnchorElement
      const href = anchor.getAttribute('href')
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href)
        if (target) {
          e.preventDefault()
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
    }

    const anchorLinks = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')
    anchorLinks.forEach((a) => a.addEventListener('click', handleAnchorClick))

    // Hamburger menu
    const hamburger = document.getElementById('hamburger')
    const mobileMenu = document.getElementById('mobileMenu')

    const handleHamburger = () => {
      hamburger?.classList.toggle('open')
      mobileMenu?.classList.toggle('open')
      document.body.style.overflow = mobileMenu?.classList.contains('open')
        ? 'hidden'
        : ''
    }

    hamburger?.addEventListener('click', handleHamburger)

    const handleMobileLink = () => {
      hamburger?.classList.remove('open')
      mobileMenu?.classList.remove('open')
      document.body.style.overflow = ''
    }

    document
      .querySelectorAll('.mobile-link, .mobile-cta')
      .forEach((a) => a.addEventListener('click', handleMobileLink))

    // FAQ accordion
    const handleFaqClick = (e: Event) => {
      const btn = e.currentTarget as HTMLButtonElement
      const item = btn.parentElement
      if (!item) return
      const isOpen = item.classList.contains('open')
      document.querySelectorAll('.faq-item').forEach((i) => {
        i.classList.remove('open')
        i.querySelector('.faq-q')?.setAttribute('aria-expanded', 'false')
      })
      if (!isOpen) {
        item.classList.add('open')
        btn.setAttribute('aria-expanded', 'true')
      }
    }

    document
      .querySelectorAll('.faq-q')
      .forEach((btn) => btn.addEventListener('click', handleFaqClick))

    // CTA form — builds email message
    const ctaForm = document.getElementById('ctaForm') as HTMLFormElement | null
    const handleCtaSubmit = (e: Event) => {
      e.preventDefault()
      const name = (document.getElementById('ctaName') as HTMLInputElement)?.value.trim()
      const handle = (document.getElementById('ctaHandle') as HTMLInputElement)?.value.trim()
      const subject = encodeURIComponent('Free Merch Mockup Request')
      const body = encodeURIComponent(
        `Hi FanKit! I'd love a free merch mockup.\n\nName: ${name}\nInstagram: ${handle}`,
      )
      window.open(`mailto:hello@fankit.in?subject=${subject}&body=${body}`, '_blank')
    }

    ctaForm?.addEventListener('submit', handleCtaSubmit)

    // Staggered step reveals
    const steps = document.querySelectorAll('.step')
    const stepObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 100)
          }
        })
      },
      { threshold: 0.1 },
    )

    steps.forEach((step) => stepObserver.observe(step))

    return () => {
      observer.disconnect()
      splitObserver.disconnect()
      stepObserver.disconnect()
      anchorLinks.forEach((a) => a.removeEventListener('click', handleAnchorClick))
      hamburger?.removeEventListener('click', handleHamburger)
      document
        .querySelectorAll('.mobile-link, .mobile-cta')
        .forEach((a) => a.removeEventListener('click', handleMobileLink))
      document
        .querySelectorAll('.faq-q')
        .forEach((btn) => btn.removeEventListener('click', handleFaqClick))
      ctaForm?.removeEventListener('submit', handleCtaSubmit)
    }
  }, [])

  return (
    <>
      {/* ─── NAV ─── */}
      <nav>
        <a href="/" className="nav-logo">
          Fan<span>Kit</span>
        </a>
        <ul className="nav-links">
          <li><a href="#how">How it works</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#niches">Niches</a></li>
          <li>
            <a href="https://instagram.com/fankit.in" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </li>
        </ul>
        <a href="#cta" className="nav-cta">Get started →</a>
        <button className="hamburger" id="hamburger" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </nav>

      {/* ─── MOBILE MENU ─── */}
      <div className="mobile-menu" id="mobileMenu">
        <a href="#how" className="mobile-link">How it works</a>
        <a href="#pricing" className="mobile-link">Pricing</a>
        <a href="#niches" className="mobile-link">Niches</a>
        <a href="https://instagram.com/fankit.in" target="_blank" rel="noopener noreferrer" className="mobile-link">Instagram</a>
        <a href="#cta" className="mobile-cta">Get started →</a>
      </div>

      {/* ─── HERO ─── */}
      <section className="hero">
        <div className="hero-eyebrow">Made with love for Indian creators ✨</div>
        <h1 className="hero-headline">
          LET&apos;S TURN<br />YOUR AUDIENCE<br />INTO YOUR<br /><span className="accent">BIGGEST FANS.</span>
        </h1>
        <p className="hero-sub">
          You make the content. We&apos;ll handle the merch — design, store, shipping, and everything in between. You just keep creating. 🎨
        </p>
        <div className="hero-actions">
          <a href="#cta" className="btn-primary">Start for free →</a>
          <a href="#how" className="btn-secondary">See how it works</a>
        </div>
        <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-num">60<span>%</span></div>
            <div className="stat-label">Revenue is yours</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">5</div>
            <div className="stat-label">Days to go live</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">₹0</div>
            <div className="stat-label">No setup cost</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">4.5<span>M</span></div>
            <div className="stat-label">Creators waiting for this</div>
          </div>
        </div>
      </section>

      {/* ─── MARQUEE ─── */}
      <div className="marquee-section">
        <div className="marquee-track">
          <div className="marquee-item">
            CUSTOM TSHIRTS <span className="marquee-dot"></span>
          </div>
          <div className="marquee-item">
            HOODIES <span className="marquee-dot"></span>
          </div>
          <div className="marquee-item">
            PHONE CASES <span className="marquee-dot"></span>
          </div>
          <div className="marquee-item">
            KEYCHAINS <span className="marquee-dot"></span>
          </div>
          <div className="marquee-item">
            YOUR BRAND <span className="marquee-dot"></span>
          </div>
          <div className="marquee-item">
            YOUR AUDIENCE <span className="marquee-dot"></span>
          </div>
          <div className="marquee-item">
            YOUR REVENUE <span className="marquee-dot"></span>
          </div>
          <div className="marquee-item">
            DONE FOR YOU <span className="marquee-dot"></span>
          </div>
          <div className="marquee-item">
            CUSTOM TSHIRTS <span className="marquee-dot"></span>
          </div>
          <div className="marquee-item">
            HOODIES <span className="marquee-dot"></span>
          </div>
          <div className="marquee-item">
            PHONE CASES <span className="marquee-dot"></span>
          </div>
          <div className="marquee-item">
            KEYCHAINS <span className="marquee-dot"></span>
          </div>
          <div className="marquee-item">
            YOUR BRAND <span className="marquee-dot"></span>
          </div>
          <div className="marquee-item">
            YOUR AUDIENCE <span className="marquee-dot"></span>
          </div>
          <div className="marquee-item">
            YOUR REVENUE <span className="marquee-dot"></span>
          </div>
          <div className="marquee-item">
            DONE FOR YOU <span className="marquee-dot"></span>
          </div>
        </div>
      </div>

      {/* ─── HOW IT WORKS ─── */}
      <section className="how" id="how">
        <div className="section-label">the process</div>
        <h2 className="section-headline reveal">Four steps.<br />You&apos;ll love how easy this is.</h2>
        <p className="section-sub reveal">
          From your first message to your first sale — in under a week.
        </p>

        <div className="how-grid">
          <div className="steps">
            <div className="step reveal">
              <div className="step-num">01</div>
              <div className="step-content">
                <div className="step-title">We design your merch</div>
                <div className="step-desc">
                  Our designer crafts 6–8 products around your content: your
                  catchphrases, your aesthetic, your vibe. Not generic templates.
                  Actual merch your audience will want to wear.
                </div>
              </div>
            </div>
            <div className="step reveal">
              <div className="step-num">02</div>
              <div className="step-content">
                <div className="step-title">We build your store</div>
                <div className="step-desc">
                  Your own branded store at{' '}
                  <span className="domain-pill">merch.<em>yourname</em>.in</span>. Fully set up with
                  print-on-demand fulfillment and Indian payments including UPI and COD. Ready to sell from day one.
                </div>
              </div>
            </div>
            <div className="step reveal">
              <div className="step-num">03</div>
              <div className="step-content">
                <div className="step-title">You post once</div>
                <div className="step-desc">
                  Tell your audience the store is live. Two posts minimum. Your
                  community converts because they trust you — and honestly, they&apos;ve been waiting for this.
                </div>
              </div>
            </div>
            <div className="step reveal">
              <div className="step-num">04</div>
              <div className="step-content">
                <div className="step-title">We handle everything else</div>
                <div className="step-desc">
                  Orders come in. We print, pack, and ship. You get 60% of every
                  sale deposited by the 5th of every month. Weekly earnings
                  update on email. 🎉
                </div>
              </div>
            </div>
          </div>

          <div className="how-visual reveal">
            <div className="split-label">Revenue split per order</div>
            <div className="split-bar">
              <div className="split-fill" id="splitFill"></div>
            </div>
            <div className="split-row">
              <div>
                <div className="split-pct" style={{color: 'var(--coral)'}}>60%</div>
                <div className="split-who">Your earnings</div>
              </div>
              <div style={{textAlign: 'right'}}>
                <div className="split-pct" style={{color: 'var(--charcoal-dim)'}}>40%</div>
                <div className="split-who">FanKit</div>
              </div>
            </div>
            <div className="split-row">
              <div className="split-who">Products included</div>
            </div>
            <div className="product-tags">
              <span className="tag active">Tshirts</span>
              <span className="tag active">Hoodies</span>
              <span className="tag active">Phone cases</span>
              <span className="tag active">Keychains</span>
              <span className="tag">Mugs</span>
              <span className="tag">Caps</span>
              <span className="tag">Stickers</span>
              <span className="tag">Tote bags</span>
            </div>
            <div
              style={{
                marginTop: '28px',
                paddingTop: '24px',
                borderTop: '1px solid var(--charcoal-faint)',
              }}
            >
              <div className="split-label" style={{marginBottom: '8px'}}>
                Example earnings at 50 orders/month
              </div>
              <div className="split-row">
                <div className="split-who">Avg order value</div>
                <div style={{fontWeight: 500, fontSize: '14px'}}>₹599</div>
              </div>
              <div className="split-row">
                <div className="split-who">Monthly GMV</div>
                <div style={{fontWeight: 500, fontSize: '14px'}}>₹29,950</div>
              </div>
              <div className="split-row">
                <div className="split-who">Your 60% earnings</div>
                <div style={{fontWeight: 500, fontSize: '14px', color: 'var(--coral)'}}>
                  ₹17,970
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHY FANKIT ─── */}
      <section id="why">
        <div className="section-label">why fankit</div>
        <h2 className="section-headline reveal">Built for Indian creators.<br />With love. 🇮🇳</h2>
        <p className="section-sub reveal">
          Not a global platform trying to fit India. Built here, for here, by people who get it.
        </p>

        <div className="why-grid reveal">
          <div className="why-card">
            <div className="why-icon">🎨</div>
            <div className="why-title">Custom Design</div>
            <div className="why-desc">
              Every design is made for you specifically. Your catchphrases, your
              aesthetic, your community identity. Not a Canva template.
            </div>
          </div>
          <div className="why-card">
            <div className="why-icon">📦</div>
            <div className="why-title">Not Your Problem</div>
            <div className="why-desc">
              Printing, packaging, shipping, returns, COD handling, GST filing. All on us. You never touch a single parcel.
            </div>
          </div>
          <div className="why-card">
            <div className="why-icon">💸</div>
            <div className="why-title">UPI + COD Ready</div>
            <div className="why-desc">
              Your store accepts UPI, cards, net banking, and Cash on Delivery.
              Because your audience pays the Indian way.
            </div>
          </div>
          <div className="why-card">
            <div className="why-icon">⚡</div>
            <div className="why-title">Live in 5 Days</div>
            <div className="why-desc">
              From your first DM to a live store: 5 days. No waiting. No
              back-and-forth. Designed, built, and ready to launch.
            </div>
          </div>
          <div className="why-card">
            <div className="why-icon">📊</div>
            <div className="why-title">Weekly Reports</div>
            <div className="why-desc">
              Every Monday you get your order count, total earnings, and
              top-selling product on email. No dashboard needed. 😊
            </div>
          </div>
          <div className="why-card">
            <div className="why-icon">🔗</div>
            <div className="why-title">Your Own Domain</div>
            <div className="why-desc">
              Your store lives at{' '}
              <span className="domain-pill">merch.<em>yourname</em>.in</span>, not on some marketplace
              where your buyer sees 10 competitors. Your brand, your URL.
            </div>
          </div>
        </div>
      </section>

      {/* ─── STORE MOCKUP ─── */}
      <section className="mockup-section">
        <div className="section-label">what you get</div>
        <h2 className="section-headline reveal">Your store,<br />ready to sell. 🛍️</h2>
        <p className="section-sub reveal">
          This is what your audience sees. Fully branded, your domain, your products.
        </p>
        <div className="store-frame reveal">
          <div className="store-bar">
            <div className="store-dots">
              <div className="store-dot"></div>
              <div className="store-dot"></div>
              <div className="store-dot"></div>
            </div>
            <div className="store-url">merch.<em>yourchannel</em>.in</div>
          </div>
          <div className="store-body">
            <div className="store-brand">YOURCHANNEL</div>
            <div className="store-tagline">Official merch. Wear the vibe.</div>
            <div className="store-products">
              <div className="store-product">
                <div className="store-product-icon">👕</div>
                <div className="store-product-name">Signature Tee</div>
                <div className="store-product-price">₹599</div>
                <div className="store-product-btn">Add to cart</div>
              </div>
              <div className="store-product">
                <div className="store-product-icon">🧥</div>
                <div className="store-product-name">Core Hoodie</div>
                <div className="store-product-price">₹1,299</div>
                <div className="store-product-btn">Add to cart</div>
              </div>
              <div className="store-product">
                <div className="store-product-icon">📱</div>
                <div className="store-product-name">Phone Case</div>
                <div className="store-product-price">₹349</div>
                <div className="store-product-btn">Add to cart</div>
              </div>
            </div>
          </div>
        </div>
        <p className="store-note reveal">Designs, branding, and store name are all yours. We build it around your content.</p>
      </section>

      {/* ─── NICHES ─── */}
      <section className="niche" id="niches">
        <div className="section-label">who we work with</div>
        <h2 className="section-headline reveal">Every niche.<br />One partner. 🤝</h2>

        <div className="niche-grid reveal">
          <div className="niche-card">
            <div className="niche-emoji">💻</div>
            <div className="niche-name">Tech creators</div>
            <div className="niche-sub">
              Coding humor, startup culture, developer life
            </div>
          </div>
          <div className="niche-card">
            <div className="niche-emoji">💪</div>
            <div className="niche-name">Fitness creators</div>
            <div className="niche-sub">Gym culture, nutrition, mindset, hustle</div>
          </div>
          <div className="niche-card">
            <div className="niche-emoji">😂</div>
            <div className="niche-name">Comedy &amp; memes</div>
            <div className="niche-sub">Desi humor, regional jokes, viral moments</div>
          </div>
          <div className="niche-card">
            <div className="niche-emoji">🎌</div>
            <div className="niche-name">Anime fans</div>
            <div className="niche-sub">
              Fan communities, original designs, niche culture
            </div>
          </div>
          <div className="niche-card">
            <div className="niche-emoji">🍛</div>
            <div className="niche-name">Food creators</div>
            <div className="niche-sub">
              Food culture, reviews, regional cuisine pride
            </div>
          </div>
          <div className="niche-card">
            <div className="niche-emoji">✈️</div>
            <div className="niche-name">Travel creators</div>
            <div className="niche-sub">Wanderlust, city pride, adventure culture</div>
          </div>
          <div className="niche-card">
            <div className="niche-emoji">🎮</div>
            <div className="niche-name">Gaming creators</div>
            <div className="niche-sub">
              Esports, streaming culture, game references
            </div>
          </div>
          <div className="niche-card">
            <div className="niche-emoji">🌏</div>
            <div className="niche-name">Regional creators</div>
            <div className="niche-sub">
              Hindi, Tamil, Punjabi, Telugu. Local pride.
            </div>
          </div>
        </div>
      </section>

      {/* ─── NUMBERS ─── */}
      <section className="numbers">
        <div className="section-label">the market</div>
        <h2 className="section-headline reveal">
          Big market.<br />And we&apos;re just getting started. 🚀
        </h2>
        <p className="section-sub reveal">
          India&apos;s creator economy is exploding. Nobody is doing this for them.
        </p>

        <div className="numbers-grid reveal">
          <div className="number-cell">
            <div className="number-big">₹3,600<span>Cr</span></div>
            <div className="number-label">Indian influencer market (2024)</div>
          </div>
          <div className="number-cell">
            <div className="number-big">4.5<span>M</span></div>
            <div className="number-label">Active creators in India</div>
          </div>
          <div className="number-cell">
            <div className="number-big">25<span>%</span></div>
            <div className="number-label">Market growth in 2025</div>
          </div>
          <div className="number-cell">
            <div className="number-big">~0</div>
            <div className="number-label">Done-for-you merch platforms in India</div>
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section id="pricing">
        <div className="section-label">pricing</div>
        <h2 className="section-headline reveal">Start free.<br />Grow with us. 💛</h2>
        <p className="section-sub reveal">
          No monthly fees. No subscriptions. We only earn when you earn.
        </p>

        <div className="pricing-grid reveal">
          <div className="price-card">
            <div className="price-tier">Tier 1</div>
            <div className="price-name">Free pilot</div>
            <div className="price-amount">₹0</div>
            <div className="price-sub">Limited spots. First 5 creators only.</div>
            <div className="price-divider"></div>
            <div className="price-feature">6–8 custom product designs</div>
            <div className="price-feature">Fully set up branded store</div>
            <div className="price-feature">Print-on-demand fulfillment</div>
            <div className="price-feature">UPI, cards, and COD payments</div>
            <div className="price-feature">Launch support and guidance</div>
            <div className="price-split">60% yours</div>
            <div className="price-split-label">revenue split, always</div>
          </div>

          <div className="price-card featured">
            <div className="featured-badge">Most popular</div>
            <div className="price-tier">Tier 2</div>
            <div className="price-name">Standard</div>
            <div className="price-amount">₹4,999</div>
            <div className="price-sub">One-time setup, no monthly cost</div>
            <div className="price-divider"></div>
            <div className="price-feature">Everything in Free pilot</div>
            <div className="price-feature">8 custom product designs</div>
            <div className="price-feature">Custom domain (<span className="domain-pill">merch.<em>yourname</em>.in</span>)</div>
            <div className="price-feature">Product photography mockups</div>
            <div className="price-feature">Weekly email earnings report</div>
            <div className="price-feature">Seasonal drop reminders (IPL, Diwali)</div>
            <div className="price-split">60% yours</div>
            <div className="price-split-label">revenue split, always</div>
          </div>

          <div className="price-card">
            <div className="price-tier">Tier 3</div>
            <div className="price-name">Premium</div>
            <div className="price-amount">₹12,999</div>
            <div className="price-sub">One-time setup, no monthly cost</div>
            <div className="price-divider"></div>
            <div className="price-feature">Everything in Standard</div>
            <div className="price-feature">2 seasonal design drops per year</div>
            <div className="price-feature">Performance analytics reporting</div>
            <div className="price-feature">Priority design turnaround</div>
            <div className="price-feature">Custom packaging design</div>
            <div className="price-feature">Dedicated email support</div>
            <div className="price-split">65% yours</div>
            <div className="price-split-label">you keep more at premium 🎉</div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq">
        <div className="section-label">got questions</div>
        <h2 className="section-headline reveal">Good questions.<br />Straight answers. 👋</h2>
        <div className="faq-list reveal">
          <div className="faq-item">
            <button className="faq-q" aria-expanded="false">What if my store gets zero sales? <span className="faq-icon">+</span></button>
            <div className="faq-a">We&apos;re in this together — we only earn when you earn. 40% of each sale is ours, and if nothing sells, you owe nothing. That&apos;s why we&apos;re selective about who we take on: we only work with creators whose audience is already engaged.</div>
          </div>
          <div className="faq-item">
            <button className="faq-q" aria-expanded="false">Who handles returns and complaints? <span className="faq-icon">+</span></button>
            <div className="faq-a">We do. You never deal with a single customer complaint, return request, or shipping issue. We handle it all and keep you updated weekly. Your job is to post content, not run a fulfilment centre.</div>
          </div>
          <div className="faq-item">
            <button className="faq-q" aria-expanded="false">What about GST and taxes? <span className="faq-icon">+</span></button>
            <div className="faq-a">We handle GST filing on all orders. You receive your 60% earnings as a clean payout by the 5th of every month. We&apos;ll share a simple monthly statement for your own records.</div>
          </div>
          <div className="faq-item">
            <button className="faq-q" aria-expanded="false">Can I see what my merch will look like before going live? <span className="faq-icon">+</span></button>
            <div className="faq-a">Yes. Before anything is published, we&apos;ll share high-quality mockups of every product. You approve the designs, request changes, and only go live when you&apos;re happy. No surprises.</div>
          </div>
          <div className="faq-item">
            <button className="faq-q" aria-expanded="false">What&apos;s the minimum follower count to apply? <span className="faq-icon">+</span></button>
            <div className="faq-a">We don&apos;t have a strict follower minimum — we care more about engagement than reach. A creator with 10K highly engaged followers will outsell one with 200K passive ones. DM us and we&apos;ll tell you honestly if we think it&apos;ll work.</div>
          </div>
          <div className="faq-item">
            <button className="faq-q" aria-expanded="false">Do I need to hold any stock? <span className="faq-icon">+</span></button>
            <div className="faq-a">Never. Every item is printed and shipped only when an order comes in. No inventory, no upfront stock cost, no risk. You couldn&apos;t end up sitting on unsold boxes even if you tried.</div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="cta-section" id="cta">
        <h2 className="cta-headline">
          Ready to start?<br /><span className="accent">We&apos;d love to<br />work with you.</span>
        </h2>
        <p className="cta-sub">
          Drop your details and we&apos;ll send you a free mockup of what your merch
          could look like. No commitment needed. 😊
        </p>
        <form className="cta-form" id="ctaForm">
          <div className="form-row">
            <label htmlFor="ctaName" className="sr-only">Your name</label>
            <input className="cta-input" type="text" id="ctaName" placeholder="Your name" required />
            <label htmlFor="ctaHandle" className="sr-only">Instagram handle</label>
            <input className="cta-input" type="text" id="ctaHandle" placeholder="@instagram handle" required />
          </div>
          <button type="submit" className="btn-primary" style={{width: '100%', justifyContent: 'center'}}>Get my free mockup →</button>
          <p className="cta-form-note">We&apos;ll reply within 24 hours on email or Instagram.</p>
        </form>
        <div className="cta-actions">
          <a href="https://instagram.com/fankit.in" target="_blank" rel="noopener noreferrer" className="btn-secondary">DM on Instagram</a>
          <a href="mailto:hello@fankit.in" className="btn-secondary">Email us</a>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer>
        <div className="footer-logo">Fan<span>Kit</span></div>
        <ul className="footer-links">
          <li><a href="#how">How it works</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#niches">Niches</a></li>
          <li>
            <a href="https://instagram.com/fankit.in" target="_blank" rel="noopener noreferrer">
              @fankit.in
            </a>
          </li>
        </ul>
        <div className="footer-copy">© 2026 FanKit. Made with love in India. 🧡</div>
      </footer>
    </>
  )
}
