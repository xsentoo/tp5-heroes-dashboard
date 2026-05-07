import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createHero } from '../api/heroApi';
import { useNavigate } from 'react-router-dom';

const HeroSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  publisher: Yup.string().required('Universe/Publisher is required'),
  intelligence: Yup.number().min(0).max(100),
  strength: Yup.number().min(0).max(100),
  speed: Yup.number().min(0).max(100),
  durability: Yup.number().min(0).max(100),
  power: Yup.number().min(0).max(100),
  combat: Yup.number().min(0).max(100),
  description: Yup.string(),
});

const AddHero = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    const formData = new FormData();
    formData.append('name', values.name);
    
    const biography = { publisher: values.publisher, aliases: values.description ? [values.description] : [] };
    formData.append('biography', JSON.stringify(biography));

    const powerstats = {
      intelligence: values.intelligence,
      strength: values.strength,
      speed: values.speed,
      durability: values.durability,
      power: values.power,
      combat: values.combat
    };
    formData.append('powerstats', JSON.stringify(powerstats));

    if (image) {
      formData.append('image', image);
    }

    try {
      await createHero(formData);
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Failed to add hero.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '3rem', maxWidth: '800px', margin: '2rem auto' }}>
      <h2 style={{ marginBottom: '2rem', fontSize: '2rem', color: 'var(--primary)' }}>Add New Hero</h2>
      <Formik
        initialValues={{
          name: '',
          publisher: '',
          intelligence: 50,
          strength: 50,
          speed: 50,
          durability: 50,
          power: 50,
          combat: 50,
          description: ''
        }}
        validationSchema={HeroSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label className="form-label">Hero Name</label>
              <Field type="text" name="name" className="form-control" />
              <ErrorMessage name="name" component="div" className="error-text" />
            </div>

            <div className="form-group">
              <label className="form-label">Universe (Publisher)</label>
              <Field type="text" name="publisher" className="form-control" placeholder="e.g. Marvel Comics, DC Comics" />
              <ErrorMessage name="publisher" component="div" className="error-text" />
            </div>

            <div className="form-group">
              <label className="form-label">Alias / Description</label>
              <Field type="text" name="description" className="form-control" />
            </div>

            <h4 style={{ margin: '2rem 0 1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Power Stats (0-100)</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {['intelligence', 'strength', 'speed', 'durability', 'power', 'combat'].map((stat) => (
                <div key={stat} className="form-group">
                  <label className="form-label" style={{ textTransform: 'capitalize' }}>{stat}</label>
                  <Field type="number" name={stat} className="form-control" />
                  <ErrorMessage name={stat} component="div" className="error-text" />
                </div>
              ))}
            </div>

            <h4 style={{ margin: '2rem 0 1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Hero Image</h4>
            <div className="form-group">
              <input type="file" accept="image/*" onChange={handleImageChange} className="form-control" style={{ padding: '0.5rem' }} />
              {preview && (
                <div style={{ marginTop: '1rem' }}>
                  <img src={preview} alt="Preview" style={{ height: '200px', borderRadius: '8px', objectFit: 'cover' }} />
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '3rem' }}>
              <button type="button" onClick={() => navigate('/')} className="btn" style={{ background: 'rgba(255,255,255,0.1)' }}>
                Cancel
              </button>
              <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                {isSubmitting ? 'Saving...' : 'Save Hero'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddHero;
