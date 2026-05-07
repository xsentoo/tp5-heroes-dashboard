import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import HeroDetails from './pages/HeroDetails';
import AddHero from './pages/AddHero';
import EditHero from './pages/EditHero';

import React from 'react';

const ProtectedRoute = ({ children, requireRole }: { children: React.ReactNode, requireRole?: string }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (requireRole && user.role !== requireRole && user.role !== 'admin') {
    return <Navigate to="/" />;
  }
  return children;
};

function App() {
  const { user } = useAuth();

  return (
    <>
      {user && <Navbar />}
      <div className="container" style={{ paddingBottom: '3rem' }}>
        <Routes>
          <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/hero/:id" element={<ProtectedRoute><HeroDetails /></ProtectedRoute>} />
          <Route path="/add-hero" element={<ProtectedRoute requireRole="editor"><AddHero /></ProtectedRoute>} />
          <Route path="/edit-hero/:id" element={<ProtectedRoute requireRole="editor"><EditHero /></ProtectedRoute>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
