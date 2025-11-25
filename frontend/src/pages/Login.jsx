import React from 'react'

export default function Login() {
  const loginUrl = `${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/google`
  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @keyframes float {0%{transform:translateY(0)}50%{transform:translateY(-8px)}100%{transform:translateY(0)}}
        @keyframes gradientMove {0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        .bg-hero{position:fixed; inset:0; z-index:-1; background:radial-gradient(1200px 600px at 10% 10%, rgba(14,165,233,0.12), transparent 60%),
                  radial-gradient(1000px 600px at 90% 20%, rgba(99,102,241,0.12), transparent 60%),
                  radial-gradient(1000px 600px at 30% 90%, rgba(34,211,238,0.12), transparent 60%)}
        .glow{position:absolute; filter:blur(60px); opacity:.35; animation:float 6s ease-in-out infinite}
        .glow.a{top:-60px; left:-60px; width:300px; height:300px; background:linear-gradient(135deg,#60a5fa,#22d3ee)}
        .glow.b{bottom:-60px; right:-60px; width:320px; height:320px; background:linear-gradient(135deg,#22d3ee,#6366f1)}
        .card{background:rgba(255,255,255,0.9); backdrop-filter:saturate(180%) blur(10px); border:1px solid rgba(0,0,0,0.06); border-radius:16px; box-shadow:0 24px 60px rgba(2,6,23,0.18)}
        .btn{display:inline-flex; align-items:center; gap:10px; padding:12px 16px; border-radius:12px; text-decoration:none; color:#0b1026; background:#fff; border:1px solid rgba(0,0,0,0.06);
             transition:transform .15s ease, box-shadow .15s ease}
        .btn:hover{transform:translateY(-1px); box-shadow:0 16px 36px rgba(2,6,23,0.14)}
        .title{background:linear-gradient(90deg,#0ea5e9,#6366f1,#22d3ee); background-size:200% 200%; -webkit-background-clip:text; background-clip:text; color:transparent; animation:gradientMove 10s ease infinite}
      `}</style>
      <div className="bg-hero"></div>
      <div className="glow a" />
      <div className="glow b" />

      <div className="card" style={{ maxWidth: 900, width: '95%', display: 'grid', gridTemplateColumns: '1.1fr .9fr', overflow: 'hidden' }}>
        <div style={{ padding: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
            <img src="/logo.png" alt="Logo" style={{ height: 40 }} />
            <div style={{ fontWeight: 800, fontSize: 18, color: '#0B1026' }}>Academic ERP</div>
          </div>
          <div style={{ marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: '#0b1026', background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(0,0,0,0.06)', padding: '4px 10px', borderRadius: 999 }}>Faculty Login</span>
          </div>
          <h1 className="title" style={{ margin: '8px 0 10px 0', fontSize: 32, lineHeight: 1.2 }}>“The only way to predict the future is to create it.”</h1>
          <p style={{ color: '#334155', marginBottom: 16, fontStyle: 'italic' }}>— Peter Drucker</p>

          <div style={{ height: 8 }} />

          <a className="btn" href={loginUrl}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C33.191,6.053,28.791,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20 s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,16.108,18.961,14,24,14c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657 C33.191,6.053,28.791,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c4.717,0,9.045-1.807,12.326-4.771l-5.695-4.807C28.517,36.091,26.355,37,24,37 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.235-2.231,4.166-4.083,5.583c0.001-0.001,0.002-0.001,0.003-0.002 l6.652,5.146C36.709,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
            Continue with Google
          </a>
        </div>
        <div style={{ position: 'relative', background: 'linear-gradient(135deg,#0ea5e9,#6366f1,#22d3ee)', minHeight: 320 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'url(/grid.svg)', opacity: .15 }} />
          <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: 'white', textAlign: 'center', padding: 24 }}>
            <div style={{ maxWidth: 300 }}>
              <div style={{ fontWeight: 700, fontSize: 24, marginBottom: 10 }}>Welcome</div>
              <div style={{ opacity: .95 }}>Your teaching schedule and student lists at a glance — fast, simple, beautiful.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
