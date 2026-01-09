const API_BASE_URL = '/api'

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
  try {
    const response = await fetch(`${API_BASE_URL}/pets`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(petData),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.message || '서버 오류가 발생했습니다.')
    }

    return await response.json()
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      throw new Error('서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.')
    }
    throw error
  }
}

// 반려동물 목록 조회
export const getPets = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/pets`, {
      headers: getAuthHeaders()
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.message || '서버 오류가 발생했습니다.')
    }

    const data = await response.json()
    return data.success ? data.data : []
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      throw new Error('서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.')
    }
    throw error
  }
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
  try {
    const response = await fetch(`${API_BASE_URL}/subscriptions`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(subscriptionData),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.message || '서버 오류가 발생했습니다.')
    }

    return await response.json()
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      throw new Error('서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.')
    }
    throw error
  }
}

// 구독 목록 조회
export const getSubscriptions = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/subscriptions`, {
      headers: getAuthHeaders()
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.message || '서버 오류가 발생했습니다.')
    }

    const data = await response.json()
    return data.success ? data.data : []
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      throw new Error('서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.')
    }
    throw error
  }
}

// 구독 취소
export const cancelSubscription = async (id) => {
  const response = await fetch(`${API_BASE_URL}/subscriptions/${id}/cancel`, {
    method: 'PATCH',
    headers: getAuthHeaders()
  })
  return response.json()
}
