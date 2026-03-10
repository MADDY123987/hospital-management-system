import { useState, useEffect } from 'react';
import axios from 'axios';

export default function BookAppointment() {
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: ''
  });
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  // Fetch patients and doctors on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [patientsRes, doctorsRes] = await Promise.all([
          axios.get('http://localhost:8085/api/patients'),
          axios.get('http://localhost:8085/api/doctors')
        ]);
        setPatients(patientsRes.data);
        setDoctors(doctorsRes.data);
      } catch (error) {
        setMessage('✗ Error fetching data: ' + (error.response?.data?.message || error.message));
      } finally {
        setDataLoading(false);
      }
    };

    fetchData();
  }, []);

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
      await axios.post('http://localhost:8085/api/appointments', {
        patientId: parseInt(formData.patientId),
        doctorId: parseInt(formData.doctorId)
      });
      setMessage('✓ Appointment booked successfully!');
      setFormData({ patientId: '', doctorId: '' });
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('✗ Error: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  if (dataLoading) {
    return (
      <div>
        <h1>Book Appointment</h1>
        <div className="card">
          <p className="muted">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Book Appointment</h1>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div>
            <label className="form-label">Patient</label>
            <select
              id="patientSelect"
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              required
              className="form-select"
            >
              <option value="">Select a patient</option>
              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.name} (ID: {patient.id})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-label">Doctor</label>
            <select
              id="doctorSelect"
              name="doctorId"
              value={formData.doctorId}
              onChange={handleChange}
              required
              className="form-select"
            >
              <option value="">Select a doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name} - {doctor.specialization}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Booking...' : 'Book Appointment'}
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
