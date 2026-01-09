const API_BASE_URL = 'http://localhost:3001/api'

// 인증 토큰 가져오기
const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  }
}

// 반려동물 등록
export const registerPet = async (petData) => {
  const response = await fetch(`${API_BASE_URL}/pets`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(petData),
  })
  return response.json()
}

// 반려동물 목록 조회
export const getPets = async () => {
  const response = await fetch(`${API_BASE_URL}/pets`, {
    headers: getAuthHeaders()
  })
  const data = await response.json()
  return data.success ? data.data : []
}

// 반려동물 상세 조회
export const getPet = async (id) => {
  const response = await fetch(`${API_BASE_URL}/pets/${id}`, {
    headers: getAuthHeaders()
  })
  const data = await response.json()
  return data.success ? data.data : null
}

// 구독 등록
export const subscribeMealPlan = async (subscriptionData) => {
  const response = await fetch(`${API_BASE_URL}/subscriptions`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(subscriptionData),
  })
  return response.json()
}

// 구독 목록 조회
export const getSubscriptions = async () => {
  const response = await fetch(`${API_BASE_URL}/subscriptions`, {
    headers: getAuthHeaders()
  })
  const data = await response.json()
  return data.success ? data.data : []
}

// 구독 취소
export const cancelSubscription = async (id) => {
  const response = await fetch(`${API_BASE_URL}/subscriptions/${id}/cancel`, {
    method: 'PATCH',
    headers: getAuthHeaders()
  })
  return response.json()
}
