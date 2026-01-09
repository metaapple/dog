import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './Login.css'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const url = isLogin 
        ? 'http://localhost:3001/api/auth/login'
        : 'http://localhost:3001/api/auth/register'
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      // 네트워크 오류 확인
      if (!response.ok && response.status === 0) {
        throw new Error('서버에 연결할 수 없습니다.')
      }

      let data
      try {
        data = await response.json()
      } catch (parseError) {
        throw new Error('서버 응답을 처리할 수 없습니다.')
      }

      if (data.success) {
        login(data.user, data.token)
        navigate('/')
      } else {
        setError(data.message || '오류가 발생했습니다.')
      }
    } catch (error) {
      console.error('인증 오류:', error)
      if (error.message === 'Failed to fetch' || error.message.includes('fetch')) {
        setError('서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요. (npm run server 또는 npm run dev:all)')
      } else {
        setError(error.message || '서버 연결에 실패했습니다. 서버가 실행 중인지 확인해주세요.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>🐾 펫밀</h1>
          <p>{isLogin ? '로그인' : '회원가입'}</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">이름</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required={!isLogin}
                placeholder="이름을 입력하세요"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="이메일을 입력하세요"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="비밀번호를 입력하세요"
            />
          </div>

          {error && (
            <div className="error-message">
              {error}
              {error.includes('서버에 연결할 수 없습니다') && (
                <div style={{ marginTop: '10px', fontSize: '13px', color: '#666' }}>
                  <strong>해결 방법:</strong>
                  <br />
                  1. 터미널에서 <code>npm run server</code> 실행
                  <br />
                  2. 또는 <code>npm run dev:all</code>로 서버와 프론트엔드 동시 실행
                </div>
              )}
            </div>
          )}

          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? '처리 중...' : (isLogin ? '로그인' : '회원가입')}
          </button>
        </form>

        <div className="login-footer">
          <p>
            {isLogin ? '계정이 없으신가요? ' : '이미 계정이 있으신가요? '}
            <button
              type="button"
              className="link-button"
              onClick={() => {
                setIsLogin(!isLogin)
                setError('')
                setFormData({ email: '', password: '', name: '' })
              }}
            >
              {isLogin ? '회원가입' : '로그인'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
