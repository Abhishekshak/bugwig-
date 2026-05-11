import React, { useState, useEffect, useRef } from "react";
import "./App.css";

// ─── DATA ────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["Discovery", "Browse", "News"];

const FEATURED_GAMES = [
  {
    id: 1,
    title: "EA SPORTS FC 24",
    tag: "EA FC 24",
    description:
      "What happens when two iconic football brands come together? A one-of-a-kind experience that takes football to places it's never been before.",
    cta: "Experience WHAT THE FC now in EA SPORTS FC™ 24.",
    badge: "FC24",
    bgColor: "#0a1628",
    accentColor: "#00d4ff",
    
    heroImg: null,
    logoText: "EA FC24",
  },
];

const PRODUCTS = [
  {
    id: 1,
    name: "iTunes Giftcard",
    category: "Giftcard",
    price: "NRP 800.00",
    badge: "5+",
    badgeColor: "#ff2d55",
    bgGradient: "linear-gradient(135deg, #1a6fe0 0%, #34c0fa 100%)",
    iconText: "🍎",
    img: null,
  },
  {
    id: 2,
    name: "Pubg UC",
    category: "Giftcard",
    price: "NRP 1200.00",
    badge: null,
    bgGradient: "linear-gradient(135deg, #1a1a2e 0%, #3a2a1a 100%)",
    iconText: "🎮",
    img: null,
  },
  {
    id: 3,
    name: "FreeFire Diamond",
    category: "Giftcard",
    price: "NRP 600.00",
    badge: null,
    bgGradient: "linear-gradient(135deg, #0d1b2a 0%, #1a3a5c 100%)",
    iconText: "💎",
    img: null,
  },
  {
    id: 4,
    name: "Valorant Giftcard",
    category: "Giftcard",
    price: "NRP 2200.00",
    badge: "25",
    badgeColor: "#ff4655",
    bgGradient: "linear-gradient(135deg, #ff4655 0%, #c0001a 100%)",
    iconText: "🔴",
    img: null,
  },
];

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__logo">
        <span className="navbar__logo-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M6 9h2v2H6V9zm4 0h2v2h-2V9zM6 13h2v2H6v-2zm4 0h2v2h-2v-2z" fill="currentColor"/>
            <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          </svg>
        </span>
        <div className="navbar__logo-text">
          <span className="navbar__logo-jm">JM</span>
          <span className="navbar__logo-store">Store</span>
        </div>
      </div>

      <div className="navbar__search">
        <svg className="navbar__search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
          <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <input
          type="text"
          placeholder="Search store"
          className="navbar__search-input"
        />
      </div>

      <div className="navbar__actions">
        <button className="navbar__cart" aria-label="Cart">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M3 6h18" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M16 10a4 4 0 01-8 0" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </button>
        <button className="navbar__signin">Sign in</button>
      </div>
    </nav>
  );
}

function SecondaryNav() {
  const [active, setActive] = useState("Discovery");
  return (
    <div className="secondary-nav">
      <div className="secondary-nav__inner">
        {NAV_LINKS.map((link) => (
          <button
            key={link}
            className={`secondary-nav__link ${active === link ? "secondary-nav__link--active" : ""}`}
            onClick={() => setActive(link)}
          >
            {link}
          </button>
        ))}
      </div>
    </div>
  );
}

function HeroSlide({ game }) {
  return (
    <div className="hero__slide">
      {/* Left: Game Art Panel */}
      <div className="hero__art">
        {game.heroImg ? (
          <img src={game.heroImg} alt={game.title} className="hero__img" />
        ) : (
          <div className="hero__img-placeholder">
            <div className="hero__img-placeholder-inner">
              <span className="hero__placeholder-title">{game.logoText}</span>
              <p className="hero__placeholder-hint">
                📁 Add your hero image to{" "}
                <code>src/assets/ea-fc.png</code>
              </p>
            </div>
          </div>
        )}
        <div className="hero__art-overlay" />
      </div>

      {/* Right: Info Panel */}
      <div className="hero__info">
        <div className="hero__info-logo">
          <div className="hero__info-badge">{game.logoText}</div>
        </div>
        <p className="hero__info-tagline">{game.description}</p>
        <p className="hero__info-cta">{game.cta}</p>
        <div className="hero__info-actions">
          <button className="btn btn--primary">Buy now</button>
          <button className="btn btn--ghost">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Add to wishlist
          </button>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  const [idx, setIdx] = useState(0);

  return (
    <section className="hero">
      <HeroSlide game={FEATURED_GAMES[idx]} />
      <div className="hero__nav">
        <button
          className="hero__nav-btn"
          onClick={() => setIdx((i) => Math.max(i - 1, 0))}
          disabled={idx === 0}
        >
          ‹
        </button>
        <button
          className="hero__nav-btn"
          onClick={() => setIdx((i) => Math.min(i + 1, FEATURED_GAMES.length - 1))}
          disabled={idx === FEATURED_GAMES.length - 1}
        >
          ›
        </button>
      </div>
    </section>
  );
}

function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`product-card ${hovered ? "product-card--hovered" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="product-card__art" style={{ background: product.bgGradient }}>
        {product.badge && (
          <span
            className="product-card__badge"
            style={{ background: product.badgeColor || "#ff4655" }}
          >
            {product.badge}
          </span>
        )}
        {product.img ? (
          <img src={product.img} alt={product.name} className="product-card__img" />
        ) : (
          <div className="product-card__placeholder">
            <span className="product-card__icon">{product.iconText}</span>
            <p className="product-card__add-img">
              Add image to <code>src/assets/</code>
            </p>
          </div>
        )}
        <div className="product-card__shine" />
      </div>
      <div className="product-card__body">
        <span className="product-card__category">{product.category}</span>
        <h3 className="product-card__name">{product.name}</h3>
        <span className="product-card__price">{product.price}</span>
      </div>
    </div>
  );
}

function TopChoices() {
  return (
    <section className="top-choices">
      <div className="top-choices__header">
        <h2 className="top-choices__title">Top choices</h2>
      </div>
      <div className="top-choices__grid">
        {PRODUCTS.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <SecondaryNav />
      <main className="main">
        <Hero />
        <TopChoices />
      </main>
    </div>
  );
}
