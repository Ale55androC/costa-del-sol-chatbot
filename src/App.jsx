import { useState } from 'react'
import AgentDashboard from './pages/AgentDashboard'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  const [userType, setUserType] = useState(null)

  if (!userType) {
    return (
      <div className="min-h-screen bg-neutral flex items-center justify-center bg-[url('https://images.lucasfox.com/development/4x3_1600w/09d3f6b604.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-primary/50 backdrop-blur-sm"></div>
        <div className="relative z-10 bg-white/95 p-8 rounded-lg shadow-xl space-y-8 max-w-md w-full mx-4">
          <div className="text-center space-y-4">
            <h1 className="font-serif text-3xl font-semibold text-primary">
              Costa del Sol
            </h1>
            <h2 className="font-serif text-xl text-primary/80">
              Luxury Property Assistant
            </h2>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={() => setUserType('agent')}
              className="w-full p-4 bg-primary text-white rounded-lg hover:bg-primary-light transition-all transform hover:scale-102 font-medium"
            >
              Continue as Agent
            </button>
            <button
              onClick={() => setUserType('admin')}
              className="w-full p-4 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all transform hover:scale-102 font-medium"
            >
              Continue as Admin
            </button>
          </div>

          <p className="text-center text-sm text-gray-500">
            Powered by Lucas Fox International Properties
          </p>
        </div>
      </div>
    )
  }

  return userType === 'agent' ? <AgentDashboard /> : <AdminDashboard />
}

export default App
