import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              반려동물을 위한<br />
              <span className="highlight">맞춤형 식단</span>
            </h1>
            <p className="hero-subtitle">
              전문가가 추천하는 맞춤 식단으로<br />
              건강한 반려동물을 만들어보세요
            </p>
            <div className="hero-buttons">
              <Link to="/pet-register" className="btn btn-primary">
                시작하기
              </Link>
              <Link to="/meal-plan" className="btn btn-outline">
                식단 알아보기
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-illustration">🐕🐱</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">왜 펫밀을 선택해야 할까요?</h2>
          <div className="features-grid">
            <div className="feature-card card">
              <div className="feature-icon">🎯</div>
              <h3>맞춤형 추천</h3>
              <p>
                반려동물의 종, 나이, 체중, 활동량 등을 분석하여
                최적의 식단을 추천합니다.
              </p>
            </div>
            <div className="feature-card card">
              <div className="feature-icon">🏥</div>
              <h3>건강 관리</h3>
              <p>
                영양학 전문가가 설계한 균형잡힌 식단으로
                반려동물의 건강을 체계적으로 관리합니다.
              </p>
            </div>
            <div className="feature-card card">
              <div className="feature-icon">📦</div>
              <h3>정기 배송</h3>
              <p>
                매주 또는 매월 원하는 주기에 맞춰
                신선한 식단을 집으로 배송해드립니다.
              </p>
            </div>
            <div className="feature-card card">
              <div className="feature-icon">💚</div>
              <h3>신선한 재료</h3>
              <p>
                인증된 재료만을 사용하여
                안전하고 신선한 식단을 제공합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">이용 방법</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>반려동물 정보 등록</h3>
              <p>반려동물의 기본 정보와 건강 상태를 등록하세요.</p>
            </div>
            <div className="step-arrow">→</div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>맞춤 식단 추천받기</h3>
              <p>AI가 분석한 맞춤형 식단을 확인하세요.</p>
            </div>
            <div className="step-arrow">→</div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>구독 신청</h3>
              <p>마음에 드는 식단을 선택하고 구독을 시작하세요.</p>
            </div>
            <div className="step-arrow">→</div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>정기 배송받기</h3>
              <p>설정한 주기에 맞춰 신선한 식단을 받아보세요.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>지금 시작하세요</h2>
            <p>반려동물의 건강한 식단 관리, 지금 바로 시작해보세요.</p>
            <Link to="/pet-register" className="btn btn-primary btn-large">
              무료로 시작하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home