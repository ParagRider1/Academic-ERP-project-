import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api/http'

export default function CourseStudents() {
  const { courseId } = useParams()
  const [students, setStudents] = useState([])
  const [course, setCourse] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    // fetch course list to find current course meta (name/code)
    api.get('/api/faculty/courses')
      .then(res => {
        const c = (res.data || []).find(x => String(x.id) === String(courseId))
        setCourse(c || null)
      })
      .catch(() => {})

    api.get(`/api/faculty/courses/${courseId}/students`)
      .then(res => setStudents(res.data))
      .catch(() => setError('Please login via Google'))
  }, [courseId])

  if (error) return (
    <div style={{
      background: 'linear-gradient(135deg,#fff7f7 0%, #f6f7ff 40%, #f7fffb 100%)',
      minHeight: '100vh', padding: 24
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
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
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <style>{`
          .students-card{transition:box-shadow .2s ease, transform .2s ease}
          .students-card:hover{transform:translateY(-2px); box-shadow:0 16px 36px rgba(2,6,23,0.12)}
          .students-table tbody tr{transition:background .2s ease}
          .students-table tbody tr:hover{background:#f8fafc}
          .back-link{transition:color .2s ease}
          .back-link:hover{color:#1d4ed8}
        `}</style>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
          <h2 style={{ margin: 0 }}>
            {course?.name ? course.name : `Course ${courseId}`}
            {course?.courseCode ? ` (${course.courseCode})` : ''}
          </h2>
          <Link to="/courses" className="back-link" style={{ color: '#2563eb', textDecoration: 'none' }}>← Back to My Courses</Link>
        </div>
        <div className="students-card" style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 12, boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
          <table className="students-table" cellPadding="10" cellSpacing="0" style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
            <thead>
              <tr style={{ background: '#f3f4f6' }}>
                <th style={{ textAlign: 'left' }}>Roll</th>
                <th style={{ textAlign: 'left' }}>Name</th>
                <th style={{ textAlign: 'left' }}>Email</th>
                <th style={{ textAlign: 'left' }}>Specialisation</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, idx) => (
                <tr key={s.id} style={{ background: idx % 2 ? '#fafafa' : '#fff' }}>
                  <td>{s.rollNumber}</td>
                  <td>{s.firstName} {s.lastName}</td>
                  <td>{s.email}</td>
                  <td>{s.specialisationCode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
