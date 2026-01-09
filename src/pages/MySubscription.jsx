import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './MySubscription.css'

function MySubscription() {
  const navigate = useNavigate()
  const [subscriptions, setSubscriptions] = useState([])
  const [pets, setPets] = useState([])

  useEffect(() => {
    const savedSubscriptions = JSON.parse(localStorage.getItem('subscriptions') || '[]')
    const savedPets = JSON.parse(localStorage.getItem('pets') || '[]')
    setSubscriptions(savedSubscriptions)
    setPets(savedPets)
  }, [])

  const cancelSubscription = (id) => {
    if (window.confirm('정말 구독을 취소하시겠습니까?')) {
      const updated = subscriptions.map(sub => 
        sub.id === id ? { ...sub, status: 'cancelled' } : sub
      )
      setSubscriptions(updated)
      localStorage.setItem('subscriptions', JSON.stringify(updated))
      alert('구독이 취소되었습니다.')
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getFrequencyText = (frequency) => {
    switch (frequency) {
      case 'weekly':
        return '주 1회'
      case 'biweekly':
        return '2주 1회'
      case 'monthly':
        return '월 1회'
      default:
        return frequency
    }
  }

  const activeSubscriptions = subscriptions.filter(sub => sub.status === 'active')
  const cancelledSubscriptions = subscriptions.filter(sub => sub.status === 'cancelled')

  if (subscriptions.length === 0) {
    return (
      <div className="my-subscription">
        <div className="container">
          <div className="empty-state">
            <h2>아직 구독 중인 식단이 없습니다</h2>
            <p>맞춤형 식단을 선택하고 구독을 시작해보세요.</p>
            <button onClick={() => navigate('/meal-plan')} className="btn btn-primary">
              식단 둘러보기
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="my-subscription">
      <div className="container">
        <div className="page-header">
          <h1>나의 구독</h1>
          <p>현재 구독 중인 식단과 배송 정보를 확인하세요.</p>
        </div>

        {activeSubscriptions.length > 0 && (
          <div className="subscriptions-section">
            <h2 className="section-subtitle">활성 구독</h2>
            <div className="subscriptions-grid">
              {activeSubscriptions.map(sub => (
                <div key={sub.id} className="subscription-card card">
                  <div className="subscription-header">
                    <div>
                      <h3>{sub.planName}</h3>
                      <p className="pet-name">{sub.petName}님용</p>
                    </div>
                    <span className="status-badge active">활성</span>
                  </div>

                  <div className="subscription-info">
                    <div className="info-row">
                      <span className="info-label">배송 주기:</span>
                      <span className="info-value">{getFrequencyText(sub.frequency)}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">주문 금액:</span>
                      <span className="info-value price">{sub.price?.toLocaleString()}원 /주</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">구독 시작일:</span>
                      <span className="info-value">{formatDate(sub.createdAt)}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">다음 배송일:</span>
                      <span className="info-value">예상: {formatDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))}</span>
                    </div>
                  </div>

                  <div className="subscription-actions">
                    <button
                      onClick={() => cancelSubscription(sub.id)}
                      className="btn btn-outline btn-danger"
                    >
                      구독 취소
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {cancelledSubscriptions.length > 0 && (
          <div className="subscriptions-section">
            <h2 className="section-subtitle">취소된 구독</h2>
            <div className="subscriptions-grid">
              {cancelledSubscriptions.map(sub => (
                <div key={sub.id} className="subscription-card card cancelled">
                  <div className="subscription-header">
                    <div>
                      <h3>{sub.planName}</h3>
                      <p className="pet-name">{sub.petName}님용</p>
                    </div>
                    <span className="status-badge cancelled">취소됨</span>
                  </div>

                  <div className="subscription-info">
                    <div className="info-row">
                      <span className="info-label">배송 주기:</span>
                      <span className="info-value">{getFrequencyText(sub.frequency)}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">구독 시작일:</span>
                      <span className="info-value">{formatDate(sub.createdAt)}</span>
                    </div>
                  </div>

                  <div className="subscription-actions">
                    <button
                      onClick={() => navigate('/meal-plan')}
                      className="btn btn-primary"
                    >
                      새로 구독하기
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="summary-card card">
          <h3>구독 요약</h3>
          <div className="summary-grid">
            <div className="summary-item">
              <span className="summary-label">총 구독 수</span>
              <span className="summary-value">{subscriptions.length}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">활성 구독</span>
              <span className="summary-value">{activeSubscriptions.length}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">월 예상 비용</span>
              <span className="summary-value">
                {activeSubscriptions.reduce((sum, sub) => {
                  const monthlyMultiplier = sub.frequency === 'weekly' ? 4 : 
                                          sub.frequency === 'biweekly' ? 2 : 1
                  return sum + (sub.price * monthlyMultiplier)
                }, 0).toLocaleString()}원
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MySubscription