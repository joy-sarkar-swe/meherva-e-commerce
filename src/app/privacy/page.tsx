import PublicLayout from '@/components/layout/PublicLayout';

const sections = [
  {
    title: 'Privacy Policy',
    content: [
      {
        heading: 'Information We Collect',
        text: 'We collect information you provide directly to us, including your name, email address, phone number, and shipping address when you place an order or contact us. We also collect browsing data to improve your shopping experience.',
      },
      {
        heading: 'How We Use Your Information',
        text: 'We use your information to process orders, send order confirmations, provide customer support, and send promotional communications (with your consent). We never sell your personal data to third parties.',
      },
      {
        heading: 'Data Security',
        text: 'We implement appropriate security measures to protect your personal information. All payment transactions are encrypted and processed through secure payment gateways.',
      },
      {
        heading: 'Cookies',
        text: 'We use cookies to improve your browsing experience, remember your preferences, and analyse site traffic. You can control cookie settings through your browser.',
      },
    ],
  },
  {
    title: 'Shipping Policy',
    content: [
      {
        heading: 'Delivery Timeline',
        text: 'Standard delivery takes 5–7 business days. Express delivery (2–3 business days) is available at an additional charge. Orders are processed within 24 hours of placement.',
      },
      {
        heading: 'Shipping Charges',
        text: 'Free shipping on orders above ₹999. For orders below ₹999, a flat shipping fee of ₹79 applies. Express shipping charges vary by location.',
      },
      {
        heading: 'Order Tracking',
        text: 'Once your order is shipped, you will receive a tracking number via SMS and email. Track your order on our website or through the courier partner\'s portal.',
      },
    ],
  },
  {
    title: 'Returns & Exchanges',
    content: [
      {
        heading: 'Return Policy',
        text: 'We accept returns within 7 days of delivery. Items must be unworn, unwashed, and in original condition with tags attached. Sale items are not eligible for return.',
      },
      {
        heading: 'Exchange Process',
        text: 'To exchange a product for a different size or color, initiate a request through the Contact Us page or call our support number. Exchanges are subject to stock availability.',
      },
      {
        heading: 'Refunds',
        text: 'Approved refunds are processed within 7–10 business days. The amount will be credited to the original payment method or as store credit at your preference.',
      },
    ],
  },
  {
    title: 'Terms & Conditions',
    content: [
      {
        heading: 'Use of Website',
        text: 'By accessing Meherva.com, you agree to comply with these terms. We reserve the right to modify or discontinue services at any time without prior notice.',
      },
      {
        heading: 'Intellectual Property',
        text: 'All content on this website — including images, text, logos, and designs — is the property of Meherva and is protected by applicable intellectual property laws.',
      },
      {
        heading: 'Limitation of Liability',
        text: 'Meherva shall not be liable for any indirect, incidental, or consequential damages arising from your use of our products or website. Our liability is limited to the purchase price of the product.',
      },
    ],
  },
];

export default function PrivacyPage() {
  return (
    <PublicLayout>
      <section style={{ background: 'var(--cream-dark)', padding: '56px 24px', textAlign: 'center', borderBottom: '1px solid var(--beige)' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10 }}>Legal</p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 400, color: 'var(--text-dark)' }}>
          Policies & <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Terms</em>
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-light)', marginTop: 10 }}>Last updated: January 2025</p>
      </section>

      <section style={{ padding: '64px 24px', background: 'var(--white)' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }} className="flex flex-col gap-12">
          {sections.map(section => (
            <div key={section.title}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 400, color: 'var(--text-dark)', marginBottom: 24, paddingBottom: 12, borderBottom: '1px solid var(--beige)' }}>
                {section.title}
              </h2>
              <div className="flex flex-col gap-6">
                {section.content.map(item => (
                  <div key={item.heading}>
                    <h3 style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, color: 'var(--gold-dark)', letterSpacing: '0.5px', marginBottom: 8, textTransform: 'uppercase' }}>{item.heading}</h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-mid)', lineHeight: 1.8 }}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="rounded-2xl p-6" style={{ background: 'var(--cream)', border: '1px solid var(--beige)' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-mid)', lineHeight: 1.8 }}>
              For questions about any of our policies, contact us at{' '}
              <a href="mailto:hello@meherva.com" style={{ color: 'var(--gold)', textDecoration: 'none' }}>hello@meherva.com</a>{' '}
              or call <a href="tel:+919815543210" style={{ color: 'var(--gold)', textDecoration: 'none' }}>+91 98155-43210</a>.
            </p>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
