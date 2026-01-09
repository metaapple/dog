import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './MealPlan.css'

function MealPlan() {
  const navigate = useNavigate()
  const [pets, setPets] = useState([])
  const [selectedPet, setSelectedPet] = useState(null)
  const [mealPlans, setMealPlans] = useState([])
  const [subscription, setSubscription] = useState({
    frequency: 'weekly',
    servings: 2,
    startDate: ''
  })

  useEffect(() => {
    const savedPets = JSON.parse(localStorage.getItem('pets') || '[]')
    setPets(savedPets)
    if (savedPets.length > 0) {
      setSelectedPet(savedPets[0])
      generateMealPlans(savedPets[0])
    }
  }, [])

  const generateMealPlans = (pet) => {
    // 간단한 맞춤형 식단 생성 로직 (실제로는 API 호출)
    const basePlans = [
      {
        id: 1,
        name: '균형잡힌 기본 식단',
        description: '일반 성견/성묘를 위한 균형잡힌 영양식',
        price: 45000,
        calories: pet.weight * 30,
        protein: '25%',
        fat: '15%',
        carbs: '60%',
        features: ['균형잡힌 영양', '소화하기 쉬운 재료', '비타민 첨가']
      },
      {
        id: 2,
        name: '활동적인 반려동물용 식단',
        description: '활발한 활동량을 위한 고칼로리 식단',
        price: 55000,
        calories: pet.weight * 40,
        protein: '30%',
        fat: '20%',
        carbs: '50%',
        features: ['고단백', '활동 에너지 보충', '근육 건강 지원']
      },
      {
        id: 3,
        name: '다이어트 식단',
        description: '체중 관리가 필요한 반려동물을 위한 저칼로리 식단',
        price: 48000,
        calories: pet.weight * 20,
        protein: '30%',
        fat: '10%',
        carbs: '60%',
        features: ['저칼로리', '고섬유질', '만족감 향상']
      },
      {
        id: 4,
        name: '시니어 케어 식단',
        description: '나이든 반려동물을 위한 특별 관리 식단',
        price: 52000,
        calories: pet.weight * 25,
        protein: '25%',
        fat: '12%',
        carbs: '63%',
        features: ['관절 건강 지원', '면역력 강화', '소화 개선']
      }
    ]

    // 나이와 활동량에 따라 식단 필터링
    let filteredPlans = basePlans
    const ageMonths = parseInt(pet.age) || 0
    
    if (ageMonths < 12) {
      // 유아용 식단
      filteredPlans = [basePlans[1]]
    } else if (ageMonths >= 84) {
      // 시니어용 식단
      filteredPlans = [basePlans[3]]
    } else if (pet.activity === 'low') {
      // 활동량 낮음 - 다이어트 식단
      filteredPlans = [basePlans[2], basePlans[0]]
    } else if (pet.activity === 'high' || pet.activity === 'very-high') {
      // 활동량 높음 - 고칼로리 식단
      filteredPlans = [basePlans[1], basePlans[0]]
    }

    setMealPlans(filteredPlans)
  }

  const handlePetChange = (e) => {
    const pet = pets.find(p => p.id === parseInt(e.target.value))
    setSelectedPet(pet)
    if (pet) {
      generateMealPlans(pet)
    }
  }

  const handleSubscribe = (plan) => {
    const subscriptions = JSON.parse(localStorage.getItem('subscriptions') || '[]')
    const newSubscription = {
      id: Date.now(),
      petId: selectedPet.id,
      petName: selectedPet.name,
      planId: plan.id,
      planName: plan.name,
      ...subscription,
      price: plan.price,
      status: 'active',
      createdAt: new Date().toISOString()
    }
    subscriptions.push(newSubscription)
    localStorage.setItem('subscriptions', JSON.stringify(subscriptions))
    alert('구독이 완료되었습니다!')
    navigate('/my-subscription')
  }

  if (pets.length === 0) {
    return (
      <div className="meal-plan">
        <div className="container">
          <div className="empty-state">
            <h2>반려동물을 먼저 등록해주세요</h2>
            <p>맞춤형 식단을 추천받으려면 반려동물 정보가 필요합니다.</p>
            <button onClick={() => navigate('/pet-register')} className="btn btn-primary">
              반려동물 등록하기
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="meal-plan">
      <div className="container">
        <div className="page-header">
          <h1>맞춤형 식단 추천</h1>
          <p>{selectedPet?.name}님을 위한 특별한 식단을 추천해드립니다.</p>
        </div>

        <div className="pet-selector">
          <label htmlFor="pet-select">반려동물 선택</label>
          <select
            id="pet-select"
            value={selectedPet?.id || ''}
            onChange={handlePetChange}
          >
            {pets.map(pet => (
              <option key={pet.id} value={pet.id}>
                {pet.name} ({pet.type === 'dog' ? '강아지' : '고양이'})
              </option>
            ))}
          </select>
        </div>

        {selectedPet && (
          <div className="pet-info-card card">
            <h3>반려동물 정보</h3>
            <div className="pet-info-grid">
              <div>
                <strong>이름:</strong> {selectedPet.name}
              </div>
              <div>
                <strong>종류:</strong> {selectedPet.type === 'dog' ? '강아지' : '고양이'}
              </div>
              <div>
                <strong>나이:</strong> {selectedPet.age}개월
              </div>
              <div>
                <strong>체중:</strong> {selectedPet.weight}kg
              </div>
              <div>
                <strong>활동량:</strong> {
                  selectedPet.activity === 'low' ? '낮음' :
                  selectedPet.activity === 'normal' ? '보통' :
                  selectedPet.activity === 'high' ? '높음' : '매우 높음'
                }
              </div>
            </div>
          </div>
        )}

        <div className="meal-plans">
          <h2 className="section-title">추천 식단</h2>
          <div className="meal-plans-grid">
            {mealPlans.map(plan => (
              <div key={plan.id} className="meal-plan-card card">
                <div className="plan-header">
                  <h3>{plan.name}</h3>
                  <div className="plan-price">
                    {plan.price.toLocaleString()}원
                    <span className="price-unit">/주</span>
                  </div>
                </div>
                <p className="plan-description">{plan.description}</p>
                
                <div className="plan-nutrition">
                  <h4>영양 정보</h4>
                  <div className="nutrition-grid">
                    <div>
                      <span className="nutrition-label">칼로리:</span>
                      <span className="nutrition-value">{plan.calories}kcal</span>
                    </div>
                    <div>
                      <span className="nutrition-label">단백질:</span>
                      <span className="nutrition-value">{plan.protein}</span>
                    </div>
                    <div>
                      <span className="nutrition-label">지방:</span>
                      <span className="nutrition-value">{plan.fat}</span>
                    </div>
                    <div>
                      <span className="nutrition-label">탄수화물:</span>
                      <span className="nutrition-value">{plan.carbs}</span>
                    </div>
                  </div>
                </div>

                <div className="plan-features">
                  <h4>특징</h4>
                  <ul>
                    {plan.features.map((feature, idx) => (
                      <li key={idx}>✓ {feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="plan-actions">
                  <select
                    value={subscription.frequency}
                    onChange={(e) => setSubscription({...subscription, frequency: e.target.value})}
                    className="frequency-select"
                  >
                    <option value="weekly">주 1회 배송</option>
                    <option value="biweekly">2주 1회 배송</option>
                    <option value="monthly">월 1회 배송</option>
                  </select>
                  <button
                    onClick={() => handleSubscribe(plan)}
                    className="btn btn-primary btn-full"
                  >
                    구독하기
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MealPlan