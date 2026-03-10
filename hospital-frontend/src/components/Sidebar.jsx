import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { path: '/', label: 'Register Patient' },
    { path: '/doctors', label: 'Add Doctor' },
    { path: '/rooms', label: 'Add Room' },
    { path: '/appointments', label: 'Book Appointment' },
    { path: '/admit', label: 'Admit Patient' },
    { path: '/discharge', label: 'Discharge Patient' },
    { path: '/tables', label: 'View Tables' },
  ];

  return (
    <div className="sidebar">
      <Link to="/" className="block mb-6">
        <div className="logo-row">
          <div className="logo-box">H</div>
          <div>
            <h2 className="logo-title">Hospital</h2>
            <p className="logo-sub">Management</p>
          </div>
        </div>
      </Link>

      <nav>
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={isActive(item.path) ? 'active' : ''}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <p className="logo-sub">Hospital Management v1.0</p>
      </div>
    </div>
  );
}
