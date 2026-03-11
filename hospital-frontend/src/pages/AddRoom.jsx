import { useState } from 'react';
import axios from 'axios';

export default function AddRoom() {
  const [formData, setFormData] = useState({
    roomNumber: '',
    roomType: 'General',
    pricePerDay: ''
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
      await axios.post('https://hospital-backend-xd5h.onrender.com/api/rooms', {
        roomNumber: formData.roomNumber,
        roomType: formData.roomType,
        pricePerDay: parseFloat(formData.pricePerDay)
      });
      setMessage('✓ Room added successfully!');
      setFormData({ roomNumber: '', roomType: 'General', pricePerDay: '' });
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('✗ Error: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Add Room</h1>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div>
            <label className="muted">Room Number</label>
            <input
              type="text"
              name="roomNumber"
              value={formData.roomNumber}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="e.g., 101"
            />
          </div>

          <div>
            <label className="muted">Room Type</label>
            <select
              name="roomType"
              value={formData.roomType}
              onChange={handleChange}
              className="form-input"
            >
              <option value="ICU">ICU</option>
              <option value="Private">Private</option>
              <option value="General">General</option>
            </select>
          </div>

          <div>
            <label className="muted">Price Per Day ($)</label>
            <input
              type="number"
              name="pricePerDay"
              value={formData.pricePerDay}
              onChange={handleChange}
              required
              step="0.01"
              className="form-input"
              placeholder="5000"
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Adding...' : 'Add Room'}
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
