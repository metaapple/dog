import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Header from './components/Header'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import PetRegister from './pages/PetRegister'
import MealPlan from './pages/MealPlan'
import MySubscription from './pages/MySubscription'
import './App.css'

function App() {
  const location = useLocation()
  const showHeader = location.pathname !== '/login'

  return (
    <div className="App">
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/pet-register" 
          element={
            <ProtectedRoute>
              <PetRegister />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/meal-plan" 
          element={
            <ProtectedRoute>
              <MealPlan />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/my-subscription" 
          element={
            <ProtectedRoute>
              <MySubscription />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App