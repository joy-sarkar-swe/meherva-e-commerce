'use client';
import { useState } from 'react';
import PublicLayout from '@/components/layout/PublicLayout';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const contactInfo = [
    { icon: <Mail size={20} />, label: 'Email', value: 'hello@meherva.com', href: 'mailto:hello@meherva.com' },
    { icon: <Phone size={20} />, label: 'Phone', value: '+91 98155-43210', href: 'tel:+919815543210' },
    { icon: <MapPin size={20} />, label: 'Address', value: '23, Fashion Street, Bandra West, Mumbai — 400050', href: '#' },
    { icon: <Clock size={20} />, label: 'Hours', value: 'Mon–Sat: 10am – 7pm IST', href: '#' },
  ];

  return (
    <PublicLayout>
      {/* Header */}
      <section style={{ background: 'var(--cream-dark)', padding: '56px 24px', textAlign: 'center', borderBottom: '1px solid var(--beige)' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10 }}>Get in Touch</p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 400, color: 'var(--text-dark)', marginBottom: 14 }}>
          We&apos;d Love to <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Hear From You</em>
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-mid)', maxWidth: 480, margin: '0 auto' }}>Have a question about an order, a product, or anything else? Our team is here to help.</p>
      </section>

      <section style={{ padding: '64px 24px', background: 'var(--white)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="flex flex-col md:flex-row gap-10">
            {/* Contact info */}
            <div className="flex-shrink-0 md:w-72">
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 400, color: 'var(--text-dark)', marginBottom: 24 }}>Contact Information</h2>
              <div className="flex flex-col gap-5">
                {contactInfo.map(item => (
                  <a key={item.label} href={item.href} className="flex gap-4 group" style={{ textDecoration: 'none' }}>
                    <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: 'var(--cream)', color: 'var(--gold)', border: '1px solid var(--beige)' }}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: 2 }}>{item.label}</div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-dark)', lineHeight: 1.5 }}>{item.value}</div>
                    </div>
                  </a>
                ))}
              </div>
              <div className="mt-8 p-5 rounded-2xl" style={{ background: 'var(--cream-dark)', border: '1px solid var(--beige)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--gold-dark)', marginBottom: 8 }}>Quick Response</div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-mid)', lineHeight: 1.7 }}>We typically respond within 24 hours on business days. For urgent matters, please call us directly.</p>
              </div>
            </div>

            {/* Form */}
            <div className="flex-1 rounded-2xl p-6 md:p-8" style={{ background: 'var(--cream)', border: '1px solid var(--beige)' }}>
              {sent ? (
                <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl" style={{ background: 'var(--white)' }}>✓</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 26, color: 'var(--text-dark)' }}>Message Sent!</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-mid)', maxWidth: 320 }}>Thank you for reaching out. We&apos;ll get back to you within 24 hours.</p>
                  <button onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }} className="mt-4 px-6 py-2.5 rounded-lg text-[12px] uppercase tracking-wider text-white" style={{ background: 'var(--gold)', fontFamily: 'var(--font-body)' }}>
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--text-dark)', marginBottom: 4 }}>Send a Message</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { id: 'name', label: 'Full Name *', placeholder: 'Your name', type: 'text' },
                      { id: 'email', label: 'Email Address *', placeholder: 'your@email.com', type: 'email' },
                    ].map(f => (
                      <div key={f.id} className="flex flex-col gap-1.5">
                        <label style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-light)', letterSpacing: '0.5px' }}>{f.label}</label>
                        <input type={f.type} required placeholder={f.placeholder} value={form[f.id as keyof typeof form]} onChange={e => setForm(p => ({ ...p, [f.id]: e.target.value }))}
                          className="px-4 py-3 rounded-xl border outline-none text-[13px] transition-colors"
                          style={{ fontFamily: 'var(--font-body)', borderColor: 'var(--beige)', background: 'var(--white)', color: 'var(--text-dark)' }} />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-light)', letterSpacing: '0.5px' }}>Subject *</label>
                    <input type="text" required placeholder="How can we help?" value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                      className="px-4 py-3 rounded-xl border outline-none text-[13px]"
                      style={{ fontFamily: 'var(--font-body)', borderColor: 'var(--beige)', background: 'var(--white)', color: 'var(--text-dark)' }} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-light)', letterSpacing: '0.5px' }}>Message *</label>
                    <textarea required rows={5} placeholder="Tell us more..." value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      className="px-4 py-3 rounded-xl border outline-none text-[13px] resize-none"
                      style={{ fontFamily: 'var(--font-body)', borderColor: 'var(--beige)', background: 'var(--white)', color: 'var(--text-dark)' }} />
                  </div>
                  <button type="submit" className="self-start flex items-center gap-2 px-8 py-3.5 rounded-xl text-[12px] uppercase tracking-widest text-white transition-opacity hover:opacity-90" style={{ background: 'var(--gold)', fontFamily: 'var(--font-body)' }}>
                    <Send size={14} /> Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
