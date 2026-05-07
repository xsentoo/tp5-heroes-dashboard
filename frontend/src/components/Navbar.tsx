import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { user, logoutContext } = useAuth();

  return (
    <nav className="navbar glass-panel" style={{ borderRadius: 0, borderTop: 0, borderLeft: 0, borderRight: 0 }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" className="logo">SUPER<span style={{color: 'var(--text-main)'}}>MANAGER</span></Link>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span>Welcome, <strong style={{color: 'var(--primary)'}}>{user?.username}</strong> ({user?.role})</span>
          {(user?.role === 'admin' || user?.role === 'editor') && (
            <Link to="/add-hero" className="btn btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}>
              + Add Hero
            </Link>
          )}
          <button onClick={logoutContext} className="btn" style={{ background: 'transparent', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
