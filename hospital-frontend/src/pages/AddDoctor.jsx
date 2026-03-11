import { useState } from 'react';
import axios from 'axios';

export default function AddDoctor() {
  const [formData, setFormData] = useState({
    name: '',
    specialization: ''
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
      await axios.post('https://hospital-backend-xd5h.onrender.com/api/doctors', formData);;
      setMessage('✓ Doctor added successfully!');
      setFormData({ name: '', specialization: '' });
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('✗ Error: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Add Doctor</h1>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div>
            <label className="muted">Doctor Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Dr. John Smith"
            />
          </div>

          <div>
            <label className="muted">Specialization</label>
            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="e.g., Cardiologist"
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Adding...' : 'Add Doctor'}
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
