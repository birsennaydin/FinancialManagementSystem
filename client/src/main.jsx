import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import DashboardLayout from './layouts/DashboardLayout.jsx'
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Budgets from "./pages/Budgets";
import Category from "./pages/Category";
import FinancialTips from './pages/FinancialTips.jsx'
import Suggestions from './pages/Suggestions.jsx' 
import { AuthProvider } from './context/AuthContext';
import Reminder from "./pages/Reminder";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    }>
      <Route index element={<Dashboard />} />
      <Route path="/dashboard/categories" element={
        <ProtectedRoute>
          <Category />
        </ProtectedRoute>
      } />
      <Route path="expenses" element={
        <ProtectedRoute>
          <Expenses />
        </ProtectedRoute>
      } />
      <Route path="budgets" element={
        <ProtectedRoute>
          <Budgets />
        </ProtectedRoute>
      } />
      <Route path="financial" element={
        <ProtectedRoute>
          <FinancialTips />
        </ProtectedRoute>
      } />
      <Route path="suggestions" element={
        <ProtectedRoute>
          <Suggestions />
        </ProtectedRoute>
      } />
      <Route path="reminder" element={
              <ProtectedRoute>
                <Reminder />
              </ProtectedRoute>
            } />
      </Route>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  </StrictMode>
)
