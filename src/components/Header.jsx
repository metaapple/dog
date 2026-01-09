import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './Header.css'

function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, user, logout } = useAuth()

  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <span className="logo-icon">🐾</span>
            <span className="logo-text">펫밀</span>
          </Link>
          <nav className="nav">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              홈
            </Link>
            {isAuthenticated ? (
              <>
                <Link 
                  to="/pet-register" 
                  className={`nav-link ${isActive('/pet-register') ? 'active' : ''}`}
                >
                  반려동물 등록
                </Link>
                <Link 
                  to="/meal-plan" 
                  className={`nav-link ${isActive('/meal-plan') ? 'active' : ''}`}
                >
                  맞춤 식단
                </Link>
                <Link 
                  to="/my-subscription" 
                  className={`nav-link ${isActive('/my-subscription') ? 'active' : ''}`}
                >
                  나의 구독
                </Link>
              </>
            ) : null}
          </nav>
          <div className="header-actions">
            {isAuthenticated ? (
              <div className="user-menu">
                <span className="user-name">{user?.name}님</span>
                <button onClick={handleLogout} className="btn-logout">
                  로그아웃
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn-login">
                로그인
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header