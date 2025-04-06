import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import DashboardLayout from './layouts/DashboardLayout.jsx'

function Dashboard() {
  return <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
}
function Expenses() {
  return <h1 className="text-xl">Expenses Page</h1>
}
function Budgets() {
  return <h1 className="text-xl">Budgets Page</h1>
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="budgets" element={<Budgets />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
