import { useState } from 'react';
import axios from 'axios';

export default function RegisterPatient() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    disease: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:8085/api/patients', {
        name: formData.name,
        age: parseInt(formData.age),
        disease: formData.disease
      });
      setMessage('✓ Patient registered successfully!');
      setFormData({ name: '', age: '', disease: '' });
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('✗ Error: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Register Patient</h1>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div>
            <label className="muted">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="muted">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="25"
            />
          </div>

          <div>
            <label className="muted">Disease/Condition</label>
            <input
              type="text"
              name="disease"
              value={formData.disease}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="e.g., Fever"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
          >
            {loading ? 'Registering...' : 'Register Patient'}
          </button>
        </form>

        {message && (
          <div className={message.startsWith('✓') ? 'msg-success' : 'msg-error'}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
