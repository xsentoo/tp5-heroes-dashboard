import { useState, useEffect } from 'react';
import { getHeroes } from '../api/heroApi';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [heroes, setHeroes] = useState<any[]>([]);
  const [keyword, setKeyword] = useState('');
  const [publisher, setPublisher] = useState('');
  const [sort, setSort] = useState('name');

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const data = await getHeroes({ keyword, publisher, sort });
        setHeroes(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchHeroes();
  }, [keyword, publisher, sort]);

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem', background: 'rgba(30, 41, 59, 0.4)', padding: '1.5rem', borderRadius: '12px' }}>
        <input 
          type="text" 
          placeholder="Search by name or alias..." 
          className="form-control" 
          style={{ flex: 1, minWidth: '200px' }}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <select className="form-control" style={{ width: 'auto' }} value={publisher} onChange={(e) => setPublisher(e.target.value)}>
          <option value="">All Universes</option>
          <option value="Marvel">Marvel Comics</option>
          <option value="DC">DC Comics</option>
          <option value="Dark Horse">Dark Horse Comics</option>
          <option value="George Lucas">George Lucas</option>
        </select>
        <select className="form-control" style={{ width: 'auto' }} value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="name">Sort A-Z</option>
          <option value="date">Newest First</option>
        </select>
      </div>

      <div className="hero-grid">
        {heroes.map((hero, index) => (
          <Link to={`/hero/${hero._id}`} key={hero._id} style={{ animationDelay: `${index * 0.05}s` }} className="hero-card glass-panel animate-fade-in">
            <img 
              src={hero.customImage || hero.images?.lg || hero.images?.md || 'https://via.placeholder.com/300x400?text=No+Image'} 
              alt={hero.name} 
              className="hero-image"
              onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x400?text=Image+Not+Found' }}
            />
            <div className="hero-info">
              <h3 className="hero-name">{hero.name}</h3>
              <p className="hero-universe">{hero.biography?.publisher || 'Unknown Universe'}</p>
              <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.1)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                  STR: {hero.powerstats?.strength || 0}
                </span>
                <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.1)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                  INT: {hero.powerstats?.intelligence || 0}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {heroes.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
          <h3>No heroes found.</h3>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
