import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

import App from './App.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import DashboardLayout from './layouts/DashboardLayout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Expenses from './pages/Expenses.jsx'
import Budgets from './pages/Budgets.jsx'
import Category from './pages/Category.jsx'
import FinancialTips from './pages/FinancialTips.jsx'
import Suggestions from './pages/Suggestions.jsx'
import Reminder from './pages/Reminder.jsx'
import UserManagement from './pages/UserManagement.jsx'

import ProtectedRoute from './components/ProtectedRoute.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected dashboard layout */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="expenses" element={<ProtectedRoute><Expenses /></ProtectedRoute>} />
            <Route path="budgets" element={<ProtectedRoute><Budgets /></ProtectedRoute>} />
            <Route path="categories" element={<ProtectedRoute><Category /></ProtectedRoute>} />
            <Route path="financial" element={<ProtectedRoute><FinancialTips /></ProtectedRoute>} />
            <Route path="suggestions" element={<ProtectedRoute><Suggestions /></ProtectedRoute>} />
            <Route path="reminder" element={<ProtectedRoute><Reminder /></ProtectedRoute>} />
            <Route path="userManagement" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
)
