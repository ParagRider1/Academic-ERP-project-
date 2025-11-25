import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/http'

export default function Timetable() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('/api/faculty/timetable')
      .then(res => setItems(res.data))
      .catch(() => setError('Please login via Google'))
      .finally(() => setLoading(false))
  }, [])

  const dayOrder = ['MON','TUE','WED','THU','FRI','SAT','SUN']

  const parseStartMinutes = (timeRange) => {
    // expects format HH:MM-HH:MM
    if (!timeRange) return 0
    const start = timeRange.split('-')[0]
    const [h, m] = start.split(':').map(Number)
    return (h || 0) * 60 + (m || 0)
  }

  // Build unique, sorted time slots by start time
  const timeSlots = Array.from(new Set(items.map(i => i.time)))
    .sort((a, b) => parseStartMinutes(a) - parseStartMinutes(b))

  // Map day+time to entries (to support multiple classes in same slot)
  const cellMap = items.reduce((acc, i) => {
    const key = `${i.day}|${i.time}`
    if (!acc[key]) acc[key] = []
    acc[key].push(i)
    return acc
  }, {})

  // Distinct palette for courses (cycle if more courses than palette)
  const palette = ['#E3F2FD','#E8F5E9','#FFF3E0','#F3E5F5','#E0F2F1','#FFFDE7','#FCE4EC','#EDE7F6','#F1F8E9','#E0F7FA']

  // Build a stable list of courses to assign colors
  const uniqueCourses = Object.values(items.reduce((acc, i) => {
    const key = i.courseCode || `${i.courseId}`
    if (!acc[key]) acc[key] = { code: i.courseCode, name: i.courseName, id: i.courseId }
    return acc
  }, {}))

  const colorMap = uniqueCourses.reduce((acc, c, idx) => {
    acc[c.code || c.id] = palette[idx % palette.length]
    return acc
  }, {})

  const colorFromCode = (code) => colorMap[code] || '#eef2ff'

  if (loading) return <p>Loading...</p>
  if (error) return (
    <div>
      <p>{error}</p>
      <a href={`${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/google`}>Login with Google</a>
    </div>
  )

  return (
    <div style={{
      background: 'linear-gradient(135deg,#f8fbff 0%, #eef6ff 30%, #f9f9ff 100%)',
      minHeight: '100vh', padding: 24
    }}>
      <style>{`
        .tt-card{transition:transform .2s ease, box-shadow .2s ease}
        .tt-card:hover{transform:translateY(-2px); box-shadow:0 8px 18px rgba(0,0,0,0.12)}
      `}</style>
      <h2 style={{ marginBottom: 8 }}>Weekly Timetable</h2>
      {uniqueCourses.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
          {uniqueCourses.map(c => (
            <div key={c.code || c.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 8px', borderRadius: 999, background: '#fff', border: '1px solid rgba(0,0,0,0.06)' }}>
              <span style={{ width: 12, height: 12, borderRadius: 999, background: colorFromCode(c.code || c.id), display: 'inline-block' }}></span>
              <span style={{ fontSize: 12 }}>{c.code} · {c.name}</span>
            </div>
          ))}
        </div>
      )}
      <table border="1" cellPadding="8" cellSpacing="0" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead style={{ background: '#f8f8f8' }}>
          <tr>
            <th style={{ textAlign: 'left' }}>Time</th>
            {dayOrder.map(d => (
              <th key={d}>{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map(ts => (
            <tr key={ts}>
              <td style={{ fontWeight: 600 }}>{ts}</td>
              {dayOrder.map(d => {
                const key = `${d}|${ts}`
                const entries = cellMap[key] || []
                return (
                  <td key={key} style={{ verticalAlign: 'top', background: '#fff' }}>
                    {entries.length === 0 ? (
                      <span style={{ color: '#aaa' }}>—</span>
                    ) : (
                      entries.map((i, idx) => (
                        <div key={idx} className="tt-card" style={{
                          marginBottom: 8, padding: 8, borderRadius: 8,
                          background: colorFromCode(i.courseCode), border: '1px solid rgba(0,0,0,0.05)'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                            <div style={{ fontWeight: 700 }}>{i.courseCode} · {i.courseName}</div>
                            {i.courseId ? (
                              <Link to={`/courses/${i.courseId}/students`} style={{ fontSize: 12 }}>View students →</Link>
                            ) : null}
                          </div>
                          <div style={{ fontSize: 12, color: '#555' }}>
                            {i.specialisationCode}{i.specialisationName ? ` · ${i.specialisationName}` : ''}
                          </div>
                          <div style={{ display: 'flex', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
                            <span style={{
                              fontSize: 12, background: '#FEF3C7', color: '#92400E',
                              padding: '2px 8px', borderRadius: 999, border: '1px solid #FDE68A'
                            }}>Room {i.room}</span>
                            <span style={{
                              fontSize: 12, background: '#E0E7FF', color: '#3730A3',
                              padding: '2px 8px', borderRadius: 999, border: '1px solid #C7D2FE'
                            }}>{i.building}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
