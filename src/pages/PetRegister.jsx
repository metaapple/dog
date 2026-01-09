import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './PetRegister.css'

function PetRegister() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    breed: '',
    age: '',
    weight: '',
    activity: 'normal',
    health: '',
    allergies: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // 로컬 스토리지에 저장 (실제로는 API 호출)
    const pets = JSON.parse(localStorage.getItem('pets') || '[]')
    const newPet = {
      ...formData,
      id: Date.now()
    }
    pets.push(newPet)
    localStorage.setItem('pets', JSON.stringify(pets))
    alert('반려동물 정보가 등록되었습니다!')
    navigate('/meal-plan')
  }

  return (
    <div className="pet-register">
      <div className="container">
        <div className="page-header">
          <h1>반려동물 정보 등록</h1>
          <p>맞춤형 식단을 추천받기 위해 반려동물의 정보를 입력해주세요.</p>
        </div>

        <form onSubmit={handleSubmit} className="pet-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">이름 *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="반려동물의 이름을 입력하세요"
              />
            </div>

            <div className="form-group">
              <label htmlFor="type">종류 *</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="">선택하세요</option>
                <option value="dog">강아지</option>
                <option value="cat">고양이</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="breed">품종</label>
              <input
                type="text"
                id="breed"
                name="breed"
                value={formData.breed}
                onChange={handleChange}
                placeholder="예: 골든 리트리버, 페르시안 등"
              />
            </div>

            <div className="form-group">
              <label htmlFor="age">나이 (개월) *</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                min="1"
                placeholder="개월 수를 입력하세요"
              />
            </div>

            <div className="form-group">
              <label htmlFor="weight">체중 (kg) *</label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                required
                min="0.1"
                step="0.1"
                placeholder="체중을 입력하세요"
              />
            </div>

            <div className="form-group">
              <label htmlFor="activity">활동량 *</label>
              <select
                id="activity"
                name="activity"
                value={formData.activity}
                onChange={handleChange}
                required
              >
                <option value="low">낮음 (실내 위주)</option>
                <option value="normal">보통</option>
                <option value="high">높음 (활발함)</option>
                <option value="very-high">매우 높음 (매우 활발함)</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="health">건강 상태</label>
            <textarea
              id="health"
              name="health"
              value={formData.health}
              onChange={handleChange}
              rows="3"
              placeholder="알레르기, 질병, 특이사항 등을 입력하세요"
            />
          </div>

          <div className="form-group">
            <label htmlFor="allergies">알레르기 정보</label>
            <input
              type="text"
              id="allergies"
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
              placeholder="알레르기가 있는 음식을 입력하세요 (쉼표로 구분)"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              등록하고 식단 추천받기
            </button>
          </div>
        </form>

        <div className="info-box">
          <h3>💡 정보 등록 팁</h3>
          <ul>
            <li>정확한 정보를 입력할수록 더 나은 맞춤 식단을 추천받을 수 있습니다.</li>
            <li>건강 상태와 알레르기 정보를 꼭 입력해주시면 안전한 식단을 제공할 수 있습니다.</li>
            <li>체중과 활동량은 식단 조정에 중요한 요소입니다.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default PetRegister