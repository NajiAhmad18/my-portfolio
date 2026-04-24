import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AdminLayout from './components/Admin/AdminLayout'

function App() {
  return (
    <BrowserRouter>
      <div className="admin-app">
        <AdminLayout />
      </div>
    </BrowserRouter>
  )
}

export default App
