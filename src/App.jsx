import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import PetRegister from './pages/PetRegister'
import MealPlan from './pages/MealPlan'
import MySubscription from './pages/MySubscription'
import './App.css'

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pet-register" element={<PetRegister />} />
        <Route path="/meal-plan" element={<MealPlan />} />
        <Route path="/my-subscription" element={<MySubscription />} />
      </Routes>
    </div>
  )
}

export default App