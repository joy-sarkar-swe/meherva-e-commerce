import PublicLayout from '@/components/layout/PublicLayout';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  const values = [
    { icon: '✦', title: 'Authenticity', desc: 'Every piece is rooted in the rich traditions of Indian craftsmanship, reimagined for today.' },
    { icon: '◈', title: 'Quality', desc: 'We work with skilled artisans and premium fabrics to ensure every product exceeds expectations.' },
    { icon: '❋', title: 'Inclusivity', desc: 'Fashion for every body. Our collections celebrate women of all sizes, shapes, and styles.' },
    { icon: '⊕', title: 'Sustainability', desc: 'Conscious sourcing, ethical production, and mindful packaging in everything we do.' },
  ];

  const team = [
    { name: 'Priya Sharma', role: 'Founder & Creative Director', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=300&q=80' },
    { name: 'Ananya Mehta', role: 'Head of Design', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80' },
    { name: 'Kavya Reddy', role: 'Product Curator', image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&q=80' },
  ];

  return (
    <PublicLayout>
      {/* Hero */}
      <section style={{ background: 'var(--cream-dark)', padding: '64px 24px', textAlign: 'center', borderBottom: '1px solid var(--beige)' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12 }}>Our Story</p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 400, color: 'var(--text-dark)', lineHeight: 1.1, marginBottom: 20 }}>
          Where Tradition Meets<br /><em style={{ color: 'var(--gold)' }}>Modern Elegance</em>
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text-mid)', maxWidth: 560, margin: '0 auto', lineHeight: 1.8 }}>
          Meherva was born from a love of ethnic fashion and a desire to make it accessible, beautiful, and effortless for every Indian woman.
        </p>
      </section>

      {/* Story */}
      <section style={{ padding: '72px 24px', background: 'var(--white)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="relative w-full md:w-80 flex-shrink-0">
              <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: '4/5' }}>
                <Image src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&q=80" alt="Meherva story" fill className="object-cover" sizes="320px" style={{ position: 'absolute' }} />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl px-4 py-3 shadow-lg" style={{ border: '1px solid var(--beige)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, color: 'var(--gold-dark)' }}>Est. 2019</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-light)', letterSpacing: '1px', textTransform: 'uppercase' }}>Mumbai, India</div>
              </div>
            </div>
            <div className="flex-1">
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12 }}>Founded with Love</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 400, color: 'var(--text-dark)', marginBottom: 20, lineHeight: 1.3 }}>
                Celebrating the Spirit of Indian Womanhood
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-mid)', lineHeight: 1.9, marginBottom: 16 }}>
                Meherva started in 2019 with a simple belief — that ethnic wear should be beautiful, comfortable, and accessible without compromise. Founded in Mumbai by Priya Sharma, we set out to bridge the gap between heritage craftsmanship and contemporary fashion.
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-mid)', lineHeight: 1.9 }}>
                Today, we work with artisans across Rajasthan, Gujarat, and West Bengal to bring you collections that celebrate the diverse textile traditions of India — from intricate mirror work kurtis to flowing Anarkali suits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '64px 24px', background: 'var(--cream)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="text-center mb-12">
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>What Drives Us</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 400, color: 'var(--text-dark)' }}>Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(v => (
              <div key={v.title} className="rounded-2xl p-6 flex flex-col gap-3" style={{ background: 'var(--white)', border: '1px solid var(--beige)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--gold)' }}>{v.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 500, color: 'var(--text-dark)' }}>{v.title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-mid)', lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: '64px 24px', background: 'var(--white)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="text-center mb-12">
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>The People</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 400, color: 'var(--text-dark)' }}>Meet Our Team</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {team.map(member => (
              <div key={member.name} className="flex flex-col items-center text-center gap-4">
                <div className="relative w-32 h-32 rounded-full overflow-hidden" style={{ border: '3px solid var(--beige)' }}>
                  <Image src={member.image} alt={member.name} fill className="object-cover" sizes="128px" />
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 500, color: 'var(--text-dark)', marginBottom: 4 }}>{member.name}</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--gold)', letterSpacing: '0.5px' }}>{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '60px 24px', background: 'var(--cream-dark)', textAlign: 'center', borderTop: '1px solid var(--beige)' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 400, color: 'var(--text-dark)', marginBottom: 12 }}>
          Ready to Explore?
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-mid)', marginBottom: 24 }}>Discover our latest collection of premium ethnic wear.</p>
        <Link href="/shop" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-[12px] uppercase tracking-widest text-white transition-opacity hover:opacity-90" style={{ background: 'var(--gold)', fontFamily: 'var(--font-body)', textDecoration: 'none' }}>
          Shop Now
        </Link>
      </section>
    </PublicLayout>
  );
}
