import React, { useEffect, useState } from 'react'
import { Routes, Route, NavLink, Navigate } from 'react-router-dom'
import Timetable from './pages/Timetable'
import CourseStudents from './pages/CourseStudents'
import Login from './pages/Login'
import Courses from './pages/Courses'

export default function App() {
  const [me, setMe] = useState(null)
  const [meLoading, setMeLoading] = useState(true)

  useEffect(() => {
    // soft fetch of current user
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/me`, { credentials: 'include' })
      .then(r => r.ok ? r.json() : null)
      .then(d => setMe(d))
      .catch(() => {})
      .finally(() => setMeLoading(false))
  }, [])

  const linkStyle = ({ isActive }) => ({
    padding: '8px 12px', borderRadius: 10, textDecoration: 'none',
    color: isActive ? '#0B1026' : '#132046',
    background: isActive ? 'rgba(255,255,255,0.9)' : 'transparent',
    boxShadow: isActive ? '0 4px 14px rgba(0,0,0,0.08)' : 'none'
  })

  return (
    <div>
      <style>{`
        @keyframes gradientMove {0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        .neon-header{background:linear-gradient(90deg,#0ea5e9,#6366f1,#22d3ee,#60a5fa);background-size:300% 300%;animation:gradientMove 15s ease infinite}
        .glass{backdrop-filter:saturate(180%) blur(8px)}
      `}</style>
      <header className="neon-header glass" style={{
        position: 'sticky', top: 0, zIndex: 50,
        borderBottom: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 12px 32px rgba(17,24,39,0.18)'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src="/logo.png" alt="App Logo" style={{ height: 34, width: 'auto', display: 'block' }} />
            <div style={{ fontWeight: 800, color: '#0B1026', letterSpacing: .2 }}>Academic ERP</div>
          </div>
          <nav style={{ display: 'flex', gap: 8, marginLeft: 16 }}>
            <NavLink to="/" style={linkStyle}>Timetable</NavLink>
            <NavLink to="/courses" style={linkStyle}>My Courses</NavLink>
          </nav>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
            {me?.name ? (
              <span style={{ fontSize: 13, color: '#21304d' }}>Hi, {me.name}</span>
            ) : null}
            <a href={`${import.meta.env.VITE_API_BASE_URL}/api/logout`} style={{
              padding: '8px 12px', borderRadius: 10, textDecoration: 'none', color: '#fff',
              background: 'linear-gradient(135deg,#ef4444,#f97316)', boxShadow: '0 6px 14px rgba(239,68,68,0.25)'
            }}>Logout</a>
          </div>
        </div>
      </header>
      <main style={{ padding: 16, position: 'relative' }}>
        <div style={{
          position: 'fixed', inset: 0, zIndex: -1,
          background: 'radial-gradient(1200px 600px at 10% 10%, rgba(99,102,241,0.08), transparent 60%),\
                       radial-gradient(1000px 500px at 90% 20%, rgba(14,165,233,0.08), transparent 60%),\
                       radial-gradient(1000px 600px at 30% 90%, rgba(34,211,238,0.08), transparent 60%)'
        }} />
        {meLoading ? null : (
          (me && me.email) ? (
            <Routes>
              <Route path="/" element={<Timetable />} />
              <Route path="/login" element={<Navigate to="/" replace />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:courseId/students" element={<CourseStudents />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          )
        )}
      </main>
    </div>
  )
}
