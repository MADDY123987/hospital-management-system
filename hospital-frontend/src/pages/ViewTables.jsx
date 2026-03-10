import { useState } from 'react';
import TableView from '../components/TableView';

export default function ViewTables() {
  const [activeTable, setActiveTable] = useState('patients');

  const renderTable = () => {
    switch(activeTable) {
      case 'patients':
        return <TableView 
          endpoint="patients" 
          title="Patients" 
          columns={['id', 'name', 'age', 'disease']}
        />;
      case 'doctors':
        return <TableView 
          endpoint="doctors" 
          title="Doctors" 
          columns={['id', 'name', 'specialization']}
        />;
      case 'rooms':
        return <TableView 
          endpoint="rooms" 
          title="Rooms" 
          columns={['id', 'roomNumber', 'roomType', 'pricePerDay']}
        />;
      default:
        return null;
    }
  };

  const tabs = [
    { id: 'patients', label: '👥 Patients' },
    { id: 'doctors', label: '👨‍⚕️ Doctors' },
    { id: 'rooms', label: '🛏️ Rooms' }
  ];

  return (
    <div>
      <h1>View Tables</h1>

      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTable(tab.id)}
            className={`tab ${activeTable === tab.id ? 'active' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {renderTable()}
    </div>
  );
}
