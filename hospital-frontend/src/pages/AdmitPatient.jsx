import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdmitPatient() {
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    roomId: ''
  });
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  // Fetch patients, doctors, and rooms on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [patientsRes, doctorsRes, roomsRes] = await Promise.all([
          axios.get('https://hospital-backend-xd5h.onrender.com/api/patients'),
          axios.get('https://hospital-backend-xd5h.onrender.com/api/doctors'),
          axios.get('https://hospital-backend-xd5h.onrender.com/api/rooms/available')
        ]);
        setPatients(patientsRes.data);
        setDoctors(doctorsRes.data);
        setRooms(roomsRes.data);
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
      const patientId = parseInt(formData.patientId);
      const doctorId = parseInt(formData.doctorId);
      const roomId = parseInt(formData.roomId);
      
      await axios.put(
        `https://hospital-backend-xd5h.onrender.com/api/patients/${patientId}/admit/${doctorId}/${roomId}`
      );
      setMessage('✓ Patient admitted successfully!');
      setFormData({ patientId: '', doctorId: '', roomId: '' });
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
        <div className="card">
          <h1 style={{marginTop:0, marginBottom:20}}>Admit Patient</h1>
          <p className="muted">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="card">
        <h1 style={{marginTop:0, marginBottom:20}}>Admit Patient</h1>

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

          <div>
            <label className="form-label">Available Room</label>
            <select
              id="roomSelect"
              name="roomId"
              value={formData.roomId}
              onChange={handleChange}
              required
              className="form-select"
            >
              <option value="">Select a room</option>
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  Room {room.roomNumber} ({room.roomType})
                </option>
              ))}
            </select>
          </div>

          <div style={{textAlign:'right'}}>
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Admitting...' : 'Admit Patient'}
            </button>
          </div>
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
