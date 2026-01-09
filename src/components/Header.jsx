import { Link, useLocation } from 'react-router-dom'
import './Header.css'

function Header() {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

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
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header