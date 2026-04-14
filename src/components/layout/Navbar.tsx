"use client";
import CartDrawer from "@/components/shop/CartDrawer";
import WishlistDrawer from "@/components/shop/WishlistDrawer";
import Logo from "@/components/ui/Logo";
import { useStore } from "@/lib/store";
import {
  ChevronDown,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const categories = [
  { label: "Kurtas & Kurtis", href: "/shop?cat=Kurtas+%26+Kurtis" },
  { label: "Dresses", href: "/shop?cat=Dresses" },
  { label: "Ethnic Sets", href: "/shop?cat=Ethnic+Sets" },
  { label: "Co-ords", href: "/shop?cat=Co-ords" },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop", hasDropdown: true },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const trendingSearches = [
  "Anarkali Suits",
  "Mirror Work Kurti",
  "Festive Sets",
  "Co-ord Sets",
  "Printed Dresses",
];

function SearchDropdown({
  searchQuery,
  searchResults,
  onResultClick,
  onTrendingClick,
}: {
  searchQuery: string;
  searchResults: any[];
  onResultClick: () => void;
  onTrendingClick: (term: string) => void;
}) {
  return (
    <div
      className='absolute top-full left-0 right-0 mt-2 rounded-2xl overflow-hidden z-50'
      style={{
        background: "var(--white)",
        boxShadow: "0 8px 40px rgba(90,60,30,0.16)",
        border: "1px solid var(--beige)",
      }}>
      {/* Trending searches strip */}
      {!searchQuery && (
        <div
          className='px-4 pt-4 pb-2'
          style={{ borderBottom: "1px solid var(--beige)" }}>
          <div
            className='flex items-center gap-1.5 mb-2.5'
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 10,
              letterSpacing: "1px",
              textTransform: "uppercase",
              color: "var(--text-light)",
            }}>
            <TrendingUp size={11} />
            Trending Searches
          </div>
          <div className='flex flex-wrap gap-2'>
            {trendingSearches.map((term) => (
              <button
                key={term}
                onClick={() => onTrendingClick(term)}
                className='px-3 py-1 rounded-full text-[11px] border transition-all hover:border-[var(--gold)] hover:text-[var(--gold-dark)]'
                style={{
                  fontFamily: "var(--font-body)",
                  borderColor: "var(--beige)",
                  color: "var(--text-mid)",
                  background: "var(--cream)",
                }}>
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results header */}
      <div
        className='px-4 pt-3 pb-1.5 flex items-center gap-1.5'
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 10,
          letterSpacing: "1px",
          textTransform: "uppercase",
          color: "var(--text-light)",
        }}>
        <Sparkles size={11} />
        {searchQuery.length > 1
          ? `Results for "${searchQuery}"`
          : "Featured Picks"}
      </div>

      {/* Product results */}
      <div>
        {searchResults.length === 0 ? (
          <div
            className='px-4 py-6 text-center'
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              color: "var(--text-light)",
            }}>
            No products found for &quot;{searchQuery}&quot;
          </div>
        ) : (
          searchResults.map((p, i) => (
            <Link
              key={p.id}
              href={`/shop?cat=${encodeURIComponent(p.category)}`}
              className='flex items-center gap-3 px-4 py-3 transition-colors hover:bg-cream'
              style={{
                borderTop: i > 0 ? "1px solid var(--beige)" : undefined,
                textDecoration: "none",
              }}
              onClick={onResultClick}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.image}
                alt={p.name}
                className='w-11 h-11 object-cover rounded-xl flex-shrink-0'
              />
              <div className='flex-1 min-w-0'>
                <div
                  className='text-[13px] font-medium truncate'
                  style={{
                    color: "var(--text-dark)",
                    fontFamily: "var(--font-body)",
                  }}>
                  {p.name}
                </div>
                <div
                  className='text-[11px] mt-0.5'
                  style={{
                    color: "var(--text-light)",
                    fontFamily: "var(--font-body)",
                  }}>
                  {p.category}
                </div>
              </div>
              <div
                className='text-[13px] font-semibold flex-shrink-0'
                style={{
                  color: "var(--gold-dark)",
                  fontFamily: "var(--font-body)",
                }}>
                ₹{p.price.toLocaleString()}
              </div>
            </Link>
          ))
        )}
      </div>

      {/* View all */}
      <div style={{ borderTop: "1px solid var(--beige)" }}>
        <Link
          href={
            searchQuery
              ? `/shop?search=${encodeURIComponent(searchQuery)}`
              : "/shop"
          }
          className='flex items-center justify-center gap-2 px-4 py-3 text-[12px] uppercase tracking-wider transition-colors hover:bg-cream'
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--gold-dark)",
            fontWeight: 600,
            textDecoration: "none",
          }}
          onClick={onResultClick}>
          View All Products →
        </Link>
      </div>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { cartCount, wishlist, products } = useStore();
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [shopDropdown, setShopDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const desktopInputRef = useRef<HTMLInputElement>(null);

  // Derived search results — show featured picks when empty, filter when typing
  const getResults = (query: string) => {
    if (query.length > 1) {
      const q = query.toLowerCase();
      return products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q),
        )
        .slice(0, 6);
    }
    // Show 6 curated products when no query (on focus)
    return products.filter((p) => p.badge).slice(0, 6);
  };

  const searchResults = getResults(searchQuery);
  const showDropdown = searchFocused;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileSearchOpen(false);
    setSearchFocused(false);
  }, [pathname]);

  // Focus mobile input when overlay opens
  useEffect(() => {
    if (mobileSearchOpen) {
      setTimeout(() => mobileInputRef.current?.focus(), 80);
    } else {
      setSearchQuery("");
      setSearchFocused(false);
    }
  }, [mobileSearchOpen]);

  const overlayActive = cartOpen || wishlistOpen || mobileOpen;

  const handleResultClick = () => {
    setSearchFocused(false);
    setSearchQuery("");
    setMobileSearchOpen(false);
  };

  return (
    <>
      {/* Overlay for drawers */}
      <div
        className={`drawer-overlay${overlayActive ? " active" : ""}`}
        style={{ zIndex: 1200 }}
        onClick={() => {
          setCartOpen(false);
          setWishlistOpen(false);
          setMobileOpen(false);
        }}
      />

      {/* ── MOBILE SEARCH OVERLAY ── */}
      {mobileSearchOpen && (
        <div
          className='fixed inset-0 flex flex-col md:hidden'
          style={{ background: "var(--white)", zIndex: 1500 }}>
          {/* Top bar */}
          <div
            className='flex items-center gap-3 px-4 py-3 border-b'
            style={{ borderColor: "var(--beige)" }}>
            <div className='relative flex-1'>
              <Search
                size={15}
                className='absolute left-3.5 top-1/2 -translate-y-1/2'
                style={{ color: "var(--text-light)" }}
              />
              <input
                ref={mobileInputRef}
                type='text'
                placeholder='Search ethnic wear...'
                value={searchQuery}
                onFocus={() => setSearchFocused(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchFocused(true);
                }}
                className='w-full pl-10 pr-10 py-2.5 text-[14px] rounded-xl border outline-none'
                style={{
                  background: "var(--cream)",
                  borderColor: "var(--gold-light)",
                  color: "var(--text-dark)",
                  fontFamily: "var(--font-body)",
                }}
              />
              {searchQuery && (
                <button
                  className='absolute right-3 top-1/2 -translate-y-1/2'
                  onClick={() => setSearchQuery("")}>
                  <X size={14} style={{ color: "var(--text-light)" }} />
                </button>
              )}
            </div>
            <button
              onClick={() => setMobileSearchOpen(false)}
              className='flex-shrink-0 px-3 py-2 text-[12px] uppercase tracking-wider'
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--gold-dark)",
                fontWeight: 600,
              }}>
              Cancel
            </button>
          </div>

          {/* Scrollable results */}
          <div
            className='flex-1 overflow-y-auto'
            style={{ background: "var(--cream)" }}>
            {/* Trending */}
            <div className='px-4 pt-5 pb-3'>
              <div
                className='flex items-center gap-1.5 mb-3'
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 10,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: "var(--text-light)",
                }}>
                <TrendingUp size={11} /> Trending
              </div>
              <div className='flex flex-wrap gap-2'>
                {trendingSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setSearchQuery(term);
                      mobileInputRef.current?.focus();
                    }}
                    className='px-3 py-1.5 rounded-full text-[12px] border transition-colors'
                    style={{
                      fontFamily: "var(--font-body)",
                      borderColor: "var(--beige)",
                      background: "var(--white)",
                      color: "var(--text-mid)",
                    }}>
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Products section */}
            <div className='px-4 pb-4'>
              <div
                className='flex items-center gap-1.5 mb-3'
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 10,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: "var(--text-light)",
                }}>
                <Sparkles size={11} />
                {searchQuery.length > 1
                  ? `Results for "${searchQuery}"`
                  : "Featured Picks"}
              </div>

              {searchResults.length === 0 ? (
                <div
                  className='py-8 text-center rounded-2xl'
                  style={{
                    background: "var(--white)",
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    color: "var(--text-light)",
                  }}>
                  No products found for &quot;{searchQuery}&quot;
                </div>
              ) : (
                <div
                  className='rounded-2xl overflow-hidden'
                  style={{
                    background: "var(--white)",
                    border: "1px solid var(--beige)",
                  }}>
                  {searchResults.map((p, i) => (
                    <Link
                      key={p.id}
                      href={`/shop?cat=${encodeURIComponent(p.category)}`}
                      className='flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-cream'
                      style={{
                        borderTop: i > 0 ? "1px solid var(--beige)" : undefined,
                        textDecoration: "none",
                      }}
                      onClick={handleResultClick}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.image}
                        alt={p.name}
                        className='w-12 h-14 object-cover rounded-xl flex-shrink-0'
                      />
                      <div className='flex-1 min-w-0'>
                        <div
                          className='font-medium leading-snug'
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: 13,
                            color: "var(--text-dark)",
                          }}>
                          {p.name}
                        </div>
                        <div
                          className='mt-0.5'
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: 11,
                            color: "var(--text-light)",
                          }}>
                          {p.category}
                        </div>
                        {p.badge && (
                          <div
                            className='mt-1 inline-block px-2 py-0.5 rounded-full text-[9px] uppercase font-semibold'
                            style={{
                              background: "var(--cream)",
                              color: "var(--gold-dark)",
                            }}>
                            {p.badge}
                          </div>
                        )}
                      </div>
                      <div
                        className='text-right flex-shrink-0'
                        style={{ fontFamily: "var(--font-body)" }}>
                        <div
                          className='font-semibold'
                          style={{ fontSize: 14, color: "var(--gold-dark)" }}>
                          ₹{p.price.toLocaleString()}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              <Link
                href='/shop'
                onClick={handleResultClick}
                className='mt-3 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-[12px] uppercase tracking-wider border transition-colors'
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  color: "var(--gold-dark)",
                  borderColor: "var(--gold)",
                  background: "var(--white)",
                  textDecoration: "none",
                }}>
                Browse All Products →
              </Link>
            </div>
          </div>
        </div>
      )}

      <header
        style={{
          background: "var(--white)",
          borderBottom: `1px solid var(--beige)`,
          position: "sticky",
          top: 0,
          zIndex: 1000,
          boxShadow: scrolled
            ? "0 2px 16px rgba(90,60,30,0.10)"
            : "0 1px 6px rgba(90,60,30,0.05)",
          transition: "box-shadow 0.3s ease",
        }}>
        {/* Top bar */}
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 20px" }}>
          <div className='flex items-center sm:justify-between gap-4 py-3'>
            {/* Mobile menu toggle */}
            <button
              className='md:hidden flex items-center justify-center w-9 h-9 rounded-lg transition-colors'
              style={{ color: "var(--text-mid)" }}
              onClick={() => setMobileOpen(true)}
              aria-label='Menu'>
              <Menu size={22} />
            </button>

            <Logo />

            {/* Desktop search */}
            <div
              ref={searchRef}
              className='hidden md:flex flex-1 max-w-[440px] relative'>
              <div className='relative w-full'>
                <Search
                  size={15}
                  className='absolute left-3.5 top-1/2 -translate-y-1/2'
                  style={{ color: "var(--text-light)" }}
                />
                <input
                  ref={desktopInputRef}
                  type='text'
                  placeholder='Search ethnic wear...'
                  value={searchQuery}
                  onFocus={() => setSearchFocused(true)}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='w-full pl-10 pr-4 py-2.5 text-[13px] rounded-full border outline-none transition-all'
                  style={{
                    background: "var(--cream)",
                    borderColor: searchFocused
                      ? "var(--gold-light)"
                      : "var(--beige)",
                    color: "var(--text-dark)",
                    fontFamily: "var(--font-body)",
                  }}
                />
                {searchQuery && (
                  <button
                    className='absolute right-3 top-1/2 -translate-y-1/2'
                    onClick={() => setSearchQuery("")}>
                    <X size={14} style={{ color: "var(--text-light)" }} />
                  </button>
                )}
              </div>
              {/* Desktop search dropdown */}
              {showDropdown && (
                <SearchDropdown
                  searchQuery={searchQuery}
                  searchResults={searchResults}
                  onResultClick={handleResultClick}
                  onTrendingClick={setSearchQuery}
                />
              )}
            </div>

            {/* Action buttons */}
            <div className='flex items-center gap-1 ml-auto md:ml-0'>
              {/* Mobile search button — opens full overlay */}
              <button
                className='md:hidden flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-lg transition-colors hover:bg-cream'
                style={{ color: "var(--text-mid)" }}
                onClick={() => setMobileSearchOpen(true)}>
                <Search size={18} />
                <span
                  style={{
                    fontSize: 10,
                    color: "var(--text-light)",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    fontFamily: "var(--font-body)",
                  }}>
                  Search
                </span>
              </button>

              <Link
                href='/login'
                className='hidden md:flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors hover:bg-cream'
                style={{ color: "var(--text-mid)", textDecoration: "none" }}>
                <User size={18} />
                <span
                  style={{
                    fontSize: 10,
                    color: "var(--text-light)",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    fontFamily: "var(--font-body)",
                  }}>
                  Account
                </span>
              </Link>

              <button
                onClick={() => setWishlistOpen(true)}
                className='relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors hover:bg-cream'
                style={{ color: "var(--text-mid)" }}>
                <Heart size={18} />
                <span
                  style={{
                    fontSize: 10,
                    color: "var(--text-light)",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    fontFamily: "var(--font-body)",
                  }}>
                  Wishlist
                </span>
                {wishlist.length > 0 && (
                  <span
                    className='absolute -top-0.5 right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-white'
                    style={{
                      background: "var(--gold)",
                      fontSize: 9,
                      fontFamily: "var(--font-body)",
                    }}>
                    {wishlist.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setCartOpen(true)}
                className='relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors hover:bg-cream'
                style={{ color: "var(--text-mid)" }}>
                <ShoppingBag size={18} />
                <span
                  style={{
                    fontSize: 10,
                    color: "var(--text-light)",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    fontFamily: "var(--font-body)",
                  }}>
                  Cart·{cartCount}
                </span>
                {cartCount > 0 && (
                  <span
                    className='absolute -top-0.5 right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-white'
                    style={{
                      background: "var(--gold)",
                      fontSize: 9,
                      fontFamily: "var(--font-body)",
                    }}>
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Desktop nav */}
          <nav
            className='hidden md:flex items-center gap-0 border-t'
            style={{ borderColor: "var(--beige)" }}>
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <div
                  key={link.href}
                  className='relative'
                  onMouseEnter={() => link.hasDropdown && setShopDropdown(true)}
                  onMouseLeave={() => setShopDropdown(false)}>
                  <Link
                    href={link.href}
                    className='flex items-center gap-1 px-4 py-3 text-[12px] uppercase tracking-wider transition-colors'
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 500,
                      color: isActive ? "var(--gold)" : "var(--text-mid)",
                      borderBottom: isActive
                        ? "2px solid var(--gold)"
                        : "2px solid transparent",
                      textDecoration: "none",
                    }}>
                    {link.label}
                    {link.hasDropdown && <ChevronDown size={12} />}
                  </Link>
                  {link.hasDropdown && shopDropdown && (
                    <div
                      className='absolute top-full left-0 w-48 rounded-xl overflow-hidden z-50'
                      style={{
                        background: "var(--white)",
                        boxShadow: "var(--shadow-lg)",
                        border: "1px solid var(--beige)",
                      }}>
                      <Link
                        href='/shop'
                        className='block px-4 py-2.5 text-[12px] uppercase tracking-wide hover:bg-cream transition-colors'
                        style={{
                          color: "var(--gold-dark)",
                          fontFamily: "var(--font-body)",
                          textDecoration: "none",
                          fontWeight: 600,
                        }}>
                        All Products
                      </Link>
                      {categories.map((cat) => (
                        <Link
                          key={cat.href}
                          href={cat.href}
                          className='block px-4 py-2.5 text-[12px] uppercase tracking-wide hover:bg-cream transition-colors'
                          style={{
                            color: "var(--text-mid)",
                            fontFamily: "var(--font-body)",
                            textDecoration: "none",
                          }}>
                          {cat.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <div className='ml-auto flex'>
              {categories.map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className='px-3 py-3 text-[11px] uppercase tracking-wider transition-colors'
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--text-light)",
                    textDecoration: "none",
                  }}>
                  {cat.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Sidebar Drawer */}
      <div
        className={`side-drawer${mobileOpen ? " open" : ""}`}
        style={{ left: mobileOpen ? 0 : "-420px", right: "auto", width: 280 }}>
        <div
          className='flex items-center justify-between px-5 py-4 border-b'
          style={{ borderColor: "var(--beige)" }}>
          <Logo />
          <button onClick={() => setMobileOpen(false)}>
            <X size={20} style={{ color: "var(--text-mid)" }} />
          </button>
        </div>
        <nav className='flex flex-col p-4 gap-1'>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className='px-4 py-3 rounded-lg text-[13px] uppercase tracking-wider transition-colors hover:bg-cream'
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--text-mid)",
                textDecoration: "none",
              }}>
              {link.label}
            </Link>
          ))}
          <div
            className='mt-2 pt-2 border-t'
            style={{ borderColor: "var(--beige)" }}>
            {categories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className='block px-4 py-2.5 text-[12px] uppercase tracking-wider transition-colors hover:bg-cream'
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--text-light)",
                  textDecoration: "none",
                }}>
                {cat.label}
              </Link>
            ))}
          </div>
          <div
            className='mt-4 pt-4 border-t'
            style={{ borderColor: "var(--beige)" }}>
            <Link
              href='/login'
              className='flex items-center gap-2 px-4 py-2.5 rounded-lg text-[12px] transition-colors hover:bg-cream'
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--text-light)",
                textDecoration: "none",
              }}>
              <User size={15} /> Admin Login
            </Link>
          </div>
        </nav>
      </div>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <WishlistDrawer
        open={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
      />
    </>
  );
}
