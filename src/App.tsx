import { BrowserRouter as Router, Routes, Route } from 'react-router'
import AppLayout from './layout/AppLayout'
import StatisticPage from './pages/StatisticPage'
import CoursePage from './pages/CoursePage'
import ProfilePage from './pages/ProfllePage'
import AddAdminPage from './pages/AddAdminPage'
import LoginPage from './pages/LoginPage'
import './App.css'


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage/>}></Route>
          <Route path="/" element={<AppLayout />}>
            <Route path="/dashboard" element={<StatisticPage />}/>
            <Route path="/courses" element={<CoursePage />} />
            <Route path="/admin" element={<AddAdminPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App