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
        `https://hospital-backend-xd5h.onrender.com/api/patients/${patientId}/discharge`,
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
    <div className="space-y-6 max-w-md">
      <h1 className="text-3xl font-bold text-white mb-8">Discharge Patient</h1>
      
      <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Patient ID
            </label>
            <input
              type="number"
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
              placeholder="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Deposit Amount ($)
            </label>
            <input
              type="number"
              name="deposit"
              value={formData.deposit}
              onChange={handleChange}
              required
              step="0.01"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
              placeholder="5000"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg"
          >
            {loading ? 'Processing...' : 'Discharge Patient'}
          </button>

        </form>

        {message && (
          <div className="mt-4 p-3 rounded-lg text-sm font-medium">
            {message}
          </div>
        )}

      </div>

      {billingResult && (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-8">
          <h3 className="text-xl font-semibold text-white mb-6">
            Billing Summary
          </h3>

          <div className="space-y-3">
            {Object.entries(billingResult).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="text-gray-400">
                  {key.replace(/([A-Z])/g, ' $1')}:
                </span>
                <span className="text-white">
                  {typeof value === 'number'
                    ? `$${value.toFixed(2)}`
                    : value}
                </span>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}