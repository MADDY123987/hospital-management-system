import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import RegisterPatient from './pages/RegisterPatient';
import AddDoctor from './pages/AddDoctor';
import AddRoom from './pages/AddRoom';
import BookAppointment from './pages/BookAppointment';
import AdmitPatient from './pages/AdmitPatient';
import DischargePatient from './pages/DischargePatient';
import ViewTables from './pages/ViewTables';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <aside className="sidebar">
          <Sidebar />
        </aside>

        <div className="content-wrapper">
          <header className="page-header" aria-hidden>
            {/* Page header placeholder (optional) */}
          </header>

          <main className="page-content">
            <Routes>
              <Route path="/" element={<RegisterPatient />} />
              <Route path="/register" element={<RegisterPatient />} />
              <Route path="/doctors" element={<AddDoctor />} />
              <Route path="/rooms" element={<AddRoom />} />
              <Route path="/appointments" element={<BookAppointment />} />
              <Route path="/admit" element={<AdmitPatient />} />
              <Route path="/discharge" element={<DischargePatient />} />
              <Route path="/tables" element={<ViewTables />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
