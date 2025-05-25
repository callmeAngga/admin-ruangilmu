import { BrowserRouter as Router, Routes, Route } from 'react-router'
import AppLayout from './layout/AppLayout'
import './App.css'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path="/" element={<h1>Home Page</h1>} />
            <Route path="/courses" element={<h1>About Page</h1>} />
            <Route path="/modules" element={<h1>Contact Page</h1>} />
            <Route path="/contents" element={<h1>Contact Page</h1>} />
            <Route path="/admin" element={<h1>Contact Page</h1>} />
            <Route path="/profile" element={<h1>Contact Page</h1>} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App