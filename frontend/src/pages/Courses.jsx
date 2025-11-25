import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/http'

export default function Courses() {
  const [courses, setCourses] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('/api/faculty/courses')
      .then(res => setCourses(res.data))
      .catch(() => setError('Please login via Google'))
  }, [])

  if (error) return (
    <div style={{
      background: 'linear-gradient(135deg,#fff7f7 0%, #f6f7ff 40%, #f7fffb 100%)',
      minHeight: '100vh', padding: 24
    }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <p>{error}</p>
        <a href={`${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/google`}>Login with Google</a>
      </div>
    </div>
  )

  return (
    <div style={{
      background: 'linear-gradient(135deg,#fff7f7 0%, #f6f7ff 40%, #f7fffb 100%)',
      minHeight: '100vh', padding: 24
    }}>
      <style>{`
        .course-card{transition:transform .2s ease, box-shadow .2s ease}
        .course-card:hover{transform:translateY(-4px); box-shadow:0 14px 32px rgba(2,6,23,0.12)}
        .btn{transition:transform .15s ease, box-shadow .15s ease}
        .btn:hover{transform:translateY(-1px); box-shadow:0 10px 20px rgba(14,165,233,0.35)}
        .table tbody tr{transition:background .2s ease}
        .table tbody tr:hover{background:#f1f5f9}
      `}</style>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{ marginBottom: 16 }}>My Courses</h2>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px,1fr))', gap: 16
        }}>
          {courses.map(c => (
            <div key={c.id} className="course-card" style={{
              background: '#fff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 12, padding: 16,
              boxShadow: '0 4px 16px rgba(0,0,0,0.04)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
                <div>
                  <div style={{ fontSize: 12, color: '#666' }}>{c.courseCode}</div>
                  <div style={{ fontWeight: 700, fontSize: 18 }}>{c.name}</div>
                </div>
                <Link to={`/courses/${c.id}/students`} className="btn" style={{
                  background: '#0ea5e9', color: '#fff', padding: '6px 10px', borderRadius: 8,
                  textDecoration: 'none', fontSize: 12
                }}>View Students</Link>
              </div>
              <div style={{ marginTop: 8, fontSize: 13, color: '#444' }}>
                {c.specialisationCode}{c.specialisationName ? ` · ${c.specialisationName}` : ''}
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 20 }}>
          <table className="table" cellPadding="10" cellSpacing="0" style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
            <thead>
              <tr style={{ background: '#f3f4f6' }}>
                <th style={{ textAlign: 'left' }}>Course Code</th>
                <th style={{ textAlign: 'left' }}>Name</th>
                <th style={{ textAlign: 'left' }}>Specialisation</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c, idx) => (
                <tr key={c.id} style={{ background: idx % 2 ? '#fafafa' : '#fff' }}>
                  <td>{c.courseCode}</td>
                  <td>{c.name}</td>
                  <td>{c.specialisationCode}{c.specialisationName ? ` · ${c.specialisationName}` : ''}</td>
                  <td>
                    <Link to={`/courses/${c.id}/students`} style={{ color: '#2563eb' }}>View Students →</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
