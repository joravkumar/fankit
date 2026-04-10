'use client'

import { useEffect, useRef } from 'react'

export default function Home() {
  const splitFillRef = useRef<HTMLDivElement>(null)
  const howVisualRef = useRef<HTMLDivElement>(null)

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
      document.querySelectorAll('.faq-item').forEach((i) => i.classList.remove('open'))
      if (!isOpen) item.classList.add('open')
    }

    document
      .querySelectorAll('.faq-q')
      .forEach((btn) => btn.addEventListener('click', handleFaqClick))

    // CTA form — builds WhatsApp message and opens chat
    const ctaForm = document.getElementById('ctaForm') as HTMLFormElement | null
    const handleCtaSubmit = (e: Event) => {
      e.preventDefault()
      const name = (document.getElementById('ctaName') as HTMLInputElement)?.value.trim()
      const handle = (document.getElementById('ctaHandle') as HTMLInputElement)?.value.trim()
      const phone = (document.getElementById('ctaPhone') as HTMLInputElement)?.value.trim()
      const msg = encodeURIComponent(
        `Hi FanKit! I'd love a free merch mockup.\n\nName: ${name}\nInstagram: ${handle}${phone ? '\nPhone: ' + phone : ''}`,
      )
      window.open(`https://wa.me/918054342384?text=${msg}`, '_blank')
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
        <div className="hero-eyebrow">India's creator merch studio</div>
        <h1 className="hero-headline">
          YOUR FANS<br />WANT TO<br />WEAR <span className="accent">YOUR</span><br />VIBE.
        </h1>
        <p className="hero-sub">
          Making content is already a full-time job. Your merch store shouldn't be
          a second one. We build it, run it, and pay you — you just keep posting.
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
            <div className="stat-label">Setup cost to start</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">4.5<span>M</span></div>
            <div className="stat-label">Indian creators, no merch partner</div>
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
        <div className="section-label">The process</div>
        <h2 className="section-headline reveal">FOUR STEPS. ZERO HEADACHE.</h2>
        <p className="section-sub reveal">
          From DM to your first sale in under a week.
        </p>

        <div className="how-grid">
          <div className="steps">
            <div className="step reveal">
              <div className="step-num">01</div>
              <div className="step-content">
                <div className="step-title">WE DESIGN YOUR MERCH</div>
                <div className="step-desc">
                  Our designer crafts 6–8 products around your content: your
                  catchphrases, your aesthetic, your vibe. Not generic templates.
                  Actual merch your audience will want.
                </div>
              </div>
            </div>
            <div className="step reveal">
              <div className="step-num">02</div>
              <div className="step-content">
                <div className="step-title">WE BUILD YOUR STORE</div>
                <div className="step-desc">
                  Your own branded store at{' '}
                  <span className="domain-pill">merch.<em>yourname</em>.in</span>. Fully set up with
                  print-on-demand fulfillment and Indian payments including UPI and COD.
                </div>
              </div>
            </div>
            <div className="step reveal">
              <div className="step-num">03</div>
              <div className="step-content">
                <div className="step-title">YOU POST ONCE</div>
                <div className="step-desc">
                  Tell your audience the store is live. Two posts minimum. Your
                  community converts because they trust you, and they've been
                  waiting for this.
                </div>
              </div>
            </div>
            <div className="step reveal">
              <div className="step-num">04</div>
              <div className="step-content">
                <div className="step-title">WE HANDLE EVERYTHING ELSE</div>
                <div className="step-desc">
                  Orders come in. We print, pack, and ship. You get 60% of every
                  sale in your account by the 5th of every month. Weekly earnings
                  update on WhatsApp.
                </div>
              </div>
            </div>
          </div>

          <div className="how-visual reveal" ref={howVisualRef}>
            <div className="split-label">Revenue split per order</div>
            <div className="split-bar">
              <div className="split-fill" id="splitFill" ref={splitFillRef}></div>
            </div>
            <div className="split-row">
              <div>
                <div className="split-pct" style={{color: 'var(--teal)'}}>60%</div>
                <div className="split-who">Your earnings</div>
              </div>
              <div style={{textAlign: 'right'}}>
                <div className="split-pct" style={{color: 'var(--white-dim)'}}>40%</div>
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
                borderTop: '1px solid var(--white-faint)',
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
                <div style={{fontWeight: 500, fontSize: '14px', color: 'var(--teal)'}}>
                  ₹17,970
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHY FANKIT ─── */}
      <section id="why">
        <div className="section-label">Why FanKit</div>
        <h2 className="section-headline reveal">BUILT FOR INDIAN CREATORS.</h2>
        <p className="section-sub reveal">
          Not a global platform retrofitted for India. Built here, from scratch,
          for this market.
        </p>

        <div className="why-grid reveal">
          <div className="why-card">
            <div className="why-icon">🎨</div>
            <div className="why-title">CUSTOM DESIGN</div>
            <div className="why-desc">
              Every design is made for you specifically. Your catchphrases, your
              aesthetic, your community identity. Not a Canva template.
            </div>
          </div>
          <div className="why-card">
            <div className="why-icon">📦</div>
            <div className="why-title">NOT YOUR PROBLEM</div>
            <div className="why-desc">
              Domain setup, store config, printing, packaging, courier, returns,
              COD reconciliation, GST filing. None of it. Not a single parcel
              ever passes through your hands.
            </div>
          </div>
          <div className="why-card">
            <div className="why-icon">💸</div>
            <div className="why-title">UPI + COD READY</div>
            <div className="why-desc">
              Your store accepts UPI, cards, net banking, and Cash on Delivery.
              Because your audience pays the Indian way.
            </div>
          </div>
          <div className="why-card">
            <div className="why-icon">⚡</div>
            <div className="why-title">LIVE IN 5 DAYS</div>
            <div className="why-desc">
              From your first DM to a live store: 5 days. No waiting. No
              back-and-forth. Designed, built, and ready to launch.
            </div>
          </div>
          <div className="why-card">
            <div className="why-icon">📊</div>
            <div className="why-title">WEEKLY REPORTS</div>
            <div className="why-desc">
              Every Monday you get your order count, total earnings, and
              top-selling product on WhatsApp. No dashboard login needed.
            </div>
          </div>
          <div className="why-card">
            <div className="why-icon">🔗</div>
            <div className="why-title">YOUR OWN DOMAIN</div>
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
        <div className="section-label">What you get</div>
        <h2 className="section-headline reveal">YOUR STORE,<br />READY TO SELL.</h2>
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
        <p className="store-note reveal">Designs, branding, and store name are all yours — we build it around your content.</p>
      </section>

      {/* ─── NICHES ─── */}
      <section className="niche" id="niches">
        <div className="section-label">Who we work with</div>
        <h2 className="section-headline reveal">EVERY NICHE.<br />ONE PLATFORM.</h2>

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
        <div className="section-label">The market</div>
        <h2 className="section-headline reveal">
          BIG MARKET.<br />ZERO COMPETITION.
        </h2>
        <p className="section-sub reveal">
          India's creator economy is exploding. Nobody is doing this for them.
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
        <div className="section-label">Pricing</div>
        <h2 className="section-headline reveal">START FREE.<br />GROW WITH US.</h2>
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
            <div className="price-sub">One-time setup fee, no monthly cost</div>
            <div className="price-divider"></div>
            <div className="price-feature">Everything in Free pilot</div>
            <div className="price-feature">8 custom product designs</div>
            <div className="price-feature">Custom domain (<span className="domain-pill">merch.<em>yourname</em>.in</span>)</div>
            <div className="price-feature">Product photography mockups</div>
            <div className="price-feature">Weekly WhatsApp earnings report</div>
            <div className="price-feature">Seasonal drop reminders (IPL, Diwali)</div>
            <div className="price-split">60% yours</div>
            <div className="price-split-label">revenue split, always</div>
          </div>

          <div className="price-card">
            <div className="price-tier">Tier 3</div>
            <div className="price-name">Premium</div>
            <div className="price-amount">₹12,999</div>
            <div className="price-sub">One-time setup fee, no monthly cost</div>
            <div className="price-divider"></div>
            <div className="price-feature">Everything in Standard</div>
            <div className="price-feature">2 seasonal design drops per year</div>
            <div className="price-feature">Performance analytics reporting</div>
            <div className="price-feature">Priority design turnaround</div>
            <div className="price-feature">Custom packaging design</div>
            <div className="price-feature">Dedicated WhatsApp support</div>
            <div className="price-split">65% yours</div>
            <div className="price-split-label">you get more at premium</div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq">
        <div className="section-label">FAQ</div>
        <h2 className="section-headline reveal">GOOD QUESTIONS.<br />STRAIGHT ANSWERS.</h2>
        <div className="faq-list reveal">
          <div className="faq-item">
            <button className="faq-q">What if my store gets zero sales? <span className="faq-icon">+</span></button>
            <div className="faq-a">You don't pay us anything. We only earn when you earn — 40% of each sale. If nothing sells, you owe nothing. That's why we're selective about who we take on: we only work with creators whose audience is already engaged.</div>
          </div>
          <div className="faq-item">
            <button className="faq-q">Who handles returns and complaints? <span className="faq-icon">+</span></button>
            <div className="faq-a">We do. You never deal with a single customer complaint, return request, or shipping issue. We handle it all and keep you updated weekly. Your job is to post content, not run a fulfilment centre.</div>
          </div>
          <div className="faq-item">
            <button className="faq-q">What about GST and taxes? <span className="faq-icon">+</span></button>
            <div className="faq-a">We handle GST filing on all orders. You receive your 60% earnings as a clean payout by the 5th of every month. We'll share a simple monthly statement for your own records.</div>
          </div>
          <div className="faq-item">
            <button className="faq-q">Can I see what my merch will look like before going live? <span className="faq-icon">+</span></button>
            <div className="faq-a">Yes. Before anything is published, we'll share high-quality mockups of every product. You approve the designs, request changes, and only go live when you're happy. No surprises.</div>
          </div>
          <div className="faq-item">
            <button className="faq-q">What's the minimum follower count to apply? <span className="faq-icon">+</span></button>
            <div className="faq-a">We don't have a strict follower minimum — we care more about engagement than reach. A creator with 10K highly engaged followers will outsell one with 200K passive ones. DM us and we'll tell you honestly if we think it'll work.</div>
          </div>
          <div className="faq-item">
            <button className="faq-q">Do I need to hold any stock? <span className="faq-icon">+</span></button>
            <div className="faq-a">Never. Every item is printed and shipped only when an order comes in. No inventory, no upfront stock cost, no risk. You couldn't end up sitting on unsold boxes even if you tried.</div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="cta-section" id="cta">
        <h2 className="cta-headline">
          YOUR AUDIENCE<br />IS <span className="accent">WAITING.</span>
        </h2>
        <p className="cta-sub">
          Drop your details and we'll send you a free mockup of what your merch
          could look like. No commitment needed.
        </p>
        <form className="cta-form" id="ctaForm">
          <div className="form-row">
            <input className="cta-input" type="text" id="ctaName" placeholder="Your name" required />
            <input className="cta-input" type="text" id="ctaHandle" placeholder="@instagram handle" required />
          </div>
          <input className="cta-input" type="tel" id="ctaPhone" placeholder="WhatsApp number" />
          <button type="submit" className="btn-primary" style={{width: '100%', justifyContent: 'center'}}>Get my free mockup →</button>
          <p className="cta-form-note">We'll reply within 24 hours on WhatsApp or Instagram.</p>
        </form>
        <div className="cta-actions">
          <a href="https://instagram.com/fankit.in" target="_blank" rel="noopener noreferrer" className="btn-secondary">DM on Instagram</a>
          <a href="https://wa.me/918054342384" target="_blank" rel="noopener noreferrer" className="btn-secondary">WhatsApp us</a>
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
        <div className="footer-copy">© 2026 FanKit. Made in India.</div>
      </footer>
    </>
  )
}
