import Logo from "@/components/ui/Logo";
import Link from "next/link";

const footerLinks = {
  "Customer Service": [
    { label: "Contact Us", href: "/contact" },
    { label: "Shipping Policy", href: "/privacy" },
    { label: "Returns & Exchanges", href: "/privacy" },
    { label: "FAQ", href: "/contact" },
  ],
  Shop: [
    { label: "Kurta & Kurtis", href: "/shop?cat=Kurtas+%26+Kurtis" },
    { label: "Dresses", href: "/shop?cat=Dresses" },
    { label: "Ethnic Sets", href: "/shop?cat=Ethnic+Sets" },
    { label: "Co-ords", href: "/shop?cat=Co-ords" },
  ],
  Information: [
    { label: "About Us", href: "/about" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/privacy" },
    { label: "Order Tracking", href: "/contact" },
  ],
};

const trustItems = [
  {
    icon: (
      <svg
        width='40'
        height='40'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.5'>
        <rect x='2' y='7' width='20' height='14' rx='2' />
        <path d='M16 7V5a2 2 0 0 0-4 0v2' />
        <path d='M12 11v4' />
      </svg>
    ),
    title: "FAST SHIPPING",
    desc: "Speedy and reliable shipping to your doorstep.",
  },
  {
    icon: (
      <svg
        width='40'
        height='40'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.5'>
        <path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' />
        <path d='M9 12l2 2 4-4' />
      </svg>
    ),
    title: "SECURE PAYMENTS",
    desc: "Ensuring safe and secure transactions online.",
  },
  {
    icon: (
      <svg
        width='40'
        height='40'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.5'>
        <path d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.18 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z' />
      </svg>
    ),
    title: "DEDICATED SUPPORT",
    desc: "+91 98155-43210\nHere to assist you with any inquiries.",
  },
];

const socialLinks = [
  { label: "Facebook", icon: "f", href: "#" },
  { label: "Instagram", icon: "◉", href: "#" },
  { label: "YouTube", icon: "▶", href: "#" },
  { label: "Pinterest", icon: "⊕", href: "#" },
];

export default function Footer() {
  return (
    <footer>
      {/* Trust Banner */}
      <div
        style={{
          background: "var(--cream-dark)",
          borderTop: "1px solid var(--beige)",
          borderBottom: "1px solid var(--beige)",
        }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px" }}>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
            {trustItems.map((item) => (
              <div
                key={item.title}
                className='flex flex-col items-center text-center gap-3'>
                <div style={{ color: "var(--gold)" }}>{item.icon}</div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 700,
                    fontSize: 13,
                    letterSpacing: "1.5px",
                    color: "var(--text-dark)",
                  }}>
                  {item.title}
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    color: "var(--text-mid)",
                    lineHeight: 1.6,
                    whiteSpace: "pre-line",
                  }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div
        style={{
          background: "var(--white)",
          borderBottom: "1px solid var(--beige)",
        }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "36px 24px" }}>
          <div className='flex flex-col md:flex-row items-center gap-4'>
            <div className='flex items-center gap-3 flex-shrink-0'>
              <svg
                width='28'
                height='28'
                viewBox='0 0 24 24'
                fill='none'
                stroke='var(--gold)'
                strokeWidth='1.5'>
                <path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' />
                <path d='M9 12l2 2 4-4' />
              </svg>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 20,
                  color: "var(--text-dark)",
                  fontStyle: "italic",
                }}>
                Sign up to receive{" "}
                <strong
                  style={{ fontStyle: "normal", color: "var(--gold-dark)" }}>
                  10% OFF
                </strong>{" "}
                your first order!
              </p>
            </div>
            <div
              className='flex w-full md:max-w-sm rounded-xl overflow-hidden border'
              style={{
                borderColor: "var(--beige)",
                background: "var(--cream)",
              }}>
              <input
                type='email'
                placeholder='Enter your email address'
                className='flex-1 px-4 py-3 text-[13px] bg-transparent outline-none'
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--text-dark)",
                }}
              />
              <button
                className='px-5 py-3 text-[11px] font-semibold uppercase tracking-widest text-white transition-colors'
                style={{
                  background: "var(--gold)",
                  fontFamily: "var(--font-body)",
                  flexShrink: 0,
                }}>
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div
        style={{
          background: "var(--cream)",
          paddingTop: 60,
          paddingBottom: 40,
        }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          {/* Logo centered */}
          <div className='flex justify-center mb-10'>
            <Logo size='lg' />
          </div>

          {/* Links grid */}
          <div className='grid grid-cols-2 md:grid-cols-3 gap-8 mb-10'>
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <div
                  className='sm:text-center'
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: 13,
                    color: "var(--gold-dark)",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    marginBottom: 14,
                  }}>
                  {title}
                </div>
                <ul className='flex flex-col sm:items-center gap-2'>
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: 13,
                          color: "var(--text-mid)",
                          textDecoration: "none",
                          transition: "color 0.2s",
                        }}
                        className='hover:text-gold'>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div
            style={{
              borderTop: "1px solid var(--beige)",
              paddingTop: 32,
              marginTop: 8,
            }}>
            {/* Contact */}
            <div
              className='flex justify-center gap-2 mb-4 flex-wrap'
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                color: "var(--text-mid)",
              }}>
              <a
                href='mailto:hello@meherva.com'
                style={{ color: "var(--text-mid)", textDecoration: "none" }}>
                hello@meherva.com
              </a>
              <span style={{ color: "var(--beige-mid)" }}>·</span>
              <a
                href='tel:+919815543210'
                style={{ color: "var(--text-mid)", textDecoration: "none" }}>
                +91 98155-43210
              </a>
            </div>

            {/* Social icons */}
            <div className='flex justify-center gap-3 mb-6'>
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className='w-9 h-9 rounded-full flex items-center justify-center transition-all'
                  style={{
                    background: "var(--cream-dark)",
                    border: "1px solid var(--beige)",
                    color: "var(--text-mid)",
                    fontSize: 14,
                    textDecoration: "none",
                  }}>
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Copyright */}
            <p
              className='text-center'
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 12,
                color: "var(--text-light)",
                letterSpacing: "0.5px",
              }}>
              © Meherva. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
