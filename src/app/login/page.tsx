"use client";
import Logo from "@/components/ui/Logo";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      if (user === "admin" && pass === "meherva2024") {
        sessionStorage.setItem("meherva_admin", "1");
        router.push("/admin/dashboard");
      } else {
        setError("Invalid username or password");
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div
      className='min-h-screen flex'
      style={{ background: "var(--cream-dark)" }}>
      {/* Left decorative panel */}
      <div
        className='hidden lg:flex flex-1 flex-col items-center justify-center p-12 relative overflow-hidden'
        style={{ background: "var(--gold-dark)" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.08,
            backgroundImage:
              "radial-gradient(circle at 40% 40%, white 0%, transparent 55%)",
          }}
        />
        <div className='relative z-10 text-center flex flex-col items-center gap-6'>
          <Logo dark size='lg' href='/login' />
          <div
            style={{
              width: 40,
              height: 1,
              background: "rgba(255,255,255,0.3)",
            }}
          />
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 34,
              fontWeight: 400,
              color: "white",
              lineHeight: 1.2,
            }}>
            Admin Dashboard
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              color: "rgba(255,255,255,0.7)",
              maxWidth: 280,
              lineHeight: 1.7,
              letterSpacing: "0.3px",
            }}>
            Manage your products, track orders, and keep your Meherva store
            running beautifully.
          </p>
          <div className='grid grid-cols-2 gap-4 mt-4'>
            {[
              ["25+", "Products"],
              ["10K+", "Customers"],
              ["99%", "Satisfaction"],
              ["24/7", "Support"],
            ].map(([n, l]) => (
              <div
                key={l}
                className='rounded-xl p-4 text-center'
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 22,
                    fontWeight: 600,
                    color: "white",
                  }}>
                  {n}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 10,
                    color: "rgba(255,255,255,0.6)",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    marginTop: 2,
                  }}>
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Login form */}
      <div className='flex-1 lg:max-w-md flex items-center justify-center p-8'>
        <div className='w-full max-w-sm'>
          <div className='mb-8 flex flex-col items-center lg:items-start gap-2'>
            <div className='lg:hidden mb-2'>
              <Logo />
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 30,
                fontWeight: 400,
                color: "var(--text-dark)",
              }}>
              Welcome back
            </h1>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                color: "var(--text-light)",
              }}>
              Sign in to your admin account
            </p>
          </div>

          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1.5'>
              <label
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  letterSpacing: "0.8px",
                  textTransform: "uppercase",
                  color: "var(--text-light)",
                }}>
                Username
              </label>
              <div className='relative'>
                <User
                  size={15}
                  className='absolute left-3.5 top-1/2 -translate-y-1/2'
                  style={{ color: "var(--text-light)" }}
                />
                <input
                  type='text'
                  required
                  placeholder='admin'
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  className='w-full pl-10 pr-4 py-3 rounded-xl border outline-none text-[13px] transition-colors'
                  style={{
                    fontFamily: "var(--font-body)",
                    borderColor: "var(--beige)",
                    background: "var(--white)",
                    color: "var(--text-dark)",
                  }}
                />
              </div>
            </div>

            <div className='flex flex-col gap-1.5'>
              <label
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  letterSpacing: "0.8px",
                  textTransform: "uppercase",
                  color: "var(--text-light)",
                }}>
                Password
              </label>
              <div className='relative'>
                <Lock
                  size={15}
                  className='absolute left-3.5 top-1/2 -translate-y-1/2'
                  style={{ color: "var(--text-light)" }}
                />
                <input
                  type={showPass ? "text" : "password"}
                  required
                  placeholder='••••••••'
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  className='w-full pl-10 pr-10 py-3 rounded-xl border outline-none text-[13px]'
                  style={{
                    fontFamily: "var(--font-body)",
                    borderColor: "var(--beige)",
                    background: "var(--white)",
                    color: "var(--text-dark)",
                  }}
                />
                <button
                  type='button'
                  onClick={() => setShowPass((v) => !v)}
                  className='absolute right-3.5 top-1/2 -translate-y-1/2'
                  style={{ color: "var(--text-light)" }}>
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <div
                className='flex items-center gap-2 px-4 py-3 rounded-xl text-[13px]'
                style={{
                  background: "#FEF2F2",
                  border: "1px solid #FCA5A5",
                  color: "#DC2626",
                  fontFamily: "var(--font-body)",
                }}>
                ⚠ {error}
              </div>
            )}

            <div
              className='mt-1 p-3 rounded-xl text-[12px]'
              style={{
                background: "var(--cream)",
                border: "1px solid var(--beige)",
                color: "var(--text-light)",
                fontFamily: "var(--font-body)",
              }}>
              Demo: username{" "}
              <strong style={{ color: "var(--text-mid)" }}>admin</strong> /
              password{" "}
              <strong style={{ color: "var(--text-mid)" }}>meherva2024</strong>
            </div>

            <button
              type='submit'
              disabled={loading}
              className='w-full py-3.5 rounded-xl text-[12px] uppercase tracking-widest text-white font-medium transition-opacity hover:opacity-90 disabled:opacity-60 mt-1'
              style={{
                background: "var(--gold)",
                fontFamily: "var(--font-body)",
              }}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
