"use client";
import { useStore } from "@/lib/store";
import { AlertTriangle, RefreshCw, Save } from "lucide-react";
import { useState } from "react";

function Field({
  label,
  id,
  value,
  onChange,
  type = "text",
  placeholder = "",
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className='flex flex-col gap-1.5'>
      <label
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 11,
          letterSpacing: "0.5px",
          textTransform: "uppercase",
          color: "var(--text-light)",
        }}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className='px-4 py-3 rounded-xl border outline-none text-[13px] transition-colors'
        style={{
          fontFamily: "var(--font-body)",
          borderColor: "var(--beige)",
          background: "var(--white)",
          color: "var(--text-dark)",
        }}
      />
    </div>
  );
}

export default function AdminSettingsPage() {
  const { products, setProducts, showToast } = useStore();
  const [storeSettings, setStoreSettings] = useState({
    storeName: "Meherva",
    tagline: "Premium Ethnic Wear for Women",
    email: "hello@meherva.com",
    phone: "+91 98155-43210",
    address: "23, Fashion Street, Bandra West, Mumbai — 400050",
    currency: "₹",
    freeShippingThreshold: "999",
    shippingFee: "79",
  });
  const [adminSettings, setAdminSettings] = useState({
    username: "admin",
    newPassword: "",
    confirmPassword: "",
  });
  const [showReset, setShowReset] = useState(false);

  const handleStoreSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("✓ Store settings saved");
  };

  const handlePasswordSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminSettings.newPassword !== adminSettings.confirmPassword) {
      showToast("⚠ Passwords do not match");
      return;
    }
    showToast("✓ Password updated");
    setAdminSettings((p) => ({ ...p, newPassword: "", confirmPassword: "" }));
  };

  const handleReset = () => {
    localStorage.removeItem("meherva_admin_products");
    localStorage.removeItem("meherva_orders");
    localStorage.removeItem("meherva_cart");
    localStorage.removeItem("meherva_wishlist");
    setShowReset(false);
    showToast("✓ All data reset to defaults");
    window.location.reload();
  };

  return (
    <div className='flex flex-col gap-6'>
      {/* Store Settings */}
      <div
        className='rounded-2xl overflow-hidden'
        style={{
          background: "var(--white)",
          border: "1px solid var(--beige)",
        }}>
        <div
          className='px-6 py-4 border-b'
          style={{ borderColor: "var(--beige)", background: "var(--cream)" }}>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 20,
              color: "var(--text-dark)",
            }}>
            Store Information
          </h3>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              color: "var(--text-light)",
              marginTop: 2,
            }}>
            Update your store details and contact information
          </p>
        </div>
        <form onSubmit={handleStoreSave} className='p-6 flex flex-col gap-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Field
              label='Store Name'
              id='storeName'
              value={storeSettings.storeName}
              onChange={(v) =>
                setStoreSettings((p) => ({ ...p, storeName: v }))
              }
            />
            <Field
              label='Tagline'
              id='tagline'
              value={storeSettings.tagline}
              onChange={(v) => setStoreSettings((p) => ({ ...p, tagline: v }))}
            />
            <Field
              label='Email'
              id='email'
              type='email'
              value={storeSettings.email}
              onChange={(v) => setStoreSettings((p) => ({ ...p, email: v }))}
            />
            <Field
              label='Phone'
              id='phone'
              value={storeSettings.phone}
              onChange={(v) => setStoreSettings((p) => ({ ...p, phone: v }))}
            />
          </div>
          <Field
            label='Address'
            id='address'
            value={storeSettings.address}
            onChange={(v) => setStoreSettings((p) => ({ ...p, address: v }))}
          />
          <div className='grid grid-cols-2 gap-4'>
            <Field
              label='Free Shipping Above (₹)'
              id='freeShipping'
              value={storeSettings.freeShippingThreshold}
              onChange={(v) =>
                setStoreSettings((p) => ({ ...p, freeShippingThreshold: v }))
              }
            />
            <Field
              label='Shipping Fee (₹)'
              id='shippingFee'
              value={storeSettings.shippingFee}
              onChange={(v) =>
                setStoreSettings((p) => ({ ...p, shippingFee: v }))
              }
            />
          </div>
          <button
            type='submit'
            className='self-start flex items-center gap-2 px-6 py-3 rounded-xl text-[12px] uppercase tracking-wider text-white transition-opacity hover:opacity-90'
            style={{
              background: "var(--gold)",
              fontFamily: "var(--font-body)",
            }}>
            <Save size={14} /> Save Settings
          </button>
        </form>
      </div>

      {/* Admin Account */}
      <div
        className='rounded-2xl overflow-hidden'
        style={{
          background: "var(--white)",
          border: "1px solid var(--beige)",
        }}>
        <div
          className='px-6 py-4 border-b'
          style={{ borderColor: "var(--beige)", background: "var(--cream)" }}>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 20,
              color: "var(--text-dark)",
            }}>
            Admin Account
          </h3>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              color: "var(--text-light)",
              marginTop: 2,
            }}>
            Update your login credentials
          </p>
        </div>
        <form onSubmit={handlePasswordSave} className='p-6 flex flex-col gap-4'>
          <Field
            label='Username'
            id='username'
            value={adminSettings.username}
            onChange={(v) => setAdminSettings((p) => ({ ...p, username: v }))}
          />
          <div className='grid grid-cols-2 gap-4'>
            <Field
              label='New Password'
              id='newPass'
              type='password'
              value={adminSettings.newPassword}
              onChange={(v) =>
                setAdminSettings((p) => ({ ...p, newPassword: v }))
              }
              placeholder='••••••••'
            />
            <Field
              label='Confirm Password'
              id='confirmPass'
              type='password'
              value={adminSettings.confirmPassword}
              onChange={(v) =>
                setAdminSettings((p) => ({ ...p, confirmPassword: v }))
              }
              placeholder='••••••••'
            />
          </div>
          <button
            type='submit'
            className='self-start flex items-center gap-2 px-6 py-3 rounded-xl text-[12px] uppercase tracking-wider text-white transition-opacity hover:opacity-90'
            style={{
              background: "var(--gold)",
              fontFamily: "var(--font-body)",
            }}>
            <Save size={14} /> Update Password
          </button>
        </form>
      </div>

      {/* Catalog Stats */}
      <div
        className='rounded-2xl overflow-hidden'
        style={{
          background: "var(--white)",
          border: "1px solid var(--beige)",
        }}>
        <div
          className='px-6 py-4 border-b'
          style={{ borderColor: "var(--beige)", background: "var(--cream)" }}>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 20,
              color: "var(--text-dark)",
            }}>
            Catalog Overview
          </h3>
        </div>
        <div className='p-6'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {[
              ["Total", products.length],
              ["In Stock", products.filter((p) => p.inStock).length],
              ["With Badge", products.filter((p) => p.badge).length],
              ["Categories", new Set(products.map((p) => p.category)).size],
            ].map(([label, value]) => (
              <div
                key={label as string}
                className='rounded-xl p-4 text-center'
                style={{
                  background: "var(--cream)",
                  border: "1px solid var(--beige)",
                }}>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 24,
                    fontWeight: 500,
                    color: "var(--gold-dark)",
                  }}>
                  {value}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 10,
                    color: "var(--text-light)",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    marginTop: 2,
                  }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div
        className='rounded-2xl overflow-hidden'
        style={{ background: "var(--white)", border: "1.5px solid #FCA5A5" }}>
        <div
          className='px-6 py-4 border-b'
          style={{ borderColor: "#FCA5A5", background: "#FEF2F2" }}>
          <div className='flex items-center gap-2'>
            <AlertTriangle size={16} style={{ color: "#DC2626" }} />
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 20,
                color: "#DC2626",
              }}>
              Danger Zone
            </h3>
          </div>
        </div>
        <div className='p-6 flex flex-col gap-4'>
          <div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                fontWeight: 600,
                color: "var(--text-dark)",
                marginBottom: 4,
              }}>
              Reset All Data
            </div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 12,
                color: "var(--text-mid)",
                marginBottom: 12,
              }}>
              This will reset all products, orders, cart, and wishlist data to
              factory defaults. This action cannot be undone.
            </p>
            <button
              onClick={() => setShowReset(true)}
              className='flex items-center gap-2 px-5 py-2.5 rounded-xl text-[12px] uppercase tracking-wider text-white'
              style={{ background: "#DC2626", fontFamily: "var(--font-body)" }}>
              <RefreshCw size={13} /> Reset All Data
            </button>
          </div>
        </div>
      </div>

      {/* Reset confirm */}
      {showReset && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center p-4'
          style={{ background: "rgba(44,31,20,0.5)" }}>
          <div className='bg-white rounded-2xl p-6 w-full max-w-sm text-center'>
            <AlertTriangle
              size={40}
              className='mx-auto mb-3'
              style={{ color: "#DC2626" }}
            />
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 22,
                color: "var(--text-dark)",
                marginBottom: 8,
              }}>
              Are you sure?
            </h3>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                color: "var(--text-mid)",
                marginBottom: 20,
              }}>
              All custom products and orders will be permanently deleted.
            </p>
            <div className='flex gap-3'>
              <button
                onClick={() => setShowReset(false)}
                className='flex-1 py-3 rounded-xl border text-[12px] uppercase tracking-wider'
                style={{
                  fontFamily: "var(--font-body)",
                  borderColor: "var(--beige)",
                  color: "var(--text-mid)",
                }}>
                Cancel
              </button>
              <button
                onClick={handleReset}
                className='flex-1 py-3 rounded-xl text-[12px] uppercase tracking-wider text-white'
                style={{
                  background: "#DC2626",
                  fontFamily: "var(--font-body)",
                }}>
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
