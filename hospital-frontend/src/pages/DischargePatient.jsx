import { useState } from 'react';
import axios from 'axios';

export default function DischargePatient() {
  const [formData, setFormData] = useState({
    patientId: '',
    deposit: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [billingResult, setBillingResult] = useState(null);

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
      const patientId = parseInt(formData.patientId);
      const response = await axios.put(
        `http://localhost:8085/api/patients/${patientId}/discharge`,
        { deposit: parseFloat(formData.deposit) }
      );
      
      setBillingResult(response.data);
      setMessage('✓ Patient discharged successfully!');
      setFormData({ patientId: '', deposit: '' });
      setTimeout(() => setMessage(''), 5000);
    } catch (error) {
      setMessage('✗ Error: ' + (error.response?.data?.message || error.message));
      setBillingResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="card">
        <h1 style={{marginTop:0, marginBottom:20}}>Discharge Patient</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="form-label">Patient ID</label>
            <input
              type="number"
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="1"
            />
          </div>

          <div>
            <label className="form-label">Deposit Amount ($)</label>
            <input
              type="number"
              name="deposit"
              value={formData.deposit}
              onChange={handleChange}
              required
              step="0.01"
              className="form-input"
              placeholder="5000"
            />
          </div>

          <div style={{textAlign:'right'}}>
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Processing...' : 'Discharge Patient'}
            </button>
          </div>
        </form>

        {message && (
          <div className={message.startsWith('✓') ? 'msg-success' : 'msg-error'}>
            {message}
          </div>
        )}
      </div>

      {billingResult && (
        <div className="card" style={{marginTop:24}}>
          <h3 style={{marginTop:0, marginBottom:16}}>Billing Summary</h3>
          <div style={{display:'grid', gap:12}}>
            {Object.entries(billingResult).map(([key, value]) => (
              <div key={key} style={{display:'flex', justifyContent:'space-between'}}>
                <span className="muted" style={{textTransform:'capitalize'}}>{key.replace(/([A-Z])/g, ' $1')}:</span>
                <span style={{fontWeight:600}}>{typeof value === 'number' ? `$${value.toFixed(2)}` : value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
