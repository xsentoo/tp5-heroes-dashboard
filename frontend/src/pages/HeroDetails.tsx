import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getHeroById, deleteHero } from '../api/heroApi';
import { useAuth } from '../hooks/useAuth';

const HeroDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [hero, setHero] = useState<any>(null);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        if (id) {
          const data = await getHeroById(id);
          setHero(data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchHero();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this hero?')) {
      try {
        if (id) {
          await deleteHero(id);
          navigate('/');
        }
      } catch (err) {
        console.error(err);
        alert('Failed to delete hero.');
      }
    }
  };

  if (!hero) return <div>Loading...</div>;

  const stats = [
    { label: 'Intelligence', value: hero.powerstats?.intelligence || 0 },
    { label: 'Strength', value: hero.powerstats?.strength || 0 },
    { label: 'Speed', value: hero.powerstats?.speed || 0 },
    { label: 'Durability', value: hero.powerstats?.durability || 0 },
    { label: 'Power', value: hero.powerstats?.power || 0 },
    { label: 'Combat', value: hero.powerstats?.combat || 0 },
  ];

  return (
    <div className="animate-fade-in glass-panel" style={{ padding: '3rem', marginTop: '2rem' }}>
      <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
        <button onClick={() => navigate('/')} className="btn" style={{ background: 'rgba(255,255,255,0.1)' }}>
          &larr; Back to Dashboard
        </button>
        {user?.role === 'admin' && (
          <button onClick={handleDelete} className="btn btn-danger" style={{ marginLeft: 'auto' }}>
            Delete Hero
          </button>
        )}
        {(user?.role === 'admin' || user?.role === 'editor') && (
          <Link to={`/edit-hero/${hero._id}`} className="btn btn-primary" style={{ marginLeft: user?.role !== 'admin' ? 'auto' : '0' }}>
            Edit Hero
          </Link>
        )}
      </div>

      <div className="details-grid">
        <div>
          <img 
            src={hero.customImage || hero.images?.lg || hero.images?.md || 'https://via.placeholder.com/400x500?text=No+Image'} 
            alt={hero.name} 
            style={{ width: '100%', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x500?text=Image+Not+Found' }}
          />
        </div>
        
        <div>
          <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem', background: 'linear-gradient(to right, #fff, var(--primary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {hero.name}
          </h1>
          <h3 style={{ color: 'var(--secondary)', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
            {hero.biography?.fullName && hero.biography.fullName !== hero.name ? hero.biography.fullName : hero.biography?.publisher || 'Unknown'}
          </h3>

          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Power Stats</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem 2rem' }}>
              {stats.map(stat => (
                <div key={stat.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                    <span>{stat.label}</span>
                    <span style={{ fontWeight: 'bold' }}>{stat.value}</span>
                  </div>
                  <div className="stat-bar-container">
                    <div className="stat-bar" style={{ width: `${stat.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Biography</h4>
            <p style={{ color: 'var(--text-muted)' }}><strong>Alter Egos:</strong> {hero.biography?.alterEgos || 'No alter egos found.'}</p>
            <p style={{ color: 'var(--text-muted)' }}><strong>Aliases:</strong> {hero.biography?.aliases?.join(', ') || 'None'}</p>
            <p style={{ color: 'var(--text-muted)' }}><strong>Place of Birth:</strong> {hero.biography?.placeOfBirth || '-'}</p>
            <p style={{ color: 'var(--text-muted)' }}><strong>First Appearance:</strong> {hero.biography?.firstAppearance || '-'}</p>
            <p style={{ color: 'var(--text-muted)' }}><strong>Alignment:</strong> {hero.biography?.alignment || '-'}</p>
          </div>

          <div>
            <h4 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Appearance</h4>
            <p style={{ color: 'var(--text-muted)' }}><strong>Gender:</strong> {hero.appearance?.gender || '-'}</p>
            <p style={{ color: 'var(--text-muted)' }}><strong>Race:</strong> {hero.appearance?.race || '-'}</p>
            <p style={{ color: 'var(--text-muted)' }}><strong>Height:</strong> {hero.appearance?.height?.[1] || '-'}</p>
            <p style={{ color: 'var(--text-muted)' }}><strong>Weight:</strong> {hero.appearance?.weight?.[1] || '-'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroDetails;
