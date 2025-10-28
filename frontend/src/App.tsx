import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/leads"
            element={isAuthenticated ? <Leads /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;